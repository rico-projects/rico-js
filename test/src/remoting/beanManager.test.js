/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test'
sinon.test = sinonTest(sinon);

import BeanManager from '../../../src/remoting/beanManager';

describe('BeanManager', function() {

    let classRepositoryMock = {
        onBeanAdded: () => {},
        onBeanRemoved: () => {},
        onBeanUpdate: () => {},
        onArrayUpdate: () => {},
        notifyBeanChange: () => {},
        notifyArrayChange: () => {},
    }

    it('create', function() {

        const beanManager = new BeanManager(classRepositoryMock);

        expect(beanManager).to.exist;
    });

    it('register onAdded handler', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onAdded(spy);

        expect(result).to.exist;
        expect(result.unsubscribe).to.exist;
        expect(beanManager.allAddedHandlers.length).to.be.equal(1);
    });

    it('register onAdded handler with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onAdded(type, spy);

        expect(result).to.exist;
        expect(result.unsubscribe).to.exist;
        expect(beanManager.addedHandlers.size).to.be.equal(1);
        expect(beanManager.addedHandlers.get(type)).to.exist;
        expect(beanManager.addedHandlers.get(type).length).to.be.equal(1);
        expect(beanManager.addedHandlers.get(type)[0]).to.be.equal(spy);
    });

    it('unsubscribe onAdded handler', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onAdded(spy);
        result.unsubscribe();

        expect(beanManager.allAddedHandlers.length).to.be.equal(0);
    });

    it('unsubscribe onAdded handler with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onAdded(type, spy);
        result.unsubscribe();

        expect(beanManager.addedHandlers.size).to.be.equal(1);
        expect(beanManager.addedHandlers.get(type)).to.exist;
        expect(beanManager.addedHandlers.get(type).length).to.be.equal(0);
    });

    it('register onRemoved handler', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onRemoved(spy);

        expect(result).to.exist;
        expect(result.unsubscribe).to.exist;
        expect(beanManager.allRemovedHandlers.length).to.be.equal(1);
    });

    it('register onRemoved handler with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onRemoved(type, spy);

        expect(result).to.exist;
        expect(result.unsubscribe).to.exist;
        expect(beanManager.removedHandlers.size).to.be.equal(1);
        expect(beanManager.removedHandlers.get(type)).to.exist;
        expect(beanManager.removedHandlers.get(type).length).to.be.equal(1);
        expect(beanManager.removedHandlers.get(type)[0]).to.be.equal(spy);
    });

    it('unsubscribe onRemoved handler', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onRemoved(spy);
        result.unsubscribe();

        expect(beanManager.allRemovedHandlers.length).to.be.equal(0);
    });

    it('unsubscribe onRemoved handler with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onRemoved(type, spy);
        result.unsubscribe();

        expect(beanManager.removedHandlers.size).to.be.equal(1);
        expect(beanManager.removedHandlers.get(type)).to.exist;
        expect(beanManager.removedHandlers.get(type).length).to.be.equal(0);
    });

    it('register onBeanUpdate handler', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onBeanUpdate(spy);

        expect(result).to.exist;
        expect(result.unsubscribe).to.exist;
        expect(beanManager.allUpdatedHandlers.length).to.be.equal(1);
    });

    it('register onBeanUpdate handler with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onBeanUpdate(type, spy);

        expect(result).to.exist;
        expect(result.unsubscribe).to.exist;
        expect(beanManager.updatedHandlers.size).to.be.equal(1);
        expect(beanManager.updatedHandlers.get(type)).to.exist;
        expect(beanManager.updatedHandlers.get(type).length).to.be.equal(1);
        expect(beanManager.updatedHandlers.get(type)[0]).to.be.equal(spy);
    });

    it('unsubscribe onBeanUpdate handler', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onBeanUpdate(spy);
        result.unsubscribe();

        expect(beanManager.allUpdatedHandlers.length).to.be.equal(0);
    });

    it('unsubscribe onBeanUpdate handler with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onBeanUpdate(type, spy);
        result.unsubscribe();

        expect(beanManager.updatedHandlers.size).to.be.equal(1);
        expect(beanManager.updatedHandlers.get(type)).to.exist;
        expect(beanManager.updatedHandlers.get(type).length).to.be.equal(0);
    });

    it('register onArrayUpdate handler', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onArrayUpdate(spy);

        expect(result).to.exist;
        expect(result.unsubscribe).to.exist;
        expect(beanManager.allArrayUpdatedHandlers.length).to.be.equal(1);
    });

    it('register onArrayUpdate handler with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onArrayUpdate(type, spy);

        expect(result).to.exist;
        expect(result.unsubscribe).to.exist;
        expect(beanManager.arrayUpdatedHandlers.size).to.be.equal(1);
        expect(beanManager.arrayUpdatedHandlers.get(type)).to.exist;
        expect(beanManager.arrayUpdatedHandlers.get(type).length).to.be.equal(1);
        expect(beanManager.arrayUpdatedHandlers.get(type)[0]).to.be.equal(spy);
    });

    it('unsubscribe onArrayUpdate handler', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onArrayUpdate(spy);
        result.unsubscribe();

        expect(beanManager.allArrayUpdatedHandlers.length).to.be.equal(0);
    });

    it('unsubscribe onArrayUpdate handler with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        const result = beanManager.onArrayUpdate(type, spy);
        result.unsubscribe();

        expect(beanManager.arrayUpdatedHandlers.size).to.be.equal(1);
        expect(beanManager.arrayUpdatedHandlers.get(type)).to.exist;
        expect(beanManager.arrayUpdatedHandlers.get(type).length).to.be.equal(0);
    });

    it('call class repository on bean change', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.stub(classRepositoryMock, 'notifyBeanChange');
        beanManager.notifyBeanChange({ foo: 'bar'}, 'foo', 'moo');

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: 'bar'}, 'foo', 'moo')).to.be.true;
    });

    it('call class repository on array change', function() {

        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.stub(classRepositoryMock, 'notifyArrayChange');
        beanManager.notifyArrayChange({ foo: ['bar']}, 'foo', 0, 0, []);

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: ['bar']}, 'foo', 0, 0, [])).to.be.true;
    });

    it('call handler on bean added', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        beanManager.onAdded(spy);
        beanManager._handleBeanAdded(type, { foo: 'bar' });

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: 'bar' })).to.be.true;
    });

    it('call handler on bean added with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        beanManager.onAdded(type, spy);
        beanManager._handleBeanAdded(type, { foo: 'bar' });

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: 'bar' })).to.be.true;
    });

    it('call handler on bean removed', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        beanManager.onRemoved(spy);
        beanManager._handleBeanRemoved(type, { foo: 'bar' });

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: 'bar' })).to.be.true;
    });

    it('call handler on bean removed with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        beanManager.onRemoved(type, spy);
        beanManager._handleBeanRemoved(type, { foo: 'bar' });

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: 'bar' })).to.be.true;
    });

    it('call handler on bean update', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        beanManager.onBeanUpdate(spy);
        beanManager._handleBeanUpdate(type, { foo: 'bar' }, 'foo', 'bar', 'moo');

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: 'bar' }, 'foo', 'bar', 'moo')).to.be.true;
    });

    it('call handler on bean update with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        beanManager.onBeanUpdate(type, spy);
        beanManager._handleBeanUpdate(type, { foo: 'bar' }, 'foo', 'bar', 'moo');

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: 'bar' }, 'foo', 'bar', 'moo')).to.be.true;
    });

    it('call handler on array update', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        beanManager.onArrayUpdate(spy);
        beanManager._handleArrayUpdate(type, { foo: ['bar'] }, 'foo', 0, 0, []);

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: ['bar'] }, 'foo', 0, 0, [])).to.be.true;
    });

    it('call handler on array update with type', function() {

        const type = 'com.canoo.test.MyBean';
        const beanManager = new BeanManager(classRepositoryMock);
        const spy = sinon.spy();
        beanManager.onArrayUpdate(type, spy);
        beanManager._handleArrayUpdate(type, { foo: ['bar'] }, 'foo', 0, 0, []);

        expect(spy.calledOnce).to.be.true;
        expect(spy.calledWith({ foo: ['bar'] }, 'foo', 0, 0, [])).to.be.true;
    });

    describe('not implemented yet', function() {

        it('isManaged', function() {

            const beanManager = new BeanManager(classRepositoryMock);
    
            try {
                beanManager.isManaged({});
            } catch (error) {
                expect(error).to.exist;
                expect(error.message).to.be.equal('Not implemented yet');
            }
    
        });

        it('create', function() {

            const beanManager = new BeanManager(classRepositoryMock);
    
            try {
                beanManager.create({});
            } catch (error) {
                expect(error).to.exist;
                expect(error.message).to.be.equal('Not implemented yet');
            }
    
        });

        it('add', function() {

            const beanManager = new BeanManager(classRepositoryMock);
    
            try {
                beanManager.add({}, {});
            } catch (error) {
                expect(error).to.exist;
                expect(error.message).to.be.equal('Not implemented yet');
            }
    
        });

        it('addAll', function() {

            const beanManager = new BeanManager(classRepositoryMock);
    
            try {
                beanManager.addAll({}, {});
            } catch (error) {
                expect(error).to.exist;
                expect(error.message).to.be.equal('Not implemented yet');
            }
    
        });

        it('remove', function() {

            const beanManager = new BeanManager(classRepositoryMock);
    
            try {
                beanManager.remove({});
            } catch (error) {
                expect(error).to.exist;
                expect(error.message).to.be.equal('Not implemented yet');
            }
    
        });

        it('removeAll', function() {

            const beanManager = new BeanManager(classRepositoryMock);
    
            try {
                beanManager.removeAll({});
            } catch (error) {
                expect(error).to.exist;
                expect(error.message).to.be.equal('Not implemented yet');
            }
    
        });

        it('removeIf', function() {

            const beanManager = new BeanManager(classRepositoryMock);
    
            try {
                beanManager.removeIf({});
            } catch (error) {
                expect(error).to.exist;
                expect(error.message).to.be.equal('Not implemented yet');
            }
    
        });

    });

});