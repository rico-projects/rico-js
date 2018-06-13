class HttpClientInterceptor {

    constructor() {
        this.requestHandlers = new Set();
        this.responseHandlers = new Set();
    }

    addRequestInterceptor(handler) {
        this.requestHandlers.add(handler);
    }

    getRequestInterceptors() {
        let list = [];
        this.requestHandlers.forEach(handler => list.push(handler));
        return list;
    }

    addResponseInterceptor(handler) {
        this.responseHandlers.add(handler);
    }

    getResponseInterceptors() {
        let list = [];
        this.responseHandlers.forEach(handler => list.push(handler));
        return list;
    }
}

export { HttpClientInterceptor }