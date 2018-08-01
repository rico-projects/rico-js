import { HTTP } from '../platform/constants'
import { exists } from '../utils';
import { LoggerFactory } from '../logging';
import { KeycloakConnection } from './keycloakConnection';

class KeycloakFunctions {

    constructor() {
        this.connection = new KeycloakConnection();
    }

    createLoginConnection(directConnection, authEndpoint, realmName, appName, user, password) {
        let connection;
        let content;

        const encodedUser = encodeURIComponent(user);
        const encodedPassword = encodeURIComponent(password);
        const encodedAppName = encodeURIComponent(appName);

        if (directConnection) {
            if (exists(appName)) {
                connection = this.connection.createDirectConnection(authEndpoint,realmName);
                content = 'client_id=' + encodedAppName + '&username=' + encodedUser + '&password=' + encodedPassword + '&grant_type=password';
            } else {
                throw Error('No app name set!');
            }
        } else {
            connection = this.connection.createServerProxyConnection(authEndpoint, realmName);
            content = 'username=' + encodedUser + '&password=' + encodedPassword + '&grant_type=password';
        }

        return { connection, content };
    }

    createRefreshConnection(directConnection, authEndpoint, realmName, appName, refreshToken) {
        let connection;
        let content;

        const encodedAppName = encodeURIComponent(appName);

        if (directConnection) {
            if (exists(appName)) {
                connection = this.connection.createDirectConnection(authEndpoint, realmName);
                content = 'grant_type=refresh_token&refresh_token=' + refreshToken + '&client_id=' + encodedAppName;
            } else {
                throw Error('No app name set!');
            }
        } else {
            connection = this.connection.createServerProxyConnection(authEndpoint, realmName);
            content = 'grant_type=refresh_token&refresh_token=' + refreshToken;
        }

        return { connection, content };
    }

    receiveToken(httpRequest, body) {
        return new Promise((resolve, reject) => {
            httpRequest.ontimeout = function (error) {
                reject(error);
            }

            httpRequest.onerror = function (error) {
                reject(error);
            }

            httpRequest.onreadystatechange = function () {
                if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status === HTTP.STATUS.OK) {
                    resolve(this.response);
                } else if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status !== HTTP.STATUS.OK) {
                    reject(this.status);
                }
            }
            
            KeycloakFunctions.LOGGER.trace('Receiving token');
            httpRequest.send(body);
        });
    }

    refreshToken(directConnection, authEndpoint, realmName, appName, refreshToken) {
        const { connection, content } = this.createRefreshConnection(directConnection, authEndpoint, realmName, appName, refreshToken);
        return this.receiveToken(connection, content);
    }
    
}

KeycloakFunctions.LOGGER = LoggerFactory.getLogger('KeycloakFunctions');

export { KeycloakFunctions }