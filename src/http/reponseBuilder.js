import { Executor } from './executor';
import { RESPONSE_TYPE } from '../platform/constants';
class ResponseBuilder {

    constructor(configuration, client) {
        this.configuration = configuration;
        this.executor = new Executor(configuration, client);
    }

    readBytes() {
        this.configuration.responseType = RESPONSE_TYPE.ARRAY_BUFFER;
        return this.executor;
    }

    readString() {
        this.configuration.responseType = RESPONSE_TYPE.TEXT;
        return this.executor;
    }

    readObject() {
        this.configuration.responseType = RESPONSE_TYPE.JSON;
        return this.executor;
    }

    withoutResult() {
        return this.executor;
    }
}

export { ResponseBuilder }