import EventBus from './eventBus';
import { LoggerFactory } from '../logging';

export default class ClientAttribute {

    constructor(propertyName, qualifier, value) {

        this.propertyName = propertyName;
        this.id = "" + (ClientAttribute.clientAttributeInstanceCount++) + "C";
        this.valueChangeBus = new EventBus();
        this.qualifierChangeBus = new EventBus();
        this.setValue(value);
        this.setQualifier(qualifier);
    }

    copy() {
        let result = new ClientAttribute(this.propertyName, this.getQualifier(), this.getValue());
        return result;
    }

    setPresentationModel(presentationModel) {
        if (this.presentationModel) {
            throw new Error("You can not set a presentation model for an attribute that is already bound.");
        }
        this.presentationModel = presentationModel;
    }

    getPresentationModel() {
        return this.presentationModel;
    }

    getValue() {
        return this.value;
    }

    setValueFromServer(newValue) {
        let verifiedValue = ClientAttribute.checkValue(newValue);
        if (this.value === verifiedValue)
            return;
        let oldValue = this.value;
        this.value = verifiedValue;
        this.valueChangeBus.trigger({ 'oldValue': oldValue, 'newValue': verifiedValue, 'sendToServer': false });
    }

    setValue(newValue) {
        let verifiedValue = ClientAttribute.checkValue(newValue);
        if (this.value === verifiedValue)
            return;
        let oldValue = this.value;
        this.value = verifiedValue;
        this.valueChangeBus.trigger({ 'oldValue': oldValue, 'newValue': verifiedValue, 'sendToServer': true });
    }

    setQualifier(newQualifier) {
        if (this.qualifier === newQualifier)
            return;
        let oldQualifier = this.qualifier;
        this.qualifier = newQualifier;
        this.qualifierChangeBus.trigger({ 'oldValue': oldQualifier, 'newValue': newQualifier });
        this.valueChangeBus.trigger({ "oldValue": this.value, "newValue": this.value, 'sendToServer': false });
    }

    getQualifier() {
        return this.qualifier;
    }

    onValueChange(eventHandler) {
        this.valueChangeBus.onEvent(eventHandler);
        eventHandler({ "oldValue": this.value, "newValue": this.value, 'sendToServer': false });
    }

    onQualifierChange(eventHandler) {
        this.qualifierChangeBus.onEvent(eventHandler);
    }

    syncWith(sourceAttribute) {
        if (sourceAttribute) {
            this.setQualifier(sourceAttribute.getQualifier()); // sequence is important
            this.setValue(sourceAttribute.value);
        }
    }

    static checkValue(value) {
        if (value == null || typeof value === 'undefined') {
            return null;
        }
        let result = value;
        if (result instanceof String || result instanceof Boolean || result instanceof Number) {
            result = value.valueOf();
        }
        if (result instanceof ClientAttribute) {
            ClientAttribute.LOGGER.warn("An Attribute may not itself contain an attribute as a value. Assuming you forgot to call value.");
            result = this.checkValue(value.value);
        }
        let ok = false;
        if (this.SUPPORTED_VALUE_TYPES.indexOf(typeof result) > -1 || result instanceof Date) {
            ok = true;
        }
        if (!ok) {
            throw new Error("Attribute values of this type are not allowed: " + typeof value);
        }
        return result;
    }

}

ClientAttribute.LOGGER = LoggerFactory.getLogger('ClientAttribute');
ClientAttribute.SUPPORTED_VALUE_TYPES = ["string", "number", "boolean"];
ClientAttribute.clientAttributeInstanceCount = 0;
