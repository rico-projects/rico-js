class HttpException {

    constructor(message, status, timedout) {
        this.message = message;
        this.status = status || 0;
        this.timedout = timedout || false;
    }

    getMessage() {
        return this.message;
    }

    getStatus() {
        return this.status;
    }

    isTimedout() {
        return this.timedout;
    }

}

export { HttpException }