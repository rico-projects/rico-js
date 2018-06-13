/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';

import { HttpClientInterceptor } from '../../../src/http/httpClientInterceptor';

describe('HttpClientInterceptor', function() {

    it('create', function() {
        const httpClientInterceptor = new HttpClientInterceptor();

        expect(httpClientInterceptor).to.exist;
    });

    it('Add request interceptors', function() {
        const httpClientInterceptor = new HttpClientInterceptor();
        httpClientInterceptor.addRequestInterceptor(() => 'abcd');
        httpClientInterceptor.addRequestInterceptor(() => '12345');

        expect(httpClientInterceptor.getRequestInterceptors()).to.exist;
        expect(httpClientInterceptor.getRequestInterceptors().length).to.be.equals(2);
        expect(httpClientInterceptor.getRequestInterceptors()[0]()).to.be.equal('abcd');
        expect(httpClientInterceptor.getRequestInterceptors()[1]()).to.be.equal('12345');
    });

    it('Add response interceptors', function() {
        const httpClientInterceptor = new HttpClientInterceptor();
        httpClientInterceptor.addResponseInterceptor(() => 'abcd');
        httpClientInterceptor.addResponseInterceptor(() => '12345');

        expect(httpClientInterceptor.getResponseInterceptors()).to.exist;
        expect(httpClientInterceptor.getResponseInterceptors().length).to.be.equals(2);
        expect(httpClientInterceptor.getResponseInterceptors()[0]()).to.be.equal('abcd');
        expect(httpClientInterceptor.getResponseInterceptors()[1]()).to.be.equal('12345');
    });

});