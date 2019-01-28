/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test'
sinon.test = sinonTest(sinon);

import * as consts from '../../../src/remoting/constants';

import ClassRepository from '../../../src/remoting/classRepository.js';

function check( done, func ) {
    try {
        func();
        done();
    } catch(e) {
        done(e);
    }
}

describe('ClassRepository primitive properties', function() {

    let dolphin = {
        findPresentationModelById: function() {}
    };
    let classRepo = null;
    let classModel = null;

    beforeEach(function() {
        classRepo = new ClassRepository(dolphin);
        classModel = {
            id: 'ComplexClass',
            attributes: [
                { propertyName: 'booleanProperty', value: consts.BOOLEAN },
                { propertyName: 'floatProperty', value: consts.DOUBLE },
                { propertyName: 'integerProperty', value: consts.INT },
                { propertyName: 'stringProperty', value: consts.STRING },
                { propertyName: 'dateProperty', value: consts.DATE },
                { propertyName: 'enumProperty', value: consts.ENUM }
            ]
        };
        classRepo.registerClass(classModel);
    });

    it('should initialize', sinon.test(function() {
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                { propertyName: 'booleanProperty', onValueChange: function() {} },
                { propertyName: 'floatProperty', onValueChange: function() {} },
                { propertyName: 'integerProperty', onValueChange: function() {} },
                { propertyName: 'stringProperty', onValueChange: function() {} },
                { propertyName: 'dateProperty', onValueChange: function() {} },
                { propertyName: 'enumProperty', onValueChange: function() {} }
            ]
        };
        let bean = classRepo.load(beanModel);
        expect(bean.booleanProperty).to.be.null;
        expect(bean.floatProperty).to.be.null;
        expect(bean.integerProperty).to.be.null;
        expect(bean.stringProperty).to.be.null;
        expect(bean.dateProperty).to.be.null;
        expect(bean.enumProperty).to.be.null;
    }));

    it('can set boolean from opendolphin', sinon.test(function() {
        let onBeanUpdateHandler = this.spy();
        classRepo.onBeanUpdate(onBeanUpdateHandler);
        let booleanPropertyChangeListener = function() {};
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                {
                    propertyName: 'booleanProperty',
                    onValueChange: function(listener) {
                        booleanPropertyChangeListener = listener;
                    }
                }
            ]
        };
        let bean = classRepo.load(beanModel);
        booleanPropertyChangeListener({oldValue: null, newValue: true});
        booleanPropertyChangeListener({oldValue: true, newValue: false});
        booleanPropertyChangeListener({oldValue: false, newValue: null});
        sinon.assert.callCount(onBeanUpdateHandler, 3);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'booleanProperty', true, null);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'booleanProperty', false, true);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'booleanProperty', null, false);
    }));

    it('can set float from opendolphin', sinon.test(function() {
        let onBeanUpdateHandler = this.spy();
        classRepo.onBeanUpdate(onBeanUpdateHandler);
        let floatPropertyChangeListener = function() {};
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                {
                    propertyName: 'floatProperty',
                    onValueChange: function(listener) {
                        floatPropertyChangeListener = listener;
                    }
                }
            ]
        };
        let bean = classRepo.load(beanModel);
        floatPropertyChangeListener({oldValue: null,   newValue: 3.1415});
        floatPropertyChangeListener({oldValue: 3.1415, newValue: 2.7182});
        floatPropertyChangeListener({oldValue: 2.7182, newValue: null});
        sinon.assert.callCount(onBeanUpdateHandler, 3);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'floatProperty', 3.1415, null);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'floatProperty', 2.7182, 3.1415);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'floatProperty', null, 2.7182);
    }));

    it('can set integer from opendolphin', sinon.test(function() {
        let onBeanUpdateHandler = this.spy();
        classRepo.onBeanUpdate(onBeanUpdateHandler);
        let integerPropertyChangeListener = function() {};
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                {
                    propertyName: 'integerProperty',
                    onValueChange: function(listener) {
                        integerPropertyChangeListener = listener;
                    }
                }
            ]
        };
        let bean = classRepo.load(beanModel);
        integerPropertyChangeListener({oldValue: null, newValue: 42});
        integerPropertyChangeListener({oldValue: 42,   newValue: 4711});
        integerPropertyChangeListener({oldValue: 4711, newValue: null});
        sinon.assert.callCount(onBeanUpdateHandler, 3);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'integerProperty', 42, null);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'integerProperty', 4711, 42);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'integerProperty', null, 4711);
    }));

    it('can set string from opendolphin', sinon.test(function() {
        let onBeanUpdateHandler = this.spy();
        classRepo.onBeanUpdate(onBeanUpdateHandler);
        let stringPropertyChangeListener = function() {};
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                {
                    propertyName: 'stringProperty',
                    onValueChange: function(listener) {
                        stringPropertyChangeListener = listener;
                    }
                }
            ]
        };
        let bean = classRepo.load(beanModel);
        stringPropertyChangeListener({oldValue: null, newValue: 'Hello World'});
        stringPropertyChangeListener({oldValue: 'Hello World', newValue: 'Goodbye World'});
        stringPropertyChangeListener({oldValue: 'Goodbye World', newValue: null});
        sinon.assert.callCount(onBeanUpdateHandler, 3);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'stringProperty', 'Hello World', null);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'stringProperty', 'Goodbye World', 'Hello World');
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'stringProperty', null, 'Goodbye World');
    }));

    it('can set date from opendolphin', sinon.test(function() {
        let date1 = new Date();
        date1.setUTCFullYear(2016, 1, 29);
        date1.setUTCHours(0, 1, 2, 3);
        let date2 = new Date();
        date2.setUTCFullYear(2015, 1, 28);
        date2.setUTCHours(0, 1, 2, 3);
        let onBeanUpdateHandler = this.spy();
        classRepo.onBeanUpdate(onBeanUpdateHandler);
        let datePropertyChangeListener = function() {};
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                {
                    propertyName: 'dateProperty',
                    onValueChange: function(listener) {
                        datePropertyChangeListener = listener;
                    }
                }
            ]
        };
        let bean = classRepo.load(beanModel);
        datePropertyChangeListener({oldValue: null, newValue: '2016-02-29T00:01:02.003Z'});
        datePropertyChangeListener({oldValue: '2016-02-29T00:01:02.003Z', newValue: '2015-02-28T00:01:02.003Z'});
        datePropertyChangeListener({oldValue: '2015-02-28T00:01:02.003Z', newValue: null});
        sinon.assert.callCount(onBeanUpdateHandler, 3);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'dateProperty', date1, null);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'dateProperty', date2, date1);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'dateProperty', null, date2);
    }));

    it('can set enum from opendolphin', sinon.test(function() {
        let onBeanUpdateHandler = this.spy();
        classRepo.onBeanUpdate(onBeanUpdateHandler);
        let enumPropertyChangeListener = function() {};
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                {
                    propertyName: 'enumProperty',
                    onValueChange: function(listener) {
                        enumPropertyChangeListener = listener;
                    }
                }
            ]
        };
        let bean = classRepo.load(beanModel);
        enumPropertyChangeListener({oldValue: null, newValue: 'VALUE_1'});
        enumPropertyChangeListener({oldValue: 'VALUE_1', newValue: 'VALUE_2'});
        enumPropertyChangeListener({oldValue: 'VALUE_2', newValue: null});
        sinon.assert.callCount(onBeanUpdateHandler, 3);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'enumProperty', 'VALUE_1', null);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'enumProperty', 'VALUE_2', 'VALUE_1');
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'enumProperty', null, 'VALUE_2');
    }));

    it('can set boolean from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'booleanProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.true;
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('booleanProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(null);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'booleanProperty', true);
    }));

    it('can set boolean to null from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'booleanProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.null;
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('booleanProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(true);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'booleanProperty', null);
    }));

    it('can set float from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'floatProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.closeTo(2.7182, 1e-6);
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('floatProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(null);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'floatProperty', 2.7182);
    }));

    it('can set float to null from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'floatProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.null;
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('floatProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(2.7182);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'floatProperty', null);
    }));

    it('can set integer from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'integerProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.equal(4711);
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('integerProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(null);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'integerProperty', 4711);
    }));

    it('can set integer to null from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'integerProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.null;
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('integerProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(4711);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'integerProperty', null);
    }));

    it('can set string from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'stringProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.equal('Goodbye!');
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('stringProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(null);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'stringProperty', 'Goodbye!');
    }));

    it('can set string to null from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'stringProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.null;
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('stringProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns('Goodbye!');
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'stringProperty', null);
    }));

    it('can set date from user', sinon.test(function(done) {
        let date1 = new Date();
        date1.setUTCFullYear(2016, 1, 29);
        date1.setUTCHours(0, 1, 2, 3);
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'dateProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.equal('2016-02-29T00:01:02.003Z');
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('dateProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(null);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'dateProperty', date1);
    }));

    it('can set date to null from user', sinon.test(function(done) {
        let date1 = new Date();
        date1.setUTCFullYear(2016, 1, 29);
        date1.setUTCHours(0, 1, 2, 3);
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'dateProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.null;
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('dateProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(date1);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'dateProperty', null);
    }));

    it('can set enum from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'enumProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.equal('VALUE_1');
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('enumProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(null);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'enumProperty', 'VALUE_1');
    }));

    it('can set enum to null from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'enumProperty',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.null;
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('enumProperty').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns('VALUE_1');
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'enumProperty', null);
    }));
});


describe('ClassRepository Remoting Bean properties', function() {

    let dolphin = {
        findPresentationModelById: function() {}
    };
    let classRepo = null;
    let bean1 = null;
    let bean2 = null;
    let complexClassModel = null;

    beforeEach(function() {
        classRepo = new ClassRepository(dolphin);

        let simpleClassModel = {
            id: 'SimpleClass',
            attributes: [
                { propertyName: 'text', value: consts.STRING }
            ]
        };
        classRepo.registerClass(simpleClassModel);
        complexClassModel = {
            id: 'ComplexClass',
            attributes: [
                { propertyName: 'reference', value: consts.REMOTING_BEAN }
            ]
        };
        classRepo.registerClass(complexClassModel);
        let bean1Model = {
            id: 'id1',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean1 = classRepo.load(bean1Model);
        let bean2Model = {
            id: 'id2',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean2 = classRepo.load(bean2Model);
    });



    it('should initialize', sinon.test(function() {
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                { propertyName: 'reference', onValueChange: function() {} }
            ]
        };
        let bean = classRepo.load(beanModel);
        expect(bean.reference).to.be.null;
    }));

    it('can be set from opendolphin', sinon.test(function() {
        let onBeanUpdateHandler = this.spy();
        classRepo.onBeanUpdate(onBeanUpdateHandler);
        let propertyChangeListener = function() {};
        let beanModel = {
            presentationModelType: 'ComplexClass',
            attributes: [
                {
                    propertyName: 'reference',
                    onValueChange: function(listener) {
                        propertyChangeListener = listener;
                    }
                }
            ]
        };
        let bean = classRepo.load(beanModel);
        propertyChangeListener({oldValue: null,  newValue: 'id1'});
        propertyChangeListener({oldValue: 'id1', newValue: 'id2'});
        propertyChangeListener({oldValue: 'id2', newValue: null});
        sinon.assert.callCount(onBeanUpdateHandler, 3);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'reference', bean1, null);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'reference', bean2, bean1);
        sinon.assert.calledWith(onBeanUpdateHandler, bean, 'reference', null,  bean2);
    }));

    it('can be set from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'reference',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.equal('id2');
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('reference').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(null);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'reference', bean2);
    }));

    it('can be set to null from user', sinon.test(function(done) {
        this.stub(dolphin, 'findPresentationModelById');
        let attribute =  {
            propertyName: 'reference',
            onValueChange: function() {},
            setValue: function(newValue) {
                check(done, function() {
                    expect(newValue).to.be.null;
                });
            },
            getValue: this.stub()
        };
        let beanModel = {
            id: 'myId',
            presentationModelType: 'ComplexClass',
            attributes: [ attribute ],
            findAttributeByPropertyName: this.stub().withArgs('reference').returns(attribute)
        };
        dolphin.findPresentationModelById.returns(beanModel);
        attribute.getValue.returns(null);
        let bean = classRepo.load(beanModel);
        classRepo.notifyBeanChange(bean, 'reference', null);
    }));

});


describe('ClassRepository.mapParamToDolphin()', function() {

    it('undefined', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin(undefined);
        expect(result).to.be.undefined;
    });

    it('null', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin(null);
        expect(result).to.be.null;
    });

    it('boolean true', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin(true);
        expect(result).to.be.true;
    });

    it('boolean false', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin(false);
        expect(result).to.be.false;
    });

    it('number 0', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin(0);
        expect(result).to.equal(0);
    });

    it('number positive integer', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin(42);
        expect(result).to.equal(42);
    });

    it('number negative float', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin(-0.1);
        expect(result).to.equal(-0.1);
    });

    it('string', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin('42');
        expect(result).to.equal('42');
    });

    it('string (empty)', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin('');
        expect(result).to.equal('');
    });

    it('date', function() {
        let date1 = new Date();
        date1.setUTCFullYear(2016, 1, 29);
        date1.setUTCHours(0, 1, 2, 3);
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin(date1);
        expect(result).to.equal('2016-02-29T00:01:02.003Z');
    });

    it('enum', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.mapParamToDolphin('VALUE_1');
        expect(result).to.equal('VALUE_1');
    });

    // TODO Implement once it is possible to create beans on the client
    it('Remoting Bean', function() {
    });

    it('arbitrary object', function() {
        let classRepo = new ClassRepository({});
        expect(function() {classRepo.mapParamToDolphin({});}).to.throw(TypeError);
    });

    it('array', function() {
        let classRepo = new ClassRepository({});
        expect(function() {classRepo.mapParamToDolphin([]);}).to.throw(TypeError);
    });

    it('function', function() {
        let classRepo = new ClassRepository({});
        expect(function() {classRepo.mapParamToDolphin(function() {});}).to.throw(TypeError);
    });
    it('test _getAllChildBeans for null', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo._getAllChildBeans(null);
        expect(result).to.eql([]);
    });
    it('test _getAllChildBeans for empty', function() {
        let classRepo = new ClassRepository({});
        let rootBean = {};
        let result = classRepo._getAllChildBeans(rootBean);
        expect(result).to.eql([]);
    });
    it('test _getAllChildBeans for plain', function() {
        let classRepo = new ClassRepository({});
        let rootBean = {a: "huhu", b: 123, c: null};
        let result = classRepo._getAllChildBeans(rootBean);
        expect(result).to.eql([]);
    });
    it('test _getAllChildBeans for subBean', function() {
        let classRepo = new ClassRepository({});

        let subBean = {};
        let rootBean = {sub:subBean};
        classRepo.beanToDolphin.set(subBean, 1);
        classRepo.beanToDolphin.set(rootBean, 2);

        let result = classRepo._getAllChildBeans(rootBean);
        expect(result).to.eql([subBean]);
    });
    it('test _getAllChildBeans for array', function() {
        let classRepo = new ClassRepository({});

        let subBean1 = {};
        let subBean2 = {};
        let rootBean = {sub:[subBean1, subBean2]};
        classRepo.beanToDolphin.set(subBean1, 1);
        classRepo.beanToDolphin.set(subBean2, 2);
        classRepo.beanToDolphin.set(rootBean, 3);

        let result = classRepo._getAllChildBeans(rootBean);
        expect(result).to.eql([subBean1, subBean2]);
    });
    it('test _getAllChildBeans for complex bean', function() {
        let classRepo = new ClassRepository({});

        let subBean1 = {};
        let subBean2 = {};
        let subBean3 = {};
        let rootBean = {sub:[subBean1, subBean2], b: subBean3, prim: "HUHU", n: null};
        classRepo.beanToDolphin.set(subBean1, 1);
        classRepo.beanToDolphin.set(subBean2, 2);
        classRepo.beanToDolphin.set(subBean3, 3);
        classRepo.beanToDolphin.set(rootBean, 100);

        let result = classRepo._getAllChildBeans(rootBean);
        expect(result.length).to.eql(3);
        expect(result.includes(subBean1)).to.be.true;
        expect(result.includes(subBean2)).to.be.true;
        expect(result.includes(subBean3)).to.be.true;
    });


    it('test isBeanOrSubBean for null - null', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.isBeanOrSubBean(null, null);
        expect(result).to.be.false;
    });
    it('test isBeanOrSubBean for any - null', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.isBeanOrSubBean({}, null);
        expect(result).to.be.false;
    });
    it('test isBeanOrSubBean for null - any', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.isBeanOrSubBean(null, {});
        expect(result).to.be.false;
    });
    it('test isBeanOrSubBean for any - any', function() {
        let classRepo = new ClassRepository({});
        let result = classRepo.isBeanOrSubBean({}, {});
        expect(result).to.be.false;
    });
    it('test isBeanOrSubBean for non-SubBean', function() {
        let classRepo = new ClassRepository({});

        let subBean1 = {};
        let rootBean = {any:null};
        classRepo.beanToDolphin.set(subBean1, 1);
        classRepo.beanToDolphin.set(rootBean, 100);

        let result = classRepo.isBeanOrSubBean(subBean1, rootBean);
        expect(result).to.be.false;
    });
    it('test isBeanOrSubBean for SubBean', function() {
        let classRepo = new ClassRepository({});

        let subBean1 = {};
        let rootBean = {child:subBean1};
        classRepo.beanToDolphin.set(subBean1, 1);
        classRepo.beanToDolphin.set(rootBean, 100);

        let result = classRepo.isBeanOrSubBean(subBean1, rootBean);
        expect(result).to.be.true;
    });
    it('test isBeanOrSubBean for deep SubBean', function() {
        let classRepo = new ClassRepository({});

        let subBean1 = {};
        let subBean2 = {c:subBean1};
        let subBean3 = {c:subBean2};
        let subBean4 = { c:subBean3};
        let rootBean = {child:subBean4};
        classRepo.beanToDolphin.set(subBean1, 1);
        classRepo.beanToDolphin.set(subBean2, 2);
        classRepo.beanToDolphin.set(subBean3, 3);
        classRepo.beanToDolphin.set(subBean4, 4);
        classRepo.beanToDolphin.set(rootBean, 100);

        let result = classRepo.isBeanOrSubBean(subBean1, rootBean);
        expect(result).to.be.true;
    });
    it('test isBeanOrSubBean for array', function() {
        let classRepo = new ClassRepository({});

        let subBean1 = {};
        let subBean2 = {};
        let rootBean = {children:[subBean1, subBean2]};
        classRepo.beanToDolphin.set(subBean1, 1);
        classRepo.beanToDolphin.set(subBean2, 2);
        classRepo.beanToDolphin.set(rootBean, 100);

        let result = classRepo.isBeanOrSubBean(subBean2, rootBean);
        expect(result).to.be.true;
    });
    it('test isBeanOrSubBean for deep array', function() {
        let classRepo = new ClassRepository({});

        let subBean1 = {};
        let subBean2 = {};
        let subBean3 = {c:[subBean2, subBean1]};
        let subBean4 = {c:subBean3};
        let rootBean = {c:subBean4};
        classRepo.beanToDolphin.set(subBean1, 1);
        classRepo.beanToDolphin.set(subBean2, 2);
        classRepo.beanToDolphin.set(subBean3, 3);
        classRepo.beanToDolphin.set(subBean4, 4);
        classRepo.beanToDolphin.set(rootBean, 100);

        let result = classRepo.isBeanOrSubBean(subBean1, rootBean);
        expect(result).to.be.true;
    });
    it('test isBeanOrSubBean for not attached bean', function() {
        let classRepo = new ClassRepository({});

        let subBean1 = {};
        let subBean2 = {};
        let subBean3 = {c:subBean2};
        let subBean4 = {c:subBean3};
        let rootBean = {c:subBean4};
        classRepo.beanToDolphin.set(subBean1, 1);
        classRepo.beanToDolphin.set(subBean2, 2);
        classRepo.beanToDolphin.set(subBean3, 3);
        classRepo.beanToDolphin.set(subBean4, 4);
        classRepo.beanToDolphin.set(rootBean, 100);

        let result1 = classRepo.isBeanOrSubBean(subBean1, rootBean);
        let result2 = classRepo.isBeanOrSubBean(subBean2, rootBean);
        let result3 = classRepo.isBeanOrSubBean(subBean3, rootBean);
        let result4 = classRepo.isBeanOrSubBean(subBean4, rootBean);

        expect(result1).to.be.false;
        expect(result2).to.be.true;
        expect(result3).to.be.true;
        expect(result4).to.be.true;
    });
    it('test isBeanOrSubBean for same bean', function() {
        let classRepo = new ClassRepository({});

        let bean = {};
        classRepo.beanToDolphin.set(bean, 1);

        let result = classRepo.isBeanOrSubBean(bean, bean);
        expect(result).to.be.true;
    });
});
