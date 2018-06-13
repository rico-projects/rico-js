/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';

import { HttpResponse } from '../../../src/http/httpResponse';

describe('HttpResponse', function() {

    it('getContent', function() {
        const httpResponse = new HttpResponse('http://www.google.de', 200, 'Foo', '');

        expect(httpResponse.getContent()).to.be.equal('Foo');
    });

    it('getStatus', function() {
        const httpResponse = new HttpResponse('http://www.google.de', 200, 'Foo', '');

        expect(httpResponse.getStatus()).to.be.equal(200);
    });

    it('getHeaders for empty string', function() {
        const httpResponse = new HttpResponse('http://www.google.de', 200, 'Foo', '');

        expect(httpResponse.getHeaders()).to.be.deep.equal({});
    });

    it('Not existing headers', function() {
        const httpResponse = new HttpResponse('http://www.google.de', 200, 'Foo');

        expect(httpResponse.getHeaders()).to.be.deep.equal({});
    });

    it('getHeaders for with one entry', function() {
        const httpResponse = new HttpResponse('http://www.google.de', 200, 'Foo', 'Accept: */*');

        expect(httpResponse.getHeaders()).to.be.deep.equal({'accept': '*/*'});
        expect(httpResponse.getHeaderByName('accept')).to.be.equal('*/*');
        expect(Object.keys(httpResponse.getHeaders()).length).to.be.equal(1);
    });
    it('getHeaders for with more entry', function() {
        const httpResponse = new HttpResponse('http://www.google.de', 200, 'Foo', 'Accept: */*\r\nContent-Type: text/html; charset=UTF-8');

        expect(httpResponse.getHeaders()).to.be.deep.equal({'accept': '*/*', 'content-type': 'text/html; charset=UTF-8'});
        expect(httpResponse.getHeaderByName('accept')).to.be.equal('*/*');
        expect(httpResponse.getHeaderByName('content-type')).to.be.equal('text/html; charset=UTF-8');
        expect(Object.keys(httpResponse.getHeaders()).length).to.be.equal(2);
    });

});