import { LoggerFactory } from '../logging';
import { HttpResponse } from './httpResponse';
import { HttpException } from './httpException';
import { HTTP } from '../platform/constants';
class Executor {

    constructor(configuration, client) {
        this.configuration = configuration;
        this.client = client;
    }

    execute(timeout, worker) {

        let httpWorker = null;
        if (this.client && this.client.hasService('HttpWorker')) {
            httpWorker = this.client.getService('HttpWorker');
        }

        const useWorker = httpWorker !== null && (worker === true || timeout === true);
        let timeoutToUse = 0;
        if (timeout !== true && timeout !== false) {
            timeoutToUse = timeout;
        }

        let requestInterceptors = [];
        if (this.client) {
            requestInterceptors = this.client.getService('HttpClientInterceptor').getRequestInterceptors();
            Executor.LOGGER.trace('Request interceptors found:', requestInterceptors);
        }

        let responseInterceptors = [];
        if (this.client) {
            responseInterceptors = this.client.getService('HttpClientInterceptor').getResponseInterceptors();
            Executor.LOGGER.trace('Response interceptors found:', responseInterceptors);
        }

        let directCall = (resolve, reject) => {

            const self = this;
            const httpRequest = new XMLHttpRequest();
            const async = true;
            
            httpRequest.open(this.configuration.method, this.configuration.url, async);
            httpRequest.url = this.configuration.url;
            httpRequest.method = this.configuration.method;
            httpRequest.withCredentials = true;

            for (let i = 0; i < requestInterceptors.length; i++) {
                const requestInterceptor = requestInterceptors[i];
                requestInterceptor.handleRequest(httpRequest);
            }

            if (this.configuration.headers && this.configuration.headers.length > 0) {
                for (let i = 0; i < this.configuration.headers.length; i++) {
                    const header = this.configuration.headers[i];
                    httpRequest.setRequestHeader(header.name, header.value);
                }
            }

            httpRequest.timeout = timeoutToUse;

            if (this.configuration.responseType) {
                httpRequest.responseType = this.configuration.responseType;
            }

            httpRequest.ontimeout = function () {
                const message = this.statusText || 'Timeout occurred';
                const httpException = new HttpException(message, this.status, true);
                Executor.LOGGER.error(httpException);
                reject(httpException);
            }

            httpRequest.onerror = function () {
                let message = this.statusText || 'Unspecified error occured';
                const httpException = new HttpException(message, this.status);
                Executor.LOGGER.error(httpException);
                reject(httpException);
            }

            httpRequest.onreadystatechange = function () {
                if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE) {
                    Executor.LOGGER.trace('Request to ', self.configuration.url, 'finished with', this.status);
                }
                if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status >= 200 && this.status < 300) {
                    // https://www.w3.org/TR/cors/#simple-response-header
                    const httpResponse = new HttpResponse(this.url, this.status, this.response, this.getAllResponseHeaders());
                    
                    for (let i = 0; i < responseInterceptors.length; i++) {
                        const responseInterceptor = responseInterceptors[i];
                        responseInterceptor.handleResponse(httpResponse);
                    }

                    resolve(httpResponse);
                } else if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status >= 300) {
                    const httpException = new HttpException(this.statusText, this.status);
                    Executor.LOGGER.error(httpException);
                    reject(httpException);
                }
            }

            httpRequest.send(this.configuration.requestBody);

        }
        directCall = directCall.bind(this);

        let workerCall = (resolve, reject) => {
           
            const collectedRequestHeaders = [];
            for (let i = 0; i < requestInterceptors.length; i++) {
                const requestInterceptor = requestInterceptors[i];
                
                requestInterceptor.handleRequest({
                    url: this.configuration.url,
                    setRequestHeader: (name, value) => {
                        const header = {name, value};
                        collectedRequestHeaders.push(header);
                    }
                });
            }

            const worker = httpWorker.createWorker();
            try {
                worker.onmessage = function(event) {
                    worker.terminate();
                    Executor.LOGGER.trace('Message form Worker', event);
                    const msg = event.data;
                    if (msg.error) {
                        const httpException = new HttpException(msg.message, msg.status, msg.timedout);
                        Executor.LOGGER.error(httpException);
                        reject(httpException);
                    } else {
                        const httpResponse = new HttpResponse(msg.url, msg.status, msg.response, msg.responseHeaders);

                        for (let i = 0; i < responseInterceptors.length; i++) {
                            const responseInterceptor = responseInterceptors[i];
                            responseInterceptor.handleResponse(httpResponse);
                        }

                        resolve(httpResponse);
                    }
                }
                worker.onerror = function(event) {
                    const httpException = new HttpException(event.data, 0, false);
                    reject(httpException);
                }
                worker.postMessage({conf: this.configuration, timeout: timeoutToUse, requestHeaders: collectedRequestHeaders});
            } catch (error) {
                const httpException = new HttpException(error, 0, false);
                reject(httpException);
            }

        }

        workerCall = workerCall.bind(this);

        return new Promise((resolve, reject) => {
            if (useWorker && this.client && this.client.hasService('HttpWorker')) {
                workerCall(resolve, reject);
            } else {
                directCall(resolve, reject);
            }
        });
        
    }

}

Executor.LOGGER = LoggerFactory.getLogger('Executor');

export { Executor }