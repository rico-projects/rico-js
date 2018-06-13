import Attribute from './attribute'
import EventBus from './eventBus'
import CommandFactory from './commands/commandFactory';
import {ADDED_TYPE, REMOVED_TYPE} from './constants'
import { LoggerFactory } from '../logging';

export default class ClientModelStore {

    constructor(clientDolphin) {

        this.clientDolphin = clientDolphin;
        this.presentationModels = new Map();
        this.presentationModelsPerType = new Map();
        this.attributesPerId = new Map();
        this.attributesPerQualifier = new Map();
        this.modelStoreChangeBus = new EventBus();
    }

    getClientDolphin() {
        return this.clientDolphin;
    }

    registerAttribute(attribute) {
        this.addAttributeById(attribute);
        if (attribute.getQualifier()) {
            this.addAttributeByQualifier(attribute);
        }
        // whenever an attribute changes its value, the server needs to be notified
        // and all other attributes with the same qualifier are given the same value
        attribute.onValueChange((evt) => {
            if(evt.newValue !== evt.oldValue && evt.sendToServer === true) {
                const command = CommandFactory.createValueChangedCommand(attribute.id, evt.newValue);
                this.clientDolphin.getClientConnector().send(command, null);
            }

            if (attribute.getQualifier()) {
                let attrs = this.findAttributesByFilter((attr) => {
                    return attr !== attribute && attr.getQualifier() === attribute.getQualifier();
                });
                attrs.forEach((attr) => {
                    attr.setValue(attribute.getValue());
                });
            }

        });
        attribute.onQualifierChange((evt) => {
            this.clientDolphin.getClientConnector().send(CommandFactory.createChangeAttributeMetadataCommand(attribute.id, Attribute.QUALIFIER_PROPERTY, evt.newValue), null);
        });
    }

    add(model, sendToServer = true) {
        if (!model) {
            return false;
        }
        if (this.presentationModels.has(model.id)) {
            ClientModelStore.LOGGER.error("There already is a PM with id " + model.id);
        }
        let added = false;
        if (!this.presentationModels.has(model.id)) {
            this.presentationModels.set(model.id, model);
            this.addPresentationModelByType(model);

            if(sendToServer) {
                let connector = this.clientDolphin.getClientConnector();
                connector.send(CommandFactory.createCreatePresentationModelCommand(model), null);
            }

            model.getAttributes().forEach(attribute => {
                this.registerAttribute(attribute);
            });
            this.modelStoreChangeBus.trigger({ 'eventType': ADDED_TYPE, 'clientPresentationModel': model });
            added = true;
        }
        return added;
    }

    remove(model) {
        if (!model) {
            return false;
        }
        let removed = false;
        if (this.presentationModels.has(model.id)) {
            this.removePresentationModelByType(model);
            this.presentationModels.delete(model.id);
            model.getAttributes().forEach((attribute) => {
                this.removeAttributeById(attribute);
                if (attribute.getQualifier()) {
                    this.removeAttributeByQualifier(attribute);
                }
            });
            this.modelStoreChangeBus.trigger({ 'eventType': REMOVED_TYPE, 'clientPresentationModel': model });
            removed = true;
        }
        return removed;
    }

    findAttributesByFilter(filter) {
        let matches = [];
        this.presentationModels.forEach((model) => {
            model.getAttributes().forEach((attr) => {
                if (filter(attr)) {
                    matches.push(attr);
                }
            });
        });
        return matches;
    }

    addPresentationModelByType(model) {
        if (!model) {
            return;
        }
        let type = model.presentationModelType;
        if (!type) {
            return;
        }
        let presentationModels = this.presentationModelsPerType.get(type);
        if (!presentationModels) {
            presentationModels = [];
            this.presentationModelsPerType.set(type, presentationModels);
        }
        if (!(presentationModels.indexOf(model) > -1)) {
            presentationModels.push(model);
        }
    }

    removePresentationModelByType(model) {
        if (!model || !(model.presentationModelType)) {
            return;
        }
        let presentationModels = this.presentationModelsPerType.get(model.presentationModelType);
        if (!presentationModels) {
            return;
        }
        if (presentationModels.length > -1) {
            presentationModels.splice(presentationModels.indexOf(model), 1);
        }
        if (presentationModels.length === 0) {
            this.presentationModelsPerType.delete(model.presentationModelType);
        }
    }

    listPresentationModelIds() {
        let result = [];
        let iter = this.presentationModels.keys();
        let next = iter.next();
        while (!next.done) {
            result.push(next.value);
            next = iter.next();
        }
        return result;
    }

    listPresentationModels() {
        let result = [];
        let iter = this.presentationModels.values();
        let next = iter.next();
        while (!next.done) {
            result.push(next.value);
            next = iter.next();
        }
        return result;
    }

    findPresentationModelById(id) {
        return this.presentationModels.get(id);
    }

    findAllPresentationModelByType(type) {
        if (!type || !this.presentationModelsPerType.has(type)) {
            return [];
        }
        return this.presentationModelsPerType.get(type).slice(0); // slice is used to clone the array
    }

    deletePresentationModel(model, notify) {
        if (!model) {
            return;
        }
        if (this.containsPresentationModel(model.id)) {
            this.remove(model);
            if (!notify || model.clientSideOnly) {
                return;
            }
            this.clientDolphin.getClientConnector().send(CommandFactory.createPresentationModelDeletedCommand(model.id), null);
        }
    }

    containsPresentationModel(id) {
        return this.presentationModels.has(id);
    }

    addAttributeById(attribute) {
        if (!attribute || this.attributesPerId.has(attribute.id)) {
            return;
        }
        this.attributesPerId.set(attribute.id, attribute);
    }

    removeAttributeById(attribute) {
        if (!attribute || !this.attributesPerId.has(attribute.id)) {
            return;
        }
        this.attributesPerId.delete(attribute.id);
    }

    findAttributeById(id) {
        return this.attributesPerId.get(id);
    }

    addAttributeByQualifier(attribute) {
        if (!attribute || !attribute.getQualifier()) {
            return;
        }
        let attributes = this.attributesPerQualifier.get(attribute.getQualifier());
        if (!attributes) {
            attributes = [];
            this.attributesPerQualifier.set(attribute.getQualifier(), attributes);
        }
        if (!(attributes.indexOf(attribute) > -1)) {
            attributes.push(attribute);
        }
    }

    removeAttributeByQualifier(attribute) {
        if (!attribute || !attribute.getQualifier()) {
            return;
        }
        let attributes = this.attributesPerQualifier.get(attribute.getQualifier());
        if (!attributes) {
            return;
        }
        if (attributes.length > -1) {
            attributes.splice(attributes.indexOf(attribute), 1);
        }
        if (attributes.length === 0) {
            this.attributesPerQualifier.delete(attribute.getQualifier());
        }
    }

    findAllAttributesByQualifier(qualifier) {
        if (!qualifier || !this.attributesPerQualifier.has(qualifier)) {
            return [];
        }
        return this.attributesPerQualifier.get(qualifier).slice(0); // slice is used to clone the array
    }

    onModelStoreChange(eventHandler) {
        this.modelStoreChangeBus.onEvent(eventHandler);
    }

    onModelStoreChangeForType(presentationModelType, eventHandler) {
        this.modelStoreChangeBus.onEvent(pmStoreEvent => {
            if (pmStoreEvent.clientPresentationModel.presentationModelType == presentationModelType) {
                eventHandler(pmStoreEvent);
            }
        });
    }
}

ClientModelStore.LOGGER = LoggerFactory.getLogger('ClientModelStore');

