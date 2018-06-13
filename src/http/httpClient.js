import { RequestBuilder } from './requestBuilder';
import { HTTP } from '../platform/constants';
class HttpClient {

    request(url, method) {
        const configuration = {
            url, method
        }
        this.requestBuilder = new RequestBuilder(configuration);
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