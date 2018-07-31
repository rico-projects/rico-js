/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import sinon from 'sinon';
import sinonTest from 'sinon-test'
sinon.test = sinonTest(sinon);

import Connector from '../../../src/remoting/connector.js';
import BeanManager from '../../../src/remoting/beanmanager.js';
import ClassRepository from '../../../src/remoting/classrepo.js';

describe('Remoting Message Distribution', function() {

    let classRepository = null;
    let onModelStoreChange = null;

    let clientModelStore = { onModelStoreChange: function(cb) { onModelStoreChange = cb; } };

    let dolphin = {
        getClientModelStore: function() { return clientModelStore; },
        deletePresentationModel: function() {},
        startPushListening: function() {}
    };


    beforeEach(function() {
        let server = sinon.fakeServer.create();

        classRepository = new ClassRepository(dolphin);
        new Connector('http://localhost', dolphin, classRepository);

        server.respond();
        server.restore();
    });


    it('should call registerClass()', sinon.test(function() {
        classRepository.registerClass = this.spy();
        let model = {
            presentationModelType: '@@@ R_BEAN @@@',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };

        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });

        sinon.assert.calledWith(classRepository.registerClass, model);
    }));


    it('should call unregisterClass()', sinon.test(function() {
        classRepository.unregisterClass = this.spy();
        let model = {
            presentationModelType: '@@@ R_BEAN @@@',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };

        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });

        sinon.assert.calledWith(classRepository.unregisterClass, model);
    }));


    it('should call load()', sinon.test(function() {
        classRepository.load = this.stub().returns({});
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };

        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });

        sinon.assert.calledWith(classRepository.load, model);
    }));


    it('should call unload()', sinon.test(function() {
        classRepository.unload = this.stub().returns({});
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };

        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });

        sinon.assert.calledWith(classRepository.unload, model);
    }));


    it('should call spliceListEntry()', sinon.test(function() {
        classRepository.spliceListEntry = this.spy();
        this.spy(dolphin, "deletePresentationModel");
        let model = {
            presentationModelType: '@DP:LS@',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };

        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });

        sinon.assert.calledWith(classRepository.spliceListEntry, model);
        sinon.assert.calledWith(dolphin.deletePresentationModel, model);
    }));
});



describe('Remoting Event Handling', function() {

    let classRepository = null;
    let beanManager = null;
    let onModelStoreChange = null;

    let clientModelStore = { onModelStoreChange: function(cb) { onModelStoreChange = cb; } };

    let dolphin = {
        getClientModelStore: function() { return clientModelStore; },
        deletePresentationModel: function() {},
        startPushListening: function() {}
    };


    beforeEach(sinon.test(function() {
        let server = sinon.fakeServer.create();

        classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);
        new Connector('http://localhost', dolphin, classRepository);

        server.respond();
        server.restore();
    }));



    it('should call onAdded-handler for class', sinon.test(function() {
        let bean = {};
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onAddedHandler = this.spy();

        beanManager.onAdded('SomeClass', onAddedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });

        sinon.assert.calledWith(onAddedHandler, bean);
    }));


    it('should not call onAdded-handler for other class', sinon.test(function() {
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onAddedHandler = this.spy();

        beanManager.onAdded('SomeOtherClass', onAddedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });

        sinon.assert.notCalled(onAddedHandler);
    }));


    it('should not call removed onAdded-handler', sinon.test(function() {
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onAddedHandler = this.spy();

        beanManager.onAdded('SomeClass', onAddedHandler).unsubscribe();
        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });

        sinon.assert.notCalled(onAddedHandler);
    }));


    it('should be able to add onAdded-handler within onAdded-handler', sinon.test(function() {
        let bean = {};
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let innerOnAddedHandler = this.spy();
        let outerOnAddedHandler = function() {
            beanManager.onAdded('SomeClass', innerOnAddedHandler);
        };

        let subscription = beanManager.onAdded('SomeClass', outerOnAddedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });
        subscription.unsubscribe();
        sinon.assert.notCalled(innerOnAddedHandler);

        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });
        sinon.assert.calledWith(innerOnAddedHandler, bean);
    }));


    it('should be able to remove onAdded-handler within onAdded-handler', sinon.test(function() {
        let bean = {};
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let innerOnAddedHandler = this.spy();
        let innerSubscription = beanManager.onAdded('SomeClass', innerOnAddedHandler);
        let outerOnAddedHandler = function () {
            innerSubscription.unsubscribe();
        };
        let outerSubscription = beanManager.onAdded('SomeClass', outerOnAddedHandler);

        onModelStoreChange({clientPresentationModel: model, eventType: "ADDED"});
        outerSubscription.unsubscribe();
        sinon.assert.calledWith(innerOnAddedHandler, bean);
        innerOnAddedHandler.resetHistory();

        onModelStoreChange({clientPresentationModel: model, eventType: "ADDED"});
        sinon.assert.notCalled(innerOnAddedHandler);
    }));


    it('should call generic onAdded-handler', sinon.test(function() {
        let bean = {};
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onAddedHandler = this.spy();

        beanManager.onAdded(onAddedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });

        sinon.assert.calledWith(onAddedHandler, bean);
    }));


    it('should not call removed generic onAdded-handler', sinon.test(function() {
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onAddedHandler = this.spy();

        beanManager.onAdded(onAddedHandler).unsubscribe();
        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });

        sinon.assert.notCalled(onAddedHandler);
    }));


    it('should be able to add generic onAdded-handler within generic onAdded-handler', sinon.test(function() {
        let bean = {};
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let innerOnAddedHandler = this.spy();
        let outerOnAddedHandler = function() {
            beanManager.onAdded('SomeClass', innerOnAddedHandler);
        };

        let subscription = beanManager.onAdded('SomeClass', outerOnAddedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });
        subscription.unsubscribe();
        sinon.assert.notCalled(innerOnAddedHandler);

        onModelStoreChange({ clientPresentationModel: model, eventType: "ADDED" });
        sinon.assert.calledWith(innerOnAddedHandler, bean);
    }));


    it('should be able to remove generic onAdded-handler within generic onAdded-handler', sinon.test(function() {
        let bean = {};
        let model = {
            presentationModelType: 'SomeClass',
            attributes: [],
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let innerOnAddedHandler = this.spy();
        let innerSubscription = beanManager.onAdded(innerOnAddedHandler);
        let outerOnAddedHandler = function () {
            innerSubscription.unsubscribe();
        };
        let outerSubscription = beanManager.onAdded(outerOnAddedHandler);

        onModelStoreChange({clientPresentationModel: model, eventType: "ADDED"});
        outerSubscription.unsubscribe();
        sinon.assert.calledWith(innerOnAddedHandler, bean);
        innerOnAddedHandler.resetHistory();

        onModelStoreChange({clientPresentationModel: model, eventType: "ADDED"});
        sinon.assert.notCalled(innerOnAddedHandler);
    }));


    it('should call onRemoved-handler for class', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onRemovedHandler = this.spy();

        beanManager.onRemoved('SomeClass', onRemovedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });

        sinon.assert.calledWith(onRemovedHandler, bean);
    }));


    it('should not call onRemoved-handler for other class', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onRemovedHandler = this.spy();

        beanManager.onRemoved('SomeOtherClass', onRemovedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });

        sinon.assert.notCalled(onRemovedHandler);
    }));


    it('should not call removed onRemoved-handler', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onRemovedHandler = this.spy();

        beanManager.onRemoved('SomeClass', onRemovedHandler).unsubscribe();
        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });

        sinon.assert.notCalled(onRemovedHandler);
    }));


    it('should be able to add onRemoved-handler within onRemoved-handler', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let innerOnRemovedHandler = this.spy();
        let outerOnRemovedHandler = function() {
            beanManager.onRemoved('SomeClass', innerOnRemovedHandler);
        };

        let subscription = beanManager.onRemoved('SomeClass', outerOnRemovedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });
        subscription.unsubscribe();
        sinon.assert.notCalled(innerOnRemovedHandler);

        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });
        sinon.assert.calledWith(innerOnRemovedHandler, bean);
    }));


    it('should be able to remove onRemoved-handler within onRemoved-handler', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let innerOnRemovedHandler = this.spy();
        let innerSubscription = beanManager.onRemoved('SomeClass', innerOnRemovedHandler);
        let outerOnRemovedHandler = function () {
            innerSubscription.unsubscribe();
        };
        let outerSubscription = beanManager.onRemoved('SomeClass', outerOnRemovedHandler);

        onModelStoreChange({clientPresentationModel: model, eventType: "REMOVED"});
        outerSubscription.unsubscribe();
        sinon.assert.calledWith(innerOnRemovedHandler, bean);
        innerOnRemovedHandler.resetHistory();

        onModelStoreChange({clientPresentationModel: model, eventType: "REMOVED"});
        sinon.assert.notCalled(innerOnRemovedHandler);
    }));


    it('should call generic onRemoved-handler', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onRemovedHandler = this.spy();

        beanManager.onRemoved(onRemovedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });

        sinon.assert.calledWith(onRemovedHandler, bean);
    }));


    it('should not call removed generic onRemoved-handler', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let onRemovedHandler = this.spy();

        beanManager.onRemoved(onRemovedHandler).unsubscribe();
        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });

        sinon.assert.notCalled(onRemovedHandler);
    }));


    it('should be able to add generic onRemoved-handler within generic onAdded-handler', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let innerOnRemovedHandler = this.spy();
        let outerOnRemovedHandler = function() {
            beanManager.onRemoved(innerOnRemovedHandler);
        };

        let subscription = beanManager.onRemoved(outerOnRemovedHandler);
        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });
        subscription.unsubscribe();
        sinon.assert.notCalled(innerOnRemovedHandler);

        onModelStoreChange({ clientPresentationModel: model, eventType: "REMOVED" });
        sinon.assert.calledWith(innerOnRemovedHandler, bean);
    }));


    it('should be able to remove generic onRemoved-handler within generic onAdded-handler', sinon.test(function() {
        let bean = {};
        classRepository.beanFromDolphin.get = this.stub().returns(bean);
        let model = {
            presentationModelType: 'SomeClass',
            findAttributeByPropertyName: this.stub().withArgs('@@@ SOURCE_SYSTEM @@@').returns({value: 'server'})
        };
        let innerOnRemovedHandler = this.spy();
        let innerSubscription = beanManager.onRemoved(innerOnRemovedHandler);
        let outerOnRemovedHandler = function () {
            innerSubscription.unsubscribe();
        };
        let outerSubscription = beanManager.onRemoved(outerOnRemovedHandler);

        onModelStoreChange({clientPresentationModel: model, eventType: "REMOVED"});
        outerSubscription.unsubscribe();
        sinon.assert.calledWith(innerOnRemovedHandler, bean);
        innerOnRemovedHandler.resetHistory();

        onModelStoreChange({clientPresentationModel: model, eventType: "REMOVED"});
        sinon.assert.notCalled(innerOnRemovedHandler);
    }));
});



describe('Remoting Command', function() {

    let connector = null;
    let dolphin = null;
    let classRepository = null;

    beforeEach(sinon.test(function() {
        let clientModelStore = { onModelStoreChange: function() {} };
        dolphin = {
            getClientModelStore: function() { return clientModelStore; },
            attribute: function() {},
            presentationModel: function() {},
            send: function() {},
            startPushListening: function() {}
        };

        classRepository = new ClassRepository(dolphin);
        this.server.respondImmediately = true;
        this.server.respondWith([200, {}, '']);

        let server = sinon.fakeServer.create();

        connector = new Connector('http://localhost', dolphin, classRepository);

        server.respond();
        server.restore();
    }));


    it('should send command without parameters', sinon.test(function(done) {
        this.stub(dolphin, 'send').yieldsTo('onFinished', []);

        connector.invoke("myCommand").then(function() {
            sinon.assert.calledWith(dolphin.send, "myCommand");
            done();
        });
    }));
});