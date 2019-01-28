import {exists, checkMethod, checkParam} from '../utils';
import { LoggerFactory } from '../logging';

export default class BeanManager {

    constructor(classRepository) {
        checkMethod('BeanManager(classRepository)');
        checkParam(classRepository, 'classRepository');

        this.classRepository = classRepository;

        this.beanAddedHandlers = [];
        this.beanRemovedHandlers = [];
        this.arrayUpdateHandlers = [];
        this.beanUpdateHandlers = [];

        this._handleBeanAdded = this._handleBeanAdded.bind(this);
        this._handleBeanRemoved = this._handleBeanRemoved.bind(this);
        this._handleBeanUpdate = this._handleBeanUpdate.bind(this);
        this._handleArrayUpdate = this._handleArrayUpdate.bind(this);

        this.classRepository.onBeanAdded(this._handleBeanAdded);
        this.classRepository.onBeanRemoved(this._handleBeanRemoved);
        this.classRepository.onBeanUpdate(this._handleBeanUpdate);
        this.classRepository.onArrayUpdate(this._handleArrayUpdate);
    }

    _handleBeanAdded(bean) {
        this.beanAddedHandlers.forEach((handler) => {
            try {
                handler(bean);
            } catch (e) {
                BeanManager.LOGGER.error('An exception occurred while calling a general onBeanAdded-handler', e);
            }
        });
    }

    _handleBeanRemoved(bean) {
        this.beanRemovedHandlers.forEach((handler) => {
            try {
                handler(bean);
            } catch (e) {
                BeanManager.LOGGER.error('An exception occurred while calling a general onBeanAdded-handler', e);
            }
        });
    }

    _handleArrayUpdate(bean, propertyName, index, count, newElements) {
        this.arrayUpdateHandlers.forEach((handlerObject) => {
            console.log("Check 1", this.classRepository.beanToDolphin.get(bean))
            console.log("Check 2", this.classRepository.beanToDolphin.get(handlerObject.rootBean))
            if(this.classRepository.isBeanOrSubBean(bean, handlerObject.rootBean)) {
                try {
                    handlerObject.eventHandler(bean, propertyName, index, count, newElements);
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling a general onArrayUpdate-handler', e);
                }
            }
        });
    }

    _handleBeanUpdate(bean, propertyName, newValue, oldValue) {
        this.beanUpdateHandlers.forEach((handlerObject) => {
            if(this.classRepository.isBeanOrSubBean(bean, handlerObject.rootBean)) {
                try {
                    handlerObject.eventHandler(bean, propertyName, newValue, oldValue);
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling a general onBeanAdded-handler', e);
                }
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
        checkMethod('BeanManager.onAdded(eventHandler)');
        checkParam(eventHandler, 'eventHandler');

        this.beanAddedHandlers.push(eventHandler);
        let self = this;
        return {
            unsubscribe: () => self.beanAddedHandlers.pop(eventHandler)
        };
    }

    onRemoved(eventHandler) {
        checkMethod('BeanManager.onRemoved(eventHandler)');
        checkParam(eventHandler, 'eventHandler');

        this.beanRemovedHandlers.push(eventHandler);
        let self = this;
        return {
            unsubscribe: () => self.beanRemovedHandlers.pop(eventHandler)
        };
    }

    onBeanUpdate(rootBean, eventHandler) {
        checkMethod('BeanManager.onBeanUpdate(eventHandler)');
        checkParam(rootBean, 'rootBean');
        checkParam(eventHandler, 'eventHandler');

        let item = {rootBean:rootBean, eventHandler:eventHandler};
        this.beanUpdateHandlers.push(item);
        let self = this;
        return {
            unsubscribe: () => self.beanUpdateHandlers.pop(item)
        };
    }

    onArrayUpdate(rootBean, eventHandler) {
        checkMethod('BeanManager.onArrayUpdate(eventHandler)');
        checkParam(rootBean, 'rootBean');
        checkParam(eventHandler, 'eventHandler');

        let item = {rootBean:rootBean, eventHandler:eventHandler};
        this.arrayUpdateHandlers.push(item);
        let self = this;
        return {
            unsubscribe: () => self.arrayUpdateHandlers.pop(item)
        };
    }

}

BeanManager.LOGGER = LoggerFactory.getLogger('BeanManager');
