/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';

import { ServiceProvider } from '../../../src/platform/serviceProvider';

describe('ServiceProvider', function() {

    it('create', function() {
        class Test {

        }

        const serviceProvider = new ServiceProvider(Test, 'Test');

        expect(serviceProvider).to.exist;
    });

    it('correct name', function() {
        class Test {

        }

        const serviceProvider = new ServiceProvider(Test, 'Test');

        expect(serviceProvider.getName()).to.be.equal('Test');
    });

    it('has correct instance', function() {
        class Test {

        }

        const serviceProvider = new ServiceProvider(Test, 'Test');

        expect(serviceProvider.getService()).to.be.instanceOf(Test);
    });

});