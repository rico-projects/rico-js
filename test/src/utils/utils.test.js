/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';

import { exists, parseUrl, checkMethod, checkParam } from '../../../src/utils';

describe('utils.exists()', function() {
    it('undefined', function() {
        expect(exists(undefined)).to.be.false;
    });

    it('null', function() {
        expect(exists(null)).to.be.false;
    });

    it('boolean', function() {
        expect(exists(false)).to.be.true;
    });

    it('number', function() {
        expect(exists(0)).to.be.true;
    });

    it('string', function() {
        expect(exists('')).to.be.true;
    });

    it('object', function() {
        expect(exists({})).to.be.true;
    });

    it('array', function() {
        expect(exists([])).to.be.true;
    });

    it('function', function() {
        expect(exists(function() {})).to.be.true;
    });

    it('checkParam', function() {
        try {
            checkMethod('dummyMethod')
            checkParam(null, 'dummyParam');
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.be.equal('The parameter dummyParam is mandatory in dummyMethod');
        }
        
    });

});


describe('utils.parseUrl()', function() {

    let fullURL;
    let defaultHTTPURL;
    let defaultHTTPSURL;
    let relativeURL;

    beforeEach(function() {
        fullURL = 'https://foo:bar@www.example.com:8080/remoting?one=1&two=2&three=3#sample';
        defaultHTTPURL = 'http://www.example.com';
        defaultHTTPSURL = 'https://www.example.com';
        relativeURL = './remoting?one=1&two=2&three=3#sample';
    })

    it('scheme of full URL', function() {
        const result = parseUrl(fullURL);
        expect(result.scheme).to.be.equal('https');
    });

    it('user of full URL', function() {
        const result = parseUrl(fullURL);
        expect(result.user).to.be.equal('foo');
    });

    it('password of full URL', function() {
        const result = parseUrl(fullURL);
        expect(result.password).to.be.equal('bar');
    });

    it('hostname of full URL', function() {
        const result = parseUrl(fullURL);
        expect(result.hostname).to.be.equal('www.example.com');
    });

    it('port of full URL', function() {
        const result = parseUrl(fullURL);
        expect(result.port).to.be.equal(8080);
    });

    it('path of full URL', function() {
        const result = parseUrl(fullURL);
        expect(result.path).to.be.equal('/remoting');
    });

    it('query of full URL', function() {
        const result = parseUrl(fullURL);
        expect(result.query.one).to.be.equal('1');
        expect(result.query.two).to.be.equal('2');
        expect(result.query.three).to.be.equal('3');
    });

    it('fragment of full URL', function() {
        const result = parseUrl(fullURL);
        expect(result.fragment).to.be.equal('sample');
    });

    it('port of default HTTP URL', function() {
        const result = parseUrl(defaultHTTPURL);
        expect(result.port).to.be.equal(80);
    });

    it('port of default HTTPS URL', function() {
        const result = parseUrl(defaultHTTPSURL);
        expect(result.port).to.be.equal(443);
    });

    it('relative URL', function() {
        // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
        if (global.window) {
            const jdomWindow = global.window;
            global.window = {location: {hostname: 'window.com', port: 8080, protocol: 'https:'}};

            const result = parseUrl(relativeURL);

            expect(result.hostname).to.be.equal('window.com');
            expect(result.port).to.be.equal(8080);
            expect(result.scheme).to.be.equal('https');
            expect(result.path).to.be.equal('/remoting');
            expect(result.query.one).to.be.equal('1');
            expect(result.query.two).to.be.equal('2');
            expect(result.query.three).to.be.equal('3');
            expect(result.fragment).to.be.equal('sample');
            
            global.window = jdomWindow;
        }
    });

    it('relative URL missing window location', function() {
        // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
        if (global.window) {
            const jdomWindow = global.window;
            global.window = {};

            const result = parseUrl(relativeURL);

            expect(result.hostname).to.not.exist;
            expect(result.port).to.not.exist;
            expect(result.scheme).to.not.exist;
            expect(result.path).to.be.equal('/remoting');
            expect(result.query.one).to.be.equal('1');
            expect(result.query.two).to.be.equal('2');
            expect(result.query.three).to.be.equal('3');
            expect(result.fragment).to.be.equal('sample');
            
            global.window = jdomWindow;
        }
    });

});