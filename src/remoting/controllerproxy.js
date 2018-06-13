import {checkMethod, checkParam} from '../utils';
import { LoggerFactory } from '../logging';

export default class ControllerProxy {

    constructor(controllerId, model, manager){
        checkMethod('ControllerProxy(controllerId, model, manager)');
        checkParam(controllerId, 'controllerId');
        checkParam(model, 'model');
        checkParam(manager, 'manager');

        this.controllerId = controllerId;
        this.model = model;
        this.manager = manager;
        this.destroyed = false;
        this.onDestroyedHandlers = new Set();
    }

    getModel() {
        return this.model;
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
        return this.manager.invokeAction(this.controllerId, name, params);
    }

    createController(name) {
        return this.manager._createController(name, this.getId());
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
        return this.manager.destroyController(this);
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
