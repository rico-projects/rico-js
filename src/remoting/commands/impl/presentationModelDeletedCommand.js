import {PRESENTATION_MODEL_DELETED_COMMAND_ID} from '../commandConstants';
import {checkMethod, checkParam} from '../../../utils';

export default class PresentationModelDeletedCommand {

    constructor() {
        this.id = PRESENTATION_MODEL_DELETED_COMMAND_ID;
    }

    init(pmId) {
        checkMethod('PresentationModelDeletedCommand.init()');
        checkParam(pmId, 'pmId');

        this.pmId = pmId;
    }
}