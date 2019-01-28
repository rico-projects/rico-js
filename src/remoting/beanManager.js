import {exists, checkMethod, checkParam} from '../utils';
import { LoggerFactory } from '../logging';

export default class BeanManager {

    constructor(classRepository) {
        checkMethod('BeanManager(classRepository)');
        checkParam(classRepository, 'classRepository');

        this.classRepository = classRepository;
        this.addedHandlers = new Map();
        this.removedHandlers = new Map();
        this.updatedHandlers = new Map();
        this.arrayUpdatedHandlers = new Map();
        this.allAddedHandlers = [];
        this.allRemovedHandlers = [];
        this.allUpdatedHandlers = [];
        this.allArrayUpdatedHandlers = [];

        this._handleBeanAdded = this._handleBeanAdded.bind(this);
        this._handleBeanRemoved = this._handleBeanRemoved.bind(this);
        this._handleBeanUpdate = this._handleBeanUpdate.bind(this);
        this._handleArrayUpdate = this._handleArrayUpdate.bind(this);

        this.classRepository.onBeanAdded(this._handleBeanAdded);
        this.classRepository.onBeanRemoved(this._handleBeanRemoved);
        this.classRepository.onBeanUpdate(this._handleBeanUpdate);
        this.classRepository.onArrayUpdate(this._handleArrayUpdate);
    }

    _handleBeanAdded(type, bean) {
        const handlerList = this.addedHandlers.get(type);
        if (exists(handlerList)) {
            handlerList.forEach((handler) => {
                try {
                    handler(bean);
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling an onBeanAdded-handler for type', type, e);
                }
            });
        }
        this.allAddedHandlers.forEach((handler) => {
            try {
                handler(bean);
            } catch (e) {
                BeanManager.LOGGER.error('An exception occurred while calling a general onBeanAdded-handler', e);
            }
        });
    }

    _handleBeanRemoved(type, bean) {
        const handlerList = this.removedHandlers.get(type);
        if (exists(handlerList)) {
            handlerList.forEach((handler) => {
                try {
                    handler(bean);
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling an onBeanRemoved-handler for type', type, e);
                }
            });
        }
        this.allRemovedHandlers.forEach((handler) => {
            try {
                handler(bean);
            } catch (e) {
                BeanManager.LOGGER.error('An exception occurred while calling a general onBeanRemoved-handler', e);
            }
        });
    }

    _handleArrayUpdate(type, bean, propertyName, index, count, newElements) {
        const handlerList = this.arrayUpdatedHandlers.get(type);
        if (exists(handlerList)) {
            handlerList.forEach((handlerObject) => {
                try {
                    if(this.classRepository.isBeanOrSubBean(bean, handlerObject.rootBean)) {
                        handlerObject.handler(bean, propertyName, index, count, newElements);
                    }
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling an onArrayUpdate-handler for type', type, e);
                }
            });
        }
        this.allArrayUpdatedHandlers.forEach((handlerObject) => {
            try {
                if(this.classRepository.isBeanOrSubBean(bean, handlerObject.rootBean)) {
                    handlerObject.handler(bean, propertyName, index, count, newElements);
                }
            } catch (e) {
                BeanManager.LOGGER.error('An exception occurred while calling a general onArrayUpdate-handler', e);
            }
        });
    }

    _handleBeanUpdate(type, bean, propertyName, newValue, oldValue) {
        const handlerList = this.updatedHandlers.get(type);
        if (exists(handlerList)) {
            handlerList.forEach((handlerObject) => {
                try {
                    if(this.classRepository.isBeanOrSubBean(bean, handlerObject.rootBean)) {
                        handlerObject.handler(bean, propertyName, newValue, oldValue);
                    }
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling an onBeanUpdate-handler for type', type, e);
                }
            });
        }
        this.allUpdatedHandlers.forEach((handlerObject) => {
            try {
                if(this.classRepository.isBeanOrSubBean(bean, handlerObject.rootBean)) {
                    handlerObject.handler(bean, propertyName, newValue, oldValue);
                }
            } catch (e) {
                BeanManager.LOGGER.error('An exception occurred while calling a general onBeanUpdate-handler', e);
            }
        });
    }


    notifyBeanChange(bean, propertyName, newValue) {
        checkMethod('BeanManager.notifyBeanChange(bean, propertyName, newValue)');
        checkParam(bean, 'bean');
        checkParam(propertyName, 'propertyName');

        return this.classRepository.notifyBeanChange(bean, propertyName, newValue);
    }


    notifyArrayChange(bean, propertyName, index, count, removedElements) {
        checkMethod('BeanManager.notifyArrayChange(bean, propertyName, index, count, removedElements)');
        checkParam(bean, 'bean');
        checkParam(propertyName, 'propertyName');
        checkParam(index, 'index');
        checkParam(count, 'count');
        checkParam(removedElements, 'removedElements');

        this.classRepository.notifyArrayChange(bean, propertyName, index, count, removedElements);
    }


    isManaged(bean) {
        checkMethod('BeanManager.isManaged(bean)');
        checkParam(bean, 'bean');

        // TODO: Implement dolphin.isManaged() [DP-7]
        throw new Error("Not implemented yet");
    }


    create(type) {
        checkMethod('BeanManager.create(type)');
        checkParam(type, 'type');

        // TODO: Implement dolphin.create() [DP-7]
        throw new Error("Not implemented yet");
    }


    add(type, bean) {
        checkMethod('BeanManager.add(type, bean)');
        checkParam(type, 'type');
        checkParam(bean, 'bean');

        // TODO: Implement dolphin.add() [DP-7]
        throw new Error("Not implemented yet");
    }


    addAll(type, collection) {
        checkMethod('BeanManager.addAll(type, collection)');
        checkParam(type, 'type');
        checkParam(collection, 'collection');

        // TODO: Implement dolphin.addAll() [DP-7]
        throw new Error("Not implemented yet");
    }


    remove(bean) {
        checkMethod('BeanManager.remove(bean)');
        checkParam(bean, 'bean');

        // TODO: Implement dolphin.remove() [DP-7]
        throw new Error("Not implemented yet");
    }


    removeAll(collection) {
        checkMethod('BeanManager.removeAll(collection)');
        checkParam(collection, 'collection');

        // TODO: Implement dolphin.removeAll() [DP-7]
        throw new Error("Not implemented yet");
    }


    removeIf(predicate) {
        checkMethod('BeanManager.removeIf(predicate)');
        checkParam(predicate, 'predicate');

        // TODO: Implement dolphin.removeIf() [DP-7]
        throw new Error("Not implemented yet");
    }


    onAdded(eventHandler) {
        let self = this;
        checkMethod('BeanManager.onAdded(eventHandler)');
        checkParam(eventHandler, 'eventHandler');

        this.allAddedHandlers = this.allAddedHandlers.concat(eventHandler);
        return {
            unsubscribe: () => {
                self.allAddedHandlers = self.allAddedHandlers.filter((value) => {
                    return value !== eventHandler;
                });
            }
        };
    }


    onRemoved(eventHandler) {
        let self = this;
        checkMethod('BeanManager.onRemoved(eventHandler)');
        checkParam(eventHandler, 'eventHandler');

        this.allRemovedHandlers = this.allRemovedHandlers.concat(eventHandler);
        return {
            unsubscribe: () => {
                self.allRemovedHandlers = self.allRemovedHandlers.filter((value) => {
                    return value !== eventHandler;
                });
            }
        };
    }


    onBeanUpdate(eventHandler, model) {
        checkMethod('BeanManager.onBeanUpdate(eventHandler)');
        checkParam(eventHandler, 'eventHandler');
        checkParam(model, 'model');

        let self = this;

        this.allUpdatedHandlers = this.allUpdatedHandlers.concat({handler: eventHandler, rootBean: model});
        return {
            unsubscribe: () => {
                self.allUpdatedHandlers = self.allUpdatedHandlers.filter((handlerObject) => {
                    return handlerObject.handler !== eventHandler;
                });
            }
        };
    }

    onArrayUpdate(eventHandler, model) {
        checkMethod('BeanManager.onArrayUpdate(eventHandler)');
        checkParam(eventHandler, 'eventHandler');
        checkParam(model, 'model');

        let self = this;

        this.allArrayUpdatedHandlers = this.allArrayUpdatedHandlers.concat({handler: eventHandler, rootBean: model});
        return {
            unsubscribe: () => {
                self.allArrayUpdatedHandlers = self.allArrayUpdatedHandlers.filter((handlerObject) => {
                    return handlerObject.handler !== eventHandler;
                });
            }
        };
    }
}

BeanManager.LOGGER = LoggerFactory.getLogger('BeanManager');
