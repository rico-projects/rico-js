import {CALL_ACTION_COMMAND_ID} from '../commandConstants';
import {checkMethod, checkParam} from '../../../utils';

export default class CallActionCommand {
    
    constructor() {
        this.id = CALL_ACTION_COMMAND_ID;
    }

    init(controllerid, actionName, params) {
        checkMethod('CreateControllerCommand.init()');
        checkParam(controllerid, 'controllerid');
        checkParam(actionName, 'actionName');

        this.controllerid = controllerid;
        this.actionName = actionName;
        this.params = params;
    }

}