import {CHANGE_ATTRIBUTE_METADATA_COMMAND_ID} from '../commandConstants';
import {checkMethod, checkParam} from '../../../utils';

export default class ChangeAttributeMetadataCommand {

    constructor() {
        this.id = CHANGE_ATTRIBUTE_METADATA_COMMAND_ID;
    }

    init(attributeId, metadataName, value) {
        checkMethod('ChangeAttributeMetadataCommand.init()');
        checkParam(attributeId, 'attributeId');
        checkParam(metadataName, 'metadataName');

        this.attributeId = attributeId;
        this.metadataName = metadataName;
        this.value = value;
    }
}