import { RequestBuilder } from './requestBuilder';
import { HTTP } from '../platform/constants';
class HttpClient {

    constructor(client) {
        this.client = client;
    }

    request(url, method) {
        const configuration = {
            url, method
        }
        this.requestBuilder = new RequestBuilder(configuration, this.client);
        return this.requestBuilder;
    }

    get(url) {
        return this.request(url, HTTP.METHOD.GET);
    }

    post(url) {
        return this.request(url, HTTP.METHOD.POST);
    }

    put(url) {
        return this.request(url, HTTP.METHOD.PUT);
    }

    delete(url) {
        return this.request(url, HTTP.METHOD.DELETE);
    }
}

export { HttpClient }