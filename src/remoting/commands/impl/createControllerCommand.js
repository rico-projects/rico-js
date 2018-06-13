import {CREATE_CONTROLLER_COMMAND_ID} from '../commandConstants';
import {checkMethod, checkParam} from '../../../utils';

export default class CreateControllerCommand {

    constructor() {
        this.id = CREATE_CONTROLLER_COMMAND_ID;
    }

    init(controllerName, parentControllerId) {
        checkMethod('CreateControllerCommand.init()');
        checkParam(controllerName, 'controllerName');

        this.controllerName = controllerName;
        this.parentControllerId = parentControllerId;
    }

}