import {exists} from '../utils';
import { LoggerFactory } from '../logging';

class Client {

}

Client.LOGGER = LoggerFactory.getLogger('Client');

Client.services = new Map();
Client.serviceProviders = new Map();
Client.configuration = {};

Client.getService = function(name) {
    let service = Client.services.get(name);
    if (!exists(service)) {
        let provider = Client.serviceProviders.get(name);
        if (!exists(provider)) {
            throw new Error('No service provider found for ' + name);
        } else {
            service = provider.getService(Client.configuration);
            Client.services.set(name, service);
        }
    }
    return service;
};

Client.hasService = function(name) {
    const provider = Client.serviceProviders.get(name);
    if (!exists(provider)) {
        return false;
    } else {
        return true;
    }
};

Client.getAllServiceTypes = function() {
    let result = [];
    Client.serviceProviders.forEach((serviceProvider) => result.push(serviceProvider));
    return result;
};


Client.registerServiceProvider = function(serviceProvider) {
    if (serviceProvider === null || typeof serviceProvider === 'undefined') {
        throw new Error('Cannot register empty service provider');
    }
    
    if (typeof serviceProvider.getName === 'function' && typeof serviceProvider.getService === 'function') {
        const current = Client.serviceProviders.get(serviceProvider.getName());
        if (!current) {
            Client.serviceProviders.set(serviceProvider.getName(), serviceProvider);
            Client.LOGGER.debug('Service provider registered with name', serviceProvider.getName());
        } else {
            throw new Error('Cannot register another service provider. Name already in use.');
        }
    } else {
        throw new Error('Cannot register service provider without getName() and getService() methods');
    }
};

Client.init = function() {
    Client.serviceProviders.forEach((serviceProvider) => {
        const service = serviceProvider.getService();
        Client.LOGGER.trace('Initializing service for service provider', serviceProvider.getName());
        if (typeof service.initServiceProvider === 'function') {
            Client.LOGGER.debug('Initializing service', service);
            service.initServiceProvider(Client);
        }
    });
}

export { Client }