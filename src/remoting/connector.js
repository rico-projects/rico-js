import {exists, checkMethod, checkParam} from '../utils';
import CommandFactory from './commands/commandFactory';
import {ADDED_TYPE, REMOVED_TYPE} from './constants';


const DOLPHIN_BEAN = '@@@ R_BEAN @@@';
const ACTION_CALL_BEAN = '@@@ CONTROLLER_ACTION_CALL_BEAN @@@';
const HIGHLANDER_BEAN = '@@@ HIGHLANDER_BEAN @@@';
const DOLPHIN_LIST_SPLICE = '@R:LS@';
const SOURCE_SYSTEM = '@@@ SOURCE_SYSTEM @@@';
const SOURCE_SYSTEM_CLIENT = 'client';
const SOURCE_SYSTEM_SERVER = 'server';

export default class Connector{

    constructor(url, dolphin, classRepository, config) {
        checkMethod('Connector(url, dolphin, classRepository, config)');
        checkParam(url, 'url');
        checkParam(dolphin, 'dolphin');
        checkParam(classRepository, 'classRepository');

        let self = this;
        this.dolphin = dolphin;
        this.config = config;
        this.classRepository = classRepository;
        this.highlanderPMResolver = function() {};
        this.highlanderPMPromise = new Promise(function(resolve) {
            self.highlanderPMResolver = resolve;
        });

        dolphin.getClientModelStore().onModelStoreChange((event) => {
            let model = event.clientPresentationModel;
            let sourceSystem = model.findAttributeByPropertyName(SOURCE_SYSTEM);
            if (exists(sourceSystem) && sourceSystem.value === SOURCE_SYSTEM_SERVER) {
                if (event.eventType === ADDED_TYPE) {
                    self.onModelAdded(model);
                } else if (event.eventType === REMOVED_TYPE) {
                    self.onModelRemoved(model);
                }
            }
        });
    }
    connect() {
        let that = this;
            that.dolphin.startPushListening(CommandFactory.createStartLongPollCommand(), CommandFactory.createInterruptLongPollCommand());
    }

    onModelAdded(model) {
        checkMethod('Connector.onModelAdded(model)');
        checkParam(model, 'model');

        var type = model.presentationModelType;
        switch (type) {
            case ACTION_CALL_BEAN:
                // ignore
                break;
            case DOLPHIN_BEAN:
                this.classRepository.registerClass(model);
                break;
            case HIGHLANDER_BEAN:
                this.highlanderPMResolver(model);
                break;
            case DOLPHIN_LIST_SPLICE:
                this.classRepository.spliceListEntry(model);
                this.dolphin.deletePresentationModel(model);
                break;
            default:
                this.classRepository.load(model);
                break;
        }
    }

    onModelRemoved(model) {
        checkMethod('Connector.onModelRemoved(model)');
        checkParam(model, 'model');
        let type = model.presentationModelType;
        switch (type) {
            case DOLPHIN_BEAN:
                this.classRepository.unregisterClass(model);
                break;
            case DOLPHIN_LIST_SPLICE:
                // do nothing
                break;
            default:
                this.classRepository.unload(model);
                break;
        }
    }

    invoke(command) {
        checkMethod('Connector.invoke(command)');
        checkParam(command, 'command');

        var dolphin = this.dolphin;
        return new Promise((resolve) => {
            dolphin.send(command, {
                onFinished: () => {
                    resolve();
                }
            });
        });
    }

    getHighlanderPM() {
        return this.highlanderPMPromise;
    }
}

export { SOURCE_SYSTEM, SOURCE_SYSTEM_CLIENT, SOURCE_SYSTEM_SERVER, ACTION_CALL_BEAN };
