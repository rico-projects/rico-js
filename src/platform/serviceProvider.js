import { checkMethod, checkParam } from '../utils'
class ServiceProvider {

    constructor(serviceClass, name, client) {
        checkMethod('constructor');
        checkParam(serviceClass, 'serviceClass');
        checkParam(name, 'name');
        
        this.serviceInstance = new serviceClass(client);
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getService() {
        return this.serviceInstance;
    }
}

export { ServiceProvider }