import CreateContextCommand from './impl/createContextCommand';
import CreateControllerCommand from './impl/createControllerCommand';
import CallActionCommand from './impl/callActionCommand';
import DestroyControllerCommand from './impl/destroyControllerCommand';
import DestroyContextCommand from './impl/destroyContextCommand';
import StartLongPollCommand from './impl/startLongPollCommand';
import InterruptLongPollCommand from './impl/interruptLongPollCommand';
import CreatePresentationModelCommand from './impl/createPresentationModelCommand';
import DeletePresentationModelCommand from './impl/deletePresentationModelCommand';
import PresentationModelDeletedCommand from './impl/presentationModelDeletedCommand';
import ValueChangedCommand from './impl/valueChangedCommand';
import ChangeAttributeMetadataCommand from './impl/changeAttributeMetadataCommand';
import AttributeMetadataChangedCommand from './impl/attributeMetadataChangedCommand';

export default class CommandFactory {

    static createCreateContextCommand() {
        return new CreateContextCommand();
    }

    static createCreateControllerCommand(controllerName, parentControllerId) {
        const command = new CreateControllerCommand();
        command.init(controllerName, parentControllerId);
        return command;
    }

    static createCallActionCommand(controllerid, actionName, params) {
        const command = new CallActionCommand();
        command.init(controllerid, actionName, params);
        return command;
    }

    static createDestroyControllerCommand(controllerId) {
        const command = new DestroyControllerCommand();
        command.init(controllerId);
        return command;
    }

    static createDestroyContextCommand() {
        return new DestroyContextCommand();
    }

    static createStartLongPollCommand() {
        return new StartLongPollCommand();
    }

    static createInterruptLongPollCommand() {
        return new InterruptLongPollCommand();
    }

    static createCreatePresentationModelCommand(presentationModel) {
        const command = new CreatePresentationModelCommand();
        command.init(presentationModel);
        return command;
    }

    static createDeletePresentationModelCommand(pmId) {
        const command = new DeletePresentationModelCommand();
        command.init(pmId);
        return command;
    }

    static createPresentationModelDeletedCommand(pmId) {
        let command = new PresentationModelDeletedCommand();
        command.init(pmId);
        return command;
    }

    static createValueChangedCommand(attributeId, newValue) {
        let command = new ValueChangedCommand();
        command.init(attributeId, newValue);
        return command;
    }

    static createChangeAttributeMetadataCommand(attributeId, metadataName, value) {
        let command = new ChangeAttributeMetadataCommand();
        command.init(attributeId, metadataName, value);
        return command;
    }

    static createAttributeMetadataChangedCommand(attributeId, metadataName, value) {
        let command = new AttributeMetadataChangedCommand();
        command.init(attributeId, metadataName, value);
        return command;
    }
}