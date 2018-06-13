/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';

import { HTTP } from '../../../src/platform/constants';

describe('HTTP Method Names', function() {

    it('GET', function() {
        expect(HTTP.METHOD.GET).to.be.equal('GET');
    });

    it('POST', function() {
        expect(HTTP.METHOD.POST).to.be.equal('POST');
    });

    it('DELETE', function() {
        expect(HTTP.METHOD.DELETE).to.be.equal('DELETE');
    });

    it('PUT', function() {
        expect(HTTP.METHOD.PUT).to.be.equal('PUT');
    });

});