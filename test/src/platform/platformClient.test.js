/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';

import { Client } from '../../../src/platform/client';
import { ServiceProvider } from '../../../src/platform/serviceProvider';

describe('Client', function() {

    let dummyServiceProvider;

    before(function() {
        class Dummy {

        }
        dummyServiceProvider = new ServiceProvider(Dummy, 'Dummy');
    });

    it('Register Service which is available afterwards', function() {
        Client.registerServiceProvider(dummyServiceProvider);

        const found = Client.hasService('Dummy');
        const dummy = Client.getService('Dummy');

        // then:
        expect(found).to.be.true;
        expect(dummy).to.exist;
    });

    it('Register undefined as service throws error', function() {
        let message = null;
        try {
            Client.registerServiceProvider(undefined);
        } catch (error) {
            message = error.message;
        }

        expect(message).to.be.equals('Cannot register empty service provider');
    });

    it('Register null as service throws error', function() {
        let message = null;
        try {
            Client.registerServiceProvider(null);
        } catch (error) {
            message = error.message;
        }

        expect(message).to.be.equals('Cannot register empty service provider');
    });

    it('Register same name throws error', function() {
        let message = null;
        try {
            Client.registerServiceProvider(dummyServiceProvider);
        } catch (error) {
            message = error.message;
        }

        expect(message).to.be.equals('Cannot register another service provider. Name already in use.');
    });

    it('Register without correct functions throws error', function() {
        let message = null;
        try {
            Client.registerServiceProvider({});
        } catch (error) {
            message = error.message;
        }

        expect(message).to.be.equals('Cannot register service provider without getName() and getService() methods');
    });

    it('Ask for unkown service', function() {
        const found = Client.hasService('Unkown');

        // then:
        expect(found).to.be.false;
    });

});