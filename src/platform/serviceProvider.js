import { checkMethod, checkParam } from '../utils'
class ServiceProvider {

    constructor(serviceClass, name) {
        checkMethod('constructor');
        checkParam(serviceClass, 'serviceClass');
        checkParam(name, 'name');
        
        this.serviceInstance = new serviceClass();
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