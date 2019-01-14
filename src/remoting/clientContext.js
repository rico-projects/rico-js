import Emitter from 'emitter-component';
import CommandFactory from './commands/commandFactory';
import {exists, checkMethod, checkParam} from '../utils';

export default class ClientContext{

    constructor(dolphin, beanManager, controllerManager, connector){
        checkMethod('ClientContext(dolphin, beanManager, controllerManager, connector)');
        checkParam(dolphin, 'dolphin');
        checkParam(beanManager, 'beanManager');
        checkParam(controllerManager, 'controllerManager');
        checkParam(connector, 'connector');

        this.dolphin = dolphin;
        this.beanManager = beanManager;
        this._controllerManager = controllerManager;
        this._connector = connector;
        this.connectionPromise = null;
        this.isConnected = false;
    }

    connect(){
        let self = this;
        this.connectionPromise = new Promise((resolve, reject) => {
            self._connector.connect();
            self._connector.invoke(CommandFactory.createCreateContextCommand()).then(() => {
                self.isConnected = true;
                resolve();
            }).catch(reject);
        });
        return this.connectionPromise;
    }

    onConnect(){
        if(exists(this.connectionPromise)){
            if(!this.isConnected){
                return this.connectionPromise;
            }else{
                return new Promise((resolve) => {
                    resolve();
                });
            }
        }else{
            return this.connect();
        }
    }

    createController(name){
        checkMethod('ClientContext.createController(name)');
        checkParam(name, 'name');

        return this._controllerManager.createController(name);
    }

    disconnect(){
        let self = this;
        this.dolphin.stopPushListening();
        return new Promise((resolve) => {
            self._controllerManager.destroy().then(() => {
                self._connector.invoke(CommandFactory.createDestroyContextCommand());
                self.dolphin = null;
                self.beanManager = null;
                self._controllerManager = null;
                self._connector = null;
                resolve();
            });
        });
    }
}

Emitter(ClientContext.prototype);