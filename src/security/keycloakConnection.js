import { checkMethod, checkParam, exists } from '../utils';
import { HTTP, RESPONSE_TYPE } from '../platform/constants'

class KeycloakConnection {

    constructor() {
    }

    createDirectConnection(authEndpoint, realmName) {
        checkMethod('createDirectConnection');
        checkParam(authEndpoint, 'authEndpoint');
        checkParam(realmName, 'realmName');

        const httpRequest = new XMLHttpRequest();
        httpRequest.open(HTTP.METHOD.POST, authEndpoint + '/auth/realms/' + realmName + '/protocol/openid-connect/token', true);
        httpRequest.setRequestHeader(HTTP.HEADER_NAME.CONTENT_TYPE, HTTP.CONTENT_TYPE.APPLICATION_X_WWW_FORM_URLENCODED);
        httpRequest.responseType = RESPONSE_TYPE.JSON;

        return httpRequest;
    }

    createServerProxyConnection(authEndpoint, realmName) {
        checkMethod('createServerProxyConnection');
        checkParam(authEndpoint, 'authEndpoint');

        const httpRequest = new XMLHttpRequest();
        httpRequest.open(HTTP.METHOD.POST, authEndpoint, true);
        httpRequest.setRequestHeader(HTTP.HEADER_NAME.CONTENT_TYPE, HTTP.CONTENT_TYPE.TEXT_PLAIN);
        if (exists(realmName)) {
            httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM, realmName);
        }
        httpRequest.responseType = RESPONSE_TYPE.JSON;

        return httpRequest;
    }

}

export { KeycloakConnection }