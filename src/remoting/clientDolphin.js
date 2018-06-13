import ClientAttribute from './clientAttribute'
import ClientPresentationModel from './clientPresentationModel'

export default class ClientDolphin {

    constructor() {
    }

    setClientConnector(clientConnector) {
        this.clientConnector = clientConnector;
    }

    getClientConnector() {
        return this.clientConnector;
    }

    send(command, onFinished) {
        this.clientConnector.send(command, onFinished);
    }

    attribute(propertyName, qualifier, value) {
        return new ClientAttribute(propertyName, qualifier, value);
    }

    presentationModel(id, type, ...attributes) {
        const model = new ClientPresentationModel(id, type);
        if (attributes && attributes.length > 0) {
            attributes.forEach((attribute) => {
                model.addAttribute(attribute);
            });
        }
        this.getClientModelStore().add(model, true);
        return model;
    }

    setClientModelStore(clientModelStore) {
        this.clientModelStore = clientModelStore;
    }

    getClientModelStore() {
        return this.clientModelStore;
    }

    listPresentationModelIds() {
        return this.getClientModelStore().listPresentationModelIds();
    }

    listPresentationModels() {
        return this.getClientModelStore().listPresentationModels();
    }

    findAllPresentationModelByType(presentationModelType) {
        return this.getClientModelStore().findAllPresentationModelByType(presentationModelType);
    }

    getAt(id) {
        return this.findPresentationModelById(id);
    }

    findPresentationModelById(id) {
        return this.getClientModelStore().findPresentationModelById(id);
    }

    deletePresentationModel(modelToDelete) {
        this.getClientModelStore().deletePresentationModel(modelToDelete, true);
    }

    updatePresentationModelQualifier(presentationModel) {
        presentationModel.getAttributes().forEach(sourceAttribute => {
            this.updateAttributeQualifier(sourceAttribute);
        });
    }

    updateAttributeQualifier(sourceAttribute) {
        if (!sourceAttribute.getQualifier())
            return;
        const attributes = this.getClientModelStore().findAllAttributesByQualifier(sourceAttribute.getQualifier());
        attributes.forEach(targetAttribute => {
            targetAttribute.setValue(sourceAttribute.getValue()); // should always have the same value
        });
    }

    startPushListening(pushCommand, releaseCommand) {
        this.clientConnector.setPushListener(pushCommand);
        this.clientConnector.setReleaseCommand(releaseCommand);
        this.clientConnector.setPushEnabled(true);

        setTimeout(() => {
            this.clientConnector.listen();
        }, 0);
    }

    stopPushListening() {
        this.clientConnector.setPushEnabled(false);
    }
}