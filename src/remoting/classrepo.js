import * as consts from './constants';
import {exists, checkMethod, checkParam} from '../utils';
import { LoggerFactory } from '../logging';

class ClassRepository {

    constructor(dolphin) {
        checkMethod('ClassRepository(dolphin)');
        checkParam(dolphin, 'dolphin');

        this.dolphin = dolphin;
        this.classes = new Map();
        this.beanFromDolphin = new Map();
        this.beanToDolphin = new Map();
        this.classInfos = new Map();
        this.beanAddedHandlers = [];
        this.beanRemovedHandlers = [];
        this.propertyUpdateHandlers = [];
        this.arrayUpdateHandlers = [];
        this.blocked = null;
    }

    sendListSplice(classRepository, modelId, propertyName, from, to, newElements) {
        let dolphin = classRepository.dolphin;
        let model = dolphin.findPresentationModelById(modelId);
        if (exists(model)) {
            let classInfo = classRepository.classes.get(model.presentationModelType);
            let type = classInfo[propertyName];
            if (exists(type)) {

                let attributes = [
                    dolphin.attribute('@@@ SOURCE_SYSTEM @@@', null, 'client'),
                    dolphin.attribute('source', null, modelId),
                    dolphin.attribute('attribute', null, propertyName),
                    dolphin.attribute('from', null, from),
                    dolphin.attribute('to', null, to),
                    dolphin.attribute('count', null, newElements.length)
                ];
                newElements.forEach(function (element, index) {
                    attributes.push(dolphin.attribute(index.toString(), null, ClassRepository.toDolphin(classRepository, type, element)));
                });
                dolphin.presentationModel.apply(dolphin, [null, '@DP:LS@'].concat(attributes));
            }
        }
    }

    validateList(classRepository, type, bean, propertyName) {
        let list = bean[propertyName];
        if (!exists(list)) {
            classRepository.propertyUpdateHandlers.forEach(function (handler) {
                try {
                    handler(type, bean, propertyName, [], undefined);
                } catch (e) {
                    ClassRepository.LOGGER.error('An exception occurred while calling an onBeanUpdate-handler', e);
                }
            });
        }
    }

    block(bean, propertyName) {
        if (exists(this.blocked)) {
            throw new Error('Trying to create a block while another block exists');
        }
        this.blocked = {
            bean: bean,
            propertyName: propertyName
        };
    }

    isBlocked(bean, propertyName) {
        return exists(this.blocked) && this.blocked.bean === bean && this.blocked.propertyName === propertyName;
    }

    unblock() {
        this.blocked = null;
    }

    notifyBeanChange(bean, propertyName, newValue) {
        checkMethod('ClassRepository.notifyBeanChange(bean, propertyName, newValue)');
        checkParam(bean, 'bean');
        checkParam(propertyName, 'propertyName');

        let modelId = this.beanToDolphin.get(bean);
        if (exists(modelId)) {
            let model = this.dolphin.findPresentationModelById(modelId);
            if (exists(model)) {
                let classInfo = this.classes.get(model.presentationModelType);
                let type = classInfo[propertyName];
                let attribute = model.findAttributeByPropertyName(propertyName);
                if (exists(type) && exists(attribute)) {
                    let oldValue = attribute.getValue();
                    attribute.setValue(ClassRepository.toDolphin(this, type, newValue));
                    return ClassRepository.fromDolphin(this, type, oldValue);
                }
            }
        }
    }

    notifyArrayChange(bean, propertyName, index, count, removedElements) {
        checkMethod('ClassRepository.notifyArrayChange(bean, propertyName, index, count, removedElements)');
        checkParam(bean, 'bean');
        checkParam(propertyName, 'propertyName');
        checkParam(index, 'index');
        checkParam(count, 'count');
        checkParam(removedElements, 'removedElements');

        if (this.isBlocked(bean, propertyName)) {
            return;
        }
        let modelId = this.beanToDolphin.get(bean);
        let array = bean[propertyName];
        if (exists(modelId) && exists(array)) {
            let removedElementsCount = Array.isArray(removedElements) ? removedElements.length : 0;
            this.sendListSplice(this, modelId, propertyName, index, index + removedElementsCount, array.slice(index, index + count));
        }
    }

    onBeanAdded(handler) {
        checkMethod('ClassRepository.onBeanAdded(handler)');
        checkParam(handler, 'handler');
        this.beanAddedHandlers.push(handler);
    }

    onBeanRemoved(handler) {
        checkMethod('ClassRepository.onBeanRemoved(handler)');
        checkParam(handler, 'handler');
        this.beanRemovedHandlers.push(handler);
    }

    onBeanUpdate(handler) {
        checkMethod('ClassRepository.onBeanUpdate(handler)');
        checkParam(handler, 'handler');
        this.propertyUpdateHandlers.push(handler);
    }

    onArrayUpdate(handler) {
        checkMethod('ClassRepository.onArrayUpdate(handler)');
        checkParam(handler, 'handler');
        this.arrayUpdateHandlers.push(handler);
    }

    registerClass(model) {
        checkMethod('ClassRepository.registerClass(model)');
        checkParam(model, 'model');

        if (this.classes.has(model.id)) {
            return;
        }

        let classInfo = {};
        model.attributes.filter(function (attribute) {
            return attribute.propertyName.search(/^@/) < 0;
        }).forEach(function (attribute) {
            classInfo[attribute.propertyName] = attribute.value;
        });
        this.classes.set(model.id, classInfo);
    }

    unregisterClass(model) {
        checkMethod('ClassRepository.unregisterClass(model)');
        checkParam(model, 'model');
        this.classes['delete'](model.id);
    }

    load(model) {
        checkMethod('ClassRepository.load(model)');
        checkParam(model, 'model');

        let self = this;
        let classInfo = this.classes.get(model.presentationModelType);
        let bean = {};
        model.attributes.filter(function (attribute) {
            return (attribute.propertyName.search(/^@/) < 0);
        }).forEach(function (attribute) {
            bean[attribute.propertyName] = null;
            attribute.onValueChange(function (event) {



                //Wenn neuer Wert BEAN (attribute.type == REMOTING_BEAN    -> classInfo[attribute.propertyName])
                    // Füge neues BEAN in meinen Zentralen Model-Tree hinzu
                    // Notifizieren über Änderung im Baum
                //SONST
                    // Setzte primitiven Datentyp
                    // Notifiziere über Wertänderung


                if (event.oldValue !== event.newValue) {
                    let oldValue = ClassRepository.fromDolphin(self, classInfo[attribute.propertyName], event.oldValue);
                    let newValue = ClassRepository.fromDolphin(self, classInfo[attribute.propertyName], event.newValue);
                    self.propertyUpdateHandlers.forEach((handler) => {
                        try {
                            handler(model.presentationModelType, bean, attribute.propertyName, newValue, oldValue);
                        } catch (e) {
                            ClassRepository.LOGGER.error('An exception occurred while calling an onBeanUpdate-handler', e);
                        }
                    });
                }
            });
        });
        this.beanFromDolphin.set(model.id, bean);
        this.beanToDolphin.set(bean, model.id);
        this.classInfos.set(model.id, classInfo);
        this.beanAddedHandlers.forEach((handler) => {
            try {
                handler(model.presentationModelType, bean);
            } catch (e) {
                ClassRepository.LOGGER.error('An exception occurred while calling an onBeanAdded-handler', e);
            }
        });
        return bean;
    }

    unload(model) {
        checkMethod('ClassRepository.unload(model)');
        checkParam(model, 'model');

        let bean = this.beanFromDolphin.get(model.id);
        this.beanFromDolphin['delete'](model.id);
        this.beanToDolphin['delete'](bean);
        this.classInfos['delete'](model.id);
        if (exists(bean)) {
            this.beanRemovedHandlers.forEach((handler) => {
                try {
                    handler(model.presentationModelType, bean);
                } catch (e) {
                    ClassRepository.LOGGER.error('An exception occurred while calling an onBeanRemoved-handler', e);
                }
            });
        }
        return bean;
    }

    spliceListEntry(model) {
        checkMethod('ClassRepository.spliceListEntry(model)');
        checkParam(model, 'model');

        let source = model.findAttributeByPropertyName('source');
        let attribute = model.findAttributeByPropertyName('attribute');
        let from = model.findAttributeByPropertyName('from');
        let to = model.findAttributeByPropertyName('to');
        let count = model.findAttributeByPropertyName('count');

        if (exists(source) && exists(attribute) && exists(from) && exists(to) && exists(count)) {
            let classInfo = this.classInfos.get(source.value);
            let bean = this.beanFromDolphin.get(source.value);
            if (exists(bean) && exists(classInfo)) {
                let type = model.presentationModelType;
                //var entry = fromDolphin(this, classInfo[attribute.value], element.value);
                this.validateList(this, type, bean, attribute.value);
                let newElements = [],
                    element = null;
                for (let i = 0; i < count.value; i++) {
                    element = model.findAttributeByPropertyName(i.toString());
                    if (!exists(element)) {
                        throw new Error("Invalid list modification update received");
                    }
                    newElements.push(ClassRepository.fromDolphin(this, classInfo[attribute.value], element.value));
                }
                try {
                    this.block(bean, attribute.value);
                    this.arrayUpdateHandlers.forEach((handler) => {
                        try {
                            handler(type, bean, attribute.value, from.value, to.value - from.value, newElements);
                        } catch (e) {
                            ClassRepository.LOGGER.error('An exception occurred while calling an onArrayUpdate-handler', e);
                        }
                    });
                } finally {
                    this.unblock();
                }
            } else {
                throw new Error("Invalid list modification update received. Source bean unknown.");
            }
        } else {
            throw new Error("Invalid list modification update received");
        }
    }

    mapParamToDolphin(param) {
        if (!exists(param)) {
            return param;
        }
        let type = typeof param;
        if (type === 'object') {
            if (param instanceof Date) {
                return param.toISOString();
            } else {
                let value = this.beanToDolphin.get(param);
                if (exists(value)) {
                    return value;
                }
                throw new TypeError("Only managed remoting beans can be used");
            }
        }
        if (type === 'string' || type === 'number' || type === 'boolean') {
            return param;
        }
        throw new TypeError("Only managed remoting beans and primitive types can be used");
    }

    mapDolphinToBean(value) {
        return ClassRepository.fromDolphin(this, consts.REMOTING_BEAN, value);
    }
}

ClassRepository.fixType = function(type, value) {
    switch (type) {
        case consts.BYTE:
        case consts.SHORT:
        case consts.INT:
        case consts.LONG:
            return parseInt(value);
        case consts.FLOAT:
        case consts.DOUBLE:
            return parseFloat(value);
        case consts.BOOLEAN:
            return 'true' === String(value).toLowerCase();
        case consts.STRING:
        case consts.ENUM:
            return String(value);
        default:
            return value;
    }
};

ClassRepository.fromDolphin = function(classRepository, type, value) {
    if (!exists(value)) {
        return null;
    }
    switch (type) {
        case consts.REMOTING_BEAN:
            return classRepository.beanFromDolphin.get(String(value));
        case consts.DATE:
            return new Date(String(value));
        case consts.CALENDAR:
            return new Date(String(value));
        case consts.LOCAL_DATE_FIELD_TYPE:
            return new Date(String(value));
        case consts.LOCAL_DATE_TIME_FIELD_TYPE:
            return new Date(String(value));
        case consts.ZONED_DATE_TIME_FIELD_TYPE:
            return new Date(String(value));
        default:
            return ClassRepository.fixType(type, value);
    }
};

ClassRepository.toDolphin = function(classRepository, type, value) {
    if (!exists(value)) {
        return null;
    }
    switch (type) {
        case consts.REMOTING_BEAN:
            return classRepository.beanToDolphin.get(value);
        case consts.DATE:
            return value instanceof Date ? value.toISOString() : value;
        case consts.CALENDAR:
            return value instanceof Date ? value.toISOString() : value;
        case consts.LOCAL_DATE_FIELD_TYPE:
            return value instanceof Date ? value.toISOString() : value;
        case consts.LOCAL_DATE_TIME_FIELD_TYPE:
            return value instanceof Date ? value.toISOString() : value;
        case consts.ZONED_DATE_TIME_FIELD_TYPE:
            return value instanceof Date ? value.toISOString() : value;
        default:
            return ClassRepository.fixType(type, value);
    }
};

ClassRepository.LOGGER = LoggerFactory.getLogger('ClassRepository');

export default ClassRepository;
