import {CREATE_PRESENTATION_MODEL_COMMAND_ID} from '../commandConstants';
import {checkMethod, checkParam} from '../../../utils';

export default class CreatePresentationModelCommand {

    constructor() {
        this.id = CREATE_PRESENTATION_MODEL_COMMAND_ID;
    }

    init(presentationModel) {
        checkMethod('CreatePresentationModelCommand.init()');
        checkParam(presentationModel, 'presentationModel');

        this.attributes = [];
        this.clientSideOnly = false;
        this.pmId = presentationModel.id;
        this.pmType = presentationModel.presentationModelType;
        var command = this;
        presentationModel.getAttributes().forEach(function (attr) {
            command.attributes.push({
                propertyName: attr.propertyName,
                id: attr.id,
                value: attr.getValue()
            });
        });
    }
}