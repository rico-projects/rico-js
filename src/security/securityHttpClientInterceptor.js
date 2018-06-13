import { checkMethod, checkParam, exists } from '../utils'
import { LoggerFactory } from '../logging'
import { HTTP } from '../platform/constants'

class SecurityHttpClientInterceptor {

    constructor() {
        this.token = null;
        this.appName = null;
        this.realm = null;
    }

    setToken(token) {
        this.token = token;
    }

    setAppName(appName) {
        this.appName = appName;
    }

    setRealm(realm) {
        this.realm = realm;
    }

    handleRequest(httpRequest) {
        checkMethod('handleRequest');
        checkParam(httpRequest, 'httpRequest');

        if (exists(this.token)) {
            SecurityHttpClientInterceptor.LOGGER.trace('Using token', this.token);
            httpRequest.setRequestHeader(HTTP.HEADER_NAME.AUTHORIZATION, 'Bearer ' + this.token);
        }

        if (exists(this.appName)) {
            SecurityHttpClientInterceptor.LOGGER.trace('Using appName', this.appName);
            httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_PLATFORM_SECURITY_APPLICATION, this.appName);
        }

        if (exists(this.realm)) {
            SecurityHttpClientInterceptor.LOGGER.trace('Using realm', this.realm);
            httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM, this.realm);
        }

        httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_PLATFORM_SECURITY_BEARER_ONLY, 'true');
        
    }
}

SecurityHttpClientInterceptor.LOGGER = LoggerFactory.getLogger('SecurityHttpClientInterceptor');

export { SecurityHttpClientInterceptor };