/*jslint browserify: true, mocha: true, expr: true */
/*eslint-env browser, mocha */
"use strict";

import { expect } from 'chai';
import sinon from 'sinon';
import sinonTest from 'sinon-test'
sinon.test = sinonTest(sinon);

import { Client } from '../../../src/platform/client';
import { register as registerHttp } from '../../../src/http';
import { register as registerClientScope } from '../../../src/platform/clientScope';
import { HTTP } from '../../../src/platform/constants';

describe('ClientScope', function() {

    const headerName = HTTP.HEADER_NAME.X_CLIENT_SESSION_ID;

    before(function() {
        registerHttp(Client);
        registerClientScope(Client);
        Client.init();
    });

    after(function() {
        // Clean up Client
        Client.services = new Map();
        Client.serviceProviders = new Map();
        Client.configuration = {};
    });

    it('ClientScope is an object and service', function() {
        const found = Client.hasService('ClientScope');
        const clientScope = Client.getService('ClientScope');

        // then:
        expect(found).to.be.true;
        expect(clientScope).to.exist;
    });

    it('ClientScope handleResponse and handleRequest', sinon.test(function() {
        const clientScope = Client.getService('ClientScope');

        const response = {
            url: 'https://www.example.com:8080/remoting',
            getHeaderByName: function() {}
        }
        const request = {
            url: 'https://www.example.com:8080/remoting',
            setRequestHeader: function() {}
        }
        sinon.spy(request, 'setRequestHeader');
        sinon.stub(response, 'getHeaderByName').callsFake(function() { return 'abcdefg' });

        clientScope.handleResponse(response);
        clientScope.handleRequest(request);

        expect(response.getHeaderByName.calledOnce).to.be.true;
        expect(request.setRequestHeader.calledWithMatch(headerName, 'abcdefg')).to.be.true;

    }));

    it('ClientScope handleResponse with different client Id', sinon.test(function() {
        const clientScope = Client.getService('ClientScope');

        const response = {
            url: 'https://www.example.com:8080/remoting',
            getHeaderByName: function() {}
        }

        let result = 'abcdefg';
        sinon.stub(response, 'getHeaderByName').callsFake(function() { return result });
        clientScope.handleResponse(response);
        result = '12345';
        let message = null;
        try {
            clientScope.handleResponse(response);
        } catch (error) {
            message = error.message;
            
        }
        expect(message).to.be.equals('Client Id does not match!');
        

    }));

});