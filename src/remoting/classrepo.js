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
        let legacyModel = dolphin.findPresentationModelById(modelId);
        if (exists(legacyModel)) {
            let classInfo = classRepository.classes.get(legacyModel.presentationModelType);
            let type = classInfo[propertyName];
            if (exists(type)) {

                let legacyAttributes = [
                    dolphin.attribute('@@@ SOURCE_SYSTEM @@@', null, 'client'),
                    dolphin.attribute('source', null, modelId),
                    dolphin.attribute('attribute', null, propertyName),
                    dolphin.attribute('from', null, from),
                    dolphin.attribute('to', null, to),
                    dolphin.attribute('count', null, newElements.length)
                ];
                newElements.forEach(function (element, index) {
                    legacyAttributes.push(dolphin.attribute(index.toString(), null, ClassRepository.toDolphin(classRepository, type, element)));
                });
                dolphin.presentationModel.apply(dolphin, [null, '@DP:LS@'].concat(legacyAttributes));
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
            let legacyModel = this.dolphin.findPresentationModelById(modelId);
            if (exists(legacyModel)) {
                let classInfo = this.classes.get(legacyModel.presentationModelType);
                let type = classInfo[propertyName];
                let legacyAttribute = legacyModel.findAttributeByPropertyName(propertyName);
                if (exists(type) && exists(legacyAttribute)) {
                    let oldValue = legacyAttribute.getValue();
                    legacyAttribute.setValue(ClassRepository.toDolphin(this, type, newValue));
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

    registerClass(legacyModel) {
        checkMethod('ClassRepository.registerClass(legacyModel)');
        checkParam(legacyModel, 'legacyModel');

        if (this.classes.has(legacyModel.id)) {
            return;
        }

        let classInfo = {};
        legacyModel.attributes.filter(function (legacyAttribute) {
            return legacyAttribute.propertyName.search(/^@/) < 0;
        }).forEach(function (legacyAttribute) {
            classInfo[legacyAttribute.propertyName] = legacyAttribute.value;
        });
        this.classes.set(legacyModel.id, classInfo);
    }

    unregisterClass(legacyModel) {
        checkMethod('ClassRepository.unregisterClass(legacyModel)');
        checkParam(legacyModel, 'legacyModel');
        this.classes['delete'](legacyModel.id);
    }

    load(legacyModel) {
        checkMethod('ClassRepository.load(legacyModel)');
        checkParam(legacyModel, 'legacyModel');

        let self = this;
        let classInfo = this.classes.get(legacyModel.presentationModelType);
        let bean = {};
        legacyModel.attributes.filter(function (legacyAttribute) {
            return (legacyAttribute.propertyName.search(/^@/) < 0);
        }).forEach(function (legacyAttribute) {
            let propertyName = legacyAttribute.propertyName;
            bean[propertyName] = null;
            legacyAttribute.onValueChange(function (event) {



                //Wenn neuer Wert BEAN (attribute.type == REMOTING_BEAN    -> classInfo[attribute.propertyName])
                    // Füge neues BEAN in meinen Zentralen Model-Tree hinzu
                    // Notifizieren über Änderung im Baum
                //SONST
                    // Setzte primitiven Datentyp
                    // Notifiziere über Wertänderung


                if (event.oldValue !== event.newValue) {
                    let oldValue = ClassRepository.fromDolphin(self, classInfo[legacyAttribute.propertyName], event.oldValue);
                    let newValue = ClassRepository.fromDolphin(self, classInfo[legacyAttribute.propertyName], event.newValue);
                    self.propertyUpdateHandlers.forEach((handler) => {
                        try {
                            handler(legacyModel.presentationModelType, bean, legacyAttribute.propertyName, newValue, oldValue);
                        } catch (e) {
                            ClassRepository.LOGGER.error('An exception occurred while calling an onBeanUpdate-handler', e);
                        }
                    });
                }
            });
        });
        this.beanFromDolphin.set(legacyModel.id, bean);
        this.beanToDolphin.set(bean, legacyModel.id);
        this.classInfos.set(legacyModel.id, classInfo);
        this.beanAddedHandlers.forEach((handler) => {
            try {
                handler(legacyModel.presentationModelType, bean);
            } catch (e) {
                ClassRepository.LOGGER.error('An exception occurred while calling an onBeanAdded-handler', e);
            }
        });
        return bean;
    }

    unload(legacyModel) {
        checkMethod('ClassRepository.unload(legacyModel)');
        checkParam(legacyModel, 'legacyModel');

        let bean = this.beanFromDolphin.get(legacyModel.id);
        this.beanFromDolphin['delete'](legacyModel.id);
        this.beanToDolphin['delete'](bean);
        this.classInfos['delete'](legacyModel.id);
        if (exists(bean)) {
            this.beanRemovedHandlers.forEach((handler) => {
                try {
                    handler(legacyModel.presentationModelType, bean);
                } catch (e) {
                    ClassRepository.LOGGER.error('An exception occurred while calling an onBeanRemoved-handler', e);
                }
            });
        }
        return bean;
    }

    spliceListEntry(legacyModel) {
        checkMethod('ClassRepository.spliceListEntry(legacyModel)');
        checkParam(legacyModel, 'legacyModel');

        let source = legacyModel.findAttributeByPropertyName('source');
        let attribute = legacyModel.findAttributeByPropertyName('attribute');
        let from = legacyModel.findAttributeByPropertyName('from');
        let to = legacyModel.findAttributeByPropertyName('to');
        let count = legacyModel.findAttributeByPropertyName('count');

        if (exists(source) && exists(attribute) && exists(from) && exists(to) && exists(count)) {
            let classInfo = this.classInfos.get(source.value);
            let bean = this.beanFromDolphin.get(source.value);
            if (exists(bean) && exists(classInfo)) {
                let type = legacyModel.presentationModelType;
                //var entry = fromDolphin(this, classInfo[attribute.value], element.value);
                this.validateList(this, type, bean, attribute.value);
                let newElements = [],
                    element = null;
                for (let i = 0; i < count.value; i++) {
                    element = legacyModel.findAttributeByPropertyName(i.toString());
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
