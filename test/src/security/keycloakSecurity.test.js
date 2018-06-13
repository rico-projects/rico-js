/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test'
sinon.test = sinonTest(sinon);

import { HTTP, SECURITY } from '../../../src/platform/constants';
import { Client } from '../../../src/platform/client';
import { register as registerHttp } from '../../../src/http';
import { register as registerSecurity } from '../../../src/security';
import { KeycloakSecurity } from '../../../src/security/keycloakSecurity'

describe('Security', function() {

    let server;
    let clock;

    const responseHeaders = {};
    responseHeaders[HTTP.HEADER_NAME.CONTENT_TYPE] = HTTP.CONTENT_TYPE.APPLICATION_JSON;

    const validToken = '{"access_token": "test", "refresh_token": "refreshme", "expires_in": "30000"}';
    const invalidToken = '{"foo": "bar"}';

    before(function() {
        registerHttp(Client);
        registerSecurity(Client);
        Client.init();
    });

    after(function() {
        // Clean up Client
        Client.services = new Map();
        Client.serviceProviders = new Map();
        Client.configuration = {};
    });

    beforeEach(function() {
        server = sinon.createFakeServer();
        clock = sinon.useFakeTimers();
    });

    afterEach(function() {
        server.restore();
        clock.restore();
    });

    it('create new instance', function() {
        const keycloakSecurity = new KeycloakSecurity();
        expect(keycloakSecurity).to.be.exist;
    });

    it('is not authorized', function() {
        const keycloakSecurity = new KeycloakSecurity();
        expect(keycloakSecurity.isAuthorized()).to.be.false;
    });

    it('correct login', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password')
        .then((token) => {
            expect(token).to.be.equal('test');
            expect(keycloakSecurity.isAuthorized()).to.be.true;
            done();
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
        expect(server.requests[0].requestBody).to.be.equal('username=user&password=password&grant_type=password');
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM]).to.not.exist;
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.CONTENT_TYPE]).to.be.equal(HTTP.CONTENT_TYPE.TEXT_PLAIN +';charset=utf-8');
    });

    it('invaild token response', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, 'Huh?']);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password')
        .catch((error) => {
            expect(error).to.be.exist;
            expect(error).to.be.be.equal('No access token found');
            expect(keycloakSecurity.isAuthorized()).to.be.false;
            done();
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
    });

    it('invaild token object response', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, invalidToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password')
        .catch((error) => {
            expect(error).to.be.exist;
            expect(error).to.be.be.equal('No access token found');
            expect(keycloakSecurity.isAuthorized()).to.be.false;
            done();
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
    });

    it('HTTP status not 200', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.UNAUTHORIZED, responseHeaders, invalidToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password')
        .catch((error) => {
            expect(error).to.be.exist;
            expect(error).to.be.be.equal(HTTP.STATUS.UNAUTHORIZED);
            expect(keycloakSecurity.isAuthorized()).to.be.false;
            done();
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
    });

    it('correct login and logut', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password')
        .then((token) => {
            expect(token).to.be.equal('test');
            expect(keycloakSecurity.isAuthorized()).to.be.true;
            keycloakSecurity.logout().then(() => {
                expect(keycloakSecurity.isAuthorized()).to.be.false;
                done();
            });
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
    });

    it('correct login with different endpoint', function(done) {
        server.respondWith(HTTP.METHOD.POST, 'http://www.example.com:9001/openid-connect', [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password', { authEndpoint: 'http://www.example.com:9001/openid-connect' })
        .then((token) => {
            expect(token).to.be.equal('test');
            expect(keycloakSecurity.isAuthorized()).to.be.true;
            done();
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
    });

    it('correct login with direct connection, realm and app name', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT + '/auth/realms/rico/protocol/openid-connect/token', [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password', { directConnection: true, realmName: 'rico', appName: 'rico-client' })
        .then((token) => {
            expect(token).to.be.equal('test');
            expect(keycloakSecurity.isAuthorized()).to.be.true;
            done();
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM]).to.not.exist;
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.CONTENT_TYPE]).to.be.equal(HTTP.CONTENT_TYPE.APPLICATION_X_WWW_FORM_URLENCODED + ';charset=utf-8');
        expect(server.requests[0].requestBody).to.be.equal('client_id=rico-client&username=user&password=password&grant_type=password');
    });

    it('correct login with proxy connection, realm and app name', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password', { directConnection: false, realmName: 'rico', appName: 'rico-client' })
        .then((token) => {
            expect(token).to.be.equal('test');
            expect(keycloakSecurity.isAuthorized()).to.be.true;
            done();
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM]).to.be.equal('rico');
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.CONTENT_TYPE]).to.be.equal(HTTP.CONTENT_TYPE.TEXT_PLAIN + ';charset=utf-8');
        expect(server.requests[0].requestBody).to.be.equal('username=user&password=password&grant_type=password');
    });

    it('correct login with proxy connection and app name, without realm name', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password', { directConnection: false, appName: 'rico-client' })
        .then((token) => {
            expect(token).to.be.equal('test');
            expect(keycloakSecurity.isAuthorized()).to.be.true;
            done();
        });

        server.respond();
        expect(server.requests.length).to.be.equal(1);
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM]).to.not.exist;
        expect(server.requests[0].requestHeaders[HTTP.HEADER_NAME.CONTENT_TYPE]).to.be.equal(HTTP.CONTENT_TYPE.TEXT_PLAIN + ';charset=utf-8');
        expect(server.requests[0].requestBody).to.be.equal('username=user&password=password&grant_type=password');
    });

    it('error without app name', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT + '/auth/realms/rico/protocol/openid-connect/token', [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        try {
            keycloakSecurity.login('user', 'password', { directConnection: true });
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.be.equal('No app name set!');
            done();
        }
    });

    it('error without app name', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT + '/auth/realms/rico/protocol/openid-connect/token', [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        try {
            keycloakSecurity.login('user', 'password', { directConnection: true, appName: 'rico-client' }); 
        } catch (error) {
            expect(error).to.exist;
            expect(error.message).to.be.equal('The parameter realmName is mandatory in createDirectConnection');
            done();
        }
    });

    it('HTTP client sends access token', function(done) {
        // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
        if (global.window) {
            const jdomWindow = global.window;
            global.window = {client: Client};
            server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);
            server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

            const keycloakSecurity = Client.getService('Security');
            keycloakSecurity.login('user', 'password').then(() => {
                const httpClient = Client.getService('HttpClient');
                httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute().then(() => { 
                    expect(server.requests.length).to.be.equal(2);
                    expect(server.requests[1].requestHeaders[HTTP.HEADER_NAME.AUTHORIZATION]).to.be.equal('Bearer test');
                    expect(server.requests[1].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_BEARER_ONLY]).to.be.equal('true');

                    keycloakSecurity.logout();
                    done();
                });
                server.respond();

                global.window = jdomWindow;

            });

            server.respond();        
        }
    });

    it('HTTP client sends realm', function(done) {
        // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
        if (global.window) {
            const jdomWindow = global.window;
            global.window = {client: Client};
            server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);
            server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

            const keycloakSecurity = Client.getService('Security');
            keycloakSecurity.login('user', 'password', { realmName: 'rico' }).then(() => {
                const httpClient = Client.getService('HttpClient');
                httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute().then(() => { 
                    expect(server.requests.length).to.be.equal(2);
                    expect(server.requests[1].requestHeaders[HTTP.HEADER_NAME.AUTHORIZATION]).to.be.equal('Bearer test');
                    expect(server.requests[1].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_BEARER_ONLY]).to.be.equal('true');
                    expect(server.requests[1].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM]).to.be.equal('rico');

                    keycloakSecurity.logout();
                    done();
                });
                server.respond();

                global.window = jdomWindow;

            });

            server.respond();        
        }
        
    });

    it('HTTP client sends appName', function(done) {
        // this test expects to be executed in a Node.JS, Mocha+JSDOM environment
        if (global.window) {
            const jdomWindow = global.window;
            global.window = {client: Client};
            server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);
            server.respondWith(HTTP.METHOD.GET, 'https://test-mock-server.com', 'Hallo Google!');

            const keycloakSecurity = Client.getService('Security');
            keycloakSecurity.login('user', 'password', { appName: 'default-rico-client' }).then(() => {
                const httpClient = Client.getService('HttpClient');
                httpClient.get('https://test-mock-server.com').withoutContent().withoutResult().execute().then(() => { 
                    expect(server.requests.length).to.be.equal(2);
                    expect(server.requests[1].requestHeaders[HTTP.HEADER_NAME.AUTHORIZATION]).to.be.equal('Bearer test');
                    expect(server.requests[1].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_BEARER_ONLY]).to.be.equal('true');
                    expect(server.requests[1].requestHeaders[HTTP.HEADER_NAME.X_PLATFORM_SECURITY_APPLICATION]).to.be.equal('default-rico-client');

                    keycloakSecurity.logout();
                    done();
                });
                server.respond();

                global.window = jdomWindow;

            });

            server.respond();        
        }
        
    });

    it('refresh token', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password').then(() => {
            clock.tick(60000);
            expect(server.requests.length).to.be.equal(3);
            expect(server.requests[0].requestBody).to.be.equal('username=user&password=password&grant_type=password');
            expect(server.requests[1].requestBody).to.be.equal('grant_type=refresh_token&refresh_token=refreshme');
            expect(server.requests[2].requestBody).to.be.equal('grant_type=refresh_token&refresh_token=refreshme');
            done();
        });
        server.respond();
    });

    it('try to login twice', function(done) {
        server.respondWith(HTTP.METHOD.POST, SECURITY.AUTH_ENDPOINT, [HTTP.STATUS.OK, responseHeaders, validToken]);

        const keycloakSecurity = new KeycloakSecurity();
        keycloakSecurity.login('user', 'password')
        .then(() => {
            try {
                keycloakSecurity.login('user', 'password');
            } catch (error) {
                expect(error.message).to.be.equal('Already logged in!');
                done();
            }
        });

        server.respond();
    });
    
});