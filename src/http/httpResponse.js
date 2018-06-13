import { exists, checkMethod, checkParam } from '../utils';
class HttpResponse {

    constructor(url, status, content, headers) {
        this.url = url;
        this.status = status;
        this.content = content;
        this.headers = {};
        if (exists(headers) && typeof headers === 'string') {
            const headerArray = headers.trim().split(/[\r\n]+/);
            for (let i = 0; i < headerArray.length; i++) {
                const line = headerArray[i];
                const parts = line.split(': ');
                if (parts.length === 2) {
                    const header = parts.shift().toLowerCase();
                    const value = parts.join(': ');
                    this.headers[header] = value;
                }
            }
        }
    }

    getUrl() {
        return this.url;
    }

    getContent() {
        return this.content;
    }

    getStatus() {
        return this.status;
    }

    getHeaders() {
        return this.headers;
    }

    getHeaderByName(name) {
        checkMethod('getHeaderByName');
        checkParam(name, 'name');
        
        return this.headers[name.toLowerCase()];
    }

}

export { HttpResponse }