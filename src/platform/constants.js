// Reponse type
export const RESPONSE_TYPE = {
    ARRAY_BUFFER: 'arraybuffer',
    TEXT: 'text',
    JSON: 'json'
}

// HTTP methods and status codes
export const HTTP = {
    METHOD: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE'
    },
    STATUS: {
        ACCEPTED: 202,
        BAD_GATEWAY: 502,
        BAD_REQUEST: 400,
        CONFLICT: 409,
        CONTINUE: 100,
        CREATED: 201,
        EXPECTATION_FAILED: 417,
        FAILED_DEPENDENCY : 424,
        FORBIDDEN: 403,
        GATEWAY_TIMEOUT: 504,
        GONE: 410,
        HTTP_VERSION_NOT_SUPPORTED: 505,
        IM_A_TEAPOT: 418,
        INSUFFICIENT_SPACE_ON_RESOURCE: 419,
        INSUFFICIENT_STORAGE: 507,
        INTERNAL_SERVER_ERROR: 500,
        LENGTH_REQUIRED: 411,
        LOCKED: 423,
        METHOD_FAILURE: 420,
        METHOD_NOT_ALLOWED: 405,
        MOVED_PERMANENTLY: 301,
        MOVED_TEMPORARILY: 302,
        MULTI_STATUS: 207,
        MULTIPLE_CHOICES: 300,
        NETWORK_AUTHENTICATION_REQUIRED: 511,
        NO_CONTENT: 204,
        NON_AUTHORITATIVE_INFORMATION: 203,
        NOT_ACCEPTABLE: 406,
        NOT_FOUND: 404,
        NOT_IMPLEMENTED: 501,
        NOT_MODIFIED: 304,
        OK: 200,
        PARTIAL_CONTENT: 206,
        PAYMENT_REQUIRED: 402,
        PERMANENT_REDIRECT: 308,
        PRECONDITION_FAILED: 412,
        PRECONDITION_REQUIRED: 428,
        PROCESSING: 102,
        PROXY_AUTHENTICATION_REQUIRED: 407,
        REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
        REQUEST_TIMEOUT: 408,
        REQUEST_TOO_LONG: 413,
        REQUEST_URI_TOO_LONG: 414,
        REQUESTED_RANGE_NOT_SATISFIABLE: 416,
        RESET_CONTENT: 205,
        SEE_OTHER: 303,
        SERVICE_UNAVAILABLE: 503,
        SWITCHING_PROTOCOLS: 101,
        TEMPORARY_REDIRECT: 307,
        TOO_MANY_REQUESTS: 429,
        UNAUTHORIZED: 401,
        UNPROCESSABLE_ENTITY: 422,
        UNSUPPORTED_MEDIA_TYPE: 415,
        USE_PROXY: 305
    },
    HEADER_NAME: {
        ACCEPT: 'Accept',
        ACCEPT_CHARSET: 'Accept-Charset', 
        ACCEPT_ENCODING: 'Accept-Encoding', 
        ACCEPT_LANGUAGE: 'Accept-Language',
        ACCEPT_DATETIME: 'Accept-Datetime',
        AUTHORIZATION: 'Authorization',
        CACHE_CONTROL: 'Cache-Control',
        CONNECTION: 'Connection',
        COOKIE: 'Cookie',
        CONTENT_LENGTH: 'Content-Length',
        CONTENT_MD5: 'Content-MD5',
        CONTENT_TYPE: 'Content-Type',
        DATE: 'Date',
        EXPECT: 'Expect',
        FORWARDED: 'Forwarded',
        FROM: 'From',
        HOST: 'Host', 
        IF_MATCH: 'If-Match', 
        IF_MODIFIED_SINCE: 'If-Modified_Since',
        IF_NONE_MATCH: 'If-None_Match',
        IF_RANGE: 'If-Range',
        MAX_FORWARDS: 'Max-Forwards',
        PRAGMA: 'Pragma', 
        PROXY_AUTHORIZATION: 'Proxy-Authorization',
        REFERER: 'Referer',
        TE: 'TE',
        USER_AGENT: 'User-Agent',
        X_CLIENT_ID: 'X-Client-Id',
        X_CLIENT_SESSION_ID: 'X-Client-Session-Id',
        X_PLATFORM_SECURITY_REALM: 'X-platform-security-realm',
        X_PLATFORM_SECURITY_BEARER_ONLY: 'X-platform-security-bearer-only',
        X_PLATFORM_SECURITY_APPLICATION: 'X-platform-security-application'
    },
    CONTENT_TYPE: {
        APPLICATION_JSON: 'application/json',
        APPLICATION_X_WWW_FORM_URLENCODED: 'application/x-www-form-urlencoded',
        TEXT_HTML: 'text/html',
        TEXT_PLAIN: 'text/plain'
    },
    XMLHTTPREQUEST_READYSTATE: {
        UNSENT: 0,
        OPENED: 1,
        HEADERS_RECEIVED: 2,
        LOADING: 3,
        DONE:4
    }
}

// Security
export const SECURITY = {
    AUTH_ENDPOINT: '/openid-connect'
}