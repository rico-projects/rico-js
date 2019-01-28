import {checkMethod, checkParam} from '../utils';
import { LoggerFactory } from '../logging';

export default class ControllerProxy {

    constructor(controllerId, modelBean, controllerManager){
        checkMethod('ControllerProxy(controllerId, modelBean, controllerManager)');
        checkParam(controllerId, 'controllerId');
        checkParam(modelBean, 'modelBean');
        checkParam(controllerManager, 'controllerManager');

        this.controllerId = controllerId;
        this.modelBean = modelBean;
        this.controllerManager = controllerManager;
        this.destroyed = false;
        this.onDestroyedHandlers = new Set();
    }

    getModel() {
        return this.modelBean;
    }

    getId() {
        return this.controllerId;
    }

    invoke(name, params){
        checkMethod('ControllerProxy.invoke(name, params)');
        checkParam(name, 'name');

        if (this.destroyed) {
            throw new Error('The controller was already destroyed');
        }
        return this.controllerManager.invokeAction(this.controllerId, name, params);
    }

    createController(name) {
        return this.controllerManager._createController(name, this.getId());
    }

    destroy(){
        if (this.destroyed) {
            throw new Error('The controller was already destroyed');
        }
        this.destroyed = true;
        this.onDestroyedHandlers.forEach((handler) => {
            try {
                handler(this);
            } catch(e) {
                ControllerProxy.LOGGER.error('An exception occurred while calling an onDestroyed-handler', e);
            }
        }, this);
        return this.controllerManager.destroyController(this);
    }

    onDestroyed(handler){
        checkMethod('ControllerProxy.onDestroyed(handler)');
        checkParam(handler, 'handler');

        let self = this;
        this.onDestroyedHandlers.add(handler);
        return {
            unsubscribe: () => {
                self.onDestroyedHandlers.delete(handler);
            }
        };
    }
}

ControllerProxy.LOGGER = LoggerFactory.getLogger('ControllerProxy');
