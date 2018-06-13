/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';
import sinon from 'sinon';

import { HTTP } from '../../../src/platform/constants';
import { HttpClient } from '../../../src/http/httpClient';
import { HttpException } from '../../../src/http/httpException';
import { HttpResponse } from '../../../src/http/httpResponse';
import { Client } from '../../../src/platform/client';
import { register as registerClientScope } from '../../../src/platform/clientScope';
import { register as registerHttp } from '../../../src/http';

import {LoggerFactory, LogLevel} from '../../../src/logging/index';

describe('HttpClient', function() {

    let server;

    before(function() {
        registerHttp(Client);
        registerClientScope(Client);
        Client.init();
        // Set NONE for later tests
        LoggerFactory.getLogger().setLogLevel(LogLevel.NONE);
    });

    after(function() {
        // Clean up Client
        Client.services = new Map();
        Client.serviceProviders = new Map();
        Client.configuration = {};
    });

    beforeEach(function() {
        server = sinon.createFakeServer();
    });

    afterEach(function() {
        server.restore();
    });

    it('simple HTTP GET, without content, without result', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute().then(() => { done() });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('simple HTTP POST, without content, without result', function(done) {
        server.respondWith(HTTP.METHOD.POST, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.post('https://test-mock-server.com').withoutContent().withoutResult().execute().then(() => { done() });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('simple HTTP PUT, without content, without result', function(done) {
        server.respondWith('PUT', 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.put('https://test-mock-server.com').withoutContent().withoutResult().execute().then(() => { done() });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('simple HTTP DELETE, without content, without result', function(done) {
        server.respondWith('DELETE', 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.delete('https://test-mock-server.com').withoutContent().withoutResult().execute().then(() => { done() });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
        expect(server.requests[0].requestBody).not.to.exist;
    });

    it('simple HTTP GET, with content, without result', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withContent('Test').withoutResult().execute().then(() => { done() });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
        expect(server.requests[0].requestBody).to.be.equal('Test');
    });

    it('simple HTTP GET, without content, with string result', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withoutContent().readString().execute().then((response) => {
            expect(response).to.be.instanceOf(HttpResponse);
            expect(response.content).to.be.equal('Hallo Google!');
            expect(response.status).to.be.equal(HTTP.STATUS.OK);
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('simple HTTP GET, without content, with object result', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', [HTTP.STATUS.OK, { "Content-Type": "application/json" }, '{ "message": "Hallo Google!" }']);

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withoutContent().readObject().execute().then((response) => {
            expect(response).to.be.instanceOf(HttpResponse);
            expect(response.content.message).to.be.equal('Hallo Google!');
            expect(response.status).to.be.equal(HTTP.STATUS.OK);
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('simple HTTP GET, without content, with bytes result', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withoutContent().readBytes().execute().then((response) => {
            expect(response).to.be.instanceOf(HttpResponse);
            expect(response.content).to.be.instanceOf(ArrayBuffer);
            expect(response.content.byteLength).to.be.equal(13);
            expect(response.status).to.be.equal(HTTP.STATUS.OK);
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('simple HTTP GET, without content, without result, HTTP 404', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', [HTTP.STATUS.NOT_FOUND, { }, '']);

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute().catch((exception) => {
            expect(exception).to.be.instanceOf(HttpException);
            expect(exception.status).to.be.equal(HTTP.STATUS.NOT_FOUND);
            expect(exception.timedout).to.be.equal(false);
            expect(exception.message).to.be.equal('Not Found');
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('simple HTTP GET, without content, without result, with custom header', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withHeader('X-Client-Id', '12345').withoutContent().withoutResult().execute().then((response) => {
            expect(response).to.be.instanceOf(HttpResponse);
            expect(response.content).to.be.equal('Hallo Google!');
            expect(response.status).to.be.equal(HTTP.STATUS.OK);
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
        expect(server.requests[0].requestHeaders['X-Client-Id']).to.be.equal('12345');
    });

    it('simple HTTP GET, without content, without result, with multiple custom headers', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withHeader('X-Client-Id', '12345').withHeader('X-Dummy', 'abcd').withoutContent().withoutResult().execute().then((response) => {
            expect(response).to.be.instanceOf(HttpResponse);
            expect(response.content).to.be.equal('Hallo Google!');
            expect(response.status).to.be.equal(HTTP.STATUS.OK);
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
        expect(Object.keys(server.requests[0].requestHeaders).length).to.be.equal(3);
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.X_CLIENT_ID]).to.be.equal('12345');
        expect(server.requests[0].requestHeaders['X-Dummy']).to.be.equal('abcd');
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.CONTENT_TYPE]).to.be.equal('text/plain;charset=utf-8');
    });

    it('simple HTTP GET, without content, without result, with header info', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withHeadersInfo({'X-Client-Id': '12345'}).withoutContent().withoutResult().execute().then((response) => {
            expect(response).to.be.instanceOf(HttpResponse);
            expect(response.content).to.be.equal('Hallo Google!');
            expect(response.status).to.be.equal(HTTP.STATUS.OK);
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.X_CLIENT_ID]).to.be.equal('12345');
    });

    it('simple HTTP GET, without content, without result, with not existing header info', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withHeadersInfo(null).withoutContent().withoutResult().execute().then((response) => {
            expect(response).to.be.instanceOf(HttpResponse);
            expect(response.content).to.be.equal('Hallo Google!');
            expect(response.status).to.be.equal(HTTP.STATUS.OK);
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('HTTP GET, without content, without result, network error', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', function(request) {
            request.error();
        });

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute().catch((exception) => {
            expect(exception).to.be.instanceOf(HttpException);
            expect(exception.status).to.be.equal(0);
            expect(exception.timedout).to.be.equal(false);
            expect(exception.message).to.be.equal('Unspecified error occured');
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('HTTP GET, without content, without result, network error with text', function(done) {
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', function(request) {
            request.statusText = 'Hola!';
            request.error();
        });

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute().catch((exception) => {
            expect(exception).to.be.instanceOf(HttpException);
            expect(exception.status).to.be.equal(0);
            expect(exception.timedout).to.be.equal(false);
            expect(exception.message).to.be.equal('Hola!');
            done();
        });
        server.respond();

        expect(server.requests.length).to.be.equal(1);
    });

    it('HTTP GET, without content, without result, timeout error', function(done) {
        const clock = sinon.useFakeTimers();
        server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

        const httpClient = new HttpClient();
        httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute(5).catch((exception) => {
            expect(exception).to.be.instanceOf(HttpException);
            expect(exception.status).to.be.equal(0);
            expect(exception.timedout).to.be.equal(true);
            expect(exception.message).to.be.equal('Timeout occurred');
            done();
        });
        clock.tick(20000);

        expect(server.requests.length).to.be.equal(1);
        clock.restore();
    });

    it('simple HTTP GET, with client scope interceptor which stores client id', function() {
        // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
        if (global.window) {
            const jdomWindow = global.window;
            global.window = {client: Client};

            const headers = {};
            headers[HTTP.HEADER_NAME.X_CLIENT_SESSION_ID] = 'abcd-efgh-ijkl-mopq';

            server.respondWith([HTTP.STATUS.OK, headers, 'Hallo Google!']);

            const httpClient = Client.getService('HttpClient');
            httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute();
            server.respond();

            expect(server.requests.length).to.be.equal(1);
            expect(Client.getService('ClientScope').getClientId('https://test-mock-server.com')).to.be.equal('abcd-efgh-ijkl-mopq');

            // Clean up
            Client.getService('ClientScope').clientIds = new Map();
            global.window = jdomWindow;
        }
        
    });

    it('simple HTTP GET, with client scope interceptor which uses client id', function() {
        // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
        if (global.window) {
            const jdomWindow = global.window;
            global.window = {client: Client};

            const headers = {};
            headers[HTTP.HEADER_NAME.X_CLIENT_SESSION_ID] = 'abcd-efgh-ijkl-mopq';

            server.respondWith([HTTP.STATUS.OK, headers, 'Hallo Google!']);

            const httpClient = Client.getService('HttpClient');
            httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute();
            server.respond();

            httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute();
            server.respond();

            expect(server.requests.length).to.be.equal(2);
            expect(server.requests[0].requestHeaders['X-Client-Session-Id']).to.not.exist;
            expect(server.requests[1].requestHeaders['X-Client-Session-Id']).to.be.equal('abcd-efgh-ijkl-mopq');

            // Clean up
            Client.getService('ClientScope').clientIds = new Map();
            global.window = jdomWindow;
        }
        
    });

});