import { LoggerFactory, LogLevel } from './logging';
import { Client } from './platform/client';
import { ServiceProvider } from './platform/serviceProvider';
import { HTTP } from './platform/constants';
import { register as registerHttp } from './http';
import { register as registerClientScope } from './platform/clientScope';
import { register as registerRemotingScope } from './remoting'
import { register as registerSecurity } from './security'

registerHttp(Client);
registerClientScope(Client);
registerRemotingScope(Client);
registerSecurity(Client);
Client.init();

const getService = Client.getService;
const hasService = Client.hasService;
const registerServiceProvider = Client.registerServiceProvider;

/* eslint-disable */
Client.LOGGER.info('Rico Version:' , RICO_VERSION);
/* eslint-enable */

export { LoggerFactory, LogLevel, getService, hasService, registerServiceProvider, HTTP }

if (window.Worker && window.Blob && window.URL && URL.createObjectURL) {
    Client.LOGGER.debug('Creating Worker');
    class HttpWorker {
        constructor() {
            /* eslint-disable */
            this.blob = new Blob([RICO_WORKER], {type: "application/javascript"});
            /* eslint-enable */
        }

        createWorker() {
            return new Worker(URL.createObjectURL(this.blob));
        }
    }

    const httpWorkerProvider = new ServiceProvider(HttpWorker, 'HttpWorker');
    Client.registerServiceProvider(httpWorkerProvider);
}

/* 
 * Provide dependencies as global dolphin object for backward compatibility.
 * The code below this comment is deprecated and should be removed in a feature version.
 */
import { createClientContext, ClientContextFactory } from './remoting/clientContextFactory'

const LOGGER = LoggerFactory.getLogger('Deprecated:');
let showWarning = true;
function warn() {
    if (showWarning) {
        LOGGER.warn('Please do not use "dolphin" anymore, it may be removed in the next version! Use "ricoClient" instead!');
        showWarning = false;
    }
}

if (window) { //TODO: clarify on the need for a global scoped variable 
    window.ricoClient = {
        get ClientContextFactory() {
            return ClientContextFactory;
        },
        get createClientContext() {
            return createClientContext;
        },
        get LoggerFactory() {
            return LoggerFactory;
        },
        get LogLevel() {
            return LogLevel;
        }
    };

    window.client = window.ricoClient; // TODO: get rid of this

    window.dolphin = { // TODO remove in next major release
        get ClientContextFactory() {
            warn();
            return ClientContextFactory;
        },
        get createClientContext() {
            warn();
            return createClientContext;
        },
        get LoggerFactory() {
            warn();
            return LoggerFactory;
        },
        get LogLevel() {
            warn();
            return LogLevel;
        }
    };;
}