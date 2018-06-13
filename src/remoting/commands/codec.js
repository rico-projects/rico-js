import {exists, checkMethod, checkParam} from '../../utils';
import {JS_STRING_TYPE} from '../constants';
import {
    CREATE_PRESENTATION_MODEL_COMMAND_ID,
    VALUE_CHANGED_COMMAND_ID,
    ATTRIBUTE_METADATA_CHANGED_COMMAND_ID,
    CALL_ACTION_COMMAND_ID,
    CHANGE_ATTRIBUTE_METADATA_COMMAND_ID,
    CREATE_CONTEXT_COMMAND_ID,
    CREATE_CONTROLLER_COMMAND_ID,
    DELETE_PRESENTATION_MODEL_COMMAND_ID,
    DESTROY_CONTEXT_COMMAND_ID,
    DESTROY_CONTROLLER_COMMAND_ID,
    INTERRUPT_LONG_POLL_COMMAND_ID,
    PRESENTATION_MODEL_DELETED_COMMAND_ID,
    START_LONG_POLL_COMMAND_ID
} from './commandConstants';
import {ID, PM_ID, PM_TYPE, PM_ATTRIBUTES, NAME, ATTRIBUTE_ID, VALUE, CONTROLLER_ID, PARAMS} from './commandConstants';
import ValueChangedCommand from './impl/valueChangedCommand';
import AttributeMetadataChangedCommand from './impl/attributeMetadataChangedCommand';
import CallActionCommand from './impl/callActionCommand';
import ChangeAttributeMetadataCommand from './impl/changeAttributeMetadataCommand';
import CreateContextCommand from './impl/createContextCommand';
import CreateControllerCommand from './impl/createControllerCommand';
import CreatePresentationModelCommand from './impl/createPresentationModelCommand';
import DeletePresentationModelCommand from './impl/deletePresentationModelCommand';
import DestroyContextCommand from './impl/destroyContextCommand';
import DestroyControllerCommand from './impl/destroyControllerCommand';
import InterruptLongPollCommand from './impl/interruptLongPollCommand';
import PresentationModelDeletedCommand from './impl/presentationModelDeletedCommand';
import StartLongPollCommand from './impl/startLongPollCommand';
import CodecError from './codecError';


export default class Codec {

    static _encodeAttributeMetadataChangedCommand(command) {
        checkMethod("Codec.encodeAttributeMetadataChangedCommand");
        checkParam(command, "command");
        checkParam(command.attributeId, "command.attributeId");
        checkParam(command.metadataName, "command.metadataName");

        let jsonCommand = {};
        jsonCommand[ID] = ATTRIBUTE_METADATA_CHANGED_COMMAND_ID;
        jsonCommand[ATTRIBUTE_ID] = command.attributeId;
        jsonCommand[NAME] = command.metadataName;
        jsonCommand[VALUE] = command.value;
        return jsonCommand;
    }

    static _decodeAttributeMetadataChangedCommand(jsonCommand) {
        checkMethod("Codec.decodeAttributeMetadataChangedCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");
        checkParam(jsonCommand[NAME], "jsonCommand[NAME]");

        let command = new AttributeMetadataChangedCommand();
        command.attributeId = jsonCommand[ATTRIBUTE_ID];
        command.metadataName = jsonCommand[NAME];
        command.value = jsonCommand[VALUE];
        return command;
    }

    static _encodeCallActionCommand(command) {
        checkMethod("Codec.encodeCallActionCommand");
        checkParam(command, "command");
        checkParam(command.controllerid, "command.controllerid");
        checkParam(command.actionName, "command.actionName");
        checkParam(command.params, "command.params");


        let jsonCommand = {};
        jsonCommand[ID] = CALL_ACTION_COMMAND_ID;
        jsonCommand[CONTROLLER_ID] = command.controllerid;
        jsonCommand[NAME] = command.actionName;
        jsonCommand[PARAMS] = command.params.map((param) => {
            let result = {};
            result[NAME] = param.name;
            if (exists(param.value)) {
                result[VALUE] = param.value;
            }
            return result;
        });
        return jsonCommand;
    }

    static _decodeCallActionCommand(jsonCommand) {
        checkMethod("Codec.decodeCallActionCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");
        checkParam(jsonCommand[NAME], "jsonCommand[NAME]");
        checkParam(jsonCommand[PARAMS], "jsonCommand[PARAMS]");

        let command = new CallActionCommand();
        command.controllerid = jsonCommand[CONTROLLER_ID];
        command.actionName = jsonCommand[NAME];
        //TODO: Für die Params sollten wir eine Klasse bereitstellen
        command.params = jsonCommand[PARAMS].map((param) => {
            return {
                'name': param[NAME],
                'value': exists(param[VALUE]) ? param[VALUE] : null
            };
        });
        return command;
    }

    static _encodeChangeAttributeMetadataCommand(command) {
        checkMethod("Codec.encodeChangeAttributeMetadataCommand");
        checkParam(command, "command");
        checkParam(command.attributeId, "command.attributeId");
        checkParam(command.metadataName, "command.metadataName");

        let jsonCommand = {};
        jsonCommand[ID] = CHANGE_ATTRIBUTE_METADATA_COMMAND_ID;
        jsonCommand[ATTRIBUTE_ID] = command.attributeId;
        jsonCommand[NAME] = command.metadataName;
        jsonCommand[VALUE] = command.value;
        return jsonCommand;
    }

    static _decodeChangeAttributeMetadataCommand(jsonCommand) {
        checkMethod("Codec.decodeChangeAttributeMetadataCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");
        checkParam(jsonCommand[NAME], "jsonCommand[NAME]");

        let command = new ChangeAttributeMetadataCommand();
        command.attributeId = jsonCommand[ATTRIBUTE_ID];
        command.metadataName = jsonCommand[NAME];
        command.value = jsonCommand[VALUE];
        return command;
    }

    static _encodeCreateContextCommand(command) {
        checkMethod("Codec.encodeCreateContextCommand");
        checkParam(command, "command");

        let jsonCommand = {};
        jsonCommand[ID] = CREATE_CONTEXT_COMMAND_ID;
        return jsonCommand;
    }

    static _decodeCreateContextCommand(jsonCommand) {
        checkMethod("Codec.decodeCreateContextCommand");
        checkParam(jsonCommand, "jsonCommand");

        let command = new CreateContextCommand();
        return command;
    }

    static _encodeCreateControllerCommand(command) {
        checkMethod("Codec._encodeCreateControllerCommand");
        checkParam(command, "command");
        checkParam(command.controllerName, "command.controllerName");

        let jsonCommand = {};
        jsonCommand[ID] = CREATE_CONTROLLER_COMMAND_ID;
        jsonCommand[NAME] = command.controllerName;
        jsonCommand[CONTROLLER_ID] = command.parentControllerId;
        return jsonCommand;
    }

    static _decodeCreateControllerCommand(jsonCommand) {
        checkMethod("Codec._decodeCreateControllerCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[NAME], "jsonCommand[NAME]");
        checkParam(jsonCommand[CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");

        let command = new CreateControllerCommand();
        command.controllerName = jsonCommand[NAME];
        command.parentControllerId = jsonCommand[CONTROLLER_ID];
        return command;
    }

    static _encodeCreatePresentationModelCommand(command) {
        checkMethod("Codec.encodeCreatePresentationModelCommand");
        checkParam(command, "command");
        checkParam(command.pmId, "command.pmId");
        checkParam(command.pmType, "command.pmType");

        let jsonCommand = {};
        jsonCommand[ID] = CREATE_PRESENTATION_MODEL_COMMAND_ID;
        jsonCommand[PM_ID] = command.pmId;
        jsonCommand[PM_TYPE] = command.pmType;
        jsonCommand[PM_ATTRIBUTES] = command.attributes.map((attribute) => {
            let result = {};
            result[NAME] = attribute.propertyName;
            result[ATTRIBUTE_ID] = attribute.id;
            if (exists(attribute.value)) {
                result[VALUE] = attribute.value;
            }
            return result;
        });
        return jsonCommand;
    }

    static _decodeCreatePresentationModelCommand(jsonCommand) {
        checkMethod("Codec.decodeCreatePresentationModelCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[PM_ID], "jsonCommand[PM_ID]");
        checkParam(jsonCommand[PM_TYPE], "jsonCommand[PM_TYPE]");

        let command = new CreatePresentationModelCommand();
        command.pmId = jsonCommand[PM_ID];
        command.pmType = jsonCommand[PM_TYPE];

        //TODO: Für die Attribute sollten wir eine Klasse bereitstellen
        command.attributes = jsonCommand[PM_ATTRIBUTES].map((attribute) => {
            return {
                'propertyName': attribute[NAME],
                'id': attribute[ATTRIBUTE_ID],
                'value': exists(attribute[VALUE]) ? attribute[VALUE] : null
            };
        });
        return command;
    }

    static _encodeDeletePresentationModelCommand(command) {
        checkMethod("Codec._encodeDeletePresentationModelCommand");
        checkParam(command, "command");
        checkParam(command.pmId, "command.pmId");

        let jsonCommand = {};
        jsonCommand[ID] = DELETE_PRESENTATION_MODEL_COMMAND_ID;
        jsonCommand[PM_ID] = command.pmId;
        return jsonCommand;
    }

    static _decodeDeletePresentationModelCommand(jsonCommand) {
        checkMethod("Codec._decodeDeletePresentationModelCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[PM_ID], "jsonCommand[PM_ID]");


        let command = new DeletePresentationModelCommand();
        command.pmId = jsonCommand[PM_ID];
        return command;
    }

    static _encodeDestroyContextCommand(command) {
        checkMethod("Codec._encodeDestroyContextCommand");
        checkParam(command, "command");

        let jsonCommand = {};
        jsonCommand[ID] = DESTROY_CONTEXT_COMMAND_ID;
        return jsonCommand;
    }

    static _decodeDestroyContextCommand(jsonCommand) {
        checkMethod("Codec._decodeDestroyContextCommand");
        checkParam(jsonCommand, "jsonCommand");

        let command = new DestroyContextCommand();
        return command;
    }

    static _encodeDestroyControllerCommand(command) {
        checkMethod("Codec._encodeDestroyControllerCommand");
        checkParam(command, "command");
        checkParam(command.controllerId, "command.controllerId");

        let jsonCommand = {};
        jsonCommand[ID] = DESTROY_CONTROLLER_COMMAND_ID;
        jsonCommand[CONTROLLER_ID] = command.controllerId;
        return jsonCommand;
    }

    static _decodeDestroyControllerCommand(jsonCommand) {
        checkMethod("Codec._decodeDestroyControllerCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");

        let command = new DestroyControllerCommand();
        command.controllerId = jsonCommand[CONTROLLER_ID];
        return command;
    }

    static _encodeInterruptLongPollCommand(command) {
        checkMethod("Codec._encodeInterruptLongPollCommand");
        checkParam(command, "command");

        let jsonCommand = {};
        jsonCommand[ID] = INTERRUPT_LONG_POLL_COMMAND_ID;
        return jsonCommand;
    }

    static _decodeInterruptLongPollCommand(jsonCommand) {
        checkMethod("Codec._decodeInterruptLongPollCommand");
        checkParam(jsonCommand, "jsonCommand");

        let command = new InterruptLongPollCommand();
        return command;
    }

    static _encodePresentationModelDeletedCommand(command) {
        checkMethod("Codec._encodePresentationModelDeletedCommand");
        checkParam(command, "command");
        checkParam(command.pmId, "command.pmId");

        let jsonCommand = {};
        jsonCommand[ID] = PRESENTATION_MODEL_DELETED_COMMAND_ID;
        jsonCommand[PM_ID] = command.pmId;
        return jsonCommand;
    }

    static _decodePresentationModelDeletedCommand(jsonCommand) {
        checkMethod("Codec._decodePresentationModelDeletedCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[PM_ID], "jsonCommand[PM_ID]");

        let command = new PresentationModelDeletedCommand();
        command.pmId = jsonCommand[PM_ID];
        return command;
    }

    static _encodeStartLongPollCommand(command) {
        checkMethod("Codec._encodeStartLongPollCommand");
        checkParam(command, "command");

        let jsonCommand = {};
        jsonCommand[ID] = START_LONG_POLL_COMMAND_ID;
        return jsonCommand;
    }

    static _decodeStartLongPollCommand(jsonCommand) {
        checkMethod("Codec._decodeStartLongPollCommand");
        checkParam(jsonCommand, "jsonCommand");

        let command = new StartLongPollCommand();
        return command;
    }

    static _encodeValueChangedCommand(command) {
        checkMethod("Codec.encodeValueChangedCommand");
        checkParam(command, "command");
        checkParam(command.attributeId, "command.attributeId");

        let jsonCommand = {};
        jsonCommand[ID] = VALUE_CHANGED_COMMAND_ID;
        jsonCommand[ATTRIBUTE_ID] = command.attributeId;
        if (exists(command.newValue)) {
            jsonCommand[VALUE] = command.newValue;
        }
        return jsonCommand;
    }

    static _decodeValueChangedCommand(jsonCommand) {
        checkMethod("Codec.decodeValueChangedCommand");
        checkParam(jsonCommand, "jsonCommand");
        checkParam(jsonCommand[ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");

        let command = new ValueChangedCommand();
        command.attributeId = jsonCommand[ATTRIBUTE_ID];
        if (exists(jsonCommand[VALUE])) {
            command.newValue = jsonCommand[VALUE];
        } else {
            command.newValue = null;
        }
        return command;
    }

    static encode(commands) {
        checkMethod("Codec.encode");
        checkParam(commands, "commands");

        let self = this;
        return JSON.stringify(commands.map((command) => {
            if (command.id === ATTRIBUTE_METADATA_CHANGED_COMMAND_ID) {
                return self._encodeAttributeMetadataChangedCommand(command);
            } else if (command.id === CALL_ACTION_COMMAND_ID) {
                return self._encodeCallActionCommand(command);
            } else if (command.id === CHANGE_ATTRIBUTE_METADATA_COMMAND_ID) {
                return self._encodeChangeAttributeMetadataCommand(command);
            } else if (command.id === CREATE_CONTEXT_COMMAND_ID) {
                return self._encodeCreateContextCommand(command);
            } else if (command.id === CREATE_CONTROLLER_COMMAND_ID) {
                return self._encodeCreateControllerCommand(command);
            } else if (command.id === CREATE_PRESENTATION_MODEL_COMMAND_ID) {
                return self._encodeCreatePresentationModelCommand(command);
            } else if (command.id === DELETE_PRESENTATION_MODEL_COMMAND_ID) {
                return self._encodeDeletePresentationModelCommand(command);
            } else if (command.id === DESTROY_CONTEXT_COMMAND_ID) {
                return self._encodeDestroyContextCommand(command);
            } else if (command.id === DESTROY_CONTROLLER_COMMAND_ID) {
                return self._encodeDestroyControllerCommand(command);
            } else if (command.id === INTERRUPT_LONG_POLL_COMMAND_ID) {
                return self._encodeInterruptLongPollCommand(command);
            } else if (command.id === PRESENTATION_MODEL_DELETED_COMMAND_ID) {
                return self._encodePresentationModelDeletedCommand(command);
            } else if (command.id === START_LONG_POLL_COMMAND_ID) {
                return self._encodeStartLongPollCommand(command);
            } else if (command.id === VALUE_CHANGED_COMMAND_ID) {
                return self._encodeValueChangedCommand(command);
            } else {
                throw new CodecError('Command of type ' + command.id + ' can not be handled');
            }
        }));
    }

    static decode(transmitted) {
        checkMethod("Codec.decode");
        checkParam(transmitted, "transmitted");

        if (typeof transmitted === JS_STRING_TYPE) {
            let self = this;
            return JSON.parse(transmitted).map(function (command) {
                if (command.id === ATTRIBUTE_METADATA_CHANGED_COMMAND_ID) {
                    return self._decodeAttributeMetadataChangedCommand(command);
                } else if (command.id === CALL_ACTION_COMMAND_ID) {
                    return self._decodeCallActionCommand(command);
                } else if (command.id === CHANGE_ATTRIBUTE_METADATA_COMMAND_ID) {
                    return self._decodeChangeAttributeMetadataCommand(command);
                } else if (command.id === CREATE_CONTEXT_COMMAND_ID) {
                    return self._decodeCreateContextCommand(command);
                } else if (command.id === CREATE_CONTROLLER_COMMAND_ID) {
                    return self._decodeCreateControllerCommand(command);
                } else if (command.id === CREATE_PRESENTATION_MODEL_COMMAND_ID) {
                    return self._decodeCreatePresentationModelCommand(command);
                } else if (command.id === DELETE_PRESENTATION_MODEL_COMMAND_ID) {
                    return self._decodeDeletePresentationModelCommand(command);
                } else if (command.id === DESTROY_CONTEXT_COMMAND_ID) {
                    return self._decodeDestroyContextCommand(command);
                } else if (command.id === DESTROY_CONTROLLER_COMMAND_ID) {
                    return self._decodeDestroyControllerCommand(command);
                } else if (command.id === INTERRUPT_LONG_POLL_COMMAND_ID) {
                    return self._decodeInterruptLongPollCommand(command);
                } else if (command.id === PRESENTATION_MODEL_DELETED_COMMAND_ID) {
                    return self._decodePresentationModelDeletedCommand(command);
                } else if (command.id === START_LONG_POLL_COMMAND_ID) {
                    return self._decodeStartLongPollCommand(command);
                } else if (command.id === VALUE_CHANGED_COMMAND_ID) {
                    return self._decodeValueChangedCommand(command);
                } else {
                    throw new CodecError('Command of type ' + command.id + ' can not be handled');
                }
            });
        } else {
            throw new CodecError('Can not decode data that is not of type string');
        }
    }
}