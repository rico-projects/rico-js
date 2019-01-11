import {exists, checkMethod, checkParam} from '../utils';

import ControllerProxy from './controllerProxy.js';

import CommandFactory from './commands/commandFactory.js';


import { SOURCE_SYSTEM } from './connector.js';
import { SOURCE_SYSTEM_CLIENT } from './connector.js';
import { ACTION_CALL_BEAN } from './connector.js';

const CONTROLLER_ID = 'controllerId';
const MODEL = 'model';
const ERROR_CODE = 'errorCode';

export default class ControllerManager {

    constructor(dolphin, classRepository, connector) {
        checkMethod('ControllerManager(dolphin, classRepository, connector)');
        checkParam(dolphin, 'dolphin');
        checkParam(classRepository, 'classRepository');
        checkParam(connector, 'connector');

        this.dolphin = dolphin;
        this.classRepository = classRepository;
        this.connector = connector;
        this.controllers = new Set();
    }

    createController(name) {
        return this._createController(name, null);
    }

    _createController(name, parentControllerId) {
        checkMethod('ControllerManager.createController(name)');
        checkParam(name, 'name');

        let self = this;

        return new Promise((resolve, reject) => {
            self.connector.getHighlanderPM().then((highlanderPM) => {
                self.connector.invoke(CommandFactory.createCreateControllerCommand(name, parentControllerId)).then(() => {
                    let controllerId;

                    self.getValueWithRetry(
                            () => {
                                return highlanderPM.findAttributeByPropertyName(CONTROLLER_ID).getValue();
                            }, 'Could not get an controllerID from highlanderPM.')
                        .then((ctrlId) => {
                            controllerId = ctrlId;

                            return self.getValueWithRetry(
                                () => {
                                    return highlanderPM.findAttributeByPropertyName(MODEL).getValue();;
                                }, 'Could not get an modelID from highlanderPM.');
                        })
                        .then((modelId) => {
                            return self.getValueWithRetry(
                                () => {
                                    return self.classRepository.mapDolphinToBean(modelId);
                                }, 'Could not get an model from classRepository for ID: ' + modelId)
                        })
                        .then((model) => {
                            try {
                                let controller = new ControllerProxy(controllerId, model, self);
                                self.controllers.add(controller);
                                resolve(controller);
                            } catch (e) {
                                reject('Error creating controller: ' + e);
                            }
                        }).catch((error) => {
                            reject('Error creating controller: ' + error);
                        });
                }).catch((error) => {
                    reject('Error creating controller: ' + error);
                });
            });
        });
    }


    getValueWithRetry(getValueCall, errorMessage) {
        let self = this;

        return new Promise((resolve, reject) => {

            let value = getValueCall();
            let i = 0;

            if (!(typeof value !== 'undefined' && value !== null)) {
                // value not found, yet. As we know, it will be there at some point, we retry up to 1000 times.
                i++;
                setTimeout(() => {
                    if (i < 1000) {
                        self.getValueWithRetry(getValueCall).then((value) => resolve(value));
                    } else {
                        reject(errorMessage + " after " + i + " retries.");
                    }
                }, 5);
            } else {
                resolve(value);
            }
        });
    }

    invokeAction(controllerId, actionName, params) {
        checkMethod('ControllerManager.invokeAction(controllerId, actionName, params)');
        checkParam(controllerId, 'controllerId');
        checkParam(actionName, 'actionName');

        let self = this;
        return new Promise((resolve, reject) => {

            let attributes = [
                self.dolphin.attribute(SOURCE_SYSTEM, null, SOURCE_SYSTEM_CLIENT),
                self.dolphin.attribute(ERROR_CODE)
            ];

            let pm = self.dolphin.presentationModel.apply(self.dolphin, [null, ACTION_CALL_BEAN].concat(attributes));

            let actionParams = [];
            if (exists(params)) {
                for (var param in params) {
                    if (params.hasOwnProperty(param)) {
                        let value = self.classRepository.mapParamToDolphin(params[param]);
                        actionParams.push({
                            name: param,
                            value: value
                        });
                    }
                }
            }

            self.connector.invoke(CommandFactory.createCallActionCommand(controllerId, actionName, actionParams)).then(() => {
                let isError = pm.findAttributeByPropertyName(ERROR_CODE).getValue();
                if (isError) {
                    reject(new Error("Server side ControllerAction " + actionName + " caused an error. Please see server log for details."));
                } else {
                    resolve();
                }
                self.dolphin.deletePresentationModel(pm);
            }).catch(reject);
        });
    }

    destroyController(controller) {
        checkMethod('ControllerManager.destroyController(controller)');
        checkParam(controller, 'controller');

        let self = this;
        return new Promise((resolve, reject) => {
            self.connector.getHighlanderPM().then((highlanderPM) => {
                self.controllers.delete(controller);
                highlanderPM.findAttributeByPropertyName(CONTROLLER_ID).setValue(controller.controllerId);
                self.connector.invoke(CommandFactory.createDestroyControllerCommand(controller.getId())).then(resolve).catch(reject);
            });
        });
    }

    destroy() {
        let controllersCopy = this.controllers;
        let promises = [];
        this.controllers = new Set();
        controllersCopy.forEach((controller) => {
            try {
                promises.push(controller.destroy());
            } catch (e) {
                // ignore
            }
        });
        return Promise.all(promises);
    }
}
