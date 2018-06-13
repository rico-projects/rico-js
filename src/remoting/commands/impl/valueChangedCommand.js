import {VALUE_CHANGED_COMMAND_ID} from '../commandConstants';
import {checkMethod, checkParam} from '../../../utils';

export default class ValueChangedCommand {

    constructor() {
        this.id = VALUE_CHANGED_COMMAND_ID;
    }

    init(attributeId, newValue) {
        checkMethod('ValueChangedCommand.init()');
        checkParam(attributeId, 'attributeId');

        this.attributeId = attributeId;
        this.newValue = newValue;
    }
}