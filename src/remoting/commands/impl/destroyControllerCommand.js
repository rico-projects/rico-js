import {DESTROY_CONTROLLER_COMMAND_ID} from '../commandConstants';
import {checkMethod, checkParam} from '../../../utils';

export default class DestroyControllerCommand {

    constructor() {
        this.id = DESTROY_CONTROLLER_COMMAND_ID;
    }

    init(controllerId) {
        checkMethod('DestroyControllerCommand.init()');
        checkParam(controllerId, 'controllerId');

        this.controllerId = controllerId;
    }

}