/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import sinon from 'sinon';
import sinonTest from 'sinon-test'
sinon.test = sinonTest(sinon);

import ClassRepository from '../../../src/remoting/classRepository.js';
import BeanManager from '../../../src/remoting/beanManager.js'; 
import * as consts from '../../../src/remoting/constants';

let DP_LS = '@DP:LS@';

describe('List Sync (adding primitive elements as User)', function() {

    let dolphin = null;
    let beanManager = null;
    let bean = null;

    beforeEach(function () {
        dolphin = {
            attribute: function() {},
            presentationModel: function() {},
            findPresentationModelById: function(id) {
                return id === 'source_id' ? sourceModel : null;
            }
        };
        let classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let classModel = {
            id: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', value: consts.STRING }
            ]
        };
        classRepository.registerClass(classModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', onValueChange: function () {} }
            ],
            findAttributeByPropertyName: function () {
            }
        };
        bean = classRepository.load(sourceModel);
    });



    it('should add single entry in empty list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '1').returns(element);

        bean.primitiveList = ['1'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add null in empty list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, null).returns(element);

        bean.primitiveList = [null];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add multiple entries in empty list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, '1').returns(element1);
        dolphin.attribute.withArgs('1', null, '2').returns(element2);
        dolphin.attribute.withArgs('2', null, '3').returns(element3);

        bean.primitiveList = ['1', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 3, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));


    it('should add single entry in beginning', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element);

        bean.primitiveList = ['42', '1', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add multiple entries in beginning', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);
        dolphin.attribute.withArgs('2', null, 'Hello World').returns(element3);

        bean.primitiveList = ['42', '4711', 'Hello World', '1', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 3, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));


    it('should add single entry in middle', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element);

        bean.primitiveList = ['1', '42', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 1, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add multiple entries in middle', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);
        dolphin.attribute.withArgs('2', null, 'Hello World').returns(element3);

        bean.primitiveList = ['1', '42', '4711', 'Hello World', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 1, 3, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));


    it('should add single entry at end', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element);

        bean.primitiveList = ['1', '2', '3', '42'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 3, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add multiple entries at end', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);
        dolphin.attribute.withArgs('2', null, 'Hello World').returns(element3);

        bean.primitiveList = ['1', '2', '3', '42', '4711', 'Hello World'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 3, 3, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));
});





describe('List Sync (deleting primitive elements as User)', function() {

    let dolphin = null;
    let beanManager = null;
    let bean = null;

    beforeEach(function() {
        dolphin = {
            attribute: function() {},
            presentationModel: function() {},
            findPresentationModelById: function(id) {
                return id === 'source_id' ? sourceModel : null;
            }
        };
        let classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let classModel = {
            id: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', value: consts.STRING }
            ]
        };
        classRepository.registerClass(classModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        bean = classRepository.load(sourceModel);
    });



    it('should delete single entry from single element list', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = [];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 0, ['1']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete null from single element list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = [];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 0, [null]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete all entries from multiple entry list', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = [];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 0, ['1', '2', '3']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));



    it('should delete single entry in beginning', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = ['2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 0, ['1']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete multiple entries in beginning', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = ['1', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 0, ['42', '4711', 'Hello World']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete single entry in middle', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 2).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = ['1', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 1, 0, ['2']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete multiple entries in middle', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 4).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = ['1', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 1, 0, ['42', '4711', 'Hello World']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete single entry at end', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 4).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = ['1', '2'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 3, 0, ['3']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete multiple entries at end', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 6).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        bean.primitiveList = ['1', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 3, 0, ['42', '4711', 'Hello World']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));
});





describe('List Sync (replacing primitive elements as User)', function() {

    let dolphin = null;
    let beanManager = null;
    let bean = null;

    beforeEach(function () {
        dolphin = {
            attribute: function() {},
            presentationModel: function() {},
            findPresentationModelById: function(id) {
                return id === 'source_id' ? sourceModel : null;
            }
        };
        let classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let classModel = {
            id: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', value: consts.STRING }
            ]
        };
        classRepository.registerClass(classModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', onValueChange: function () {} }
            ],
            findAttributeByPropertyName: function () {
            }
        };
        bean = classRepository.load(sourceModel);
    });



    it('should replace single entry in single entry list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element);

        bean.primitiveList = ['42'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 1, ['1']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace element with null', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, null).returns(element);

        bean.primitiveList = [null];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 1, ['1']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace null with element', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '1').returns(element);

        bean.primitiveList = ['1'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 1, [null]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace all entries in multiple element list with more elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 2).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);
        dolphin.attribute.withArgs('2', null, 'Hello World').returns(element3);

        bean.primitiveList = ['42', '4711', 'Hello World'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 3, ['1', '2']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));

    it('should replace all entries in multiple element list with less elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 2).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);

        bean.primitiveList = ['42', '4711'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 2, ['1', '2', '3']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2);
    }));


    it('should replace single entry in beginning', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element);

        bean.primitiveList = ['42', '2', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 1, ['1']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace multiple entries in beginning with more elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 2).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);
        dolphin.attribute.withArgs('2', null, 'Hello World').returns(element3);

        bean.primitiveList = ['42', '4711', 'Hello World', '3', '4', '5', '6'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 3, ['1', '2']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));

    it('should replace multiple entries in beginning with less elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 2).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);

        bean.primitiveList = ['42', '4711', '4', '5', '6'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 0, 2, ['1', '2', '3']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2);
    }));


    it('should replace single entry in middle', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 2).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element);

        bean.primitiveList = ['1', '42', '3'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 1, 1, ['2']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace multiple entries in middle with more elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 2).returns(from);
        dolphin.attribute.withArgs('to', null, 4).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);
        dolphin.attribute.withArgs('2', null, 'Hello World').returns(element3);

        bean.primitiveList = ['1', '2', '42', '4711', 'Hello World', '5', '6'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 2, 3, ['3', '4']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));

    it('should replace multiple entries in middle with less elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 5).returns(to);
        dolphin.attribute.withArgs('count', null, 2).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);

        bean.primitiveList = ['1', '42', '4711', '6'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 1, 2, ['2', '3', '4', '5']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2);
    }));



    it('should replace single entry at end', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 2).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element);

        bean.primitiveList = ['1', '2', '42'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 2, 1, ['3']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace multiple entries at end with more elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 4).returns(from);
        dolphin.attribute.withArgs('to', null, 6).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);
        dolphin.attribute.withArgs('2', null, 'Hello World').returns(element3);

        bean.primitiveList = ['1', '2', '3', '4', '42', '4711', 'Hello World'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 4, 3, ['5', '6']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));

    it('should replace multiple entries at end with less elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'primitiveList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 6).returns(to);
        dolphin.attribute.withArgs('count', null, 2).returns(count);
        dolphin.attribute.withArgs('0', null, '42').returns(element1);
        dolphin.attribute.withArgs('1', null, '4711').returns(element2);

        bean.primitiveList = ['1', '2', '3', '42', '4711'];
        beanManager.notifyArrayChange(bean, 'primitiveList', 3, 2, ['4', '5', '6']);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2);
    }));

});





describe('List Sync (adding objects as User)', function() {

    let dolphin = null;
    let beanManager = null;
    let sourceBean = null;
    let bean1 = null;
    let bean2 = null;
    let bean3 = null;

    beforeEach(function() {
        dolphin = {
            attribute: function () {},
            presentationModel: function () {},
            findPresentationModelById: function(id) {
                return id === 'source_id' ? sourceModel : null;
            }
        };

        let classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let simpleClassModel = {
            id: 'SimpleClass',
            attributes: [
                { propertyName: 'text', value: consts.STRING }
            ]
        };
        classRepository.registerClass(simpleClassModel);
        let complexClassModel = {
            id: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', value: consts.REMOTING_BEAN }
            ]
        };
        classRepository.registerClass(complexClassModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        sourceBean = classRepository.load(sourceModel);

        let bean1Model = {
            id: 'id1',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean1 = classRepository.load(bean1Model);
        let bean2Model = {
            id: 'id2',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean2 = classRepository.load(bean2Model);
        let bean3Model = {
            id: 'id3',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean3 = classRepository.load(bean3Model);
    });


    it('should add single entry in empty list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [bean1];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add null in empty list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, null).returns(element);

        sourceBean.referenceList = [null];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add multiple entries in empty list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);
        dolphin.attribute.withArgs('2', null, 'id3').returns(element3);

        sourceBean.referenceList = [bean1, bean2, bean3];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 3, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));


    it('should add single entry in beginning', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [bean1, {id: 'old1'}, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add multiple entries in beginning', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 0).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);
        dolphin.attribute.withArgs('2', null, 'id3').returns(element3);

        sourceBean.referenceList = [bean1, bean2, bean3, {id: 'old1'}, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 3, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));


    it('should add single entry in middle', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [{id: 'old1'}, bean1, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 1, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add multiple entries in middle', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);
        dolphin.attribute.withArgs('2', null, 'id3').returns(element3);

        sourceBean.referenceList = [{id: 'old1'}, bean1, bean2, bean3, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 1, 3, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));


    it('should add single entry at end', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}, bean1];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 3, 1, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should add multiple entries at end', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);
        dolphin.attribute.withArgs('2', null, 'id3').returns(element3);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}, bean1, bean2, bean3];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 3, 3, []);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));
});





describe('List Sync (deleting objects as User)', function() {

    let dolphin = null;
    let beanManager = null;
    let sourceBean = null;
    let bean1 = null;
    let bean2 = null;
    let bean3 = null;

    beforeEach(function() {
        dolphin = {
            attribute: function () {},
            presentationModel: function () {},
            findPresentationModelById: function(id) {
                return id === 'source_id' ? sourceModel : null;
            }
        };

        let classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let simpleClassModel = {
            id: 'SimpleClass',
            attributes: [
                { propertyName: 'text', value: consts.STRING }
            ]
        };
        classRepository.registerClass(simpleClassModel);
        let complexClassModel = {
            id: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', value: consts.REMOTING_BEAN }
            ]
        };
        classRepository.registerClass(complexClassModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        sourceBean = classRepository.load(sourceModel);

        let bean1Model = {
            id: 'id1',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean1 = classRepository.load(bean1Model);
        let bean2Model = {
            id: 'id2',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean2 = classRepository.load(bean2Model);
        let bean3Model = {
            id: 'id3',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean3 = classRepository.load(bean3Model);
    });


    it('should delete single entry from single element list', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 0, [bean1]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete null from single element list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 0, [null]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete all entries from multiple entry list', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 0, [bean1, bean2, bean3]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));



    it('should delete single entry in beginning', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 0, [bean1]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete multiple entries in beginning', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 0, [bean1, bean2, bean3]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete single entry in middle', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 2).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 1, 0, [bean1]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete multiple entries in middle', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 4).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 1, 0, [bean1, bean2, bean3]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete single entry at end', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 4).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 3, 0, [bean1]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));

    it('should delete multiple entries at end', sinon.test(function() {
        let sender = { id: 'sender' },
            source = { id: 'source' },
            attribute = { id: 'attribute'},
            from = { id: 'from' },
            to = { id: 'to' },
            count = { id: 'count' };
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 6).returns(to);
        dolphin.attribute.withArgs('count', null, 0).returns(count);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 3, 0, [bean1, bean2, bean3]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count);
    }));
});





describe('List Sync (replacing objects as User)', function() {

    let dolphin = null;
    let beanManager = null;
    let sourceBean = null;
    let bean1 = null;
    let bean2 = null;
    let bean3 = null;

    beforeEach(function() {
        dolphin = {
            attribute: function () {},
            presentationModel: function () {},
            findPresentationModelById: function(id) {
                return id === 'source_id' ? sourceModel : null;
            }
        };

        let classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let simpleClassModel = {
            id: 'SimpleClass',
            attributes: [
                { propertyName: 'text', value: consts.STRING }
            ]
        };
        classRepository.registerClass(simpleClassModel);
        let complexClassModel = {
            id: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', value: consts.REMOTING_BEAN }
            ]
        };
        classRepository.registerClass(complexClassModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        sourceBean = classRepository.load(sourceModel);

        let bean1Model = {
            id: 'id1',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean1 = classRepository.load(bean1Model);
        let bean2Model = {
            id: 'id2',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean2 = classRepository.load(bean2Model);
        let bean3Model = {
            id: 'id3',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean3 = classRepository.load(bean3Model);
    });


    it('should replace single entry in single entry list', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [bean1];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 1, [{id: 'old1'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace element with null', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, null).returns(element);

        sourceBean.referenceList = [null];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 1, [{id: 'old1'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace null with element', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [bean1];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 1, [null]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace all entries in multiple element list with more elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 2).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);
        dolphin.attribute.withArgs('2', null, 'id3').returns(element3);

        sourceBean.referenceList = [bean1, bean2, bean3];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 3, [{id: 'old1'}, {id: 'old2'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));

    it('should replace all entries in multiple element list with less elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 2).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);

        sourceBean.referenceList = [bean1, bean2];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 2, [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2);
    }));


    it('should replace single entry in beginning', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 1).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [bean1, {id: 'old2'}, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 1, [{id: 'old1'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace multiple entries in beginning with more elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 2).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);
        dolphin.attribute.withArgs('2', null, 'id3').returns(element3);

        sourceBean.referenceList = [bean1, bean2, bean3, {id: 'old3'}, {id: 'old4'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 3, [{id: 'old1'}, {id: 'old2'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));

    it('should replace multiple entries in beginning with less elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 0).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 2).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);

        sourceBean.referenceList = [bean1, bean2, {id: 'old4'}, {id: 'old5'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 0, 2, [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2);
    }));


    it('should replace single entry in middle', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 2).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [{id: 'old1'}, bean1, {id: 'old3'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 1, 1, [{id: 'old2'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace multiple entries in middle with more elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 2).returns(from);
        dolphin.attribute.withArgs('to', null, 4).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);
        dolphin.attribute.withArgs('2', null, 'id3').returns(element3);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, bean1, bean2, bean3, {id: 'old5'}, {id: 'old6'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 2, 3, [{id: 'old3'}, {id: 'old4'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));

    it('should replace multiple entries in middle with less elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 1).returns(from);
        dolphin.attribute.withArgs('to', null, 5).returns(to);
        dolphin.attribute.withArgs('count', null, 2).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);

        sourceBean.referenceList = [{id: 'old1'}, bean1, bean2, {id: 'old6'}];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 1, 2, [{id: 'old2'}, {id: 'old3'}, {id: 'old4'}, {id: 'old5'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2);
    }));



    it('should replace single entry at end', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element = {id: 'element'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 2).returns(from);
        dolphin.attribute.withArgs('to', null, 3).returns(to);
        dolphin.attribute.withArgs('count', null, 1).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, bean1];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 2, 1, [{id: 'old3'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element);
    }));

    it('should replace multiple entries at end with more elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'},
            element3 = {id: 'element3'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 4).returns(from);
        dolphin.attribute.withArgs('to', null, 6).returns(to);
        dolphin.attribute.withArgs('count', null, 3).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);
        dolphin.attribute.withArgs('2', null, 'id3').returns(element3);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}, {id: 'old4'}, bean1, bean2, bean3];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 4, 3, [{id: 'old5'}, {id: 'old6'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2, element3);
    }));

    it('should replace multiple entries at end with less elements', sinon.test(function () {
        let sender = {id: 'sender'},
            source = {id: 'source'},
            attribute = {id: 'attribute'},
            from = {id: 'from'},
            to = {id: 'to'},
            count = {id: 'count'},
            element1 = {id: 'element1'},
            element2 = {id: 'element2'};
        this.stub(dolphin, 'attribute');
        this.spy(dolphin, 'presentationModel');
        dolphin.attribute.withArgs('@@@ SOURCE_SYSTEM @@@', null, 'client').returns(sender);
        dolphin.attribute.withArgs('source', null, 'source_id').returns(source);
        dolphin.attribute.withArgs('attribute', null, 'referenceList').returns(attribute);
        dolphin.attribute.withArgs('from', null, 3).returns(from);
        dolphin.attribute.withArgs('to', null, 6).returns(to);
        dolphin.attribute.withArgs('count', null, 2).returns(count);
        dolphin.attribute.withArgs('0', null, 'id1').returns(element1);
        dolphin.attribute.withArgs('1', null, 'id2').returns(element2);

        sourceBean.referenceList = [{id: 'old1'}, {id: 'old2'}, {id: 'old3'}, bean1, bean2];
        beanManager.notifyArrayChange(sourceBean, 'referenceList', 3, 2, [{id: 'old4'}, {id: 'old5'}, {id: 'old6'}]);

        sinon.assert.calledWith(dolphin.presentationModel, null, DP_LS, sender, source, attribute, from, to, count, element1, element2);
    }));

});





describe('List Sync (adding primitive elements from OpenDolphin)', function() {

    let classRepository = null;
    let beanManager = null;
    let bean = null;

    beforeEach(function() {
        let dolphin = {};

        classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let classModel = {
            id: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', value: consts.STRING }
            ]
        };
        classRepository.registerClass(classModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        bean = classRepository.load(sourceModel);
    });


    it('should add single entry in beginning / empty list', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 0 };
        let count     = { value: 1 };
        let element   = { value: '1' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 0, ['1']);
    }));

    it('should add null in beginning / empty list', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 0 };
        let count     = { value: 1 };
        let element   = { value: null };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 0, [null]);
    }));

    it('should add multiple entries in beginning / empty list', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 0 };
        let count     = { value: 3 };
        let element1  = { value: '1' };
        let element2  = { value: '2' };
        let element3  = { value: '3' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);
        model.findAttributeByPropertyName.withArgs('2').returns(element3);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 0, ['1', '2', '3']);
    }));


    it('should add single entry in middle / at end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 1 };
        let to        = { value: 1 };
        let count     = { value: 1 };
        let element   = { value: '1' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 1, 0, ['1']);
    }));

    it('should add multiple entries in middle / at end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 1 };
        let to        = { value: 1 };
        let count     = { value: 3 };
        let element1  = { value: '1' };
        let element2  = { value: '2' };
        let element3  = { value: '3' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);
        model.findAttributeByPropertyName.withArgs('2').returns(element3);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 1, 0, ['1', '2', '3']);
    }));
});





describe('List Sync (deleting primitive elements from OpenDolphin)', function() {

    let classRepository = null;
    let beanManager = null;
    let bean = null;

    beforeEach(function() {
        let dolphin = {};

        classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let classModel = {
            id: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', value: consts.STRING }
            ]
        };
        classRepository.registerClass(classModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        bean = classRepository.load(sourceModel);
    });


    it('should delete single entry from beginning', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 1 };
        let count     = { value: 0 };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 1);
    }));

    it('should delete multiple entries from beginning', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 3 };
        let count     = { value: 0 };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 3);
    }));


    it('should delete single entry from middle / end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 1 };
        let to        = { value: 2 };
        let count     = { value: 0 };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 1, 1);
    }));

    it('should delete multiple entries from middle / end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 1 };
        let to        = { value: 4 };
        let count     = { value: 0 };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 1, 3);
    }));
});





describe('List Sync (replacing primitive elements from OpenDolphin)', function() {

    let classRepository = null;
    let beanManager = null;
    let bean = null;

    beforeEach(function() {
        let dolphin = {};

        classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let classModel = {
            id: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', value: consts.STRING }
            ]
        };
        classRepository.registerClass(classModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'SourceClass',
            attributes: [
                { propertyName: 'primitiveList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        bean = classRepository.load(sourceModel);
    });


    it('should replace single entry in beginning', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 1 };
        let count     = { value: 1 };
        let element   = { value: '42' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 1, ['42']);
    }));

    it('should replace element with null in beginning', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 1 };
        let count     = { value: 1 };
        let element   = { value: null };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 1, [null]);
    }));

    it('should replace multiple entries in beginning with more elements', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 2 };
        let count     = { value: 3 };
        let element1  = { value: '42' };
        let element2  = { value: '4711' };
        let element3  = { value: 'Hello World' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);
        model.findAttributeByPropertyName.withArgs('2').returns(element3);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 2, ['42', '4711', 'Hello World']);
    }));

    it('should replace multiple entries in beginning with less elements', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 0 };
        let to        = { value: 3 };
        let count     = { value: 2 };
        let element1  = { value: '42' };
        let element2  = { value: '4711' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 0, 3, ['42', '4711']);
    }));


    it('should replace single entry in middle / at end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 1 };
        let to        = { value: 2 };
        let count     = { value: 1 };
        let element   = { value: '42' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 1, 1, ['42']);
    }));

    it('should replace element with null in middle / at end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 1 };
        let to        = { value: 2 };
        let count     = { value: 1 };
        let element   = { value: null };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 1, 1, [null]);
    }));

    it('should replace multiple entries in middle / at end with more elements', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 1 };
        let to        = { value: 3 };
        let count     = { value: 3 };
        let element1  = { value: '42' };
        let element2  = { value: '4711' };
        let element3  = { value: 'Hello World' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);
        model.findAttributeByPropertyName.withArgs('2').returns(element3);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 1, 2, ['42', '4711', 'Hello World']);
    }));

    it('should replace multiple entries in middle / at end with less elements', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'primitiveList' };
        let from      = { value: 1 };
        let to        = { value: 4 };
        let count     = { value: 2 };
        let element1  = { value: '42' };
        let element2  = { value: '4711' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, bean, 'primitiveList', 1, 3, ['42', '4711']);
    }));
});





describe('List Sync (adding objects from OpenDolphin)', function() {

    let beanManager = null;
    let classRepository = null;
    let sourceBean = null;
    let bean1 = null;
    let bean2 = null;
    let bean3 = null;

    beforeEach(function() {
        let dolphin = {};

        classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let simpleClassModel = {
            id: 'SimpleClass',
            attributes: [
                { propertyName: 'text', value: consts.STRING }
            ]
        };
        classRepository.registerClass(simpleClassModel);
        let complexClassModel = {
            id: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', value: consts.REMOTING_BEAN }
            ]
        };
        classRepository.registerClass(complexClassModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        sourceBean = classRepository.load(sourceModel);

        let bean1Model = {
            id: 'id1',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean1 = classRepository.load(bean1Model);
        let bean2Model = {
            id: 'id2',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean2 = classRepository.load(bean2Model);
        let bean3Model = {
            id: 'id3',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean3 = classRepository.load(bean3Model);
    });


    it('should add single entry in beginning / empty list', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 0 };
        let to        = { value: 0 };
        let count     = { value: 1 };
        let element   = { value: 'id1' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 0, 0, [bean1]);
    }));

    it('should add null in beginning / empty list', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 0 };
        let to        = { value: 0 };
        let count     = { value: 1 };
        let element   = { value: null };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 0, 0, [null]);
    }));

    it('should add multiple entries in beginning / empty list', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 0 };
        let to        = { value: 0 };
        let count     = { value: 3 };
        let element1  = { value: 'id1' };
        let element2  = { value: 'id2' };
        let element3  = { value: 'id3' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);
        model.findAttributeByPropertyName.withArgs('2').returns(element3);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 0, 0, [bean1, bean2, bean3]);
    }));


    it('should add single entry in middle / at end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 1 };
        let to        = { value: 1 };
        let count     = { value: 1 };
        let element   = { value: 'id1' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 1, 0, [bean1]);
    }));

    it('should add multiple entries in middle / at end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 1 };
        let to        = { value: 1 };
        let count     = { value: 3 };
        let element1  = { value: 'id1' };
        let element2  = { value: 'id2' };
        let element3  = { value: 'id3' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);
        model.findAttributeByPropertyName.withArgs('2').returns(element3);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 1, 0, [bean1, bean2, bean3]);
    }));
});





describe('List Sync (replacing objects from OpenDolphin)', function() {

    let beanManager = null;
    let classRepository = null;
    let sourceBean = null;
    let bean1 = null;
    let bean2 = null;
    let bean3 = null;

    beforeEach(function() {
        let dolphin = {};

        classRepository = new ClassRepository(dolphin);
        beanManager = new BeanManager(classRepository);

        let simpleClassModel = {
            id: 'SimpleClass',
            attributes: [
                { propertyName: 'text', value: consts.STRING }
            ]
        };
        classRepository.registerClass(simpleClassModel);
        let complexClassModel = {
            id: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', value: consts.REMOTING_BEAN }
            ]
        };
        classRepository.registerClass(complexClassModel);

        let sourceModel = {
            id: 'source_id',
            presentationModelType: 'ComplexClass',
            attributes: [
                { propertyName: 'referenceList', onValueChange: function() {} }
            ],
            findAttributeByPropertyName: function() {}
        };
        sourceBean = classRepository.load(sourceModel);

        let bean1Model = {
            id: 'id1',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean1 = classRepository.load(bean1Model);
        let bean2Model = {
            id: 'id2',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean2 = classRepository.load(bean2Model);
        let bean3Model = {
            id: 'id3',
            presentationModelType: 'SimpleClass',
            attributes: [
                { propertyName: 'textProperty', onValueChange: function() {} }
            ]
        };
        bean3 = classRepository.load(bean3Model);
    });


    it('should replace single entry in beginning', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 0 };
        let to        = { value: 1 };
        let count     = { value: 1 };
        let element   = { value: 'id1' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 0, 1, [bean1]);
    }));

    it('should replace element with null in beginning', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 0 };
        let to        = { value: 1 };
        let count     = { value: 1 };
        let element   = { value: null };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 0, 1, [null]);
    }));

    it('should replace multiple entries in beginning with more elements', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 0 };
        let to        = { value: 2 };
        let count     = { value: 3 };
        let element1  = { value: 'id1' };
        let element2  = { value: 'id2' };
        let element3  = { value: 'id3' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);
        model.findAttributeByPropertyName.withArgs('2').returns(element3);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 0, 2, [bean1, bean2, bean3]);
    }));

    it('should replace multiple entries in beginning with less elements', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 0 };
        let to        = { value: 3 };
        let count     = { value: 2 };
        let element1  = { value: 'id1' };
        let element2  = { value: 'id2' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 0, 3, [bean1, bean2]);
    }));


    it('should replace single entry in middle / at end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 1 };
        let to        = { value: 2 };
        let count     = { value: 1 };
        let element   = { value: 'id1' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 1, 1, [bean1]);
    }));

    it('should replace element with null in middle / at end', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 1 };
        let to        = { value: 2 };
        let count     = { value: 1 };
        let element   = { value: null };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 1, 1, [null]);
    }));

    it('should replace multiple entries in middle / at end with more elements', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        beanManager.onArrayUpdate(onArrayUpdateHandler);

        let model = {
            findAttributeByPropertyName: this.stub()
        };
        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 1 };
        let to        = { value: 3 };
        let count     = { value: 3 };
        let element1  = { value: 'id1' };
        let element2  = { value: 'id2' };
        let element3  = { value: 'id3' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);
        model.findAttributeByPropertyName.withArgs('2').returns(element3);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 1, 2, [bean1, bean2, bean3]);
    }));

    it.only('should replace multiple entries in middle / at end with less elements', sinon.test(function() {
        let onArrayUpdateHandler = this.spy();
        let model = {
            findAttributeByPropertyName: this.stub()
        };
        classRepository.beanToDolphin.set(model, 'source_id');
        beanManager.onArrayUpdate(model, onArrayUpdateHandler);

        let source    = { value: 'source_id' };
        let attribute = { value: 'referenceList' };
        let from      = { value: 1 };
        let to        = { value: 4 };
        let count     = { value: 2 };
        let element1  = { value: 'id1' };
        let element2  = { value: 'id2' };
        model.findAttributeByPropertyName.withArgs('source').returns(source);
        model.findAttributeByPropertyName.withArgs('attribute').returns(attribute);
        model.findAttributeByPropertyName.withArgs('from').returns(from);
        model.findAttributeByPropertyName.withArgs('to').returns(to);
        model.findAttributeByPropertyName.withArgs('count').returns(count);
        model.findAttributeByPropertyName.withArgs('0').returns(element1);
        model.findAttributeByPropertyName.withArgs('1').returns(element2);

        classRepository.spliceListEntry(model);
        sinon.assert.calledWith(onArrayUpdateHandler, sourceBean, 'referenceList', 1, 3, [bean1, bean2]);
    }));
});
