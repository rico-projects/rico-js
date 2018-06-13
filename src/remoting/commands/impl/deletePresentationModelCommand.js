import {DELETE_PRESENTATION_MODEL_COMMAND_ID} from '../commandConstants';
import {checkMethod, checkParam} from '../../../utils';

export default class DeletePresentationModelCommand {

    constructor() {
        this.id = DELETE_PRESENTATION_MODEL_COMMAND_ID;
    }

    init(pmId) {
        checkMethod('DeletePresentationModelCommand.init()');
        checkParam(pmId, 'pmId');

        this.pmId = pmId;
    }
}
