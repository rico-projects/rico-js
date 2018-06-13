var _checkMethodName;

export function exists(object) {
    return typeof object !== 'undefined' && object !== null;
}

export function checkMethod(name) {
    _checkMethodName = name;
}

export function checkParam(param, parameterName) {
    if(!exists(param)) {
        throw new Error('The parameter ' + parameterName + ' is mandatory in ' + _checkMethodName);
    }
}

export function parseUrl(url) {
    //https://jsperf.com/url-parsing
    const pattern = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/
    const matches =  url.match(pattern);

    let scheme;
    if (matches[4] && matches[4].length > 1) {
        scheme = matches[4].substring(0, matches[4].length-1);
    }

    let path = matches[13];

    let query;
    if (matches[16] && matches[16].length > 1) {
        query = matches[16].substring(1, matches[16].length);
        const hashes = query.split('&');
        query = hashes.reduce((params, hash) => {
            let [key, val] = hash.split('=')
            return Object.assign(params, {[key]: val})
        }, {});
    }

    let fragment;
    if (matches[17] && matches[17].length > 1) {
        fragment = matches[17].substring(1, matches[17].length);
    }

    let hostname = matches[11];
    let port = matches[12];
    if (hostname && !port && scheme === 'http') {
        port = 80;
    } else if (hostname && !port && scheme === 'https') {
        port = 443;
    }

    //relative url? get hostname and port from the browser
    if (!hostname && !port && !scheme) {
        
        if (window && window.location && window.location.hostname) {
            hostname = window.location.hostname;
        }
        if (window && window.location && window.location.port) {
            port = window.location.port;
        }
        if (window && window.location && window.location.protocol) {
            scheme = window.location.protocol.substring(0, window.location.protocol.length-1) ;
        }
        // strip '.' from relative path
        if (path.indexOf('.') === 0) {
            path = path.substring(1, path.length);
        }
    }

    // port should be a number, always
    if (port) {
        port = parseInt(port);
    }

    return {
        scheme: scheme,
        user: matches[8],
        password: matches[9],
        hostname: hostname,
        port: port,
        path: path,
        query: query,
        fragment: fragment
    };
    
}

