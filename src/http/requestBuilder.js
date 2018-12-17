import { ResponseBuilder } from './reponseBuilder';
import { exists } from '../utils';
class RequestBuilder {

    constructor(configuration, client) {
        this.configuration = configuration;
        this.reponseBuilder = new ResponseBuilder(configuration, client);
    }

    withHeader(name, value) {
        if (!this.configuration.headers) {
            this.configuration.headers = [];
        }
        this.configuration.headers.push({ name, value });
        return this;
    }

    withHeadersInfo(headersInfo) {
        if (exists(headersInfo)) {
            if (!this.configuration.headers) {
                this.configuration.headers = [];
            }
            for (let name in headersInfo) {
                if (headersInfo.hasOwnProperty(name)) {
                    const value = headersInfo[name];
                    this.configuration.headers.push({ name, value });
                }
            }
        }
        return this;
    }

    withContent(data) {
        this.configuration.requestBody = data;
        return this.reponseBuilder;
    }

    withoutContent() {
        return this.reponseBuilder;
    }
}

export { RequestBuilder }