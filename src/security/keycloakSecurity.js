import { LoggerFactory } from '../logging';
import { exists, checkMethod, checkParam } from '../utils';
import { KeycloakFunctions } from './keycloakFunctions';
import { SecurityHttpClientInterceptor } from './securityHttpClientInterceptor';
import { SECURITY } from '../platform/constants'

class KeycloakSecurity {

    constructor() {
        this.functions = new KeycloakFunctions();
        this.interceptor = new SecurityHttpClientInterceptor();
        this.intervall = null;

        this.configuration = {
            directConnection: false,
            authEndpoint: SECURITY.AUTH_ENDPOINT,
            appName: null,
            realmName: null
        }
       
    }

    login(user, password, configuration) {
        if (this.isAuthorized()) {
            throw new Error('Already logged in!');
        }

        if (configuration) {
            this.configuration.directConnection = configuration.directConnection || this.configuration.directConnection;
            this.configuration.authEndpoint = configuration.authEndpoint || this.configuration.authEndpoint;
            this.configuration.appName = configuration.appName || this.configuration.appName;
            this.configuration.realmName = configuration.realmName || this.configuration.realmName;
        }

        const { directConnection, authEndpoint, appName, realmName } = this.configuration;

        const { connection, content } = this.functions.createLoginConnection(directConnection, authEndpoint, realmName, appName, user, password);
        const self = this;
        return new Promise((resolve, reject) => {
            KeycloakSecurity.LOGGER.debug('Receiving access token');
            this.functions.receiveToken(connection, content)
            .then((result) => {
                if (result && result.access_token) {
                    self.token = result;
                    this.interceptor.setToken(result.access_token);
                    this.interceptor.setRealm(realmName);
                    this.interceptor.setAppName(appName);
                    const expires =  result.expires_in || KeycloakSecurity.MIN_TOKEN_EXPIRES_RUN;
                    const sleepTime = Math.max(KeycloakSecurity.MIN_TOKEN_EXPIRES_RUN, expires - KeycloakSecurity.TOKEN_EXPIRES_DELTA);
                    self.intervall = setInterval(() => {
                        KeycloakSecurity.LOGGER.debug('Refreshing access token');
                        self.functions.refreshToken(directConnection, authEndpoint, realmName, appName, result.refresh_token).then((result) => {
                            self.token = result;
                            self.interceptor.setToken(result.access_token);
                        });
                    }, sleepTime);
                    resolve(result.access_token);
                } else {
                    reject('No access token found');
                }
            })
            .catch((error) => reject(error));
        });
    }

    logout() {
        const self = this;
        KeycloakSecurity.LOGGER.debug('Logout');
        return new Promise((resolve) => {
            delete self.token;
            self.interceptor.setToken(null);
            if (exists(this.intervall)) {
                clearInterval(this.intervall);
                this.intervall = null;
            }
            resolve();
        });
    }

    isAuthorized() {
        return exists(this.token);
    }

    initServiceProvider(client) {
        checkMethod('initServiceProvider');
        checkParam(client, 'client');
        client.getService('HttpClientInterceptor').addRequestInterceptor(this.interceptor);
    }
}

KeycloakSecurity.TOKEN_EXPIRES_DELTA = 10000;
KeycloakSecurity.MIN_TOKEN_EXPIRES_RUN = 30000;

KeycloakSecurity.LOGGER = LoggerFactory.getLogger('KeycloakSecurity');

export { KeycloakSecurity };
