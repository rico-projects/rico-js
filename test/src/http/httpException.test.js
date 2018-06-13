/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';

import { HttpException } from '../../../src/http/httpException';

describe('HttpException', function() {

    it('getMessage', function() {
        const httpException = new HttpException('Foo', 200, false);

        expect(httpException.getMessage()).to.be.equal('Foo');
    });

    it('getStatus', function() {
        const httpException = new HttpException('Foo', 200, false);

        expect(httpException.getStatus()).to.be.equal(200);
    });

    it('isTimedout', function() {
        const httpException = new HttpException('Foo', 200, true);

        expect(httpException.isTimedout()).to.be.equal(true);
    });

    it('isTimedout, withot timedout set', function() {
        const httpException = new HttpException('Foo', 200);

        expect(httpException.isTimedout()).to.be.equal(false);
    });

});