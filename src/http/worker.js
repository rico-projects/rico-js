self.handleTimeout = function() {
    const message = this.statusText || 'Timeout occurred';
    const workerMessage = {error: true, message, status: this.status, timedout: true};
    self.postMessage(workerMessage);
};
self.handleError = function () {
    let message = this.statusText || 'Unspecified error occured';
    const workerMessage = {error: true, message, status: this.status, timedout: false};
    self.postMessage(workerMessage);
};
self.handleStateChange = function () {
    if (this.readyState === 4 && this.status >= 200 && this.status < 300) {
        const workerMessage = {error: false, response: this.response, status: this.status, url: this.url, responseHeaders: this.getAllResponseHeaders()};
        self.postMessage(workerMessage);
    } else if (this.readyState === 4 && this.status >= 300) {
        const workerMessage = {error: true, message: this.statusText, status: this.status, timedout: false};
        self.postMessage(workerMessage);
    }
};
self.addEventListener('message', function(event) {
    const timeout = event.data.timeout || 0;
    const configuration = event.data.conf || {};
    const requestHeaders = event.data.requestHeaders || [];
    
    const httpRequest = new XMLHttpRequest();
    const async = true;
    
    httpRequest.open(configuration.method, configuration.url, async);
    httpRequest.url = configuration.url;
    httpRequest.method = configuration.method;
    httpRequest.withCredentials = true;

    for (let i = 0; i < requestHeaders.length; i++) {
        const header = requestHeaders[i];
        httpRequest.setRequestHeader(header.name, header.value);
    }

    if (configuration.headers && configuration.headers.length > 0) {
        for (let i = 0; i < configuration.headers.length; i++) {
            const header = configuration.headers[i];
            httpRequest.setRequestHeader(header.name, header.value);
        }
    }

    httpRequest.timeout = timeout;

    if (configuration.responseType) {
        httpRequest.responseType = configuration.responseType;
    }

    httpRequest.ontimeout = self.handleTimeout.bind(httpRequest);
    httpRequest.onerror = self.handleError.bind(httpRequest);
    httpRequest.onreadystatechange = self.handleStateChange.bind(httpRequest);

    httpRequest.send(configuration.requestBody);
});