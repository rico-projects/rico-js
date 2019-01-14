/*!
 * Copyright 2018 Karakun AG.
 * Copyright 2015-2018 Canoo Engineering AG.
 * 
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["client"] = factory();
	else
		root["client"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 108);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(62);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _defineProperty2 = __webpack_require__(128);

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _assign = __webpack_require__(129);

var _assign2 = _interopRequireDefault(_assign);

var _slicedToArray2 = __webpack_require__(133);

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

exports.exists = exists;
exports.checkMethod = checkMethod;
exports.checkParam = checkParam;
exports.parseUrl = parseUrl;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _checkMethodName;

function exists(object) {
    return typeof object !== 'undefined' && object !== null;
}

function checkMethod(name) {
    _checkMethodName = name;
}

function checkParam(param, parameterName) {
    if (!exists(param)) {
        throw new Error('The parameter ' + parameterName + ' is mandatory in ' + _checkMethodName);
    }
}

function parseUrl(url) {
    var pattern = /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/;
    var matches = url.match(pattern);

    var scheme = void 0;
    if (matches[4] && matches[4].length > 1) {
        scheme = matches[4].substring(0, matches[4].length - 1);
    }

    var path = matches[13];

    var query = void 0;
    if (matches[16] && matches[16].length > 1) {
        query = matches[16].substring(1, matches[16].length);
        var hashes = query.split('&');
        query = hashes.reduce(function (params, hash) {
            var _hash$split = hash.split('='),
                _hash$split2 = (0, _slicedToArray3.default)(_hash$split, 2),
                key = _hash$split2[0],
                val = _hash$split2[1];

            return (0, _assign2.default)(params, (0, _defineProperty3.default)({}, key, val));
        }, {});
    }

    var fragment = void 0;
    if (matches[17] && matches[17].length > 1) {
        fragment = matches[17].substring(1, matches[17].length);
    }

    var hostname = matches[11];
    var port = matches[12];
    if (hostname && !port && scheme === 'http') {
        port = 80;
    } else if (hostname && !port && scheme === 'https') {
        port = 443;
    }

    if (!hostname && !port && !scheme) {

        if (window && window.location && window.location.hostname) {
            hostname = window.location.hostname;
        }
        if (window && window.location && window.location.port) {
            port = window.location.port;
        }
        if (window && window.location && window.location.protocol) {
            scheme = window.location.protocol.substring(0, window.location.protocol.length - 1);
        }

        if (path.indexOf('.') === 0) {
            path = path.substring(1, path.length);
        }
    }

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

/***/ }),
/* 3 */
/***/ (function(module, exports) {

var core = module.exports = { version: '2.6.1' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var core = __webpack_require__(3);
var ctx = __webpack_require__(13);
var hide = __webpack_require__(15);
var has = __webpack_require__(17);
var PROTOTYPE = 'prototype';

var $export = function (type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var IS_WRAP = type & $export.W;
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE];
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE];
  var key, own, out;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if (own && has(exports, key)) continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function (C) {
      var F = function (a, b, c) {
        if (this instanceof C) {
          switch (arguments.length) {
            case 0: return new C();
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if (IS_PROTO) {
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if (type & $export.R && expProto && !expProto[key]) hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LoggerFactory = exports.LogLevel = undefined;

var _constants = __webpack_require__(64);

var _loggerfactory = __webpack_require__(111);

exports.LogLevel = _constants.LogLevel;
exports.LoggerFactory = _loggerfactory.LoggerFactory;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var ATTRIBUTE_METADATA_CHANGED_COMMAND_ID = exports.ATTRIBUTE_METADATA_CHANGED_COMMAND_ID = 'AttributeMetadataChanged';
var CALL_ACTION_COMMAND_ID = exports.CALL_ACTION_COMMAND_ID = 'CallAction';
var CHANGE_ATTRIBUTE_METADATA_COMMAND_ID = exports.CHANGE_ATTRIBUTE_METADATA_COMMAND_ID = 'ChangeAttributeMetadata';
var CREATE_CONTEXT_COMMAND_ID = exports.CREATE_CONTEXT_COMMAND_ID = 'CreateContext';
var CREATE_CONTROLLER_COMMAND_ID = exports.CREATE_CONTROLLER_COMMAND_ID = 'CreateController';
var CREATE_PRESENTATION_MODEL_COMMAND_ID = exports.CREATE_PRESENTATION_MODEL_COMMAND_ID = 'CreatePresentationModel';
var DELETE_PRESENTATION_MODEL_COMMAND_ID = exports.DELETE_PRESENTATION_MODEL_COMMAND_ID = 'DeletePresentationModel';
var DESTROY_CONTEXT_COMMAND_ID = exports.DESTROY_CONTEXT_COMMAND_ID = 'DestroyContext';
var DESTROY_CONTROLLER_COMMAND_ID = exports.DESTROY_CONTROLLER_COMMAND_ID = 'DestroyController';
var INTERRUPT_LONG_POLL_COMMAND_ID = exports.INTERRUPT_LONG_POLL_COMMAND_ID = 'InterruptLongPoll';
var PRESENTATION_MODEL_DELETED_COMMAND_ID = exports.PRESENTATION_MODEL_DELETED_COMMAND_ID = 'PresentationModelDeleted';
var START_LONG_POLL_COMMAND_ID = exports.START_LONG_POLL_COMMAND_ID = 'StartLongPoll';
var VALUE_CHANGED_COMMAND_ID = exports.VALUE_CHANGED_COMMAND_ID = 'ValueChanged';

var ID = exports.ID = "id";
var ATTRIBUTE_ID = exports.ATTRIBUTE_ID = "a_id";
var PM_ID = exports.PM_ID = "p_id";
var CONTROLLER_ID = exports.CONTROLLER_ID = "c_id";
var PM_TYPE = exports.PM_TYPE = "t";
var NAME = exports.NAME = "n";
var VALUE = exports.VALUE = "v";
var PARAMS = exports.PARAMS = "p";
var PM_ATTRIBUTES = exports.PM_ATTRIBUTES = "a";

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self
  // eslint-disable-next-line no-new-func
  : Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__(49)('wks');
var uid = __webpack_require__(37);
var Symbol = __webpack_require__(7).Symbol;
var USE_SYMBOL = typeof Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] =
    USE_SYMBOL && Symbol[name] || (USE_SYMBOL ? Symbol : uid)('Symbol.' + name));
};

$exports.store = store;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var IE8_DOM_DEFINE = __webpack_require__(63);
var toPrimitive = __webpack_require__(43);
var dP = Object.defineProperty;

exports.f = __webpack_require__(12) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(16)(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(24);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var RESPONSE_TYPE = exports.RESPONSE_TYPE = {
    ARRAY_BUFFER: 'arraybuffer',
    TEXT: 'text',
    JSON: 'json'
};

var HTTP = exports.HTTP = {
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
        FAILED_DEPENDENCY: 424,
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
        DONE: 4
    }
};

var SECURITY = exports.SECURITY = {
    AUTH_ENDPOINT: '/openid-connect'
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var createDesc = __webpack_require__(25);
module.exports = __webpack_require__(12) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};


/***/ }),
/* 17 */
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $at = __webpack_require__(113)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(46)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0;                // next index
// 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(151), __esModule: true };

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(112), __esModule: true };

/***/ }),
/* 21 */
/***/ (function(module, exports) {

module.exports = {};


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(47);
var defined = __webpack_require__(45);
module.exports = function (it) {
  return IObject(defined(it));
};


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(118);
var global = __webpack_require__(7);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(21);
var TO_STRING_TAG = __webpack_require__(8)('toStringTag');

var DOMIterables = ('CSSRuleList,CSSStyleDeclaration,CSSValueList,ClientRectList,DOMRectList,DOMStringList,' +
  'DOMTokenList,DataTransferItemList,FileList,HTMLAllCollection,HTMLCollection,HTMLFormElement,HTMLSelectElement,' +
  'MediaList,MimeTypeArray,NamedNodeMap,NodeList,PaintRequestList,Plugin,PluginArray,SVGLengthList,SVGNumberList,' +
  'SVGPathSegList,SVGPointList,SVGStringList,SVGTransformList,SourceBufferList,StyleSheetList,TextTrackCueList,' +
  'TextTrackList,TouchList').split(',');

for (var i = 0; i < DOMIterables.length; i++) {
  var NAME = DOMIterables[i];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  if (proto && !proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
  Iterators[NAME] = Iterators.Array;
}


/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};


/***/ }),
/* 25 */
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),
/* 26 */
/***/ (function(module, exports) {

module.exports = true;


/***/ }),
/* 27 */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var def = __webpack_require__(9).f;
var has = __webpack_require__(17);
var TAG = __webpack_require__(8)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.13 ToObject(argument)
var defined = __webpack_require__(45);
module.exports = function (it) {
  return Object(defined(it));
};


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(13);
var call = __webpack_require__(71);
var isArrayIter = __webpack_require__(72);
var anObject = __webpack_require__(11);
var toLength = __webpack_require__(36);
var getIterFn = __webpack_require__(53);
var BREAK = {};
var RETURN = {};
var exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () { return iterable; } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
exports.BREAK = BREAK;
exports.RETURN = RETURN;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ServiceProvider = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ServiceProvider = function () {
    function ServiceProvider(serviceClass, name, client) {
        (0, _classCallCheck3.default)(this, ServiceProvider);

        (0, _utils.checkMethod)('constructor');
        (0, _utils.checkParam)(serviceClass, 'serviceClass');
        (0, _utils.checkParam)(name, 'name');

        this.serviceInstance = new serviceClass(client);
        this.name = name;
    }

    (0, _createClass3.default)(ServiceProvider, [{
        key: 'getName',
        value: function getName() {
            return this.name;
        }
    }, {
        key: 'getService',
        value: function getService() {
            return this.serviceInstance;
        }
    }]);
    return ServiceProvider;
}();

exports.ServiceProvider = ServiceProvider;

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _iterator = __webpack_require__(174);

var _iterator2 = _interopRequireDefault(_iterator);

var _symbol = __webpack_require__(176);

var _symbol2 = _interopRequireDefault(_symbol);

var _typeof = typeof _symbol2.default === "function" && typeof _iterator2.default === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj; };

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = typeof _symbol2.default === "function" && _typeof(_iterator2.default) === "symbol" ? function (obj) {
  return typeof obj === "undefined" ? "undefined" : _typeof(obj);
} : function (obj) {
  return obj && typeof _symbol2.default === "function" && obj.constructor === _symbol2.default && obj !== _symbol2.default.prototype ? "symbol" : typeof obj === "undefined" ? "undefined" : _typeof(obj);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {



/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(11);
var dPs = __webpack_require__(115);
var enumBugKeys = __webpack_require__(50);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');
var Empty = function () { /* empty */ };
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var createDict = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(42)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(67).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  createDict = iframeDocument.F;
  while (i--) delete createDict[PROTOTYPE][enumBugKeys[i]];
  return createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(66);
var enumBugKeys = __webpack_require__(50);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.15 ToLength
var toInteger = __webpack_require__(44);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};


/***/ }),
/* 37 */
/***/ (function(module, exports) {

var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};


/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(27);
var TAG = __webpack_require__(8)('toStringTag');
// ES3 wrong here
var ARG = cof(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (e) { /* empty */ }
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
    // builtinTag case
    : ARG ? cof(O)
    // ES3 arguments fallback
    : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};


/***/ }),
/* 39 */
/***/ (function(module, exports) {

exports.f = {}.propertyIsEnumerable;


/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var JS_STRING_TYPE = exports.JS_STRING_TYPE = 'string';

var REMOTING_BEAN = exports.REMOTING_BEAN = 0;
var BYTE = exports.BYTE = 1;
var SHORT = exports.SHORT = 2;
var INT = exports.INT = 3;
var LONG = exports.LONG = 4;
var FLOAT = exports.FLOAT = 5;
var DOUBLE = exports.DOUBLE = 6;
var BOOLEAN = exports.BOOLEAN = 7;
var STRING = exports.STRING = 8;
var DATE = exports.DATE = 9;
var ENUM = exports.ENUM = 10;
var CALENDAR = exports.CALENDAR = 11;
var LOCAL_DATE_FIELD_TYPE = exports.LOCAL_DATE_FIELD_TYPE = 55;
var LOCAL_DATE_TIME_FIELD_TYPE = exports.LOCAL_DATE_TIME_FIELD_TYPE = 52;
var ZONED_DATE_TIME_FIELD_TYPE = exports.ZONED_DATE_TIME_FIELD_TYPE = 54;

var ADDED_TYPE = exports.ADDED_TYPE = "ADDED";
var REMOVED_TYPE = exports.REMOVED_TYPE = "REMOVED";

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _createContextCommand = __webpack_require__(93);

var _createContextCommand2 = _interopRequireDefault(_createContextCommand);

var _createControllerCommand = __webpack_require__(94);

var _createControllerCommand2 = _interopRequireDefault(_createControllerCommand);

var _callActionCommand = __webpack_require__(91);

var _callActionCommand2 = _interopRequireDefault(_callActionCommand);

var _destroyControllerCommand = __webpack_require__(98);

var _destroyControllerCommand2 = _interopRequireDefault(_destroyControllerCommand);

var _destroyContextCommand = __webpack_require__(97);

var _destroyContextCommand2 = _interopRequireDefault(_destroyContextCommand);

var _startLongPollCommand = __webpack_require__(101);

var _startLongPollCommand2 = _interopRequireDefault(_startLongPollCommand);

var _interruptLongPollCommand = __webpack_require__(99);

var _interruptLongPollCommand2 = _interopRequireDefault(_interruptLongPollCommand);

var _createPresentationModelCommand = __webpack_require__(95);

var _createPresentationModelCommand2 = _interopRequireDefault(_createPresentationModelCommand);

var _deletePresentationModelCommand = __webpack_require__(96);

var _deletePresentationModelCommand2 = _interopRequireDefault(_deletePresentationModelCommand);

var _presentationModelDeletedCommand = __webpack_require__(100);

var _presentationModelDeletedCommand2 = _interopRequireDefault(_presentationModelDeletedCommand);

var _valueChangedCommand = __webpack_require__(89);

var _valueChangedCommand2 = _interopRequireDefault(_valueChangedCommand);

var _changeAttributeMetadataCommand = __webpack_require__(92);

var _changeAttributeMetadataCommand2 = _interopRequireDefault(_changeAttributeMetadataCommand);

var _attributeMetadataChangedCommand = __webpack_require__(90);

var _attributeMetadataChangedCommand2 = _interopRequireDefault(_attributeMetadataChangedCommand);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CommandFactory = function () {
    function CommandFactory() {
        (0, _classCallCheck3.default)(this, CommandFactory);
    }

    (0, _createClass3.default)(CommandFactory, null, [{
        key: 'createCreateContextCommand',
        value: function createCreateContextCommand() {
            return new _createContextCommand2.default();
        }
    }, {
        key: 'createCreateControllerCommand',
        value: function createCreateControllerCommand(controllerName, parentControllerId) {
            var command = new _createControllerCommand2.default();
            command.init(controllerName, parentControllerId);
            return command;
        }
    }, {
        key: 'createCallActionCommand',
        value: function createCallActionCommand(controllerid, actionName, params) {
            var command = new _callActionCommand2.default();
            command.init(controllerid, actionName, params);
            return command;
        }
    }, {
        key: 'createDestroyControllerCommand',
        value: function createDestroyControllerCommand(controllerId) {
            var command = new _destroyControllerCommand2.default();
            command.init(controllerId);
            return command;
        }
    }, {
        key: 'createDestroyContextCommand',
        value: function createDestroyContextCommand() {
            return new _destroyContextCommand2.default();
        }
    }, {
        key: 'createStartLongPollCommand',
        value: function createStartLongPollCommand() {
            return new _startLongPollCommand2.default();
        }
    }, {
        key: 'createInterruptLongPollCommand',
        value: function createInterruptLongPollCommand() {
            return new _interruptLongPollCommand2.default();
        }
    }, {
        key: 'createCreatePresentationModelCommand',
        value: function createCreatePresentationModelCommand(presentationModel) {
            var command = new _createPresentationModelCommand2.default();
            command.init(presentationModel);
            return command;
        }
    }, {
        key: 'createDeletePresentationModelCommand',
        value: function createDeletePresentationModelCommand(pmId) {
            var command = new _deletePresentationModelCommand2.default();
            command.init(pmId);
            return command;
        }
    }, {
        key: 'createPresentationModelDeletedCommand',
        value: function createPresentationModelDeletedCommand(pmId) {
            var command = new _presentationModelDeletedCommand2.default();
            command.init(pmId);
            return command;
        }
    }, {
        key: 'createValueChangedCommand',
        value: function createValueChangedCommand(attributeId, newValue) {
            var command = new _valueChangedCommand2.default();
            command.init(attributeId, newValue);
            return command;
        }
    }, {
        key: 'createChangeAttributeMetadataCommand',
        value: function createChangeAttributeMetadataCommand(attributeId, metadataName, value) {
            var command = new _changeAttributeMetadataCommand2.default();
            command.init(attributeId, metadataName, value);
            return command;
        }
    }, {
        key: 'createAttributeMetadataChangedCommand',
        value: function createAttributeMetadataChangedCommand(attributeId, metadataName, value) {
            var command = new _attributeMetadataChangedCommand2.default();
            command.init(attributeId, metadataName, value);
            return command;
        }
    }]);
    return CommandFactory;
}();

exports.default = CommandFactory;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var document = __webpack_require__(7).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};


/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(10);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),
/* 44 */
/***/ (function(module, exports) {

// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};


/***/ }),
/* 45 */
/***/ (function(module, exports) {

// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};


/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(26);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(65);
var hide = __webpack_require__(15);
var Iterators = __webpack_require__(21);
var $iterCreate = __webpack_require__(114);
var setToStringTag = __webpack_require__(28);
var getPrototypeOf = __webpack_require__(68);
var ITERATOR = __webpack_require__(8)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function () { return this; };

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function (kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS: return function keys() { return new Constructor(this, kind); };
      case VALUES: return function values() { return new Constructor(this, kind); };
    } return function entries() { return new Constructor(this, kind); };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() { return $native.call(this); };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};


/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(27);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};


/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__(49)('keys');
var uid = __webpack_require__(37);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};


/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(3);
var global = __webpack_require__(7);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(26) ? 'pure' : 'global',
  copyright: '© 2018 Denis Pushkarev (zloirock.ru)'
});


/***/ }),
/* 50 */
/***/ (function(module, exports) {

// IE 8- don't enum bug keys
module.exports = (
  'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'
).split(',');


/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

var hide = __webpack_require__(15);
module.exports = function (target, src, safe) {
  for (var key in src) {
    if (safe && target[key]) target[key] = src[key];
    else hide(target, key, src[key]);
  } return target;
};


/***/ }),
/* 52 */
/***/ (function(module, exports) {

module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || (forbiddenField !== undefined && forbiddenField in it)) {
    throw TypeError(name + ': incorrect invocation!');
  } return it;
};


/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(38);
var ITERATOR = __webpack_require__(8)('iterator');
var Iterators = __webpack_require__(21);
module.exports = __webpack_require__(3).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

var META = __webpack_require__(37)('meta');
var isObject = __webpack_require__(10);
var has = __webpack_require__(17);
var setDesc = __webpack_require__(9).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(16)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function (it) {
  setDesc(it, META, { value: {
    i: 'O' + ++id, // object ID
    w: {}          // weak collections IDs
  } });
};
var fastKey = function (it, create) {
  // return primitive with prefix
  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
  // return object ID
  } return it[META].i;
};
var getWeak = function (it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
  // return hash weak collections IDs
  } return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function (it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};


/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};


/***/ }),
/* 56 */
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)
var aFunction = __webpack_require__(24);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};


/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(161), __esModule: true };

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

exports.f = __webpack_require__(8);


/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var core = __webpack_require__(3);
var LIBRARY = __webpack_require__(26);
var wksExt = __webpack_require__(59);
var defineProperty = __webpack_require__(9).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};


/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EventBus = function () {
    function EventBus() {
        (0, _classCallCheck3.default)(this, EventBus);

        this.eventHandlers = [];
    }

    (0, _createClass3.default)(EventBus, [{
        key: "onEvent",
        value: function onEvent(eventHandler) {
            this.eventHandlers.push(eventHandler);
        }
    }, {
        key: "trigger",
        value: function trigger(event) {
            this.eventHandlers.forEach(function (handle) {
                return handle(event);
            });
        }
    }]);
    return EventBus;
}();

exports.default = EventBus;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(109), __esModule: true };

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(12) && !__webpack_require__(16)(function () {
  return Object.defineProperty(__webpack_require__(42)('div'), 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var LogLevel = {
    NONE: { name: 'NONE', text: '[NONE ]', level: 0 },
    ALL: { name: 'ALL', text: '[ALL  ]', level: 100 },
    TRACE: { name: 'TRACE', text: '[TRACE]', level: 5 },
    DEBUG: { name: 'DEBUG', text: '[DEBUG]', level: 4 },
    INFO: { name: 'INFO', text: '[INFO ]', level: 3 },
    WARN: { name: 'WARN', text: '[WARN ]', level: 2 },
    ERROR: { name: 'ERROR', text: '[ERROR]', level: 1 }
};

exports.LogLevel = LogLevel;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(15);


/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__(17);
var toIObject = __webpack_require__(22);
var arrayIndexOf = __webpack_require__(116)(false);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) if (key != IE_PROTO) has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~arrayIndexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

var document = __webpack_require__(7).document;
module.exports = document && document.documentElement;


/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(17);
var toObject = __webpack_require__(29);
var IE_PROTO = __webpack_require__(48)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectProto : null;
};


/***/ }),
/* 69 */
/***/ (function(module, exports) {

module.exports = function (done, value) {
  return { value: value, done: !!done };
};


/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var dP = __webpack_require__(9).f;
var create = __webpack_require__(34);
var redefineAll = __webpack_require__(51);
var ctx = __webpack_require__(13);
var anInstance = __webpack_require__(52);
var forOf = __webpack_require__(30);
var $iterDefine = __webpack_require__(46);
var step = __webpack_require__(69);
var setSpecies = __webpack_require__(73);
var DESCRIPTORS = __webpack_require__(12);
var fastKey = __webpack_require__(54).fastKey;
var validate = __webpack_require__(55);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function (that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function (wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME;         // collection type
      that._i = create(null); // index
      that._f = undefined;    // first entry
      that._l = undefined;    // last entry
      that[SIZE] = 0;         // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function (key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        } return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) entry = entry.p;
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function () {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function (that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
    // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that._l,             // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    } return that;
  },
  getEntry: getEntry,
  setStrong: function (C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind;                     // kind
      this._l = undefined;                // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) entry = entry.p;
      // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};


/***/ }),
/* 71 */
/***/ (function(module, exports, __webpack_require__) {

// call something on iterator step with safe closing on error
var anObject = __webpack_require__(11);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};


/***/ }),
/* 72 */
/***/ (function(module, exports, __webpack_require__) {

// check on default Array iterator
var Iterators = __webpack_require__(21);
var ITERATOR = __webpack_require__(8)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};


/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(7);
var core = __webpack_require__(3);
var dP = __webpack_require__(9);
var DESCRIPTORS = __webpack_require__(12);
var SPECIES = __webpack_require__(8)('species');

module.exports = function (KEY) {
  var C = typeof core[KEY] == 'function' ? core[KEY] : global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function () { return this; }
  });
};


/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var global = __webpack_require__(7);
var $export = __webpack_require__(4);
var meta = __webpack_require__(54);
var fails = __webpack_require__(16);
var hide = __webpack_require__(15);
var redefineAll = __webpack_require__(51);
var forOf = __webpack_require__(30);
var anInstance = __webpack_require__(52);
var isObject = __webpack_require__(10);
var setToStringTag = __webpack_require__(28);
var dP = __webpack_require__(9).f;
var each = __webpack_require__(121)(0);
var DESCRIPTORS = __webpack_require__(12);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  if (!DESCRIPTORS || typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    C = wrapper(function (target, iterable) {
      anInstance(target, C, NAME, '_c');
      target._c = new Base();
      if (iterable != undefined) forOf(iterable, IS_MAP, target[ADDER], target);
    });
    each('add,clear,delete,forEach,get,has,set,keys,values,entries,toJSON'.split(','), function (KEY) {
      var IS_ADDER = KEY == 'add' || KEY == 'set';
      if (KEY in proto && !(IS_WEAK && KEY == 'clear')) hide(C.prototype, KEY, function (a, b) {
        anInstance(this, C, KEY);
        if (!IS_ADDER && IS_WEAK && !isObject(a)) return KEY == 'get' ? undefined : false;
        var result = this._c[KEY](a === 0 ? 0 : a, b);
        return IS_ADDER ? this : result;
      });
    });
    IS_WEAK || dP(C.prototype, 'size', {
      get: function () {
        return this._c.size;
      }
    });
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F, O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

// 7.2.2 IsArray(argument)
var cof = __webpack_require__(27);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};


/***/ }),
/* 76 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(38);
var from = __webpack_require__(125);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};


/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(4);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
    var length = arguments.length;
    var A = new Array(length);
    while (length--) A[length] = arguments[length];
    return new this(A);
  } });
};


/***/ }),
/* 78 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/
var $export = __webpack_require__(4);
var aFunction = __webpack_require__(24);
var ctx = __webpack_require__(13);
var forOf = __webpack_require__(30);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
    var mapFn = arguments[1];
    var mapping, A, n, cb;
    aFunction(this);
    mapping = mapFn !== undefined;
    if (mapping) aFunction(mapFn);
    if (source == undefined) return new this();
    A = [];
    if (mapping) {
      n = 0;
      cb = ctx(mapFn, arguments[2], 2);
      forOf(source, false, function (nextItem) {
        A.push(cb(nextItem, n++));
      });
    } else {
      forOf(source, false, A.push, A);
    }
    return new this(A);
  } });
};


/***/ }),
/* 79 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(142), __esModule: true };

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

var ITERATOR = __webpack_require__(8)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () { SAFE_CLOSING = true; };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () { throw 2; });
} catch (e) { /* empty */ }

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () { return { done: safe = true }; };
    arr[ITERATOR] = function () { return iter; };
    exec(arr);
  } catch (e) { /* empty */ }
  return safe;
};


/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(11);
var aFunction = __webpack_require__(24);
var SPECIES = __webpack_require__(8)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};


/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

var ctx = __webpack_require__(13);
var invoke = __webpack_require__(153);
var html = __webpack_require__(67);
var cel = __webpack_require__(42);
var global = __webpack_require__(7);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function () {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function (event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) args.push(arguments[i++]);
    queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(27)(process) == 'process') {
    defer = function (id) {
      process.nextTick(ctx(run, id, 1));
    };
  // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function (id) {
      Dispatch.now(ctx(run, id, 1));
    };
  // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
  // Browsers with postMessage, skip WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function (id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
  // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function (id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
  // Rest old browsers
  } else {
    defer = function (id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};


/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};


/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var isObject = __webpack_require__(10);
var newPromiseCapability = __webpack_require__(57);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};


/***/ }),
/* 85 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ClientContextFactory = exports.createClientContext = undefined;

var _maxSafeInteger = __webpack_require__(168);

var _maxSafeInteger2 = _interopRequireDefault(_maxSafeInteger);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _dolphinBuilder = __webpack_require__(171);

var _utils = __webpack_require__(2);

var _logging = __webpack_require__(5);

var _connector = __webpack_require__(106);

var _connector2 = _interopRequireDefault(_connector);

var _beanmanager = __webpack_require__(201);

var _beanmanager2 = _interopRequireDefault(_beanmanager);

var _classrepo = __webpack_require__(202);

var _classrepo2 = _interopRequireDefault(_classrepo);

var _controllermanager = __webpack_require__(203);

var _controllermanager2 = _interopRequireDefault(_controllermanager);

var _clientcontext = __webpack_require__(205);

var _clientcontext2 = _interopRequireDefault(_clientcontext);

var _platformHttpTransmitter = __webpack_require__(206);

var _platformHttpTransmitter2 = _interopRequireDefault(_platformHttpTransmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientContextFactory = function () {
    function ClientContextFactory(client) {
        (0, _classCallCheck3.default)(this, ClientContextFactory);

        this.client = client;
        if (!client && ClientContextFactory.legecyClientSupport) {
            ClientContextFactory.LOGGER.warn('Legecy support used.');
            this.client = ClientContextFactory.legecyClientSupport;
        }
    }

    (0, _createClass3.default)(ClientContextFactory, [{
        key: 'create',
        value: function create(url, config) {
            (0, _utils.checkMethod)('connect(url, config)');
            (0, _utils.checkParam)(url, 'url');
            ClientContextFactory.LOGGER.debug('Creating client context', url, config);

            var transmitter = new _platformHttpTransmitter2.default(url, config, this.client);
            transmitter.on('error', function (error) {
                clientContext.emit('error', error);
            });

            var dolphin = _dolphinBuilder.dolphinBuilder.withTransmitter(transmitter).withSlackMS(4).withMaxBatchSize(_maxSafeInteger2.default).build();

            var classRepository = new _classrepo2.default(dolphin);
            var beanManager = new _beanmanager2.default(classRepository);
            var connector = new _connector2.default(url, dolphin, classRepository, config);
            var controllerManager = new _controllermanager2.default(dolphin, classRepository, connector);

            var clientContext = new _clientcontext2.default(dolphin, beanManager, controllerManager, connector);

            ClientContextFactory.LOGGER.debug('clientContext created with', clientContext);

            return clientContext;
        }
    }]);
    return ClientContextFactory;
}();

ClientContextFactory.LOGGER = _logging.LoggerFactory.getLogger('ClientContextFactory');
ClientContextFactory.legecyClientSupport = false;

var createClientContext = function createClientContext(client) {
    return new ClientContextFactory(client).create;
};

exports.createClientContext = createClientContext;
exports.ClientContextFactory = ClientContextFactory;

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

var _stringify = __webpack_require__(183);

var _stringify2 = _interopRequireDefault(_stringify);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

var _constants = __webpack_require__(40);

var _commandConstants = __webpack_require__(6);

var _valueChangedCommand = __webpack_require__(89);

var _valueChangedCommand2 = _interopRequireDefault(_valueChangedCommand);

var _attributeMetadataChangedCommand = __webpack_require__(90);

var _attributeMetadataChangedCommand2 = _interopRequireDefault(_attributeMetadataChangedCommand);

var _callActionCommand = __webpack_require__(91);

var _callActionCommand2 = _interopRequireDefault(_callActionCommand);

var _changeAttributeMetadataCommand = __webpack_require__(92);

var _changeAttributeMetadataCommand2 = _interopRequireDefault(_changeAttributeMetadataCommand);

var _createContextCommand = __webpack_require__(93);

var _createContextCommand2 = _interopRequireDefault(_createContextCommand);

var _createControllerCommand = __webpack_require__(94);

var _createControllerCommand2 = _interopRequireDefault(_createControllerCommand);

var _createPresentationModelCommand = __webpack_require__(95);

var _createPresentationModelCommand2 = _interopRequireDefault(_createPresentationModelCommand);

var _deletePresentationModelCommand = __webpack_require__(96);

var _deletePresentationModelCommand2 = _interopRequireDefault(_deletePresentationModelCommand);

var _destroyContextCommand = __webpack_require__(97);

var _destroyContextCommand2 = _interopRequireDefault(_destroyContextCommand);

var _destroyControllerCommand = __webpack_require__(98);

var _destroyControllerCommand2 = _interopRequireDefault(_destroyControllerCommand);

var _interruptLongPollCommand = __webpack_require__(99);

var _interruptLongPollCommand2 = _interopRequireDefault(_interruptLongPollCommand);

var _presentationModelDeletedCommand = __webpack_require__(100);

var _presentationModelDeletedCommand2 = _interopRequireDefault(_presentationModelDeletedCommand);

var _startLongPollCommand = __webpack_require__(101);

var _startLongPollCommand2 = _interopRequireDefault(_startLongPollCommand);

var _codecError = __webpack_require__(185);

var _codecError2 = _interopRequireDefault(_codecError);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Codec = function () {
    function Codec() {
        (0, _classCallCheck3.default)(this, Codec);
    }

    (0, _createClass3.default)(Codec, null, [{
        key: '_encodeAttributeMetadataChangedCommand',
        value: function _encodeAttributeMetadataChangedCommand(command) {
            (0, _utils.checkMethod)("Codec.encodeAttributeMetadataChangedCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.attributeId, "command.attributeId");
            (0, _utils.checkParam)(command.metadataName, "command.metadataName");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.ATTRIBUTE_METADATA_CHANGED_COMMAND_ID;
            jsonCommand[_commandConstants.ATTRIBUTE_ID] = command.attributeId;
            jsonCommand[_commandConstants.NAME] = command.metadataName;
            jsonCommand[_commandConstants.VALUE] = command.value;
            return jsonCommand;
        }
    }, {
        key: '_decodeAttributeMetadataChangedCommand',
        value: function _decodeAttributeMetadataChangedCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec.decodeAttributeMetadataChangedCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.NAME], "jsonCommand[NAME]");

            var command = new _attributeMetadataChangedCommand2.default();
            command.attributeId = jsonCommand[_commandConstants.ATTRIBUTE_ID];
            command.metadataName = jsonCommand[_commandConstants.NAME];
            command.value = jsonCommand[_commandConstants.VALUE];
            return command;
        }
    }, {
        key: '_encodeCallActionCommand',
        value: function _encodeCallActionCommand(command) {
            (0, _utils.checkMethod)("Codec.encodeCallActionCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.controllerid, "command.controllerid");
            (0, _utils.checkParam)(command.actionName, "command.actionName");
            (0, _utils.checkParam)(command.params, "command.params");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.CALL_ACTION_COMMAND_ID;
            jsonCommand[_commandConstants.CONTROLLER_ID] = command.controllerid;
            jsonCommand[_commandConstants.NAME] = command.actionName;
            jsonCommand[_commandConstants.PARAMS] = command.params.map(function (param) {
                var result = {};
                result[_commandConstants.NAME] = param.name;
                if ((0, _utils.exists)(param.value)) {
                    result[_commandConstants.VALUE] = param.value;
                }
                return result;
            });
            return jsonCommand;
        }
    }, {
        key: '_decodeCallActionCommand',
        value: function _decodeCallActionCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec.decodeCallActionCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.NAME], "jsonCommand[NAME]");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.PARAMS], "jsonCommand[PARAMS]");

            var command = new _callActionCommand2.default();
            command.controllerid = jsonCommand[_commandConstants.CONTROLLER_ID];
            command.actionName = jsonCommand[_commandConstants.NAME];

            command.params = jsonCommand[_commandConstants.PARAMS].map(function (param) {
                return {
                    'name': param[_commandConstants.NAME],
                    'value': (0, _utils.exists)(param[_commandConstants.VALUE]) ? param[_commandConstants.VALUE] : null
                };
            });
            return command;
        }
    }, {
        key: '_encodeChangeAttributeMetadataCommand',
        value: function _encodeChangeAttributeMetadataCommand(command) {
            (0, _utils.checkMethod)("Codec.encodeChangeAttributeMetadataCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.attributeId, "command.attributeId");
            (0, _utils.checkParam)(command.metadataName, "command.metadataName");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.CHANGE_ATTRIBUTE_METADATA_COMMAND_ID;
            jsonCommand[_commandConstants.ATTRIBUTE_ID] = command.attributeId;
            jsonCommand[_commandConstants.NAME] = command.metadataName;
            jsonCommand[_commandConstants.VALUE] = command.value;
            return jsonCommand;
        }
    }, {
        key: '_decodeChangeAttributeMetadataCommand',
        value: function _decodeChangeAttributeMetadataCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec.decodeChangeAttributeMetadataCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.NAME], "jsonCommand[NAME]");

            var command = new _changeAttributeMetadataCommand2.default();
            command.attributeId = jsonCommand[_commandConstants.ATTRIBUTE_ID];
            command.metadataName = jsonCommand[_commandConstants.NAME];
            command.value = jsonCommand[_commandConstants.VALUE];
            return command;
        }
    }, {
        key: '_encodeCreateContextCommand',
        value: function _encodeCreateContextCommand(command) {
            (0, _utils.checkMethod)("Codec.encodeCreateContextCommand");
            (0, _utils.checkParam)(command, "command");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.CREATE_CONTEXT_COMMAND_ID;
            return jsonCommand;
        }
    }, {
        key: '_decodeCreateContextCommand',
        value: function _decodeCreateContextCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec.decodeCreateContextCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");

            var command = new _createContextCommand2.default();
            return command;
        }
    }, {
        key: '_encodeCreateControllerCommand',
        value: function _encodeCreateControllerCommand(command) {
            (0, _utils.checkMethod)("Codec._encodeCreateControllerCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.controllerName, "command.controllerName");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.CREATE_CONTROLLER_COMMAND_ID;
            jsonCommand[_commandConstants.NAME] = command.controllerName;
            jsonCommand[_commandConstants.CONTROLLER_ID] = command.parentControllerId;
            return jsonCommand;
        }
    }, {
        key: '_decodeCreateControllerCommand',
        value: function _decodeCreateControllerCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec._decodeCreateControllerCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.NAME], "jsonCommand[NAME]");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");

            var command = new _createControllerCommand2.default();
            command.controllerName = jsonCommand[_commandConstants.NAME];
            command.parentControllerId = jsonCommand[_commandConstants.CONTROLLER_ID];
            return command;
        }
    }, {
        key: '_encodeCreatePresentationModelCommand',
        value: function _encodeCreatePresentationModelCommand(command) {
            (0, _utils.checkMethod)("Codec.encodeCreatePresentationModelCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.pmId, "command.pmId");
            (0, _utils.checkParam)(command.pmType, "command.pmType");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.CREATE_PRESENTATION_MODEL_COMMAND_ID;
            jsonCommand[_commandConstants.PM_ID] = command.pmId;
            jsonCommand[_commandConstants.PM_TYPE] = command.pmType;
            jsonCommand[_commandConstants.PM_ATTRIBUTES] = command.attributes.map(function (attribute) {
                var result = {};
                result[_commandConstants.NAME] = attribute.propertyName;
                result[_commandConstants.ATTRIBUTE_ID] = attribute.id;
                if ((0, _utils.exists)(attribute.value)) {
                    result[_commandConstants.VALUE] = attribute.value;
                }
                return result;
            });
            return jsonCommand;
        }
    }, {
        key: '_decodeCreatePresentationModelCommand',
        value: function _decodeCreatePresentationModelCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec.decodeCreatePresentationModelCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.PM_ID], "jsonCommand[PM_ID]");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.PM_TYPE], "jsonCommand[PM_TYPE]");

            var command = new _createPresentationModelCommand2.default();
            command.pmId = jsonCommand[_commandConstants.PM_ID];
            command.pmType = jsonCommand[_commandConstants.PM_TYPE];

            command.attributes = jsonCommand[_commandConstants.PM_ATTRIBUTES].map(function (attribute) {
                return {
                    'propertyName': attribute[_commandConstants.NAME],
                    'id': attribute[_commandConstants.ATTRIBUTE_ID],
                    'value': (0, _utils.exists)(attribute[_commandConstants.VALUE]) ? attribute[_commandConstants.VALUE] : null
                };
            });
            return command;
        }
    }, {
        key: '_encodeDeletePresentationModelCommand',
        value: function _encodeDeletePresentationModelCommand(command) {
            (0, _utils.checkMethod)("Codec._encodeDeletePresentationModelCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.pmId, "command.pmId");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.DELETE_PRESENTATION_MODEL_COMMAND_ID;
            jsonCommand[_commandConstants.PM_ID] = command.pmId;
            return jsonCommand;
        }
    }, {
        key: '_decodeDeletePresentationModelCommand',
        value: function _decodeDeletePresentationModelCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec._decodeDeletePresentationModelCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.PM_ID], "jsonCommand[PM_ID]");

            var command = new _deletePresentationModelCommand2.default();
            command.pmId = jsonCommand[_commandConstants.PM_ID];
            return command;
        }
    }, {
        key: '_encodeDestroyContextCommand',
        value: function _encodeDestroyContextCommand(command) {
            (0, _utils.checkMethod)("Codec._encodeDestroyContextCommand");
            (0, _utils.checkParam)(command, "command");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.DESTROY_CONTEXT_COMMAND_ID;
            return jsonCommand;
        }
    }, {
        key: '_decodeDestroyContextCommand',
        value: function _decodeDestroyContextCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec._decodeDestroyContextCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");

            var command = new _destroyContextCommand2.default();
            return command;
        }
    }, {
        key: '_encodeDestroyControllerCommand',
        value: function _encodeDestroyControllerCommand(command) {
            (0, _utils.checkMethod)("Codec._encodeDestroyControllerCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.controllerId, "command.controllerId");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.DESTROY_CONTROLLER_COMMAND_ID;
            jsonCommand[_commandConstants.CONTROLLER_ID] = command.controllerId;
            return jsonCommand;
        }
    }, {
        key: '_decodeDestroyControllerCommand',
        value: function _decodeDestroyControllerCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec._decodeDestroyControllerCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");

            var command = new _destroyControllerCommand2.default();
            command.controllerId = jsonCommand[_commandConstants.CONTROLLER_ID];
            return command;
        }
    }, {
        key: '_encodeInterruptLongPollCommand',
        value: function _encodeInterruptLongPollCommand(command) {
            (0, _utils.checkMethod)("Codec._encodeInterruptLongPollCommand");
            (0, _utils.checkParam)(command, "command");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.INTERRUPT_LONG_POLL_COMMAND_ID;
            return jsonCommand;
        }
    }, {
        key: '_decodeInterruptLongPollCommand',
        value: function _decodeInterruptLongPollCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec._decodeInterruptLongPollCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");

            var command = new _interruptLongPollCommand2.default();
            return command;
        }
    }, {
        key: '_encodePresentationModelDeletedCommand',
        value: function _encodePresentationModelDeletedCommand(command) {
            (0, _utils.checkMethod)("Codec._encodePresentationModelDeletedCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.pmId, "command.pmId");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.PRESENTATION_MODEL_DELETED_COMMAND_ID;
            jsonCommand[_commandConstants.PM_ID] = command.pmId;
            return jsonCommand;
        }
    }, {
        key: '_decodePresentationModelDeletedCommand',
        value: function _decodePresentationModelDeletedCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec._decodePresentationModelDeletedCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.PM_ID], "jsonCommand[PM_ID]");

            var command = new _presentationModelDeletedCommand2.default();
            command.pmId = jsonCommand[_commandConstants.PM_ID];
            return command;
        }
    }, {
        key: '_encodeStartLongPollCommand',
        value: function _encodeStartLongPollCommand(command) {
            (0, _utils.checkMethod)("Codec._encodeStartLongPollCommand");
            (0, _utils.checkParam)(command, "command");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.START_LONG_POLL_COMMAND_ID;
            return jsonCommand;
        }
    }, {
        key: '_decodeStartLongPollCommand',
        value: function _decodeStartLongPollCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec._decodeStartLongPollCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");

            var command = new _startLongPollCommand2.default();
            return command;
        }
    }, {
        key: '_encodeValueChangedCommand',
        value: function _encodeValueChangedCommand(command) {
            (0, _utils.checkMethod)("Codec.encodeValueChangedCommand");
            (0, _utils.checkParam)(command, "command");
            (0, _utils.checkParam)(command.attributeId, "command.attributeId");

            var jsonCommand = {};
            jsonCommand[_commandConstants.ID] = _commandConstants.VALUE_CHANGED_COMMAND_ID;
            jsonCommand[_commandConstants.ATTRIBUTE_ID] = command.attributeId;
            if ((0, _utils.exists)(command.newValue)) {
                jsonCommand[_commandConstants.VALUE] = command.newValue;
            }
            return jsonCommand;
        }
    }, {
        key: '_decodeValueChangedCommand',
        value: function _decodeValueChangedCommand(jsonCommand) {
            (0, _utils.checkMethod)("Codec.decodeValueChangedCommand");
            (0, _utils.checkParam)(jsonCommand, "jsonCommand");
            (0, _utils.checkParam)(jsonCommand[_commandConstants.ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");

            var command = new _valueChangedCommand2.default();
            command.attributeId = jsonCommand[_commandConstants.ATTRIBUTE_ID];
            if ((0, _utils.exists)(jsonCommand[_commandConstants.VALUE])) {
                command.newValue = jsonCommand[_commandConstants.VALUE];
            } else {
                command.newValue = null;
            }
            return command;
        }
    }, {
        key: 'encode',
        value: function encode(commands) {
            (0, _utils.checkMethod)("Codec.encode");
            (0, _utils.checkParam)(commands, "commands");

            var self = this;
            return (0, _stringify2.default)(commands.map(function (command) {
                if (command.id === _commandConstants.ATTRIBUTE_METADATA_CHANGED_COMMAND_ID) {
                    return self._encodeAttributeMetadataChangedCommand(command);
                } else if (command.id === _commandConstants.CALL_ACTION_COMMAND_ID) {
                    return self._encodeCallActionCommand(command);
                } else if (command.id === _commandConstants.CHANGE_ATTRIBUTE_METADATA_COMMAND_ID) {
                    return self._encodeChangeAttributeMetadataCommand(command);
                } else if (command.id === _commandConstants.CREATE_CONTEXT_COMMAND_ID) {
                    return self._encodeCreateContextCommand(command);
                } else if (command.id === _commandConstants.CREATE_CONTROLLER_COMMAND_ID) {
                    return self._encodeCreateControllerCommand(command);
                } else if (command.id === _commandConstants.CREATE_PRESENTATION_MODEL_COMMAND_ID) {
                    return self._encodeCreatePresentationModelCommand(command);
                } else if (command.id === _commandConstants.DELETE_PRESENTATION_MODEL_COMMAND_ID) {
                    return self._encodeDeletePresentationModelCommand(command);
                } else if (command.id === _commandConstants.DESTROY_CONTEXT_COMMAND_ID) {
                    return self._encodeDestroyContextCommand(command);
                } else if (command.id === _commandConstants.DESTROY_CONTROLLER_COMMAND_ID) {
                    return self._encodeDestroyControllerCommand(command);
                } else if (command.id === _commandConstants.INTERRUPT_LONG_POLL_COMMAND_ID) {
                    return self._encodeInterruptLongPollCommand(command);
                } else if (command.id === _commandConstants.PRESENTATION_MODEL_DELETED_COMMAND_ID) {
                    return self._encodePresentationModelDeletedCommand(command);
                } else if (command.id === _commandConstants.START_LONG_POLL_COMMAND_ID) {
                    return self._encodeStartLongPollCommand(command);
                } else if (command.id === _commandConstants.VALUE_CHANGED_COMMAND_ID) {
                    return self._encodeValueChangedCommand(command);
                } else {
                    throw new _codecError2.default('Command of type ' + command.id + ' can not be handled');
                }
            }));
        }
    }, {
        key: 'decode',
        value: function decode(transmitted) {
            (0, _utils.checkMethod)("Codec.decode");
            (0, _utils.checkParam)(transmitted, "transmitted");

            if ((typeof transmitted === 'undefined' ? 'undefined' : (0, _typeof3.default)(transmitted)) === _constants.JS_STRING_TYPE) {
                var self = this;
                return JSON.parse(transmitted).map(function (command) {
                    if (command.id === _commandConstants.ATTRIBUTE_METADATA_CHANGED_COMMAND_ID) {
                        return self._decodeAttributeMetadataChangedCommand(command);
                    } else if (command.id === _commandConstants.CALL_ACTION_COMMAND_ID) {
                        return self._decodeCallActionCommand(command);
                    } else if (command.id === _commandConstants.CHANGE_ATTRIBUTE_METADATA_COMMAND_ID) {
                        return self._decodeChangeAttributeMetadataCommand(command);
                    } else if (command.id === _commandConstants.CREATE_CONTEXT_COMMAND_ID) {
                        return self._decodeCreateContextCommand(command);
                    } else if (command.id === _commandConstants.CREATE_CONTROLLER_COMMAND_ID) {
                        return self._decodeCreateControllerCommand(command);
                    } else if (command.id === _commandConstants.CREATE_PRESENTATION_MODEL_COMMAND_ID) {
                        return self._decodeCreatePresentationModelCommand(command);
                    } else if (command.id === _commandConstants.DELETE_PRESENTATION_MODEL_COMMAND_ID) {
                        return self._decodeDeletePresentationModelCommand(command);
                    } else if (command.id === _commandConstants.DESTROY_CONTEXT_COMMAND_ID) {
                        return self._decodeDestroyContextCommand(command);
                    } else if (command.id === _commandConstants.DESTROY_CONTROLLER_COMMAND_ID) {
                        return self._decodeDestroyControllerCommand(command);
                    } else if (command.id === _commandConstants.INTERRUPT_LONG_POLL_COMMAND_ID) {
                        return self._decodeInterruptLongPollCommand(command);
                    } else if (command.id === _commandConstants.PRESENTATION_MODEL_DELETED_COMMAND_ID) {
                        return self._decodePresentationModelDeletedCommand(command);
                    } else if (command.id === _commandConstants.START_LONG_POLL_COMMAND_ID) {
                        return self._decodeStartLongPollCommand(command);
                    } else if (command.id === _commandConstants.VALUE_CHANGED_COMMAND_ID) {
                        return self._decodeValueChangedCommand(command);
                    } else {
                        throw new _codecError2.default('Command of type ' + command.id + ' can not be handled');
                    }
                });
            } else {
                throw new _codecError2.default('Can not decode data that is not of type string');
            }
        }
    }]);
    return Codec;
}();

exports.default = Codec;

/***/ }),
/* 87 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(66);
var hiddenKeys = __webpack_require__(50).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};


/***/ }),
/* 88 */
/***/ (function(module, exports, __webpack_require__) {

var pIE = __webpack_require__(39);
var createDesc = __webpack_require__(25);
var toIObject = __webpack_require__(22);
var toPrimitive = __webpack_require__(43);
var has = __webpack_require__(17);
var IE8_DOM_DEFINE = __webpack_require__(63);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(12) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) { /* empty */ }
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};


/***/ }),
/* 89 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ValueChangedCommand = function () {
    function ValueChangedCommand() {
        (0, _classCallCheck3.default)(this, ValueChangedCommand);

        this.id = _commandConstants.VALUE_CHANGED_COMMAND_ID;
    }

    (0, _createClass3.default)(ValueChangedCommand, [{
        key: 'init',
        value: function init(attributeId, newValue) {
            (0, _utils.checkMethod)('ValueChangedCommand.init()');
            (0, _utils.checkParam)(attributeId, 'attributeId');

            this.attributeId = attributeId;
            this.newValue = newValue;
        }
    }]);
    return ValueChangedCommand;
}();

exports.default = ValueChangedCommand;

/***/ }),
/* 90 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AttributeMetadataChangedCommand = function () {
    function AttributeMetadataChangedCommand() {
        (0, _classCallCheck3.default)(this, AttributeMetadataChangedCommand);

        this.id = _commandConstants.ATTRIBUTE_METADATA_CHANGED_COMMAND_ID;
    }

    (0, _createClass3.default)(AttributeMetadataChangedCommand, [{
        key: 'init',
        value: function init(attributeId, metadataName, value) {
            (0, _utils.checkMethod)('AttributeMetadataChangedCommand.init()');
            (0, _utils.checkParam)(attributeId, 'attributeId');
            (0, _utils.checkParam)(metadataName, 'metadataName');

            this.attributeId = attributeId;
            this.metadataName = metadataName;
            this.value = value;
        }
    }]);
    return AttributeMetadataChangedCommand;
}();

exports.default = AttributeMetadataChangedCommand;

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CallActionCommand = function () {
    function CallActionCommand() {
        (0, _classCallCheck3.default)(this, CallActionCommand);

        this.id = _commandConstants.CALL_ACTION_COMMAND_ID;
    }

    (0, _createClass3.default)(CallActionCommand, [{
        key: 'init',
        value: function init(controllerid, actionName, params) {
            (0, _utils.checkMethod)('CreateControllerCommand.init()');
            (0, _utils.checkParam)(controllerid, 'controllerid');
            (0, _utils.checkParam)(actionName, 'actionName');

            this.controllerid = controllerid;
            this.actionName = actionName;
            this.params = params;
        }
    }]);
    return CallActionCommand;
}();

exports.default = CallActionCommand;

/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ChangeAttributeMetadataCommand = function () {
    function ChangeAttributeMetadataCommand() {
        (0, _classCallCheck3.default)(this, ChangeAttributeMetadataCommand);

        this.id = _commandConstants.CHANGE_ATTRIBUTE_METADATA_COMMAND_ID;
    }

    (0, _createClass3.default)(ChangeAttributeMetadataCommand, [{
        key: 'init',
        value: function init(attributeId, metadataName, value) {
            (0, _utils.checkMethod)('ChangeAttributeMetadataCommand.init()');
            (0, _utils.checkParam)(attributeId, 'attributeId');
            (0, _utils.checkParam)(metadataName, 'metadataName');

            this.attributeId = attributeId;
            this.metadataName = metadataName;
            this.value = value;
        }
    }]);
    return ChangeAttributeMetadataCommand;
}();

exports.default = ChangeAttributeMetadataCommand;

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _commandConstants = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateContextCommand = function CreateContextCommand() {
    (0, _classCallCheck3.default)(this, CreateContextCommand);

    this.id = _commandConstants.CREATE_CONTEXT_COMMAND_ID;
};

exports.default = CreateContextCommand;

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreateControllerCommand = function () {
    function CreateControllerCommand() {
        (0, _classCallCheck3.default)(this, CreateControllerCommand);

        this.id = _commandConstants.CREATE_CONTROLLER_COMMAND_ID;
    }

    (0, _createClass3.default)(CreateControllerCommand, [{
        key: 'init',
        value: function init(controllerName, parentControllerId) {
            (0, _utils.checkMethod)('CreateControllerCommand.init()');
            (0, _utils.checkParam)(controllerName, 'controllerName');

            this.controllerName = controllerName;
            this.parentControllerId = parentControllerId;
        }
    }]);
    return CreateControllerCommand;
}();

exports.default = CreateControllerCommand;

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CreatePresentationModelCommand = function () {
    function CreatePresentationModelCommand() {
        (0, _classCallCheck3.default)(this, CreatePresentationModelCommand);

        this.id = _commandConstants.CREATE_PRESENTATION_MODEL_COMMAND_ID;
    }

    (0, _createClass3.default)(CreatePresentationModelCommand, [{
        key: 'init',
        value: function init(presentationModel) {
            (0, _utils.checkMethod)('CreatePresentationModelCommand.init()');
            (0, _utils.checkParam)(presentationModel, 'presentationModel');

            this.attributes = [];
            this.clientSideOnly = false;
            this.pmId = presentationModel.id;
            this.pmType = presentationModel.presentationModelType;
            var command = this;
            presentationModel.getAttributes().forEach(function (attr) {
                command.attributes.push({
                    propertyName: attr.propertyName,
                    id: attr.id,
                    value: attr.getValue()
                });
            });
        }
    }]);
    return CreatePresentationModelCommand;
}();

exports.default = CreatePresentationModelCommand;

/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DeletePresentationModelCommand = function () {
    function DeletePresentationModelCommand() {
        (0, _classCallCheck3.default)(this, DeletePresentationModelCommand);

        this.id = _commandConstants.DELETE_PRESENTATION_MODEL_COMMAND_ID;
    }

    (0, _createClass3.default)(DeletePresentationModelCommand, [{
        key: 'init',
        value: function init(pmId) {
            (0, _utils.checkMethod)('DeletePresentationModelCommand.init()');
            (0, _utils.checkParam)(pmId, 'pmId');

            this.pmId = pmId;
        }
    }]);
    return DeletePresentationModelCommand;
}();

exports.default = DeletePresentationModelCommand;

/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _commandConstants = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DestroyContextCommand = function DestroyContextCommand() {
    (0, _classCallCheck3.default)(this, DestroyContextCommand);

    this.id = _commandConstants.DESTROY_CONTEXT_COMMAND_ID;
};

exports.default = DestroyContextCommand;

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DestroyControllerCommand = function () {
    function DestroyControllerCommand() {
        (0, _classCallCheck3.default)(this, DestroyControllerCommand);

        this.id = _commandConstants.DESTROY_CONTROLLER_COMMAND_ID;
    }

    (0, _createClass3.default)(DestroyControllerCommand, [{
        key: 'init',
        value: function init(controllerId) {
            (0, _utils.checkMethod)('DestroyControllerCommand.init()');
            (0, _utils.checkParam)(controllerId, 'controllerId');

            this.controllerId = controllerId;
        }
    }]);
    return DestroyControllerCommand;
}();

exports.default = DestroyControllerCommand;

/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _commandConstants = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var InterruptLongPollCommand = function InterruptLongPollCommand() {
    (0, _classCallCheck3.default)(this, InterruptLongPollCommand);

    this.id = _commandConstants.INTERRUPT_LONG_POLL_COMMAND_ID;
};

exports.default = InterruptLongPollCommand;

/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PresentationModelDeletedCommand = function () {
    function PresentationModelDeletedCommand() {
        (0, _classCallCheck3.default)(this, PresentationModelDeletedCommand);

        this.id = _commandConstants.PRESENTATION_MODEL_DELETED_COMMAND_ID;
    }

    (0, _createClass3.default)(PresentationModelDeletedCommand, [{
        key: 'init',
        value: function init(pmId) {
            (0, _utils.checkMethod)('PresentationModelDeletedCommand.init()');
            (0, _utils.checkParam)(pmId, 'pmId');

            this.pmId = pmId;
        }
    }]);
    return PresentationModelDeletedCommand;
}();

exports.default = PresentationModelDeletedCommand;

/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _commandConstants = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var StartLongPollCommand = function StartLongPollCommand() {
    (0, _classCallCheck3.default)(this, StartLongPollCommand);

    this.id = _commandConstants.START_LONG_POLL_COMMAND_ID;
};

exports.default = StartLongPollCommand;

/***/ }),
/* 102 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(186), __esModule: true };

/***/ }),
/* 103 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && ((typeof call === "undefined" ? "undefined" : (0, _typeof3.default)(call)) === "object" || typeof call === "function") ? call : self;
};

/***/ }),
/* 104 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _setPrototypeOf = __webpack_require__(189);

var _setPrototypeOf2 = _interopRequireDefault(_setPrototypeOf);

var _create = __webpack_require__(193);

var _create2 = _interopRequireDefault(_create);

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : (0, _typeof3.default)(superClass)));
  }

  subClass.prototype = (0, _create2.default)(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf2.default ? (0, _setPrototypeOf2.default)(subClass, superClass) : subClass.__proto__ = superClass;
};

/***/ }),
/* 105 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _eventBus = __webpack_require__(61);

var _eventBus2 = _interopRequireDefault(_eventBus);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var presentationModelInstanceCount = 0;
var ClientPresentationModel = function () {
    function ClientPresentationModel(id, presentationModelType) {
        (0, _classCallCheck3.default)(this, ClientPresentationModel);

        this.id = id;
        this.presentationModelType = presentationModelType;
        this.attributes = [];
        this.clientSideOnly = false;
        this.dirty = false;
        if (typeof id !== 'undefined' && id != null) {
            this.id = id;
        } else {
            this.id = (presentationModelInstanceCount++).toString();
        }
        this.invalidBus = new _eventBus2.default();
        this.dirtyValueChangeBus = new _eventBus2.default();
    }

    (0, _createClass3.default)(ClientPresentationModel, [{
        key: 'copy',
        value: function copy() {
            var result = new ClientPresentationModel(null, this.presentationModelType);
            result.clientSideOnly = true;
            this.getAttributes().forEach(function (attribute) {
                var attributeCopy = attribute.copy();
                result.addAttribute(attributeCopy);
            });
            return result;
        }
    }, {
        key: 'addAttributes',
        value: function addAttributes(attributes) {
            var _this = this;

            if (!attributes || attributes.length < 1) return;
            attributes.forEach(function (attr) {
                _this.addAttribute(attr);
            });
        }
    }, {
        key: 'addAttribute',
        value: function addAttribute(attribute) {
            var _this2 = this;

            if (!attribute || this.attributes.indexOf(attribute) > -1) {
                return;
            }
            if (this.findAttributeByPropertyName(attribute.propertyName)) {
                throw new Error("There already is an attribute with property name: " + attribute.propertyName + " in presentation model with id: " + this.id);
            }
            if (attribute.getQualifier() && this.findAttributeByQualifier(attribute.getQualifier())) {
                throw new Error("There already is an attribute with qualifier: " + attribute.getQualifier() + " in presentation model with id: " + this.id);
            }
            attribute.setPresentationModel(this);
            this.attributes.push(attribute);
            attribute.onValueChange(function () {
                _this2.invalidBus.trigger({ source: _this2 });
            });
        }
    }, {
        key: 'onInvalidated',
        value: function onInvalidated(handleInvalidate) {
            this.invalidBus.onEvent(handleInvalidate);
        }
    }, {
        key: 'getAttributes',
        value: function getAttributes() {
            return this.attributes.slice(0);
        }
    }, {
        key: 'getAt',
        value: function getAt(propertyName) {
            return this.findAttributeByPropertyName(propertyName);
        }
    }, {
        key: 'findAllAttributesByPropertyName',
        value: function findAllAttributesByPropertyName(propertyName) {
            var result = [];
            if (!propertyName) return null;
            this.attributes.forEach(function (attribute) {
                if (attribute.propertyName == propertyName) {
                    result.push(attribute);
                }
            });
            return result;
        }
    }, {
        key: 'findAttributeByPropertyName',
        value: function findAttributeByPropertyName(propertyName) {
            if (!propertyName) return null;
            for (var i = 0; i < this.attributes.length; i++) {
                if (this.attributes[i].propertyName == propertyName) {
                    return this.attributes[i];
                }
            }
            return null;
        }
    }, {
        key: 'findAttributeByQualifier',
        value: function findAttributeByQualifier(qualifier) {
            if (!qualifier) return null;
            for (var i = 0; i < this.attributes.length; i++) {
                if (this.attributes[i].getQualifier() == qualifier) {
                    return this.attributes[i];
                }
            }
            return null;
        }
    }, {
        key: 'findAttributeById',
        value: function findAttributeById(id) {
            if (!id) return null;
            for (var i = 0; i < this.attributes.length; i++) {
                if (this.attributes[i].id == id) {
                    return this.attributes[i];
                }
            }
            return null;
        }
    }, {
        key: 'syncWith',
        value: function syncWith(sourcePresentationModel) {
            this.attributes.forEach(function (targetAttribute) {
                var sourceAttribute = sourcePresentationModel.getAt(targetAttribute.propertyName);
                if (sourceAttribute) {
                    targetAttribute.syncWith(sourceAttribute);
                }
            });
        }
    }]);
    return ClientPresentationModel;
}();

exports.default = ClientPresentationModel;

/***/ }),
/* 106 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ACTION_CALL_BEAN = exports.SOURCE_SYSTEM_SERVER = exports.SOURCE_SYSTEM_CLIENT = exports.SOURCE_SYSTEM = undefined;

var _promise = __webpack_require__(19);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

var _commandFactory = __webpack_require__(41);

var _commandFactory2 = _interopRequireDefault(_commandFactory);

var _constants = __webpack_require__(40);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOLPHIN_BEAN = '@@@ R_BEAN @@@';
var ACTION_CALL_BEAN = '@@@ CONTROLLER_ACTION_CALL_BEAN @@@';
var HIGHLANDER_BEAN = '@@@ HIGHLANDER_BEAN @@@';
var DOLPHIN_LIST_SPLICE = '@R:LS@';
var SOURCE_SYSTEM = '@@@ SOURCE_SYSTEM @@@';
var SOURCE_SYSTEM_CLIENT = 'client';
var SOURCE_SYSTEM_SERVER = 'server';

var Connector = function () {
    function Connector(url, dolphin, classRepository, config) {
        (0, _classCallCheck3.default)(this, Connector);

        (0, _utils.checkMethod)('Connector(url, dolphin, classRepository, config)');
        (0, _utils.checkParam)(url, 'url');
        (0, _utils.checkParam)(dolphin, 'dolphin');
        (0, _utils.checkParam)(classRepository, 'classRepository');

        var self = this;
        this.dolphin = dolphin;
        this.config = config;
        this.classRepository = classRepository;
        this.highlanderPMResolver = function () {};
        this.highlanderPMPromise = new _promise2.default(function (resolve) {
            self.highlanderPMResolver = resolve;
        });

        dolphin.getClientModelStore().onModelStoreChange(function (event) {
            var model = event.clientPresentationModel;
            var sourceSystem = model.findAttributeByPropertyName(SOURCE_SYSTEM);
            if ((0, _utils.exists)(sourceSystem) && sourceSystem.value === SOURCE_SYSTEM_SERVER) {
                if (event.eventType === _constants.ADDED_TYPE) {
                    self.onModelAdded(model);
                } else if (event.eventType === _constants.REMOVED_TYPE) {
                    self.onModelRemoved(model);
                }
            }
        });
    }

    (0, _createClass3.default)(Connector, [{
        key: 'connect',
        value: function connect() {
            var that = this;
            that.dolphin.startPushListening(_commandFactory2.default.createStartLongPollCommand(), _commandFactory2.default.createInterruptLongPollCommand());
        }
    }, {
        key: 'onModelAdded',
        value: function onModelAdded(model) {
            (0, _utils.checkMethod)('Connector.onModelAdded(model)');
            (0, _utils.checkParam)(model, 'model');

            var type = model.presentationModelType;
            switch (type) {
                case ACTION_CALL_BEAN:
                    break;
                case DOLPHIN_BEAN:
                    this.classRepository.registerClass(model);
                    break;
                case HIGHLANDER_BEAN:
                    this.highlanderPMResolver(model);
                    break;
                case DOLPHIN_LIST_SPLICE:
                    this.classRepository.spliceListEntry(model);
                    this.dolphin.deletePresentationModel(model);
                    break;
                default:
                    this.classRepository.load(model);
                    break;
            }
        }
    }, {
        key: 'onModelRemoved',
        value: function onModelRemoved(model) {
            (0, _utils.checkMethod)('Connector.onModelRemoved(model)');
            (0, _utils.checkParam)(model, 'model');
            var type = model.presentationModelType;
            switch (type) {
                case DOLPHIN_BEAN:
                    this.classRepository.unregisterClass(model);
                    break;
                case DOLPHIN_LIST_SPLICE:
                    break;
                default:
                    this.classRepository.unload(model);
                    break;
            }
        }
    }, {
        key: 'invoke',
        value: function invoke(command) {
            (0, _utils.checkMethod)('Connector.invoke(command)');
            (0, _utils.checkParam)(command, 'command');

            var dolphin = this.dolphin;
            return new _promise2.default(function (resolve) {
                dolphin.send(command, {
                    onFinished: function onFinished() {
                        resolve();
                    }
                });
            });
        }
    }, {
        key: 'getHighlanderPM',
        value: function getHighlanderPM() {
            return this.highlanderPMPromise;
        }
    }]);
    return Connector;
}();

exports.default = Connector;
exports.SOURCE_SYSTEM = SOURCE_SYSTEM;
exports.SOURCE_SYSTEM_CLIENT = SOURCE_SYSTEM_CLIENT;
exports.SOURCE_SYSTEM_SERVER = SOURCE_SYSTEM_SERVER;
exports.ACTION_CALL_BEAN = ACTION_CALL_BEAN;

/***/ }),
/* 107 */
/***/ (function(module, exports) {


/**
 * Expose `Emitter`.
 */

module.exports = Emitter;

/**
 * Initialize a new `Emitter`.
 *
 * @api public
 */

function Emitter(obj) {
  if (obj) return mixin(obj);
};

/**
 * Mixin the emitter properties.
 *
 * @param {Object} obj
 * @return {Object}
 * @api private
 */

function mixin(obj) {
  for (var key in Emitter.prototype) {
    obj[key] = Emitter.prototype[key];
  }
  return obj;
}

/**
 * Listen on the given `event` with `fn`.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.on =
Emitter.prototype.addEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};
  (this._callbacks[event] = this._callbacks[event] || [])
    .push(fn);
  return this;
};

/**
 * Adds an `event` listener that will be invoked a single
 * time then automatically removed.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.once = function(event, fn){
  var self = this;
  this._callbacks = this._callbacks || {};

  function on() {
    self.off(event, on);
    fn.apply(this, arguments);
  }

  on.fn = fn;
  this.on(event, on);
  return this;
};

/**
 * Remove the given callback for `event` or all
 * registered callbacks.
 *
 * @param {String} event
 * @param {Function} fn
 * @return {Emitter}
 * @api public
 */

Emitter.prototype.off =
Emitter.prototype.removeListener =
Emitter.prototype.removeAllListeners =
Emitter.prototype.removeEventListener = function(event, fn){
  this._callbacks = this._callbacks || {};

  // all
  if (0 == arguments.length) {
    this._callbacks = {};
    return this;
  }

  // specific event
  var callbacks = this._callbacks[event];
  if (!callbacks) return this;

  // remove all handlers
  if (1 == arguments.length) {
    delete this._callbacks[event];
    return this;
  }

  // remove specific handler
  var cb;
  for (var i = 0; i < callbacks.length; i++) {
    cb = callbacks[i];
    if (cb === fn || cb.fn === fn) {
      callbacks.splice(i, 1);
      break;
    }
  }
  return this;
};

/**
 * Emit `event` with the given args.
 *
 * @param {String} event
 * @param {Mixed} ...
 * @return {Emitter}
 */

Emitter.prototype.emit = function(event){
  this._callbacks = this._callbacks || {};
  var args = [].slice.call(arguments, 1)
    , callbacks = this._callbacks[event];

  if (callbacks) {
    callbacks = callbacks.slice(0);
    for (var i = 0, len = callbacks.length; i < len; ++i) {
      callbacks[i].apply(this, args);
    }
  }

  return this;
};

/**
 * Return array of callbacks for `event`.
 *
 * @param {String} event
 * @return {Array}
 * @api public
 */

Emitter.prototype.listeners = function(event){
  this._callbacks = this._callbacks || {};
  return this._callbacks[event] || [];
};

/**
 * Check if this emitter has `event` handlers.
 *
 * @param {String} event
 * @return {Boolean}
 * @api public
 */

Emitter.prototype.hasListeners = function(event){
  return !! this.listeners(event).length;
};


/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HTTP = exports.registerServiceProvider = exports.hasService = exports.getService = exports.LogLevel = exports.LoggerFactory = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _logging = __webpack_require__(5);

var _client = __webpack_require__(145);

var _serviceProvider = __webpack_require__(31);

var _constants = __webpack_require__(14);

var _http = __webpack_require__(146);

var _clientScope = __webpack_require__(166);

var _remoting = __webpack_require__(167);

var _security = __webpack_require__(209);

var _clientContextFactory = __webpack_require__(85);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

(0, _http.register)(_client.Client);
(0, _clientScope.register)(_client.Client);
(0, _remoting.register)(_client.Client);
(0, _security.register)(_client.Client);
_client.Client.init();

var getService = _client.Client.getService;
var hasService = _client.Client.hasService;
var registerServiceProvider = _client.Client.registerServiceProvider;

_client.Client.LOGGER.info('Rico Version:', "1.0.0-CR.4");
exports.LoggerFactory = _logging.LoggerFactory;
exports.LogLevel = _logging.LogLevel;
exports.getService = getService;
exports.hasService = hasService;
exports.registerServiceProvider = registerServiceProvider;
exports.HTTP = _constants.HTTP;


if (window.Worker && window.Blob && window.URL && URL.createObjectURL) {
    _client.Client.LOGGER.debug('Creating Worker');

    var HttpWorker = function () {
        function HttpWorker() {
            (0, _classCallCheck3.default)(this, HttpWorker);

            this.blob = new Blob(["self.handleTimeout = function() {    const message = this.statusText || 'Timeout occurred';    const workerMessage = {error: true, message, status: this.status, timedout: true};    self.postMessage(workerMessage);};self.handleError = function () {    let message = this.statusText || 'Unspecified error occured';    const workerMessage = {error: true, message, status: this.status, timedout: false};    self.postMessage(workerMessage);};self.handleStateChange = function () {    if (this.readyState === 4 && this.status >= 200 && this.status < 300) {        const workerMessage = {error: false, response: this.response, status: this.status, url: this.url, responseHeaders: this.getAllResponseHeaders()};        self.postMessage(workerMessage);    } else if (this.readyState === 4 && this.status >= 300) {        const workerMessage = {error: true, message: this.statusText, status: this.status, timedout: false};        self.postMessage(workerMessage);    }};self.addEventListener('message', function(event) {    const timeout = event.data.timeout || 0;    const configuration = event.data.conf || {};    const requestHeaders = event.data.requestHeaders || [];        const httpRequest = new XMLHttpRequest();    const async = true;        httpRequest.open(configuration.method, configuration.url, async);    httpRequest.url = configuration.url;    httpRequest.method = configuration.method;    httpRequest.withCredentials = true;    for (let i = 0; i < requestHeaders.length; i++) {        const header = requestHeaders[i];        httpRequest.setRequestHeader(header.name, header.value);    }    if (configuration.headers && configuration.headers.length > 0) {        for (let i = 0; i < configuration.headers.length; i++) {            const header = configuration.headers[i];            httpRequest.setRequestHeader(header.name, header.value);        }    }    httpRequest.timeout = timeout;    if (configuration.responseType) {        httpRequest.responseType = configuration.responseType;    }    httpRequest.ontimeout = self.handleTimeout.bind(httpRequest);    httpRequest.onerror = self.handleError.bind(httpRequest);    httpRequest.onreadystatechange = self.handleStateChange.bind(httpRequest);    httpRequest.send(configuration.requestBody);});"], { type: "application/javascript" });
        }

        (0, _createClass3.default)(HttpWorker, [{
            key: 'createWorker',
            value: function createWorker() {
                return new Worker(URL.createObjectURL(this.blob));
            }
        }]);
        return HttpWorker;
    }();

    var httpWorkerProvider = new _serviceProvider.ServiceProvider(HttpWorker, 'HttpWorker');
    _client.Client.registerServiceProvider(httpWorkerProvider);
}

var LOGGER = _logging.LoggerFactory.getLogger('Deprecated:');
var showWarning = true;
function warn() {
    if (showWarning) {
        LOGGER.warn('Please do not use "dolphin" anymore, it may be removed in the next version! Use the new API instead!');
        showWarning = false;
    }
}

if (window) {
    window.dolphin = {
        get ClientContextFactory() {
            warn();
            _clientContextFactory.ClientContextFactory.legecyClientSupport = _client.Client;
            return _clientContextFactory.ClientContextFactory;
        },
        get createClientContext() {
            warn();
            return (0, _clientContextFactory.createClientContext)(_client.Client);
        },
        get LoggerFactory() {
            warn();
            return _logging.LoggerFactory;
        },
        get LogLevel() {
            warn();
            return _logging.LogLevel;
        }
    };
}

/***/ }),
/* 109 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(110);
var $Object = __webpack_require__(3).Object;
module.exports = function defineProperty(it, key, desc) {
  return $Object.defineProperty(it, key, desc);
};


/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(12), 'Object', { defineProperty: __webpack_require__(9).f });


/***/ }),
/* 111 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.LoggerFactory = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _map = __webpack_require__(20);

var _map2 = _interopRequireDefault(_map);

var _utils = __webpack_require__(2);

var _logger = __webpack_require__(140);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ROOT_LOGGER = new _logger.Logger('ROOT');

var LOCALS = {
    loggers: new _map2.default()
};

var LoggerFactory = function () {
    function LoggerFactory() {
        (0, _classCallCheck3.default)(this, LoggerFactory);
    }

    (0, _createClass3.default)(LoggerFactory, null, [{
        key: "getLogger",
        value: function getLogger(context) {
            if (!(0, _utils.exists)(context) || context === 'ROOT') {
                return ROOT_LOGGER;
            }
            var existingLogger = LOCALS.loggers.get(context);
            if (existingLogger) {
                return existingLogger;
            }

            var logger = new _logger.Logger(context, ROOT_LOGGER);
            LOCALS.loggers.set(context, logger);
            return logger;
        }
    }]);
    return LoggerFactory;
}();

exports.LoggerFactory = LoggerFactory;

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(18);
__webpack_require__(23);
__webpack_require__(120);
__webpack_require__(124);
__webpack_require__(126);
__webpack_require__(127);
module.exports = __webpack_require__(3).Map;


/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(44);
var defined = __webpack_require__(45);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? TO_STRING ? s.charAt(i) : a
      : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};


/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var create = __webpack_require__(34);
var descriptor = __webpack_require__(25);
var setToStringTag = __webpack_require__(28);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(15)(IteratorPrototype, __webpack_require__(8)('iterator'), function () { return this; });

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};


/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var dP = __webpack_require__(9);
var anObject = __webpack_require__(11);
var getKeys = __webpack_require__(35);

module.exports = __webpack_require__(12) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) dP.f(O, P = keys[i++], Properties[P]);
  return O;
};


/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(22);
var toLength = __webpack_require__(36);
var toAbsoluteIndex = __webpack_require__(117);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) if (IS_INCLUDES || index in O) {
      if (O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};


/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__(44);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};


/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var addToUnscopables = __webpack_require__(119);
var step = __webpack_require__(69);
var Iterators = __webpack_require__(21);
var toIObject = __webpack_require__(22);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(46)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0;                   // next index
  this._k = kind;                // kind
// 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),
/* 119 */
/***/ (function(module, exports) {

module.exports = function () { /* empty */ };


/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(70);
var validate = __webpack_require__(55);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(74)(MAP, function (get) {
  return function Map() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);


/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(13);
var IObject = __webpack_require__(47);
var toObject = __webpack_require__(29);
var toLength = __webpack_require__(36);
var asc = __webpack_require__(122);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      val = self[index];
      res = f(val, index, O);
      if (TYPE) {
        if (IS_MAP) result[index] = res;   // map
        else if (res) switch (TYPE) {
          case 3: return true;             // some
          case 5: return val;              // find
          case 6: return index;            // findIndex
          case 2: result.push(val);        // filter
        } else if (IS_EVERY) return false; // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};


/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(123);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};


/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(10);
var isArray = __webpack_require__(75);
var SPECIES = __webpack_require__(8)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return C === undefined ? Array : C;
};


/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(4);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(76)('Map') });


/***/ }),
/* 125 */
/***/ (function(module, exports, __webpack_require__) {

var forOf = __webpack_require__(30);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};


/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(77)('Map');


/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(78)('Map');


/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(62);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (obj, key, value) {
  if (key in obj) {
    (0, _defineProperty2.default)(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(130), __esModule: true };

/***/ }),
/* 130 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(131);
module.exports = __webpack_require__(3).Object.assign;


/***/ }),
/* 131 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(4);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(132) });


/***/ }),
/* 132 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(56);
var pIE = __webpack_require__(39);
var toObject = __webpack_require__(29);
var IObject = __webpack_require__(47);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(16)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) { B[k] = k; });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
  } return T;
} : $assign;


/***/ }),
/* 133 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _isIterable2 = __webpack_require__(134);

var _isIterable3 = _interopRequireDefault(_isIterable2);

var _getIterator2 = __webpack_require__(137);

var _getIterator3 = _interopRequireDefault(_getIterator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = (0, _getIterator3.default)(arr), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if ((0, _isIterable3.default)(Object(arr))) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();

/***/ }),
/* 134 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(135), __esModule: true };

/***/ }),
/* 135 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(18);
module.exports = __webpack_require__(136);


/***/ }),
/* 136 */
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__(38);
var ITERATOR = __webpack_require__(8)('iterator');
var Iterators = __webpack_require__(21);
module.exports = __webpack_require__(3).isIterable = function (it) {
  var O = Object(it);
  return O[ITERATOR] !== undefined
    || '@@iterator' in O
    // eslint-disable-next-line no-prototype-builtins
    || Iterators.hasOwnProperty(classof(O));
};


/***/ }),
/* 137 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(138), __esModule: true };

/***/ }),
/* 138 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(23);
__webpack_require__(18);
module.exports = __webpack_require__(139);


/***/ }),
/* 139 */
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__(11);
var get = __webpack_require__(53);
module.exports = __webpack_require__(3).getIterator = function (it) {
  var iterFn = get(it);
  if (typeof iterFn != 'function') throw TypeError(it + ' is not iterable!');
  return anObject(iterFn.call(it));
};


/***/ }),
/* 140 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Logger = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _toConsumableArray2 = __webpack_require__(141);

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _from = __webpack_require__(79);

var _from2 = _interopRequireDefault(_from);

var _utils = __webpack_require__(2);

var _constants = __webpack_require__(64);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var LOCALS = {
    pad: function pad(text, size) {
        var result = '' + text;
        while (result.length < size) {
            result = '0' + result;
        }
        return result;
    },
    internalLog: function internalLog() {
        var args = (0, _from2.default)(arguments);
        var func = args.shift();
        var context = args.shift();
        var logLevel = args.shift();
        var date = new Date();
        var dateString = date.getFullYear() + '-' + LOCALS.pad(date.getMonth() + 1, 2) + '-' + LOCALS.pad(date.getDate(), 2) + ' ' + LOCALS.pad(date.getHours(), 2) + ':' + LOCALS.pad(date.getMinutes(), 2) + ':' + LOCALS.pad(date.getSeconds(), 2) + '.' + LOCALS.pad(date.getMilliseconds(), 3);
        func.apply(undefined, [dateString, logLevel.text, context].concat((0, _toConsumableArray3.default)(args)));
    },
    getCookie: function getCookie(name) {
        if ((0, _utils.exists)(window) && (0, _utils.exists)(window.document) && (0, _utils.exists)(window.document.cookie)) {
            var value = '; ' + window.document.cookie;
            var parts = value.split('; ' + name + '=');
            if (parts.length === 2) {
                return parts.pop().split(';').shift();
            }
        }
    }
};

var Logger = function () {
    function Logger(context, rootLogger) {
        (0, _classCallCheck3.default)(this, Logger);

        this.context = context;
        this.rootLogger = rootLogger;
        var cookieLogLevel = LOCALS.getCookie('RICO_LOGGER_' + this.context);
        switch (cookieLogLevel) {
            case 'NONE':
                this.logLevel = _constants.LogLevel.NONE;
                break;
            case 'ALL':
                this.logLevel = _constants.LogLevel.ALL;
                break;
            case 'TRACE':
                this.logLevel = _constants.LogLevel.TRACE;
                break;
            case 'DEBUG':
                this.logLevel = _constants.LogLevel.DEBUG;
                break;
            case 'INFO':
                this.logLevel = _constants.LogLevel.INFO;
                break;
            case 'WARN':
                this.logLevel = _constants.LogLevel.WARN;
                break;
            case 'ERROR':
                this.logLevel = _constants.LogLevel.ERROR;
                break;
        }
    }

    (0, _createClass3.default)(Logger, [{
        key: 'trace',
        value: function trace() {
            if ((0, _utils.exists)(console) && this.isLogLevel(_constants.LogLevel.TRACE)) {
                LOCALS.internalLog.apply(LOCALS, [console.log, this.context, _constants.LogLevel.TRACE].concat(Array.prototype.slice.call(arguments)));
            }
        }
    }, {
        key: 'debug',
        value: function debug() {
            if ((0, _utils.exists)(console) && this.isLogLevel(_constants.LogLevel.DEBUG)) {
                LOCALS.internalLog.apply(LOCALS, [console.log, this.context, _constants.LogLevel.DEBUG].concat(Array.prototype.slice.call(arguments)));
            }
        }
    }, {
        key: 'info',
        value: function info() {
            if ((0, _utils.exists)(console) && this.isLogLevel(_constants.LogLevel.INFO)) {
                LOCALS.internalLog.apply(LOCALS, [console.log, this.context, _constants.LogLevel.INFO].concat(Array.prototype.slice.call(arguments)));
            }
        }
    }, {
        key: 'warn',
        value: function warn() {
            if ((0, _utils.exists)(console) && this.isLogLevel(_constants.LogLevel.WARN)) {
                LOCALS.internalLog.apply(LOCALS, [console.warn, this.context, _constants.LogLevel.WARN].concat(Array.prototype.slice.call(arguments)));
            }
        }
    }, {
        key: 'error',
        value: function error() {
            if ((0, _utils.exists)(console) && this.isLogLevel(_constants.LogLevel.ERROR)) {
                LOCALS.internalLog.apply(LOCALS, [console.error, this.context, _constants.LogLevel.ERROR].concat(Array.prototype.slice.call(arguments)));
            }
        }
    }, {
        key: 'getLogLevel',
        value: function getLogLevel() {
            if ((0, _utils.exists)(this.logLevel)) {
                return this.logLevel;
            } else if ((0, _utils.exists)(this.rootLogger)) {
                return this.rootLogger.getLogLevel();
            } else {
                return _constants.LogLevel.INFO;
            }
        }
    }, {
        key: 'setLogLevel',
        value: function setLogLevel(level) {
            this.logLevel = level;
        }
    }, {
        key: 'setLogLevelByName',
        value: function setLogLevelByName(levelName) {
            if ((0, _utils.exists)(_constants.LogLevel[levelName])) {
                this.logLevel = _constants.LogLevel[levelName];
            }
        }
    }, {
        key: 'isLogLevel',
        value: function isLogLevel(level) {
            if (this.getLogLevel() === _constants.LogLevel.NONE) {
                return false;
            }
            if (this.getLogLevel() === _constants.LogLevel.ALL) {
                return true;
            }
            if (this.getLogLevel() === _constants.LogLevel.TRACE) {
                return true;
            }
            if (this.getLogLevel() === _constants.LogLevel.DEBUG && level !== _constants.LogLevel.TRACE) {
                return true;
            }
            if (this.getLogLevel() === _constants.LogLevel.INFO && level !== _constants.LogLevel.TRACE && level !== _constants.LogLevel.DEBUG) {
                return true;
            }
            if (this.getLogLevel() === _constants.LogLevel.WARN && level !== _constants.LogLevel.TRACE && level !== _constants.LogLevel.DEBUG && level !== _constants.LogLevel.INFO) {
                return true;
            }
            if (this.getLogLevel() === _constants.LogLevel.ERROR && level !== _constants.LogLevel.TRACE && level !== _constants.LogLevel.DEBUG && level !== _constants.LogLevel.INFO && level !== _constants.LogLevel.WARN) {
                return true;
            }
            return false;
        }
    }, {
        key: 'isLogLevelUseable',
        value: function isLogLevelUseable(level) {
            (0, _utils.checkParam)(level, 'level');
            if (level.level) {
                return this.getLogLevel().level >= level.level;
            } else {
                return false;
            }
        }
    }]);
    return Logger;
}();

exports.Logger = Logger;

/***/ }),
/* 141 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _from = __webpack_require__(79);

var _from2 = _interopRequireDefault(_from);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }

    return arr2;
  } else {
    return (0, _from2.default)(arr);
  }
};

/***/ }),
/* 142 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(143);
module.exports = __webpack_require__(3).Array.from;


/***/ }),
/* 143 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var ctx = __webpack_require__(13);
var $export = __webpack_require__(4);
var toObject = __webpack_require__(29);
var call = __webpack_require__(71);
var isArrayIter = __webpack_require__(72);
var toLength = __webpack_require__(36);
var createProperty = __webpack_require__(144);
var getIterFn = __webpack_require__(53);

$export($export.S + $export.F * !__webpack_require__(80)(function (iter) { Array.from(iter); }), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});


/***/ }),
/* 144 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $defineProperty = __webpack_require__(9);
var createDesc = __webpack_require__(25);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));
  else object[index] = value;
};


/***/ }),
/* 145 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Client = undefined;

var _map = __webpack_require__(20);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _utils = __webpack_require__(2);

var _logging = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Client = function Client() {
    (0, _classCallCheck3.default)(this, Client);
};

Client.LOGGER = _logging.LoggerFactory.getLogger('Client');

Client.services = new _map2.default();
Client.serviceProviders = new _map2.default();
Client.configuration = {};

Client.getService = function (name) {
    var service = Client.services.get(name);
    if (!(0, _utils.exists)(service)) {
        var provider = Client.serviceProviders.get(name);
        if (!(0, _utils.exists)(provider)) {
            throw new Error('No service provider found for ' + name);
        } else {
            service = provider.getService(Client.configuration);
            Client.services.set(name, service);
        }
    }
    return service;
};

Client.hasService = function (name) {
    var provider = Client.serviceProviders.get(name);
    if (!(0, _utils.exists)(provider)) {
        return false;
    } else {
        return true;
    }
};

Client.getAllServiceTypes = function () {
    var result = [];
    Client.serviceProviders.forEach(function (serviceProvider) {
        return result.push(serviceProvider);
    });
    return result;
};

Client.registerServiceProvider = function (serviceProvider) {
    if (serviceProvider === null || typeof serviceProvider === 'undefined') {
        throw new Error('Cannot register empty service provider');
    }

    if (typeof serviceProvider.getName === 'function' && typeof serviceProvider.getService === 'function') {
        var current = Client.serviceProviders.get(serviceProvider.getName());
        if (!current) {
            Client.serviceProviders.set(serviceProvider.getName(), serviceProvider);
            Client.LOGGER.debug('Service provider registered with name', serviceProvider.getName());
        } else {
            throw new Error('Cannot register another service provider. Name already in use.');
        }
    } else {
        throw new Error('Cannot register service provider without getName() and getService() methods');
    }
};

Client.init = function () {
    Client.serviceProviders.forEach(function (serviceProvider) {
        var service = serviceProvider.getService();
        Client.LOGGER.trace('Initializing service for service provider', serviceProvider.getName());
        if (typeof service.initServiceProvider === 'function') {
            Client.LOGGER.debug('Initializing service', service);
            service.initServiceProvider(Client);
        }
    });
};

exports.Client = Client;

/***/ }),
/* 146 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _httpClient = __webpack_require__(147);

var _httpClientInterceptor = __webpack_require__(160);

var _serviceProvider = __webpack_require__(31);

var _utils = __webpack_require__(2);

function register(client) {
    if ((0, _utils.exists)(client)) {
        var httpClientProvider = new _serviceProvider.ServiceProvider(_httpClient.HttpClient, 'HttpClient', client);
        var httpClientInterceptorProvider = new _serviceProvider.ServiceProvider(_httpClientInterceptor.HttpClientInterceptor, 'HttpClientInterceptor', client);

        client.registerServiceProvider(httpClientProvider);
        client.registerServiceProvider(httpClientInterceptorProvider);
    }
}

exports.register = register;

/***/ }),
/* 147 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpClient = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _requestBuilder = __webpack_require__(148);

var _constants = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpClient = function () {
    function HttpClient(client) {
        (0, _classCallCheck3.default)(this, HttpClient);

        this.client = client;
    }

    (0, _createClass3.default)(HttpClient, [{
        key: 'request',
        value: function request(url, method) {
            var configuration = {
                url: url, method: method
            };
            this.requestBuilder = new _requestBuilder.RequestBuilder(configuration, this.client);
            return this.requestBuilder;
        }
    }, {
        key: 'get',
        value: function get(url) {
            return this.request(url, _constants.HTTP.METHOD.GET);
        }
    }, {
        key: 'post',
        value: function post(url) {
            return this.request(url, _constants.HTTP.METHOD.POST);
        }
    }, {
        key: 'put',
        value: function put(url) {
            return this.request(url, _constants.HTTP.METHOD.PUT);
        }
    }, {
        key: 'delete',
        value: function _delete(url) {
            return this.request(url, _constants.HTTP.METHOD.DELETE);
        }
    }]);
    return HttpClient;
}();

exports.HttpClient = HttpClient;

/***/ }),
/* 148 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.RequestBuilder = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _reponseBuilder = __webpack_require__(149);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RequestBuilder = function () {
    function RequestBuilder(configuration, client) {
        (0, _classCallCheck3.default)(this, RequestBuilder);

        this.configuration = configuration;
        this.reponseBuilder = new _reponseBuilder.ResponseBuilder(configuration, client);
    }

    (0, _createClass3.default)(RequestBuilder, [{
        key: 'withHeader',
        value: function withHeader(name, value) {
            if (!this.configuration.headers) {
                this.configuration.headers = [];
            }
            this.configuration.headers.push({ name: name, value: value });
            return this;
        }
    }, {
        key: 'withHeadersInfo',
        value: function withHeadersInfo(headersInfo) {
            if ((0, _utils.exists)(headersInfo)) {
                if (!this.configuration.headers) {
                    this.configuration.headers = [];
                }
                for (var name in headersInfo) {
                    if (headersInfo.hasOwnProperty(name)) {
                        var value = headersInfo[name];
                        this.configuration.headers.push({ name: name, value: value });
                    }
                }
            }
            return this;
        }
    }, {
        key: 'withContent',
        value: function withContent(data) {
            this.configuration.requestBody = data;
            return this.reponseBuilder;
        }
    }, {
        key: 'withoutContent',
        value: function withoutContent() {
            return this.reponseBuilder;
        }
    }]);
    return RequestBuilder;
}();

exports.RequestBuilder = RequestBuilder;

/***/ }),
/* 149 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.ResponseBuilder = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _executor = __webpack_require__(150);

var _constants = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ResponseBuilder = function () {
    function ResponseBuilder(configuration, client) {
        (0, _classCallCheck3.default)(this, ResponseBuilder);

        this.configuration = configuration;
        this.executor = new _executor.Executor(configuration, client);
    }

    (0, _createClass3.default)(ResponseBuilder, [{
        key: 'readBytes',
        value: function readBytes() {
            this.configuration.responseType = _constants.RESPONSE_TYPE.ARRAY_BUFFER;
            return this.executor;
        }
    }, {
        key: 'readString',
        value: function readString() {
            this.configuration.responseType = _constants.RESPONSE_TYPE.TEXT;
            return this.executor;
        }
    }, {
        key: 'readObject',
        value: function readObject() {
            this.configuration.responseType = _constants.RESPONSE_TYPE.JSON;
            return this.executor;
        }
    }, {
        key: 'withoutResult',
        value: function withoutResult() {
            return this.executor;
        }
    }]);
    return ResponseBuilder;
}();

exports.ResponseBuilder = ResponseBuilder;

/***/ }),
/* 150 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Executor = undefined;

var _promise = __webpack_require__(19);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _logging = __webpack_require__(5);

var _httpResponse = __webpack_require__(158);

var _httpException = __webpack_require__(159);

var _constants = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Executor = function () {
    function Executor(configuration, client) {
        (0, _classCallCheck3.default)(this, Executor);

        this.configuration = configuration;
        this.client = client;
    }

    (0, _createClass3.default)(Executor, [{
        key: 'execute',
        value: function execute(timeout, worker) {
            var _this = this;

            var httpWorker = null;
            if (this.client && this.client.hasService('HttpWorker')) {
                httpWorker = this.client.getService('HttpWorker');
            }

            var useWorker = httpWorker !== null && (worker === true || timeout === true);
            var timeoutToUse = 0;
            if (timeout !== true && timeout !== false) {
                timeoutToUse = timeout;
            }

            var requestInterceptors = [];
            if (this.client) {
                requestInterceptors = this.client.getService('HttpClientInterceptor').getRequestInterceptors();
                Executor.LOGGER.trace('Request interceptors found:', requestInterceptors);
            }

            var responseInterceptors = [];
            if (this.client) {
                responseInterceptors = this.client.getService('HttpClientInterceptor').getResponseInterceptors();
                Executor.LOGGER.trace('Response interceptors found:', responseInterceptors);
            }

            var directCall = function directCall(resolve, reject) {

                var self = _this;
                var httpRequest = new XMLHttpRequest();
                var async = true;

                httpRequest.open(_this.configuration.method, _this.configuration.url, async);
                httpRequest.url = _this.configuration.url;
                httpRequest.method = _this.configuration.method;
                httpRequest.withCredentials = true;

                for (var i = 0; i < requestInterceptors.length; i++) {
                    var requestInterceptor = requestInterceptors[i];
                    requestInterceptor.handleRequest(httpRequest);
                }

                if (_this.configuration.headers && _this.configuration.headers.length > 0) {
                    for (var _i = 0; _i < _this.configuration.headers.length; _i++) {
                        var header = _this.configuration.headers[_i];
                        httpRequest.setRequestHeader(header.name, header.value);
                    }
                }

                httpRequest.timeout = timeoutToUse;

                if (_this.configuration.responseType) {
                    httpRequest.responseType = _this.configuration.responseType;
                }

                httpRequest.ontimeout = function () {
                    var message = this.statusText || 'Timeout occurred';
                    var httpException = new _httpException.HttpException(message, this.status, true);
                    Executor.LOGGER.error(httpException);
                    reject(httpException);
                };

                httpRequest.onerror = function () {
                    var message = this.statusText || 'Unspecified error occured';
                    var httpException = new _httpException.HttpException(message, this.status);
                    Executor.LOGGER.error(httpException);
                    reject(httpException);
                };

                httpRequest.onreadystatechange = function () {
                    if (this.readyState === _constants.HTTP.XMLHTTPREQUEST_READYSTATE.DONE) {
                        Executor.LOGGER.trace('Request to ', self.configuration.url, 'finished with', this.status);
                    }
                    if (this.readyState === _constants.HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status >= 200 && this.status < 300) {
                        var httpResponse = new _httpResponse.HttpResponse(this.url, this.status, this.response, this.getAllResponseHeaders());

                        for (var _i2 = 0; _i2 < responseInterceptors.length; _i2++) {
                            var responseInterceptor = responseInterceptors[_i2];
                            responseInterceptor.handleResponse(httpResponse);
                        }

                        resolve(httpResponse);
                    } else if (this.readyState === _constants.HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status >= 300) {
                        var httpException = new _httpException.HttpException(this.statusText, this.status);
                        Executor.LOGGER.error(httpException);
                        reject(httpException);
                    }
                };

                httpRequest.send(_this.configuration.requestBody);
            };
            directCall = directCall.bind(this);

            var workerCall = function workerCall(resolve, reject) {

                var collectedRequestHeaders = [];
                for (var i = 0; i < requestInterceptors.length; i++) {
                    var requestInterceptor = requestInterceptors[i];

                    requestInterceptor.handleRequest({
                        url: _this.configuration.url,
                        setRequestHeader: function setRequestHeader(name, value) {
                            var header = { name: name, value: value };
                            collectedRequestHeaders.push(header);
                        }
                    });
                }

                var worker = httpWorker.createWorker();
                try {
                    worker.onmessage = function (event) {
                        worker.terminate();
                        Executor.LOGGER.trace('Message form Worker', event);
                        var msg = event.data;
                        if (msg.error) {
                            var httpException = new _httpException.HttpException(msg.message, msg.status, msg.timedout);
                            Executor.LOGGER.error(httpException);
                            reject(httpException);
                        } else {
                            var httpResponse = new _httpResponse.HttpResponse(msg.url, msg.status, msg.response, msg.responseHeaders);

                            for (var _i3 = 0; _i3 < responseInterceptors.length; _i3++) {
                                var responseInterceptor = responseInterceptors[_i3];
                                responseInterceptor.handleResponse(httpResponse);
                            }

                            resolve(httpResponse);
                        }
                    };
                    worker.onerror = function (event) {
                        var httpException = new _httpException.HttpException(event.data, 0, false);
                        reject(httpException);
                    };
                    worker.postMessage({ conf: _this.configuration, timeout: timeoutToUse, requestHeaders: collectedRequestHeaders });
                } catch (error) {
                    var httpException = new _httpException.HttpException(error, 0, false);
                    reject(httpException);
                }
            };

            workerCall = workerCall.bind(this);

            return new _promise2.default(function (resolve, reject) {
                if (useWorker && _this.client && _this.client.hasService('HttpWorker')) {
                    workerCall(resolve, reject);
                } else {
                    directCall(resolve, reject);
                }
            });
        }
    }]);
    return Executor;
}();

Executor.LOGGER = _logging.LoggerFactory.getLogger('Executor');

exports.Executor = Executor;

/***/ }),
/* 151 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(18);
__webpack_require__(23);
__webpack_require__(152);
__webpack_require__(156);
__webpack_require__(157);
module.exports = __webpack_require__(3).Promise;


/***/ }),
/* 152 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var LIBRARY = __webpack_require__(26);
var global = __webpack_require__(7);
var ctx = __webpack_require__(13);
var classof = __webpack_require__(38);
var $export = __webpack_require__(4);
var isObject = __webpack_require__(10);
var aFunction = __webpack_require__(24);
var anInstance = __webpack_require__(52);
var forOf = __webpack_require__(30);
var speciesConstructor = __webpack_require__(81);
var task = __webpack_require__(82).set;
var microtask = __webpack_require__(154)();
var newPromiseCapabilityModule = __webpack_require__(57);
var perform = __webpack_require__(83);
var userAgent = __webpack_require__(155);
var promiseResolve = __webpack_require__(84);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function () { /* empty */ };
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(8)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function')
      && promise.then(empty) instanceof FakePromise
      // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
      // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
      // we can't detect it synchronously, so just check versions
      && v8.indexOf('6.6') !== 0
      && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) { /* empty */ }
}();

// helpers
var isThenable = function (it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function (promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function (reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;
          else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) run(chain[i++]); // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function (promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    } promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function (promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function (promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function (value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function (value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = [];             // <- awaiting reactions
    this._a = undefined;      // <- checked in isUnhandled reactions
    this._s = 0;              // <- state
    this._d = false;          // <- done
    this._v = undefined;      // <- value
    this._h = 0;              // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false;          // <- notify
  };
  Internal.prototype = __webpack_require__(51)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function (onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function () {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function (C) {
    return C === $Promise || C === Wrapper
      ? new OwnPromiseCapability(C)
      : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(28)($Promise, PROMISE);
__webpack_require__(73)(PROMISE);
Wrapper = __webpack_require__(3)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(80)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});


/***/ }),
/* 153 */
/***/ (function(module, exports) {

// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
  var un = that === undefined;
  switch (args.length) {
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
  } return fn.apply(that, args);
};


/***/ }),
/* 154 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var macrotask = __webpack_require__(82).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(27)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function () {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();
        else last = undefined;
        throw e;
      }
    } last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function () {
      process.nextTick(flush);
    };
  // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function () {
      node.data = toggle = !toggle;
    };
  // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function () {
      promise.then(flush);
    };
  // for other environments - macrotask based on:
  // - setImmediate
  // - MessageChannel
  // - window.postMessag
  // - onreadystatechange
  // - setTimeout
  } else {
    notify = function () {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    } last = task;
  };
};


/***/ }),
/* 155 */
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__(7);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';


/***/ }),
/* 156 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally

var $export = __webpack_require__(4);
var core = __webpack_require__(3);
var global = __webpack_require__(7);
var speciesConstructor = __webpack_require__(81);
var promiseResolve = __webpack_require__(84);

$export($export.P + $export.R, 'Promise', { 'finally': function (onFinally) {
  var C = speciesConstructor(this, core.Promise || global.Promise);
  var isFunction = typeof onFinally == 'function';
  return this.then(
    isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () { return x; });
    } : onFinally,
    isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () { throw e; });
    } : onFinally
  );
} });


/***/ }),
/* 157 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try
var $export = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(57);
var perform = __webpack_require__(83);

$export($export.S, 'Promise', { 'try': function (callbackfn) {
  var promiseCapability = newPromiseCapability.f(this);
  var result = perform(callbackfn);
  (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
  return promiseCapability.promise;
} });


/***/ }),
/* 158 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpResponse = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpResponse = function () {
    function HttpResponse(url, status, content, headers) {
        (0, _classCallCheck3.default)(this, HttpResponse);

        this.url = url;
        this.status = status;
        this.content = content;
        this.headers = {};
        if ((0, _utils.exists)(headers) && typeof headers === 'string') {
            var headerArray = headers.trim().split(/[\r\n]+/);
            for (var i = 0; i < headerArray.length; i++) {
                var line = headerArray[i];
                var parts = line.split(': ');
                if (parts.length === 2) {
                    var header = parts.shift().toLowerCase();
                    var value = parts.join(': ');
                    this.headers[header] = value;
                }
            }
        }
    }

    (0, _createClass3.default)(HttpResponse, [{
        key: 'getUrl',
        value: function getUrl() {
            return this.url;
        }
    }, {
        key: 'getContent',
        value: function getContent() {
            return this.content;
        }
    }, {
        key: 'getStatus',
        value: function getStatus() {
            return this.status;
        }
    }, {
        key: 'getHeaders',
        value: function getHeaders() {
            return this.headers;
        }
    }, {
        key: 'getHeaderByName',
        value: function getHeaderByName(name) {
            (0, _utils.checkMethod)('getHeaderByName');
            (0, _utils.checkParam)(name, 'name');

            return this.headers[name.toLowerCase()];
        }
    }]);
    return HttpResponse;
}();

exports.HttpResponse = HttpResponse;

/***/ }),
/* 159 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpException = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpException = function () {
    function HttpException(message, status, timedout) {
        (0, _classCallCheck3.default)(this, HttpException);

        this.message = message;
        this.status = status || 0;
        this.timedout = timedout || false;
    }

    (0, _createClass3.default)(HttpException, [{
        key: "getMessage",
        value: function getMessage() {
            return this.message;
        }
    }, {
        key: "getStatus",
        value: function getStatus() {
            return this.status;
        }
    }, {
        key: "isTimedout",
        value: function isTimedout() {
            return this.timedout;
        }
    }]);
    return HttpException;
}();

exports.HttpException = HttpException;

/***/ }),
/* 160 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.HttpClientInterceptor = undefined;

var _set = __webpack_require__(58);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var HttpClientInterceptor = function () {
    function HttpClientInterceptor() {
        (0, _classCallCheck3.default)(this, HttpClientInterceptor);

        this.requestHandlers = new _set2.default();
        this.responseHandlers = new _set2.default();
    }

    (0, _createClass3.default)(HttpClientInterceptor, [{
        key: "addRequestInterceptor",
        value: function addRequestInterceptor(handler) {
            this.requestHandlers.add(handler);
        }
    }, {
        key: "getRequestInterceptors",
        value: function getRequestInterceptors() {
            var list = [];
            this.requestHandlers.forEach(function (handler) {
                return list.push(handler);
            });
            return list;
        }
    }, {
        key: "addResponseInterceptor",
        value: function addResponseInterceptor(handler) {
            this.responseHandlers.add(handler);
        }
    }, {
        key: "getResponseInterceptors",
        value: function getResponseInterceptors() {
            var list = [];
            this.responseHandlers.forEach(function (handler) {
                return list.push(handler);
            });
            return list;
        }
    }]);
    return HttpClientInterceptor;
}();

exports.HttpClientInterceptor = HttpClientInterceptor;

/***/ }),
/* 161 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(33);
__webpack_require__(18);
__webpack_require__(23);
__webpack_require__(162);
__webpack_require__(163);
__webpack_require__(164);
__webpack_require__(165);
module.exports = __webpack_require__(3).Set;


/***/ }),
/* 162 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var strong = __webpack_require__(70);
var validate = __webpack_require__(55);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(74)(SET, function (get) {
  return function Set() { return get(this, arguments.length > 0 ? arguments[0] : undefined); };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);


/***/ }),
/* 163 */
/***/ (function(module, exports, __webpack_require__) {

// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(4);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(76)('Set') });


/***/ }),
/* 164 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(77)('Set');


/***/ }),
/* 165 */
/***/ (function(module, exports, __webpack_require__) {

// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(78)('Set');


/***/ }),
/* 166 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _map = __webpack_require__(20);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

var _serviceProvider = __webpack_require__(31);

var _logging = __webpack_require__(5);

var _constants = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientScope = function () {
    function ClientScope() {
        (0, _classCallCheck3.default)(this, ClientScope);

        this.clientIds = new _map2.default();
    }

    (0, _createClass3.default)(ClientScope, [{
        key: 'handleRequest',
        value: function handleRequest(httpRequest) {
            (0, _utils.checkMethod)('handleRequest');
            (0, _utils.checkParam)(httpRequest, 'httpRequest');
            var clientId = this.getClientId(httpRequest.url);
            if ((0, _utils.exists)(clientId)) {
                ClientScope.LOGGER.trace('Using ClientId', clientId);
                httpRequest.setRequestHeader(_constants.HTTP.HEADER_NAME.X_CLIENT_SESSION_ID, clientId);
            }
        }
    }, {
        key: 'handleResponse',
        value: function handleResponse(httpResponse) {
            (0, _utils.checkMethod)('handleResponse');
            (0, _utils.checkParam)(httpResponse, 'httpResponse');
            var clientId = this.getClientId(httpResponse.url);
            var newClientId = httpResponse.getHeaderByName(_constants.HTTP.HEADER_NAME.X_CLIENT_SESSION_ID);
            if ((0, _utils.exists)(clientId) && (0, _utils.exists)(newClientId) && clientId !== newClientId) {
                throw new Error('Client Id does not match!');
            }
            if (!(0, _utils.exists)(clientId) && (0, _utils.exists)(newClientId)) {
                ClientScope.LOGGER.debug('New ClientId found', newClientId);
                this.setClientId(httpResponse.url, newClientId);
            }
        }
    }, {
        key: 'initServiceProvider',
        value: function initServiceProvider(client) {
            (0, _utils.checkMethod)('initServiceProvider');
            (0, _utils.checkParam)(client, 'client');
            client.getService('HttpClientInterceptor').addRequestInterceptor(this);
            client.getService('HttpClientInterceptor').addResponseInterceptor(this);
        }
    }, {
        key: 'getClientId',
        value: function getClientId(url) {
            var result = (0, _utils.parseUrl)(url);
            var key = ClientScope.calcKey(result.hostname, result.port);
            return this.clientIds.get(key);
        }
    }, {
        key: 'setClientId',
        value: function setClientId(url, clientId) {
            var result = (0, _utils.parseUrl)(url);
            var key = ClientScope.calcKey(result.hostname, result.port);
            this.clientIds.set(key, clientId);
            ClientScope.LOGGER.trace('Setting ClientId', clientId, 'for', url, 'with key', key);
        }
    }]);
    return ClientScope;
}();

ClientScope.calcKey = function (hostname, port) {
    return hostname + port;
};

ClientScope.LOGGER = _logging.LoggerFactory.getLogger('ClientScope');

function register(client) {
    if ((0, _utils.exists)(client)) {
        var clientScopeProvider = new _serviceProvider.ServiceProvider(ClientScope, 'ClientScope');

        client.registerServiceProvider(clientScopeProvider);
    }
}

exports.register = register;

/***/ }),
/* 167 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _clientContextFactory = __webpack_require__(85);

var _serviceProvider = __webpack_require__(31);

var _utils = __webpack_require__(2);

function register(client) {
    if ((0, _utils.exists)(client)) {
        var clientContextFactoryProvider = new _serviceProvider.ServiceProvider(_clientContextFactory.ClientContextFactory, 'ClientContextFactory', client);

        client.registerServiceProvider(clientContextFactoryProvider);
    }
}

exports.register = register;

/***/ }),
/* 168 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(169), __esModule: true };

/***/ }),
/* 169 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(170);
module.exports = 0x1fffffffffffff;


/***/ }),
/* 170 */
/***/ (function(module, exports, __webpack_require__) {

// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(4);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });


/***/ }),
/* 171 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.dolphinBuilder = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _clientConnector = __webpack_require__(172);

var _clientConnector2 = _interopRequireDefault(_clientConnector);

var _clientDolphin = __webpack_require__(196);

var _clientDolphin2 = _interopRequireDefault(_clientDolphin);

var _clientModelStore = __webpack_require__(198);

var _clientModelStore2 = _interopRequireDefault(_clientModelStore);

var _noTransmitter = __webpack_require__(200);

var _noTransmitter2 = _interopRequireDefault(_noTransmitter);

var _logging = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DolphinBuilder = function () {
    function DolphinBuilder() {
        (0, _classCallCheck3.default)(this, DolphinBuilder);

        this.slackMS = 300;
        this.maxBatchSize = 50;
        this.transmitter = null;
    }

    (0, _createClass3.default)(DolphinBuilder, [{
        key: 'withSlackMS',
        value: function withSlackMS(slackMS) {
            this.slackMS = slackMS;
            return this;
        }
    }, {
        key: 'withMaxBatchSize',
        value: function withMaxBatchSize(maxBatchSize) {
            this.maxBatchSize = maxBatchSize;
            return this;
        }
    }, {
        key: 'withTransmitter',
        value: function withTransmitter(transmitter) {
            this.transmitter = transmitter;
            return this;
        }
    }, {
        key: 'build',
        value: function build() {
            var clientDolphin = new _clientDolphin2.default();
            var transmitter = void 0;
            if (this.transmitter) {
                transmitter = this.transmitter;
            } else {
                transmitter = new _noTransmitter2.default();
            }
            clientDolphin.setClientConnector(new _clientConnector2.default(transmitter, clientDolphin, this.slackMS, this.maxBatchSize));
            clientDolphin.setClientModelStore(new _clientModelStore2.default(clientDolphin));
            DolphinBuilder.LOGGER.debug("Remoting client initialized", clientDolphin, transmitter);
            return clientDolphin;
        }
    }]);
    return DolphinBuilder;
}();

DolphinBuilder.LOGGER = _logging.LoggerFactory.getLogger('DolphinBuilder');

var dolphinBuilder = new DolphinBuilder();

exports.dolphinBuilder = dolphinBuilder;

/***/ }),
/* 172 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandBatcher = __webpack_require__(173);

var _commandBatcher2 = _interopRequireDefault(_commandBatcher);

var _codec = __webpack_require__(86);

var _codec2 = _interopRequireDefault(_codec);

var _clientPresentationModel = __webpack_require__(105);

var _clientPresentationModel2 = _interopRequireDefault(_clientPresentationModel);

var _logging = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientConnector = function () {
    function ClientConnector(transmitter, clientDolphin) {
        var slackMS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
        var maxBatchSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;
        (0, _classCallCheck3.default)(this, ClientConnector);


        this.commandQueue = [];
        this.currentlySending = false;
        this.pushEnabled = false;
        this.waiting = false;
        this.transmitter = transmitter;
        this.clientDolphin = clientDolphin;
        this.slackMS = slackMS;
        this.codec = new _codec2.default();
        this.commandBatcher = new _commandBatcher2.default(true, maxBatchSize);
    }

    (0, _createClass3.default)(ClientConnector, [{
        key: 'setCommandBatcher',
        value: function setCommandBatcher(newBatcher) {
            this.commandBatcher = newBatcher;
        }
    }, {
        key: 'setPushEnabled',
        value: function setPushEnabled(enabled) {
            this.pushEnabled = enabled;
        }
    }, {
        key: 'setPushListener',
        value: function setPushListener(newListener) {
            this.pushListener = newListener;
        }
    }, {
        key: 'setReleaseCommand',
        value: function setReleaseCommand(newCommand) {
            this.releaseCommand = newCommand;
        }
    }, {
        key: 'send',
        value: function send(command, onFinished) {
            this.commandQueue.push({ command: command, handler: onFinished });
            if (this.currentlySending) {
                this.release();
                return;
            }
            this.doSendNext();
        }
    }, {
        key: 'doSendNext',
        value: function doSendNext() {
            var _this = this;

            if (this.commandQueue.length < 1) {
                if (this.pushEnabled) {
                    this.enqueuePushCommand();
                } else {
                    this.currentlySending = false;
                    return;
                }
            }
            this.currentlySending = true;
            var cmdsAndHandlers = this.commandBatcher.batch(this.commandQueue);

            if (cmdsAndHandlers.length > 0) {
                var callback = cmdsAndHandlers[cmdsAndHandlers.length - 1].handler;
                var commands = cmdsAndHandlers.map(function (cah) {
                    return cah.command;
                });
                this.transmitter.transmit(commands, function (response) {
                    var touchedPMs = [];
                    response.forEach(function (command) {
                        var touched = _this.handle(command);
                        if (touched) touchedPMs.push(touched);
                    });
                    if (callback) {
                        callback.onFinished(touchedPMs);
                    }
                    setTimeout(function () {
                        return _this.doSendNext();
                    }, _this.slackMS);
                });
            } else {
                setTimeout(function () {
                    return _this.doSendNext();
                }, this.slackMS);
            }
        }
    }, {
        key: 'handle',
        value: function handle(command) {
            if (command.id === "DeletePresentationModel") {
                return this.handleDeletePresentationModelCommand(command);
            } else if (command.id === "CreatePresentationModel") {
                return this.handleCreatePresentationModelCommand(command);
            } else if (command.id === "ValueChanged") {
                return this.handleValueChangedCommand(command);
            } else if (command.id === "AttributeMetadataChanged") {
                return this.handleAttributeMetadataChangedCommand(command);
            } else {
                ClientConnector.LOGGER.error("Cannot handle, unknown command " + command);
            }
            return null;
        }
    }, {
        key: 'handleDeletePresentationModelCommand',
        value: function handleDeletePresentationModelCommand(serverCommand) {
            var model = this.clientDolphin.findPresentationModelById(serverCommand.pmId);
            if (!model) return null;
            this.clientDolphin.getClientModelStore().deletePresentationModel(model, true);
            return model;
        }
    }, {
        key: 'handleCreatePresentationModelCommand',
        value: function handleCreatePresentationModelCommand(serverCommand) {
            var _this2 = this;

            if (this.clientDolphin.getClientModelStore().containsPresentationModel(serverCommand.pmId)) {
                throw new Error("There already is a presentation model with id " + serverCommand.pmId + "  known to the client.");
            }
            var attributes = [];
            serverCommand.attributes.forEach(function (attr) {
                var clientAttribute = _this2.clientDolphin.attribute(attr.propertyName, attr.qualifier, attr.value);
                if (attr.id && attr.id.match(".*S$")) {
                    clientAttribute.id = attr.id;
                }
                attributes.push(clientAttribute);
            });
            var clientPm = new _clientPresentationModel2.default(serverCommand.pmId, serverCommand.pmType);
            clientPm.addAttributes(attributes);
            if (serverCommand.clientSideOnly) {
                clientPm.clientSideOnly = true;
            }
            this.clientDolphin.getClientModelStore().add(clientPm, false);
            this.clientDolphin.updatePresentationModelQualifier(clientPm);
            return clientPm;
        }
    }, {
        key: 'handleValueChangedCommand',
        value: function handleValueChangedCommand(serverCommand) {
            var clientAttribute = this.clientDolphin.getClientModelStore().findAttributeById(serverCommand.attributeId);
            if (!clientAttribute) {
                ClientConnector.LOGGER.error("attribute with id " + serverCommand.attributeId + " not found, cannot update to new value " + serverCommand.newValue);
                return null;
            }
            if (clientAttribute.getValue() === serverCommand.newValue) {
                return null;
            }
            clientAttribute.setValueFromServer(serverCommand.newValue);
            return null;
        }
    }, {
        key: 'handleAttributeMetadataChangedCommand',
        value: function handleAttributeMetadataChangedCommand(serverCommand) {
            var clientAttribute = this.clientDolphin.getClientModelStore().findAttributeById(serverCommand.attributeId);
            if (!clientAttribute) return null;
            clientAttribute[serverCommand.metadataName] = serverCommand.value;
            return null;
        }
    }, {
        key: 'listen',
        value: function listen() {
            if (!this.pushEnabled) return;
            if (this.waiting) return;

            if (!this.currentlySending) {
                this.doSendNext();
            }
        }
    }, {
        key: 'enqueuePushCommand',
        value: function enqueuePushCommand() {
            var me = this;
            this.waiting = true;
            this.commandQueue.push({
                command: this.pushListener,
                handler: {
                    onFinished: function onFinished() {
                        me.waiting = false;
                    },
                    onFinishedData: null
                }
            });
        }
    }, {
        key: 'release',
        value: function release() {
            if (!this.waiting) return;
            this.waiting = false;

            this.transmitter.signal(this.releaseCommand);
        }
    }]);
    return ClientConnector;
}();

exports.default = ClientConnector;


ClientConnector.LOGGER = _logging.LoggerFactory.getLogger('ClientConnector');

/***/ }),
/* 173 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _commandConstants = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BlindCommandBatcher = function () {
    function BlindCommandBatcher() {
        var folding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
        var maxBatchSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;
        (0, _classCallCheck3.default)(this, BlindCommandBatcher);

        this.folding = folding;
        this.maxBatchSize = maxBatchSize;
    }

    (0, _createClass3.default)(BlindCommandBatcher, [{
        key: 'batch',
        value: function batch(queue) {
            var batch = [];
            var batchLength = 0;
            while (queue[batchLength] && batchLength <= this.maxBatchSize) {
                var element = queue[batchLength];
                batchLength++;
                if (this.folding) {
                    if (element.command.id == _commandConstants.VALUE_CHANGED_COMMAND_ID && batch.length > 0 && batch[batch.length - 1].command.id == _commandConstants.VALUE_CHANGED_COMMAND_ID && element.command.attributeId == batch[batch.length - 1].command.attributeId) {
                        batch[batch.length - 1].command.newValue = element.command.newValue;
                    } else if (element.command.id == _commandConstants.PRESENTATION_MODEL_DELETED_COMMAND_ID) {} else {
                        batch.push(element);
                    }
                } else {
                    batch.push(element);
                }
                if (element.handler) {
                    break;
                }
            }
            queue.splice(0, batchLength);
            return batch;
        }
    }]);
    return BlindCommandBatcher;
}();

exports.default = BlindCommandBatcher;

/***/ }),
/* 174 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(175), __esModule: true };

/***/ }),
/* 175 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(18);
__webpack_require__(23);
module.exports = __webpack_require__(59).f('iterator');


/***/ }),
/* 176 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(177), __esModule: true };

/***/ }),
/* 177 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(178);
__webpack_require__(33);
__webpack_require__(181);
__webpack_require__(182);
module.exports = __webpack_require__(3).Symbol;


/***/ }),
/* 178 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim
var global = __webpack_require__(7);
var has = __webpack_require__(17);
var DESCRIPTORS = __webpack_require__(12);
var $export = __webpack_require__(4);
var redefine = __webpack_require__(65);
var META = __webpack_require__(54).KEY;
var $fails = __webpack_require__(16);
var shared = __webpack_require__(49);
var setToStringTag = __webpack_require__(28);
var uid = __webpack_require__(37);
var wks = __webpack_require__(8);
var wksExt = __webpack_require__(59);
var wksDefine = __webpack_require__(60);
var enumKeys = __webpack_require__(179);
var isArray = __webpack_require__(75);
var anObject = __webpack_require__(11);
var isObject = __webpack_require__(10);
var toIObject = __webpack_require__(22);
var toPrimitive = __webpack_require__(43);
var createDesc = __webpack_require__(25);
var _create = __webpack_require__(34);
var gOPNExt = __webpack_require__(180);
var $GOPD = __webpack_require__(88);
var $DP = __webpack_require__(9);
var $keys = __webpack_require__(35);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function () { return dP(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function (tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && typeof $Symbol.iterator == 'symbol' ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    } return setSymbolDesc(it, key, D);
  } return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) $defineProperty(it, key = keys[i++], P[key]);
  return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  } return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  } return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function (value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(87).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(39).f = $propertyIsEnumerable;
  __webpack_require__(56).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(26)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols = (
  // 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
  'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'
).split(','), j = 0; es6Symbols.length > j;)wks(es6Symbols[j++]);

for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) wksDefine(wellKnownSymbols[k++]);

$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function (key) {
    return has(SymbolRegistry, key += '')
      ? SymbolRegistry[key]
      : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) if (SymbolRegistry[key] === sym) return key;
  },
  useSetter: function () { setter = true; },
  useSimple: function () { setter = false; }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) args.push(arguments[i++]);
    $replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function (key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(15)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);


/***/ }),
/* 179 */
/***/ (function(module, exports, __webpack_require__) {

// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(35);
var gOPS = __webpack_require__(56);
var pIE = __webpack_require__(39);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) if (isEnum.call(it, key = symbols[i++])) result.push(key);
  } return result;
};


/***/ }),
/* 180 */
/***/ (function(module, exports, __webpack_require__) {

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(22);
var gOPN = __webpack_require__(87).f;
var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};


/***/ }),
/* 181 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60)('asyncIterator');


/***/ }),
/* 182 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(60)('observable');


/***/ }),
/* 183 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(184), __esModule: true };

/***/ }),
/* 184 */
/***/ (function(module, exports, __webpack_require__) {

var core = __webpack_require__(3);
var $JSON = core.JSON || (core.JSON = { stringify: JSON.stringify });
module.exports = function stringify(it) { // eslint-disable-line no-unused-vars
  return $JSON.stringify.apply($JSON, arguments);
};


/***/ }),
/* 185 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _getPrototypeOf = __webpack_require__(102);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(103);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(104);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CodecError = function (_Error) {
    (0, _inherits3.default)(CodecError, _Error);

    function CodecError(message) {
        (0, _classCallCheck3.default)(this, CodecError);
        return (0, _possibleConstructorReturn3.default)(this, (CodecError.__proto__ || (0, _getPrototypeOf2.default)(CodecError)).call(this, message));
    }

    return CodecError;
}(Error);

exports.default = CodecError;

/***/ }),
/* 186 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(187);
module.exports = __webpack_require__(3).Object.getPrototypeOf;


/***/ }),
/* 187 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(29);
var $getPrototypeOf = __webpack_require__(68);

__webpack_require__(188)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});


/***/ }),
/* 188 */
/***/ (function(module, exports, __webpack_require__) {

// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(4);
var core = __webpack_require__(3);
var fails = __webpack_require__(16);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () { fn(1); }), 'Object', exp);
};


/***/ }),
/* 189 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(190), __esModule: true };

/***/ }),
/* 190 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(191);
module.exports = __webpack_require__(3).Object.setPrototypeOf;


/***/ }),
/* 191 */
/***/ (function(module, exports, __webpack_require__) {

// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(4);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(192).set });


/***/ }),
/* 192 */
/***/ (function(module, exports, __webpack_require__) {

// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(10);
var anObject = __webpack_require__(11);
var check = function (O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
    function (test, buggy, set) {
      try {
        set = __webpack_require__(13)(Function.call, __webpack_require__(88).f(Object.prototype, '__proto__').set, 2);
        set(test, []);
        buggy = !(test instanceof Array);
      } catch (e) { buggy = true; }
      return function setPrototypeOf(O, proto) {
        check(O, proto);
        if (buggy) O.__proto__ = proto;
        else set(O, proto);
        return O;
      };
    }({}, false) : undefined),
  check: check
};


/***/ }),
/* 193 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(194), __esModule: true };

/***/ }),
/* 194 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(195);
var $Object = __webpack_require__(3).Object;
module.exports = function create(P, D) {
  return $Object.create(P, D);
};


/***/ }),
/* 195 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(4);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(34) });


/***/ }),
/* 196 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _clientAttribute = __webpack_require__(197);

var _clientAttribute2 = _interopRequireDefault(_clientAttribute);

var _clientPresentationModel = __webpack_require__(105);

var _clientPresentationModel2 = _interopRequireDefault(_clientPresentationModel);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientDolphin = function () {
    function ClientDolphin() {
        (0, _classCallCheck3.default)(this, ClientDolphin);
    }

    (0, _createClass3.default)(ClientDolphin, [{
        key: 'setClientConnector',
        value: function setClientConnector(clientConnector) {
            this.clientConnector = clientConnector;
        }
    }, {
        key: 'getClientConnector',
        value: function getClientConnector() {
            return this.clientConnector;
        }
    }, {
        key: 'send',
        value: function send(command, onFinished) {
            this.clientConnector.send(command, onFinished);
        }
    }, {
        key: 'attribute',
        value: function attribute(propertyName, qualifier, value) {
            return new _clientAttribute2.default(propertyName, qualifier, value);
        }
    }, {
        key: 'presentationModel',
        value: function presentationModel(id, type) {
            var model = new _clientPresentationModel2.default(id, type);

            for (var _len = arguments.length, attributes = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
                attributes[_key - 2] = arguments[_key];
            }

            if (attributes && attributes.length > 0) {
                attributes.forEach(function (attribute) {
                    model.addAttribute(attribute);
                });
            }
            this.getClientModelStore().add(model, true);
            return model;
        }
    }, {
        key: 'setClientModelStore',
        value: function setClientModelStore(clientModelStore) {
            this.clientModelStore = clientModelStore;
        }
    }, {
        key: 'getClientModelStore',
        value: function getClientModelStore() {
            return this.clientModelStore;
        }
    }, {
        key: 'listPresentationModelIds',
        value: function listPresentationModelIds() {
            return this.getClientModelStore().listPresentationModelIds();
        }
    }, {
        key: 'listPresentationModels',
        value: function listPresentationModels() {
            return this.getClientModelStore().listPresentationModels();
        }
    }, {
        key: 'findAllPresentationModelByType',
        value: function findAllPresentationModelByType(presentationModelType) {
            return this.getClientModelStore().findAllPresentationModelByType(presentationModelType);
        }
    }, {
        key: 'getAt',
        value: function getAt(id) {
            return this.findPresentationModelById(id);
        }
    }, {
        key: 'findPresentationModelById',
        value: function findPresentationModelById(id) {
            return this.getClientModelStore().findPresentationModelById(id);
        }
    }, {
        key: 'deletePresentationModel',
        value: function deletePresentationModel(modelToDelete) {
            this.getClientModelStore().deletePresentationModel(modelToDelete, true);
        }
    }, {
        key: 'updatePresentationModelQualifier',
        value: function updatePresentationModelQualifier(presentationModel) {
            var _this = this;

            presentationModel.getAttributes().forEach(function (sourceAttribute) {
                _this.updateAttributeQualifier(sourceAttribute);
            });
        }
    }, {
        key: 'updateAttributeQualifier',
        value: function updateAttributeQualifier(sourceAttribute) {
            if (!sourceAttribute.getQualifier()) return;
            var attributes = this.getClientModelStore().findAllAttributesByQualifier(sourceAttribute.getQualifier());
            attributes.forEach(function (targetAttribute) {
                targetAttribute.setValue(sourceAttribute.getValue());
            });
        }
    }, {
        key: 'startPushListening',
        value: function startPushListening(pushCommand, releaseCommand) {
            var _this2 = this;

            this.clientConnector.setPushListener(pushCommand);
            this.clientConnector.setReleaseCommand(releaseCommand);
            this.clientConnector.setPushEnabled(true);

            setTimeout(function () {
                _this2.clientConnector.listen();
            }, 0);
        }
    }, {
        key: 'stopPushListening',
        value: function stopPushListening() {
            this.clientConnector.setPushEnabled(false);
        }
    }]);
    return ClientDolphin;
}();

exports.default = ClientDolphin;

/***/ }),
/* 197 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _eventBus = __webpack_require__(61);

var _eventBus2 = _interopRequireDefault(_eventBus);

var _logging = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientAttribute = function () {
    function ClientAttribute(propertyName, qualifier, value) {
        (0, _classCallCheck3.default)(this, ClientAttribute);


        this.propertyName = propertyName;
        this.id = "" + ClientAttribute.clientAttributeInstanceCount++ + "C";
        this.valueChangeBus = new _eventBus2.default();
        this.qualifierChangeBus = new _eventBus2.default();
        this.setValue(value);
        this.setQualifier(qualifier);
    }

    (0, _createClass3.default)(ClientAttribute, [{
        key: 'copy',
        value: function copy() {
            var result = new ClientAttribute(this.propertyName, this.getQualifier(), this.getValue());
            return result;
        }
    }, {
        key: 'setPresentationModel',
        value: function setPresentationModel(presentationModel) {
            if (this.presentationModel) {
                throw new Error("You can not set a presentation model for an attribute that is already bound.");
            }
            this.presentationModel = presentationModel;
        }
    }, {
        key: 'getPresentationModel',
        value: function getPresentationModel() {
            return this.presentationModel;
        }
    }, {
        key: 'getValue',
        value: function getValue() {
            return this.value;
        }
    }, {
        key: 'setValueFromServer',
        value: function setValueFromServer(newValue) {
            var verifiedValue = ClientAttribute.checkValue(newValue);
            if (this.value === verifiedValue) return;
            var oldValue = this.value;
            this.value = verifiedValue;
            this.valueChangeBus.trigger({ 'oldValue': oldValue, 'newValue': verifiedValue, 'sendToServer': false });
        }
    }, {
        key: 'setValue',
        value: function setValue(newValue) {
            var verifiedValue = ClientAttribute.checkValue(newValue);
            if (this.value === verifiedValue) return;
            var oldValue = this.value;
            this.value = verifiedValue;
            this.valueChangeBus.trigger({ 'oldValue': oldValue, 'newValue': verifiedValue, 'sendToServer': true });
        }
    }, {
        key: 'setQualifier',
        value: function setQualifier(newQualifier) {
            if (this.qualifier === newQualifier) return;
            var oldQualifier = this.qualifier;
            this.qualifier = newQualifier;
            this.qualifierChangeBus.trigger({ 'oldValue': oldQualifier, 'newValue': newQualifier });
            this.valueChangeBus.trigger({ "oldValue": this.value, "newValue": this.value, 'sendToServer': false });
        }
    }, {
        key: 'getQualifier',
        value: function getQualifier() {
            return this.qualifier;
        }
    }, {
        key: 'onValueChange',
        value: function onValueChange(eventHandler) {
            this.valueChangeBus.onEvent(eventHandler);
            eventHandler({ "oldValue": this.value, "newValue": this.value, 'sendToServer': false });
        }
    }, {
        key: 'onQualifierChange',
        value: function onQualifierChange(eventHandler) {
            this.qualifierChangeBus.onEvent(eventHandler);
        }
    }, {
        key: 'syncWith',
        value: function syncWith(sourceAttribute) {
            if (sourceAttribute) {
                this.setQualifier(sourceAttribute.getQualifier());
                this.setValue(sourceAttribute.value);
            }
        }
    }], [{
        key: 'checkValue',
        value: function checkValue(value) {
            if (value == null || typeof value === 'undefined') {
                return null;
            }
            var result = value;
            if (result instanceof String || result instanceof Boolean || result instanceof Number) {
                result = value.valueOf();
            }
            if (result instanceof ClientAttribute) {
                ClientAttribute.LOGGER.warn("An Attribute may not itself contain an attribute as a value. Assuming you forgot to call value.");
                result = this.checkValue(value.value);
            }
            var ok = false;
            if (this.SUPPORTED_VALUE_TYPES.indexOf(typeof result === 'undefined' ? 'undefined' : (0, _typeof3.default)(result)) > -1 || result instanceof Date) {
                ok = true;
            }
            if (!ok) {
                throw new Error("Attribute values of this type are not allowed: " + (typeof value === 'undefined' ? 'undefined' : (0, _typeof3.default)(value)));
            }
            return result;
        }
    }]);
    return ClientAttribute;
}();

exports.default = ClientAttribute;


ClientAttribute.LOGGER = _logging.LoggerFactory.getLogger('ClientAttribute');
ClientAttribute.SUPPORTED_VALUE_TYPES = ["string", "number", "boolean"];
ClientAttribute.clientAttributeInstanceCount = 0;

/***/ }),
/* 198 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map = __webpack_require__(20);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _attribute = __webpack_require__(199);

var _attribute2 = _interopRequireDefault(_attribute);

var _eventBus = __webpack_require__(61);

var _eventBus2 = _interopRequireDefault(_eventBus);

var _commandFactory = __webpack_require__(41);

var _commandFactory2 = _interopRequireDefault(_commandFactory);

var _constants = __webpack_require__(40);

var _logging = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientModelStore = function () {
    function ClientModelStore(clientDolphin) {
        (0, _classCallCheck3.default)(this, ClientModelStore);


        this.clientDolphin = clientDolphin;
        this.presentationModels = new _map2.default();
        this.presentationModelsPerType = new _map2.default();
        this.attributesPerId = new _map2.default();
        this.attributesPerQualifier = new _map2.default();
        this.modelStoreChangeBus = new _eventBus2.default();
    }

    (0, _createClass3.default)(ClientModelStore, [{
        key: 'getClientDolphin',
        value: function getClientDolphin() {
            return this.clientDolphin;
        }
    }, {
        key: 'registerAttribute',
        value: function registerAttribute(attribute) {
            var _this = this;

            this.addAttributeById(attribute);
            if (attribute.getQualifier()) {
                this.addAttributeByQualifier(attribute);
            }

            attribute.onValueChange(function (evt) {
                if (evt.newValue !== evt.oldValue && evt.sendToServer === true) {
                    var command = _commandFactory2.default.createValueChangedCommand(attribute.id, evt.newValue);
                    _this.clientDolphin.getClientConnector().send(command, null);
                }

                if (attribute.getQualifier()) {
                    var attrs = _this.findAttributesByFilter(function (attr) {
                        return attr !== attribute && attr.getQualifier() === attribute.getQualifier();
                    });
                    attrs.forEach(function (attr) {
                        attr.setValue(attribute.getValue());
                    });
                }
            });
            attribute.onQualifierChange(function (evt) {
                _this.clientDolphin.getClientConnector().send(_commandFactory2.default.createChangeAttributeMetadataCommand(attribute.id, _attribute2.default.QUALIFIER_PROPERTY, evt.newValue), null);
            });
        }
    }, {
        key: 'add',
        value: function add(model) {
            var _this2 = this;

            var sendToServer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

            if (!model) {
                return false;
            }
            if (this.presentationModels.has(model.id)) {
                ClientModelStore.LOGGER.error("There already is a PM with id " + model.id);
            }
            var added = false;
            if (!this.presentationModels.has(model.id)) {
                this.presentationModels.set(model.id, model);
                this.addPresentationModelByType(model);

                if (sendToServer) {
                    var connector = this.clientDolphin.getClientConnector();
                    connector.send(_commandFactory2.default.createCreatePresentationModelCommand(model), null);
                }

                model.getAttributes().forEach(function (attribute) {
                    _this2.registerAttribute(attribute);
                });
                this.modelStoreChangeBus.trigger({ 'eventType': _constants.ADDED_TYPE, 'clientPresentationModel': model });
                added = true;
            }
            return added;
        }
    }, {
        key: 'remove',
        value: function remove(model) {
            var _this3 = this;

            if (!model) {
                return false;
            }
            var removed = false;
            if (this.presentationModels.has(model.id)) {
                this.removePresentationModelByType(model);
                this.presentationModels.delete(model.id);
                model.getAttributes().forEach(function (attribute) {
                    _this3.removeAttributeById(attribute);
                    if (attribute.getQualifier()) {
                        _this3.removeAttributeByQualifier(attribute);
                    }
                });
                this.modelStoreChangeBus.trigger({ 'eventType': _constants.REMOVED_TYPE, 'clientPresentationModel': model });
                removed = true;
            }
            return removed;
        }
    }, {
        key: 'findAttributesByFilter',
        value: function findAttributesByFilter(filter) {
            var matches = [];
            this.presentationModels.forEach(function (model) {
                model.getAttributes().forEach(function (attr) {
                    if (filter(attr)) {
                        matches.push(attr);
                    }
                });
            });
            return matches;
        }
    }, {
        key: 'addPresentationModelByType',
        value: function addPresentationModelByType(model) {
            if (!model) {
                return;
            }
            var type = model.presentationModelType;
            if (!type) {
                return;
            }
            var presentationModels = this.presentationModelsPerType.get(type);
            if (!presentationModels) {
                presentationModels = [];
                this.presentationModelsPerType.set(type, presentationModels);
            }
            if (!(presentationModels.indexOf(model) > -1)) {
                presentationModels.push(model);
            }
        }
    }, {
        key: 'removePresentationModelByType',
        value: function removePresentationModelByType(model) {
            if (!model || !model.presentationModelType) {
                return;
            }
            var presentationModels = this.presentationModelsPerType.get(model.presentationModelType);
            if (!presentationModels) {
                return;
            }
            if (presentationModels.length > -1) {
                presentationModels.splice(presentationModels.indexOf(model), 1);
            }
            if (presentationModels.length === 0) {
                this.presentationModelsPerType.delete(model.presentationModelType);
            }
        }
    }, {
        key: 'listPresentationModelIds',
        value: function listPresentationModelIds() {
            var result = [];
            var iter = this.presentationModels.keys();
            var next = iter.next();
            while (!next.done) {
                result.push(next.value);
                next = iter.next();
            }
            return result;
        }
    }, {
        key: 'listPresentationModels',
        value: function listPresentationModels() {
            var result = [];
            var iter = this.presentationModels.values();
            var next = iter.next();
            while (!next.done) {
                result.push(next.value);
                next = iter.next();
            }
            return result;
        }
    }, {
        key: 'findPresentationModelById',
        value: function findPresentationModelById(id) {
            return this.presentationModels.get(id);
        }
    }, {
        key: 'findAllPresentationModelByType',
        value: function findAllPresentationModelByType(type) {
            if (!type || !this.presentationModelsPerType.has(type)) {
                return [];
            }
            return this.presentationModelsPerType.get(type).slice(0);
        }
    }, {
        key: 'deletePresentationModel',
        value: function deletePresentationModel(model, notify) {
            if (!model) {
                return;
            }
            if (this.containsPresentationModel(model.id)) {
                this.remove(model);
                if (!notify || model.clientSideOnly) {
                    return;
                }
                this.clientDolphin.getClientConnector().send(_commandFactory2.default.createPresentationModelDeletedCommand(model.id), null);
            }
        }
    }, {
        key: 'containsPresentationModel',
        value: function containsPresentationModel(id) {
            return this.presentationModels.has(id);
        }
    }, {
        key: 'addAttributeById',
        value: function addAttributeById(attribute) {
            if (!attribute || this.attributesPerId.has(attribute.id)) {
                return;
            }
            this.attributesPerId.set(attribute.id, attribute);
        }
    }, {
        key: 'removeAttributeById',
        value: function removeAttributeById(attribute) {
            if (!attribute || !this.attributesPerId.has(attribute.id)) {
                return;
            }
            this.attributesPerId.delete(attribute.id);
        }
    }, {
        key: 'findAttributeById',
        value: function findAttributeById(id) {
            return this.attributesPerId.get(id);
        }
    }, {
        key: 'addAttributeByQualifier',
        value: function addAttributeByQualifier(attribute) {
            if (!attribute || !attribute.getQualifier()) {
                return;
            }
            var attributes = this.attributesPerQualifier.get(attribute.getQualifier());
            if (!attributes) {
                attributes = [];
                this.attributesPerQualifier.set(attribute.getQualifier(), attributes);
            }
            if (!(attributes.indexOf(attribute) > -1)) {
                attributes.push(attribute);
            }
        }
    }, {
        key: 'removeAttributeByQualifier',
        value: function removeAttributeByQualifier(attribute) {
            if (!attribute || !attribute.getQualifier()) {
                return;
            }
            var attributes = this.attributesPerQualifier.get(attribute.getQualifier());
            if (!attributes) {
                return;
            }
            if (attributes.length > -1) {
                attributes.splice(attributes.indexOf(attribute), 1);
            }
            if (attributes.length === 0) {
                this.attributesPerQualifier.delete(attribute.getQualifier());
            }
        }
    }, {
        key: 'findAllAttributesByQualifier',
        value: function findAllAttributesByQualifier(qualifier) {
            if (!qualifier || !this.attributesPerQualifier.has(qualifier)) {
                return [];
            }
            return this.attributesPerQualifier.get(qualifier).slice(0);
        }
    }, {
        key: 'onModelStoreChange',
        value: function onModelStoreChange(eventHandler) {
            this.modelStoreChangeBus.onEvent(eventHandler);
        }
    }, {
        key: 'onModelStoreChangeForType',
        value: function onModelStoreChangeForType(presentationModelType, eventHandler) {
            this.modelStoreChangeBus.onEvent(function (pmStoreEvent) {
                if (pmStoreEvent.clientPresentationModel.presentationModelType == presentationModelType) {
                    eventHandler(pmStoreEvent);
                }
            });
        }
    }]);
    return ClientModelStore;
}();

exports.default = ClientModelStore;


ClientModelStore.LOGGER = _logging.LoggerFactory.getLogger('ClientModelStore');

/***/ }),
/* 199 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Attribute = function Attribute() {
  (0, _classCallCheck3.default)(this, Attribute);
};

exports.default = Attribute;


Attribute.QUALIFIER_PROPERTY = "qualifier";
Attribute.VALUE = "value";

/***/ }),
/* 200 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var NoTransmitter = function () {
    function NoTransmitter() {
        (0, _classCallCheck3.default)(this, NoTransmitter);
    }

    (0, _createClass3.default)(NoTransmitter, [{
        key: "transmit",
        value: function transmit(commands, onDone) {
            onDone([]);
        }
    }, {
        key: "signal",
        value: function signal() {}
    }, {
        key: "reset",
        value: function reset() {}
    }]);
    return NoTransmitter;
}();

exports.default = NoTransmitter;

/***/ }),
/* 201 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _map = __webpack_require__(20);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

var _logging = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BeanManager = function () {
    function BeanManager(classRepository) {
        (0, _classCallCheck3.default)(this, BeanManager);

        (0, _utils.checkMethod)('BeanManager(classRepository)');
        (0, _utils.checkParam)(classRepository, 'classRepository');

        this.classRepository = classRepository;
        this.addedHandlers = new _map2.default();
        this.removedHandlers = new _map2.default();
        this.updatedHandlers = new _map2.default();
        this.arrayUpdatedHandlers = new _map2.default();
        this.allAddedHandlers = [];
        this.allRemovedHandlers = [];
        this.allUpdatedHandlers = [];
        this.allArrayUpdatedHandlers = [];

        this._handleBeanAdded = this._handleBeanAdded.bind(this);
        this._handleBeanRemoved = this._handleBeanRemoved.bind(this);
        this._handleBeanUpdate = this._handleBeanUpdate.bind(this);
        this._handleArrayUpdate = this._handleArrayUpdate.bind(this);

        this.classRepository.onBeanAdded(this._handleBeanAdded);
        this.classRepository.onBeanRemoved(this._handleBeanRemoved);
        this.classRepository.onBeanUpdate(this._handleBeanUpdate);
        this.classRepository.onArrayUpdate(this._handleArrayUpdate);
    }

    (0, _createClass3.default)(BeanManager, [{
        key: '_handleBeanAdded',
        value: function _handleBeanAdded(type, bean) {
            var handlerList = this.addedHandlers.get(type);
            if ((0, _utils.exists)(handlerList)) {
                handlerList.forEach(function (handler) {
                    try {
                        handler(bean);
                    } catch (e) {
                        BeanManager.LOGGER.error('An exception occurred while calling an onBeanAdded-handler for type', type, e);
                    }
                });
            }
            this.allAddedHandlers.forEach(function (handler) {
                try {
                    handler(bean);
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling a general onBeanAdded-handler', e);
                }
            });
        }
    }, {
        key: '_handleBeanRemoved',
        value: function _handleBeanRemoved(type, bean) {
            var handlerList = this.removedHandlers.get(type);
            if ((0, _utils.exists)(handlerList)) {
                handlerList.forEach(function (handler) {
                    try {
                        handler(bean);
                    } catch (e) {
                        BeanManager.LOGGER.error('An exception occurred while calling an onBeanRemoved-handler for type', type, e);
                    }
                });
            }
            this.allRemovedHandlers.forEach(function (handler) {
                try {
                    handler(bean);
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling a general onBeanRemoved-handler', e);
                }
            });
        }
    }, {
        key: '_handleArrayUpdate',
        value: function _handleArrayUpdate(type, bean, propertyName, index, count, newElements) {
            var handlerList = this.arrayUpdatedHandlers.get(type);
            if ((0, _utils.exists)(handlerList)) {
                handlerList.forEach(function (handler) {
                    try {
                        handler(bean, propertyName, index, count, newElements);
                    } catch (e) {
                        BeanManager.LOGGER.error('An exception occurred while calling an onArrayUpdate-handler for type', type, e);
                    }
                });
            }
            this.allArrayUpdatedHandlers.forEach(function (handler) {
                try {
                    handler(bean, propertyName, index, count, newElements);
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling a general onArrayUpdate-handler', e);
                }
            });
        }
    }, {
        key: '_handleBeanUpdate',
        value: function _handleBeanUpdate(type, bean, propertyName, newValue, oldValue) {
            var handlerList = this.updatedHandlers.get(type);
            if ((0, _utils.exists)(handlerList)) {
                handlerList.forEach(function (handler) {
                    try {
                        handler(bean, propertyName, newValue, oldValue);
                    } catch (e) {
                        BeanManager.LOGGER.error('An exception occurred while calling an onBeanUpdate-handler for type', type, e);
                    }
                });
            }
            this.allUpdatedHandlers.forEach(function (handler) {
                try {
                    handler(bean, propertyName, newValue, oldValue);
                } catch (e) {
                    BeanManager.LOGGER.error('An exception occurred while calling a general onBeanUpdate-handler', e);
                }
            });
        }
    }, {
        key: 'notifyBeanChange',
        value: function notifyBeanChange(bean, propertyName, newValue) {
            (0, _utils.checkMethod)('BeanManager.notifyBeanChange(bean, propertyName, newValue)');
            (0, _utils.checkParam)(bean, 'bean');
            (0, _utils.checkParam)(propertyName, 'propertyName');

            return this.classRepository.notifyBeanChange(bean, propertyName, newValue);
        }
    }, {
        key: 'notifyArrayChange',
        value: function notifyArrayChange(bean, propertyName, index, count, removedElements) {
            (0, _utils.checkMethod)('BeanManager.notifyArrayChange(bean, propertyName, index, count, removedElements)');
            (0, _utils.checkParam)(bean, 'bean');
            (0, _utils.checkParam)(propertyName, 'propertyName');
            (0, _utils.checkParam)(index, 'index');
            (0, _utils.checkParam)(count, 'count');
            (0, _utils.checkParam)(removedElements, 'removedElements');

            this.classRepository.notifyArrayChange(bean, propertyName, index, count, removedElements);
        }
    }, {
        key: 'isManaged',
        value: function isManaged(bean) {
            (0, _utils.checkMethod)('BeanManager.isManaged(bean)');
            (0, _utils.checkParam)(bean, 'bean');

            throw new Error("Not implemented yet");
        }
    }, {
        key: 'create',
        value: function create(type) {
            (0, _utils.checkMethod)('BeanManager.create(type)');
            (0, _utils.checkParam)(type, 'type');

            throw new Error("Not implemented yet");
        }
    }, {
        key: 'add',
        value: function add(type, bean) {
            (0, _utils.checkMethod)('BeanManager.add(type, bean)');
            (0, _utils.checkParam)(type, 'type');
            (0, _utils.checkParam)(bean, 'bean');

            throw new Error("Not implemented yet");
        }
    }, {
        key: 'addAll',
        value: function addAll(type, collection) {
            (0, _utils.checkMethod)('BeanManager.addAll(type, collection)');
            (0, _utils.checkParam)(type, 'type');
            (0, _utils.checkParam)(collection, 'collection');

            throw new Error("Not implemented yet");
        }
    }, {
        key: 'remove',
        value: function remove(bean) {
            (0, _utils.checkMethod)('BeanManager.remove(bean)');
            (0, _utils.checkParam)(bean, 'bean');

            throw new Error("Not implemented yet");
        }
    }, {
        key: 'removeAll',
        value: function removeAll(collection) {
            (0, _utils.checkMethod)('BeanManager.removeAll(collection)');
            (0, _utils.checkParam)(collection, 'collection');

            throw new Error("Not implemented yet");
        }
    }, {
        key: 'removeIf',
        value: function removeIf(predicate) {
            (0, _utils.checkMethod)('BeanManager.removeIf(predicate)');
            (0, _utils.checkParam)(predicate, 'predicate');

            throw new Error("Not implemented yet");
        }
    }, {
        key: 'onAdded',
        value: function onAdded(type, eventHandler) {
            var self = this;
            if (!(0, _utils.exists)(eventHandler)) {
                eventHandler = type;
                (0, _utils.checkMethod)('BeanManager.onAdded(eventHandler)');
                (0, _utils.checkParam)(eventHandler, 'eventHandler');

                this.allAddedHandlers = this.allAddedHandlers.concat(eventHandler);
                return {
                    unsubscribe: function unsubscribe() {
                        self.allAddedHandlers = self.allAddedHandlers.filter(function (value) {
                            return value !== eventHandler;
                        });
                    }
                };
            } else {
                (0, _utils.checkMethod)('BeanManager.onAdded(type, eventHandler)');
                (0, _utils.checkParam)(type, 'type');
                (0, _utils.checkParam)(eventHandler, 'eventHandler');

                var handlerList = this.addedHandlers.get(type);
                if (!(0, _utils.exists)(handlerList)) {
                    handlerList = [];
                }
                this.addedHandlers.set(type, handlerList.concat(eventHandler));
                return {
                    unsubscribe: function unsubscribe() {
                        var handlerList = self.addedHandlers.get(type);
                        if ((0, _utils.exists)(handlerList)) {
                            self.addedHandlers.set(type, handlerList.filter(function (value) {
                                return value !== eventHandler;
                            }));
                        }
                    }
                };
            }
        }
    }, {
        key: 'onRemoved',
        value: function onRemoved(type, eventHandler) {
            var self = this;
            if (!(0, _utils.exists)(eventHandler)) {
                eventHandler = type;
                (0, _utils.checkMethod)('BeanManager.onRemoved(eventHandler)');
                (0, _utils.checkParam)(eventHandler, 'eventHandler');

                this.allRemovedHandlers = this.allRemovedHandlers.concat(eventHandler);
                return {
                    unsubscribe: function unsubscribe() {
                        self.allRemovedHandlers = self.allRemovedHandlers.filter(function (value) {
                            return value !== eventHandler;
                        });
                    }
                };
            } else {
                (0, _utils.checkMethod)('BeanManager.onRemoved(type, eventHandler)');
                (0, _utils.checkParam)(type, 'type');
                (0, _utils.checkParam)(eventHandler, 'eventHandler');

                var handlerList = this.removedHandlers.get(type);
                if (!(0, _utils.exists)(handlerList)) {
                    handlerList = [];
                }
                this.removedHandlers.set(type, handlerList.concat(eventHandler));
                return {
                    unsubscribe: function unsubscribe() {
                        var handlerList = self.removedHandlers.get(type);
                        if ((0, _utils.exists)(handlerList)) {
                            self.removedHandlers.set(type, handlerList.filter(function (value) {
                                return value !== eventHandler;
                            }));
                        }
                    }
                };
            }
        }
    }, {
        key: 'onBeanUpdate',
        value: function onBeanUpdate(type, eventHandler) {
            var self = this;
            if (!(0, _utils.exists)(eventHandler)) {
                eventHandler = type;
                (0, _utils.checkMethod)('BeanManager.onBeanUpdate(eventHandler)');
                (0, _utils.checkParam)(eventHandler, 'eventHandler');

                this.allUpdatedHandlers = this.allUpdatedHandlers.concat(eventHandler);
                return {
                    unsubscribe: function unsubscribe() {
                        self.allUpdatedHandlers = self.allUpdatedHandlers.filter(function (value) {
                            return value !== eventHandler;
                        });
                    }
                };
            } else {
                (0, _utils.checkMethod)('BeanManager.onBeanUpdate(type, eventHandler)');
                (0, _utils.checkParam)(type, 'type');
                (0, _utils.checkParam)(eventHandler, 'eventHandler');

                var handlerList = this.updatedHandlers.get(type);
                if (!(0, _utils.exists)(handlerList)) {
                    handlerList = [];
                }
                this.updatedHandlers.set(type, handlerList.concat(eventHandler));
                return {
                    unsubscribe: function unsubscribe() {
                        var handlerList = self.updatedHandlers.get(type);
                        if ((0, _utils.exists)(handlerList)) {
                            self.updatedHandlers.set(type, handlerList.filter(function (value) {
                                return value !== eventHandler;
                            }));
                        }
                    }
                };
            }
        }
    }, {
        key: 'onArrayUpdate',
        value: function onArrayUpdate(type, eventHandler) {
            var self = this;
            if (!(0, _utils.exists)(eventHandler)) {
                eventHandler = type;
                (0, _utils.checkMethod)('BeanManager.onArrayUpdate(eventHandler)');
                (0, _utils.checkParam)(eventHandler, 'eventHandler');

                this.allArrayUpdatedHandlers = this.allArrayUpdatedHandlers.concat(eventHandler);
                return {
                    unsubscribe: function unsubscribe() {
                        self.allArrayUpdatedHandlers = self.allArrayUpdatedHandlers.filter(function (value) {
                            return value !== eventHandler;
                        });
                    }
                };
            } else {
                (0, _utils.checkMethod)('BeanManager.onArrayUpdate(type, eventHandler)');
                (0, _utils.checkParam)(type, 'type');
                (0, _utils.checkParam)(eventHandler, 'eventHandler');

                var handlerList = this.arrayUpdatedHandlers.get(type);
                if (!(0, _utils.exists)(handlerList)) {
                    handlerList = [];
                }
                this.arrayUpdatedHandlers.set(type, handlerList.concat(eventHandler));
                return {
                    unsubscribe: function unsubscribe() {
                        var handlerList = self.arrayUpdatedHandlers.get(type);
                        if ((0, _utils.exists)(handlerList)) {
                            self.arrayUpdatedHandlers.set(type, handlerList.filter(function (value) {
                                return value !== eventHandler;
                            }));
                        }
                    }
                };
            }
        }
    }]);
    return BeanManager;
}();

exports.default = BeanManager;


BeanManager.LOGGER = _logging.LoggerFactory.getLogger('BeanManager');

/***/ }),
/* 202 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _typeof2 = __webpack_require__(32);

var _typeof3 = _interopRequireDefault(_typeof2);

var _map = __webpack_require__(20);

var _map2 = _interopRequireDefault(_map);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _constants = __webpack_require__(40);

var consts = _interopRequireWildcard(_constants);

var _utils = __webpack_require__(2);

var _logging = __webpack_require__(5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClassRepository = function () {
    function ClassRepository(dolphin) {
        (0, _classCallCheck3.default)(this, ClassRepository);

        (0, _utils.checkMethod)('ClassRepository(dolphin)');
        (0, _utils.checkParam)(dolphin, 'dolphin');

        this.dolphin = dolphin;
        this.classes = new _map2.default();
        this.beanFromDolphin = new _map2.default();
        this.beanToDolphin = new _map2.default();
        this.classInfos = new _map2.default();
        this.beanAddedHandlers = [];
        this.beanRemovedHandlers = [];
        this.propertyUpdateHandlers = [];
        this.arrayUpdateHandlers = [];
        this.blocked = null;
    }

    (0, _createClass3.default)(ClassRepository, [{
        key: 'sendListSplice',
        value: function sendListSplice(classRepository, modelId, propertyName, from, to, newElements) {
            var dolphin = classRepository.dolphin;
            var model = dolphin.findPresentationModelById(modelId);
            if ((0, _utils.exists)(model)) {
                var classInfo = classRepository.classes.get(model.presentationModelType);
                var type = classInfo[propertyName];
                if ((0, _utils.exists)(type)) {

                    var attributes = [dolphin.attribute('@@@ SOURCE_SYSTEM @@@', null, 'client'), dolphin.attribute('source', null, modelId), dolphin.attribute('attribute', null, propertyName), dolphin.attribute('from', null, from), dolphin.attribute('to', null, to), dolphin.attribute('count', null, newElements.length)];
                    newElements.forEach(function (element, index) {
                        attributes.push(dolphin.attribute(index.toString(), null, ClassRepository.toDolphin(classRepository, type, element)));
                    });
                    dolphin.presentationModel.apply(dolphin, [null, '@DP:LS@'].concat(attributes));
                }
            }
        }
    }, {
        key: 'validateList',
        value: function validateList(classRepository, type, bean, propertyName) {
            var list = bean[propertyName];
            if (!(0, _utils.exists)(list)) {
                classRepository.propertyUpdateHandlers.forEach(function (handler) {
                    try {
                        handler(type, bean, propertyName, [], undefined);
                    } catch (e) {
                        ClassRepository.LOGGER.error('An exception occurred while calling an onBeanUpdate-handler', e);
                    }
                });
            }
        }
    }, {
        key: 'block',
        value: function block(bean, propertyName) {
            if ((0, _utils.exists)(this.blocked)) {
                throw new Error('Trying to create a block while another block exists');
            }
            this.blocked = {
                bean: bean,
                propertyName: propertyName
            };
        }
    }, {
        key: 'isBlocked',
        value: function isBlocked(bean, propertyName) {
            return (0, _utils.exists)(this.blocked) && this.blocked.bean === bean && this.blocked.propertyName === propertyName;
        }
    }, {
        key: 'unblock',
        value: function unblock() {
            this.blocked = null;
        }
    }, {
        key: 'notifyBeanChange',
        value: function notifyBeanChange(bean, propertyName, newValue) {
            (0, _utils.checkMethod)('ClassRepository.notifyBeanChange(bean, propertyName, newValue)');
            (0, _utils.checkParam)(bean, 'bean');
            (0, _utils.checkParam)(propertyName, 'propertyName');

            var modelId = this.beanToDolphin.get(bean);
            if ((0, _utils.exists)(modelId)) {
                var model = this.dolphin.findPresentationModelById(modelId);
                if ((0, _utils.exists)(model)) {
                    var classInfo = this.classes.get(model.presentationModelType);
                    var type = classInfo[propertyName];
                    var attribute = model.findAttributeByPropertyName(propertyName);
                    if ((0, _utils.exists)(type) && (0, _utils.exists)(attribute)) {
                        var oldValue = attribute.getValue();
                        attribute.setValue(ClassRepository.toDolphin(this, type, newValue));
                        return ClassRepository.fromDolphin(this, type, oldValue);
                    }
                }
            }
        }
    }, {
        key: 'notifyArrayChange',
        value: function notifyArrayChange(bean, propertyName, index, count, removedElements) {
            (0, _utils.checkMethod)('ClassRepository.notifyArrayChange(bean, propertyName, index, count, removedElements)');
            (0, _utils.checkParam)(bean, 'bean');
            (0, _utils.checkParam)(propertyName, 'propertyName');
            (0, _utils.checkParam)(index, 'index');
            (0, _utils.checkParam)(count, 'count');
            (0, _utils.checkParam)(removedElements, 'removedElements');

            if (this.isBlocked(bean, propertyName)) {
                return;
            }
            var modelId = this.beanToDolphin.get(bean);
            var array = bean[propertyName];
            if ((0, _utils.exists)(modelId) && (0, _utils.exists)(array)) {
                var removedElementsCount = Array.isArray(removedElements) ? removedElements.length : 0;
                this.sendListSplice(this, modelId, propertyName, index, index + removedElementsCount, array.slice(index, index + count));
            }
        }
    }, {
        key: 'onBeanAdded',
        value: function onBeanAdded(handler) {
            (0, _utils.checkMethod)('ClassRepository.onBeanAdded(handler)');
            (0, _utils.checkParam)(handler, 'handler');
            this.beanAddedHandlers.push(handler);
        }
    }, {
        key: 'onBeanRemoved',
        value: function onBeanRemoved(handler) {
            (0, _utils.checkMethod)('ClassRepository.onBeanRemoved(handler)');
            (0, _utils.checkParam)(handler, 'handler');
            this.beanRemovedHandlers.push(handler);
        }
    }, {
        key: 'onBeanUpdate',
        value: function onBeanUpdate(handler) {
            (0, _utils.checkMethod)('ClassRepository.onBeanUpdate(handler)');
            (0, _utils.checkParam)(handler, 'handler');
            this.propertyUpdateHandlers.push(handler);
        }
    }, {
        key: 'onArrayUpdate',
        value: function onArrayUpdate(handler) {
            (0, _utils.checkMethod)('ClassRepository.onArrayUpdate(handler)');
            (0, _utils.checkParam)(handler, 'handler');
            this.arrayUpdateHandlers.push(handler);
        }
    }, {
        key: 'registerClass',
        value: function registerClass(model) {
            (0, _utils.checkMethod)('ClassRepository.registerClass(model)');
            (0, _utils.checkParam)(model, 'model');

            if (this.classes.has(model.id)) {
                return;
            }

            var classInfo = {};
            model.attributes.filter(function (attribute) {
                return attribute.propertyName.search(/^@/) < 0;
            }).forEach(function (attribute) {
                classInfo[attribute.propertyName] = attribute.value;
            });
            this.classes.set(model.id, classInfo);
        }
    }, {
        key: 'unregisterClass',
        value: function unregisterClass(model) {
            (0, _utils.checkMethod)('ClassRepository.unregisterClass(model)');
            (0, _utils.checkParam)(model, 'model');
            this.classes['delete'](model.id);
        }
    }, {
        key: 'load',
        value: function load(model) {
            (0, _utils.checkMethod)('ClassRepository.load(model)');
            (0, _utils.checkParam)(model, 'model');

            var self = this;
            var classInfo = this.classes.get(model.presentationModelType);
            var bean = {};
            model.attributes.filter(function (attribute) {
                return attribute.propertyName.search(/^@/) < 0;
            }).forEach(function (attribute) {
                bean[attribute.propertyName] = null;
                attribute.onValueChange(function (event) {
                    if (event.oldValue !== event.newValue) {
                        var oldValue = ClassRepository.fromDolphin(self, classInfo[attribute.propertyName], event.oldValue);
                        var newValue = ClassRepository.fromDolphin(self, classInfo[attribute.propertyName], event.newValue);
                        self.propertyUpdateHandlers.forEach(function (handler) {
                            try {
                                handler(model.presentationModelType, bean, attribute.propertyName, newValue, oldValue);
                            } catch (e) {
                                ClassRepository.LOGGER.error('An exception occurred while calling an onBeanUpdate-handler', e);
                            }
                        });
                    }
                });
            });
            this.beanFromDolphin.set(model.id, bean);
            this.beanToDolphin.set(bean, model.id);
            this.classInfos.set(model.id, classInfo);
            this.beanAddedHandlers.forEach(function (handler) {
                try {
                    handler(model.presentationModelType, bean);
                } catch (e) {
                    ClassRepository.LOGGER.error('An exception occurred while calling an onBeanAdded-handler', e);
                }
            });
            return bean;
        }
    }, {
        key: 'unload',
        value: function unload(model) {
            (0, _utils.checkMethod)('ClassRepository.unload(model)');
            (0, _utils.checkParam)(model, 'model');

            var bean = this.beanFromDolphin.get(model.id);
            this.beanFromDolphin['delete'](model.id);
            this.beanToDolphin['delete'](bean);
            this.classInfos['delete'](model.id);
            if ((0, _utils.exists)(bean)) {
                this.beanRemovedHandlers.forEach(function (handler) {
                    try {
                        handler(model.presentationModelType, bean);
                    } catch (e) {
                        ClassRepository.LOGGER.error('An exception occurred while calling an onBeanRemoved-handler', e);
                    }
                });
            }
            return bean;
        }
    }, {
        key: 'spliceListEntry',
        value: function spliceListEntry(model) {
            (0, _utils.checkMethod)('ClassRepository.spliceListEntry(model)');
            (0, _utils.checkParam)(model, 'model');

            var source = model.findAttributeByPropertyName('source');
            var attribute = model.findAttributeByPropertyName('attribute');
            var from = model.findAttributeByPropertyName('from');
            var to = model.findAttributeByPropertyName('to');
            var count = model.findAttributeByPropertyName('count');

            if ((0, _utils.exists)(source) && (0, _utils.exists)(attribute) && (0, _utils.exists)(from) && (0, _utils.exists)(to) && (0, _utils.exists)(count)) {
                var classInfo = this.classInfos.get(source.value);
                var bean = this.beanFromDolphin.get(source.value);
                if ((0, _utils.exists)(bean) && (0, _utils.exists)(classInfo)) {
                    var type = model.presentationModelType;

                    this.validateList(this, type, bean, attribute.value);
                    var newElements = [],
                        element = null;
                    for (var i = 0; i < count.value; i++) {
                        element = model.findAttributeByPropertyName(i.toString());
                        if (!(0, _utils.exists)(element)) {
                            throw new Error("Invalid list modification update received");
                        }
                        newElements.push(ClassRepository.fromDolphin(this, classInfo[attribute.value], element.value));
                    }
                    try {
                        this.block(bean, attribute.value);
                        this.arrayUpdateHandlers.forEach(function (handler) {
                            try {
                                handler(type, bean, attribute.value, from.value, to.value - from.value, newElements);
                            } catch (e) {
                                ClassRepository.LOGGER.error('An exception occurred while calling an onArrayUpdate-handler', e);
                            }
                        });
                    } finally {
                        this.unblock();
                    }
                } else {
                    throw new Error("Invalid list modification update received. Source bean unknown.");
                }
            } else {
                throw new Error("Invalid list modification update received");
            }
        }
    }, {
        key: 'mapParamToDolphin',
        value: function mapParamToDolphin(param) {
            if (!(0, _utils.exists)(param)) {
                return param;
            }
            var type = typeof param === 'undefined' ? 'undefined' : (0, _typeof3.default)(param);
            if (type === 'object') {
                if (param instanceof Date) {
                    return param.toISOString();
                } else {
                    var value = this.beanToDolphin.get(param);
                    if ((0, _utils.exists)(value)) {
                        return value;
                    }
                    throw new TypeError("Only managed remoting beans can be used");
                }
            }
            if (type === 'string' || type === 'number' || type === 'boolean') {
                return param;
            }
            throw new TypeError("Only managed remoting beans and primitive types can be used");
        }
    }, {
        key: 'mapDolphinToBean',
        value: function mapDolphinToBean(value) {
            return ClassRepository.fromDolphin(this, consts.REMOTING_BEAN, value);
        }
    }]);
    return ClassRepository;
}();

ClassRepository.fixType = function (type, value) {
    switch (type) {
        case consts.BYTE:
        case consts.SHORT:
        case consts.INT:
        case consts.LONG:
            return parseInt(value);
        case consts.FLOAT:
        case consts.DOUBLE:
            return parseFloat(value);
        case consts.BOOLEAN:
            return 'true' === String(value).toLowerCase();
        case consts.STRING:
        case consts.ENUM:
            return String(value);
        default:
            return value;
    }
};

ClassRepository.fromDolphin = function (classRepository, type, value) {
    if (!(0, _utils.exists)(value)) {
        return null;
    }
    switch (type) {
        case consts.REMOTING_BEAN:
            return classRepository.beanFromDolphin.get(String(value));
        case consts.DATE:
            return new Date(String(value));
        case consts.CALENDAR:
            return new Date(String(value));
        case consts.LOCAL_DATE_FIELD_TYPE:
            return new Date(String(value));
        case consts.LOCAL_DATE_TIME_FIELD_TYPE:
            return new Date(String(value));
        case consts.ZONED_DATE_TIME_FIELD_TYPE:
            return new Date(String(value));
        default:
            return ClassRepository.fixType(type, value);
    }
};

ClassRepository.toDolphin = function (classRepository, type, value) {
    if (!(0, _utils.exists)(value)) {
        return null;
    }
    switch (type) {
        case consts.REMOTING_BEAN:
            return classRepository.beanToDolphin.get(value);
        case consts.DATE:
            return value instanceof Date ? value.toISOString() : value;
        case consts.CALENDAR:
            return value instanceof Date ? value.toISOString() : value;
        case consts.LOCAL_DATE_FIELD_TYPE:
            return value instanceof Date ? value.toISOString() : value;
        case consts.LOCAL_DATE_TIME_FIELD_TYPE:
            return value instanceof Date ? value.toISOString() : value;
        case consts.ZONED_DATE_TIME_FIELD_TYPE:
            return value instanceof Date ? value.toISOString() : value;
        default:
            return ClassRepository.fixType(type, value);
    }
};

ClassRepository.LOGGER = _logging.LoggerFactory.getLogger('ClassRepository');

exports.default = ClassRepository;

/***/ }),
/* 203 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(19);

var _promise2 = _interopRequireDefault(_promise);

var _set = __webpack_require__(58);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

var _controllerproxy = __webpack_require__(204);

var _controllerproxy2 = _interopRequireDefault(_controllerproxy);

var _commandFactory = __webpack_require__(41);

var _commandFactory2 = _interopRequireDefault(_commandFactory);

var _connector = __webpack_require__(106);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var CONTROLLER_ID = 'controllerId';
var MODEL = 'model';
var ERROR_CODE = 'errorCode';

var ControllerManager = function () {
    function ControllerManager(dolphin, classRepository, connector) {
        (0, _classCallCheck3.default)(this, ControllerManager);

        (0, _utils.checkMethod)('ControllerManager(dolphin, classRepository, connector)');
        (0, _utils.checkParam)(dolphin, 'dolphin');
        (0, _utils.checkParam)(classRepository, 'classRepository');
        (0, _utils.checkParam)(connector, 'connector');

        this.dolphin = dolphin;
        this.classRepository = classRepository;
        this.connector = connector;
        this.controllers = new _set2.default();
    }

    (0, _createClass3.default)(ControllerManager, [{
        key: 'createController',
        value: function createController(name) {
            return this._createController(name, null);
        }
    }, {
        key: '_createController',
        value: function _createController(name, parentControllerId) {
            (0, _utils.checkMethod)('ControllerManager.createController(name)');
            (0, _utils.checkParam)(name, 'name');

            var self = this;
            var controllerId = void 0,
                modelId = void 0,
                model = void 0,
                controller = void 0;
            return new _promise2.default(function (resolve) {
                self.connector.getHighlanderPM().then(function (highlanderPM) {
                    self.connector.invoke(_commandFactory2.default.createCreateControllerCommand(name, parentControllerId)).then(function () {
                        controllerId = highlanderPM.findAttributeByPropertyName(CONTROLLER_ID).getValue();
                        modelId = highlanderPM.findAttributeByPropertyName(MODEL).getValue();
                        model = self.classRepository.mapDolphinToBean(modelId);
                        controller = new _controllerproxy2.default(controllerId, model, self);
                        self.controllers.add(controller);
                        resolve(controller);
                    });
                });
            });
        }
    }, {
        key: 'invokeAction',
        value: function invokeAction(controllerId, actionName, params) {
            (0, _utils.checkMethod)('ControllerManager.invokeAction(controllerId, actionName, params)');
            (0, _utils.checkParam)(controllerId, 'controllerId');
            (0, _utils.checkParam)(actionName, 'actionName');

            var self = this;
            return new _promise2.default(function (resolve, reject) {

                var attributes = [self.dolphin.attribute(_connector.SOURCE_SYSTEM, null, _connector.SOURCE_SYSTEM_CLIENT), self.dolphin.attribute(ERROR_CODE)];

                var pm = self.dolphin.presentationModel.apply(self.dolphin, [null, _connector.ACTION_CALL_BEAN].concat(attributes));

                var actionParams = [];
                if ((0, _utils.exists)(params)) {
                    for (var param in params) {
                        if (params.hasOwnProperty(param)) {
                            var value = self.classRepository.mapParamToDolphin(params[param]);
                            actionParams.push({ name: param, value: value });
                        }
                    }
                }

                self.connector.invoke(_commandFactory2.default.createCallActionCommand(controllerId, actionName, actionParams)).then(function () {
                    var isError = pm.findAttributeByPropertyName(ERROR_CODE).getValue();
                    if (isError) {
                        reject(new Error("Server side ControllerAction " + actionName + " caused an error. Please see server log for details."));
                    } else {
                        resolve();
                    }
                    self.dolphin.deletePresentationModel(pm);
                });
            });
        }
    }, {
        key: 'destroyController',
        value: function destroyController(controller) {
            (0, _utils.checkMethod)('ControllerManager.destroyController(controller)');
            (0, _utils.checkParam)(controller, 'controller');

            var self = this;
            return new _promise2.default(function (resolve) {
                self.connector.getHighlanderPM().then(function (highlanderPM) {
                    self.controllers.delete(controller);
                    highlanderPM.findAttributeByPropertyName(CONTROLLER_ID).setValue(controller.controllerId);
                    self.connector.invoke(_commandFactory2.default.createDestroyControllerCommand(controller.getId())).then(resolve);
                });
            });
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var controllersCopy = this.controllers;
            var promises = [];
            this.controllers = new _set2.default();
            controllersCopy.forEach(function (controller) {
                try {
                    promises.push(controller.destroy());
                } catch (e) {}
            });
            return _promise2.default.all(promises);
        }
    }]);
    return ControllerManager;
}();

exports.default = ControllerManager;

/***/ }),
/* 204 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _set = __webpack_require__(58);

var _set2 = _interopRequireDefault(_set);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

var _logging = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ControllerProxy = function () {
    function ControllerProxy(controllerId, model, manager) {
        (0, _classCallCheck3.default)(this, ControllerProxy);

        (0, _utils.checkMethod)('ControllerProxy(controllerId, model, manager)');
        (0, _utils.checkParam)(controllerId, 'controllerId');
        (0, _utils.checkParam)(model, 'model');
        (0, _utils.checkParam)(manager, 'manager');

        this.controllerId = controllerId;
        this.model = model;
        this.manager = manager;
        this.destroyed = false;
        this.onDestroyedHandlers = new _set2.default();
    }

    (0, _createClass3.default)(ControllerProxy, [{
        key: 'getModel',
        value: function getModel() {
            return this.model;
        }
    }, {
        key: 'getId',
        value: function getId() {
            return this.controllerId;
        }
    }, {
        key: 'invoke',
        value: function invoke(name, params) {
            (0, _utils.checkMethod)('ControllerProxy.invoke(name, params)');
            (0, _utils.checkParam)(name, 'name');

            if (this.destroyed) {
                throw new Error('The controller was already destroyed');
            }
            return this.manager.invokeAction(this.controllerId, name, params);
        }
    }, {
        key: 'createController',
        value: function createController(name) {
            return this.manager._createController(name, this.getId());
        }
    }, {
        key: 'destroy',
        value: function destroy() {
            var _this = this;

            if (this.destroyed) {
                throw new Error('The controller was already destroyed');
            }
            this.destroyed = true;
            this.onDestroyedHandlers.forEach(function (handler) {
                try {
                    handler(_this);
                } catch (e) {
                    ControllerProxy.LOGGER.error('An exception occurred while calling an onDestroyed-handler', e);
                }
            }, this);
            return this.manager.destroyController(this);
        }
    }, {
        key: 'onDestroyed',
        value: function onDestroyed(handler) {
            (0, _utils.checkMethod)('ControllerProxy.onDestroyed(handler)');
            (0, _utils.checkParam)(handler, 'handler');

            var self = this;
            this.onDestroyedHandlers.add(handler);
            return {
                unsubscribe: function unsubscribe() {
                    self.onDestroyedHandlers.delete(handler);
                }
            };
        }
    }]);
    return ControllerProxy;
}();

exports.default = ControllerProxy;


ControllerProxy.LOGGER = _logging.LoggerFactory.getLogger('ControllerProxy');

/***/ }),
/* 205 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(19);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _emitterComponent = __webpack_require__(107);

var _emitterComponent2 = _interopRequireDefault(_emitterComponent);

var _commandFactory = __webpack_require__(41);

var _commandFactory2 = _interopRequireDefault(_commandFactory);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ClientContext = function () {
    function ClientContext(dolphin, beanManager, controllerManager, connector) {
        (0, _classCallCheck3.default)(this, ClientContext);

        (0, _utils.checkMethod)('ClientContext(dolphin, beanManager, controllerManager, connector)');
        (0, _utils.checkParam)(dolphin, 'dolphin');
        (0, _utils.checkParam)(beanManager, 'beanManager');
        (0, _utils.checkParam)(controllerManager, 'controllerManager');
        (0, _utils.checkParam)(connector, 'connector');

        this.dolphin = dolphin;
        this.beanManager = beanManager;
        this._controllerManager = controllerManager;
        this._connector = connector;
        this.connectionPromise = null;
        this.isConnected = false;
    }

    (0, _createClass3.default)(ClientContext, [{
        key: 'connect',
        value: function connect() {
            var self = this;
            this.connectionPromise = new _promise2.default(function (resolve) {
                self._connector.connect();
                self._connector.invoke(_commandFactory2.default.createCreateContextCommand()).then(function () {
                    self.isConnected = true;
                    resolve();
                });
            });
            return this.connectionPromise;
        }
    }, {
        key: 'onConnect',
        value: function onConnect() {
            if ((0, _utils.exists)(this.connectionPromise)) {
                if (!this.isConnected) {
                    return this.connectionPromise;
                } else {
                    return new _promise2.default(function (resolve) {
                        resolve();
                    });
                }
            } else {
                return this.connect();
            }
        }
    }, {
        key: 'createController',
        value: function createController(name) {
            (0, _utils.checkMethod)('ClientContext.createController(name)');
            (0, _utils.checkParam)(name, 'name');

            return this._controllerManager.createController(name);
        }
    }, {
        key: 'disconnect',
        value: function disconnect() {
            var self = this;
            this.dolphin.stopPushListening();
            return new _promise2.default(function (resolve) {
                self._controllerManager.destroy().then(function () {
                    self._connector.invoke(_commandFactory2.default.createDestroyContextCommand());
                    self.dolphin = null;
                    self.beanManager = null;
                    self._controllerManager = null;
                    self._connector = null;
                    resolve();
                });
            });
        }
    }]);
    return ClientContext;
}();

exports.default = ClientContext;


(0, _emitterComponent2.default)(ClientContext.prototype);

/***/ }),
/* 206 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _promise = __webpack_require__(19);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _emitterComponent = __webpack_require__(107);

var _emitterComponent2 = _interopRequireDefault(_emitterComponent);

var _utils = __webpack_require__(2);

var _errors = __webpack_require__(207);

var _codec = __webpack_require__(86);

var _codec2 = _interopRequireDefault(_codec);

var _remotingErrorHandler = __webpack_require__(208);

var _remotingErrorHandler2 = _interopRequireDefault(_remotingErrorHandler);

var _logging = __webpack_require__(5);

var _commandConstants = __webpack_require__(6);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DOLPHIN_SESSION_TIMEOUT = 408;

var PlatformHttpTransmitter = function () {
    function PlatformHttpTransmitter(url, config, client) {
        (0, _classCallCheck3.default)(this, PlatformHttpTransmitter);

        this.url = url;
        this.config = config;
        this.client = client;
        this.headersInfo = (0, _utils.exists)(config) ? config.headersInfo : null;
        this.failed_attempt = 0;

        var connectionConfig = this._connectionConfig();
        this.maxRetry = (0, _utils.exists)(connectionConfig) && (0, _utils.exists)(connectionConfig.maxRetry) ? connectionConfig.maxRetry : 3;
        this.timeout = (0, _utils.exists)(connectionConfig) && (0, _utils.exists)(connectionConfig.timeout) ? connectionConfig.timeout : 5000;
    }

    (0, _createClass3.default)(PlatformHttpTransmitter, [{
        key: '_connectionConfig',
        value: function _connectionConfig() {
            return (0, _utils.exists)(this.config) ? this.config.connection : null;
        }
    }, {
        key: '_handleError',
        value: function _handleError(reject, error) {
            var connectionConfig = this._connectionConfig();
            var errorHandlers = (0, _utils.exists)(connectionConfig) && (0, _utils.exists)(connectionConfig.errorHandlers) ? connectionConfig.errorHandlers : [new _remotingErrorHandler2.default()];
            errorHandlers.forEach(function (handler) {
                handler.onError(error);
            });
            reject(error);
        }
    }, {
        key: '_send',
        value: function _send(commands) {
            var _this = this;

            var self = this;
            return new _promise2.default(function (resolve, reject) {
                if (_this.client) {
                    var encodedCommands = _codec2.default.encode(commands);

                    if (PlatformHttpTransmitter.LOGGER.isLogLevelUseable(_logging.LogLevel.DEBUG) && !PlatformHttpTransmitter.LOGGER.isLogLevelUseable(_logging.LogLevel.TRACE)) {
                        for (var i = 0; i < commands.length; i++) {
                            var command = commands[i];
                            if (command.id === _commandConstants.VALUE_CHANGED_COMMAND_ID) {
                                PlatformHttpTransmitter.LOGGER.debug('send', command, encodedCommands);
                            }
                        }
                    }

                    var useWorker = commands.length === 1 && commands[0].id === _commandConstants.START_LONG_POLL_COMMAND_ID;
                    var httpClient = _this.client.getService('HttpClient');
                    if (httpClient && self.failed_attempt <= self.maxRetry) {
                        httpClient.post(self.url).withHeadersInfo(_this.headersInfo).withContent(encodedCommands).readString().execute(useWorker).then(function (response) {
                            resolve(response.content);
                        }).catch(function (exception) {
                            var status = exception.getStatus();
                            self.failed_attempt += 1;
                            if (status === DOLPHIN_SESSION_TIMEOUT) {
                                self._handleError(reject, new _errors.DolphinSessionError('PlatformHttpTransmitter: Session Timeout'));
                            } else {
                                self._handleError(reject, exception);
                            }
                        });
                    } else {
                        PlatformHttpTransmitter.LOGGER.error('Cannot reach the sever');
                    }
                } else {
                    PlatformHttpTransmitter.LOGGER.error('No Rico client found!');
                }
            });
        }
    }, {
        key: 'transmit',
        value: function transmit(commands, onDone) {
            var _this2 = this;

            this._send(commands).then(function (responseText) {
                if (responseText.trim().length > 0) {
                    try {
                        var responseCommands = _codec2.default.decode(responseText);
                        onDone(responseCommands);
                    } catch (err) {
                        _this2.emit('error', new _errors.DolphinRemotingError('PlatformHttpTransmitter: Parse error: (Incorrect response = ' + responseText + ')'));
                        onDone([]);
                    }
                } else {
                    _this2.emit('error', new _errors.DolphinRemotingError('PlatformHttpTransmitter: Empty response'));
                    onDone([]);
                }
            }).catch(function (error) {
                _this2.emit('error', error);
                onDone([]);
            });
        }
    }, {
        key: 'signal',
        value: function signal(command) {
            var _this3 = this;

            this._send([command]).catch(function (error) {
                return _this3.emit('error', error);
            });
        }
    }]);
    return PlatformHttpTransmitter;
}();

exports.default = PlatformHttpTransmitter;


PlatformHttpTransmitter.LOGGER = _logging.LoggerFactory.getLogger('PlatformHttpTransmitter');

(0, _emitterComponent2.default)(PlatformHttpTransmitter.prototype);

/***/ }),
/* 207 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HttpNetworkError = exports.HttpResponseError = exports.DolphinSessionError = exports.DolphinRemotingError = undefined;

var _getPrototypeOf = __webpack_require__(102);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(103);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = __webpack_require__(104);

var _inherits3 = _interopRequireDefault(_inherits2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DolphinRemotingError = exports.DolphinRemotingError = function (_Error) {
  (0, _inherits3.default)(DolphinRemotingError, _Error);

  function DolphinRemotingError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Remoting Error';
    var detail = arguments[1];
    (0, _classCallCheck3.default)(this, DolphinRemotingError);

    var _this = (0, _possibleConstructorReturn3.default)(this, (DolphinRemotingError.__proto__ || (0, _getPrototypeOf2.default)(DolphinRemotingError)).call(this, message));

    _this.detail = detail || undefined;
    return _this;
  }

  return DolphinRemotingError;
}(Error);

var DolphinSessionError = exports.DolphinSessionError = function (_Error2) {
  (0, _inherits3.default)(DolphinSessionError, _Error2);

  function DolphinSessionError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Session Error';
    (0, _classCallCheck3.default)(this, DolphinSessionError);
    return (0, _possibleConstructorReturn3.default)(this, (DolphinSessionError.__proto__ || (0, _getPrototypeOf2.default)(DolphinSessionError)).call(this, message));
  }

  return DolphinSessionError;
}(Error);

var HttpResponseError = exports.HttpResponseError = function (_Error3) {
  (0, _inherits3.default)(HttpResponseError, _Error3);

  function HttpResponseError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Http Response Error';
    (0, _classCallCheck3.default)(this, HttpResponseError);
    return (0, _possibleConstructorReturn3.default)(this, (HttpResponseError.__proto__ || (0, _getPrototypeOf2.default)(HttpResponseError)).call(this, message));
  }

  return HttpResponseError;
}(Error);

var HttpNetworkError = exports.HttpNetworkError = function (_Error4) {
  (0, _inherits3.default)(HttpNetworkError, _Error4);

  function HttpNetworkError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Http Network Error';
    (0, _classCallCheck3.default)(this, HttpNetworkError);
    return (0, _possibleConstructorReturn3.default)(this, (HttpNetworkError.__proto__ || (0, _getPrototypeOf2.default)(HttpNetworkError)).call(this, message));
  }

  return HttpNetworkError;
}(Error);

/***/ }),
/* 208 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _logging = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RemotingErrorHandler = function () {
    function RemotingErrorHandler() {
        (0, _classCallCheck3.default)(this, RemotingErrorHandler);
    }

    (0, _createClass3.default)(RemotingErrorHandler, [{
        key: 'onError',
        value: function onError(error) {
            RemotingErrorHandler.LOGGER.error(error);
        }
    }]);
    return RemotingErrorHandler;
}();

exports.default = RemotingErrorHandler;


RemotingErrorHandler.LOGGER = _logging.LoggerFactory.getLogger('RemotingErrorHandler');

/***/ }),
/* 209 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.register = undefined;

var _serviceProvider = __webpack_require__(31);

var _utils = __webpack_require__(2);

var _keycloakSecurity = __webpack_require__(210);

function register(client) {
    if ((0, _utils.exists)(client)) {
        var securityProvider = new _serviceProvider.ServiceProvider(_keycloakSecurity.KeycloakSecurity, 'Security', client);
        client.registerServiceProvider(securityProvider);
    }
}

exports.register = register;

/***/ }),
/* 210 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeycloakSecurity = undefined;

var _promise = __webpack_require__(19);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _logging = __webpack_require__(5);

var _utils = __webpack_require__(2);

var _keycloakFunctions = __webpack_require__(211);

var _securityHttpClientInterceptor = __webpack_require__(213);

var _constants = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeycloakSecurity = function () {
    function KeycloakSecurity() {
        (0, _classCallCheck3.default)(this, KeycloakSecurity);

        this.functions = new _keycloakFunctions.KeycloakFunctions();
        this.interceptor = new _securityHttpClientInterceptor.SecurityHttpClientInterceptor();
        this.intervall = null;

        this.configuration = {
            directConnection: false,
            authEndpoint: _constants.SECURITY.AUTH_ENDPOINT,
            appName: null,
            realmName: null
        };
    }

    (0, _createClass3.default)(KeycloakSecurity, [{
        key: 'login',
        value: function login(user, password, configuration) {
            var _this = this;

            if (this.isAuthorized()) {
                throw new Error('Already logged in!');
            }

            if (configuration) {
                this.configuration.directConnection = configuration.directConnection || this.configuration.directConnection;
                this.configuration.authEndpoint = configuration.authEndpoint || this.configuration.authEndpoint;
                this.configuration.appName = configuration.appName || this.configuration.appName;
                this.configuration.realmName = configuration.realmName || this.configuration.realmName;
            }

            var _configuration = this.configuration,
                directConnection = _configuration.directConnection,
                authEndpoint = _configuration.authEndpoint,
                appName = _configuration.appName,
                realmName = _configuration.realmName;

            var _functions$createLogi = this.functions.createLoginConnection(directConnection, authEndpoint, realmName, appName, user, password),
                connection = _functions$createLogi.connection,
                content = _functions$createLogi.content;

            var self = this;
            return new _promise2.default(function (resolve, reject) {
                KeycloakSecurity.LOGGER.debug('Receiving access token');
                _this.functions.receiveToken(connection, content).then(function (result) {
                    if (result && result.access_token) {
                        self.token = result;
                        _this.interceptor.setToken(result.access_token);
                        _this.interceptor.setRealm(realmName);
                        _this.interceptor.setAppName(appName);
                        var expires = result.expires_in || KeycloakSecurity.MIN_TOKEN_EXPIRES_RUN;
                        var sleepTime = Math.max(KeycloakSecurity.MIN_TOKEN_EXPIRES_RUN, expires - KeycloakSecurity.TOKEN_EXPIRES_DELTA);
                        self.intervall = setInterval(function () {
                            KeycloakSecurity.LOGGER.debug('Refreshing access token');
                            self.functions.refreshToken(directConnection, authEndpoint, realmName, appName, result.refresh_token).then(function (result) {
                                self.token = result;
                                self.interceptor.setToken(result.access_token);
                            });
                        }, sleepTime);
                        resolve(result.access_token);
                    } else {
                        reject('No access token found');
                    }
                }).catch(function (error) {
                    return reject(error);
                });
            });
        }
    }, {
        key: 'logout',
        value: function logout() {
            var _this2 = this;

            var self = this;
            KeycloakSecurity.LOGGER.debug('Logout');
            return new _promise2.default(function (resolve) {
                delete self.token;
                self.interceptor.setToken(null);
                if ((0, _utils.exists)(_this2.intervall)) {
                    clearInterval(_this2.intervall);
                    _this2.intervall = null;
                }
                resolve();
            });
        }
    }, {
        key: 'isAuthorized',
        value: function isAuthorized() {
            return (0, _utils.exists)(this.token);
        }
    }, {
        key: 'initServiceProvider',
        value: function initServiceProvider(client) {
            (0, _utils.checkMethod)('initServiceProvider');
            (0, _utils.checkParam)(client, 'client');
            client.getService('HttpClientInterceptor').addRequestInterceptor(this.interceptor);
        }
    }]);
    return KeycloakSecurity;
}();

KeycloakSecurity.TOKEN_EXPIRES_DELTA = 10000;
KeycloakSecurity.MIN_TOKEN_EXPIRES_RUN = 30000;

KeycloakSecurity.LOGGER = _logging.LoggerFactory.getLogger('KeycloakSecurity');

exports.KeycloakSecurity = KeycloakSecurity;

/***/ }),
/* 211 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeycloakFunctions = undefined;

var _promise = __webpack_require__(19);

var _promise2 = _interopRequireDefault(_promise);

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _constants = __webpack_require__(14);

var _utils = __webpack_require__(2);

var _logging = __webpack_require__(5);

var _keycloakConnection = __webpack_require__(212);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeycloakFunctions = function () {
    function KeycloakFunctions() {
        (0, _classCallCheck3.default)(this, KeycloakFunctions);

        this.connection = new _keycloakConnection.KeycloakConnection();
    }

    (0, _createClass3.default)(KeycloakFunctions, [{
        key: 'createLoginConnection',
        value: function createLoginConnection(directConnection, authEndpoint, realmName, appName, user, password) {
            var connection = void 0;
            var content = void 0;

            var encodedUser = encodeURIComponent(user);
            var encodedPassword = encodeURIComponent(password);
            var encodedAppName = encodeURIComponent(appName);

            if (directConnection) {
                if ((0, _utils.exists)(appName)) {
                    connection = this.connection.createDirectConnection(authEndpoint, realmName);
                    content = 'client_id=' + encodedAppName + '&username=' + encodedUser + '&password=' + encodedPassword + '&grant_type=password';
                } else {
                    throw Error('No app name set!');
                }
            } else {
                connection = this.connection.createServerProxyConnection(authEndpoint, realmName);
                content = 'username=' + encodedUser + '&password=' + encodedPassword + '&grant_type=password';
            }

            return { connection: connection, content: content };
        }
    }, {
        key: 'createRefreshConnection',
        value: function createRefreshConnection(directConnection, authEndpoint, realmName, appName, refreshToken) {
            var connection = void 0;
            var content = void 0;

            var encodedAppName = encodeURIComponent(appName);

            if (directConnection) {
                if ((0, _utils.exists)(appName)) {
                    connection = this.connection.createDirectConnection(authEndpoint, realmName);
                    content = 'grant_type=refresh_token&refresh_token=' + refreshToken + '&client_id=' + encodedAppName;
                } else {
                    throw Error('No app name set!');
                }
            } else {
                connection = this.connection.createServerProxyConnection(authEndpoint, realmName);
                content = 'grant_type=refresh_token&refresh_token=' + refreshToken;
            }

            return { connection: connection, content: content };
        }
    }, {
        key: 'receiveToken',
        value: function receiveToken(httpRequest, body) {
            return new _promise2.default(function (resolve, reject) {
                httpRequest.ontimeout = function (error) {
                    reject(error);
                };

                httpRequest.onerror = function (error) {
                    reject(error);
                };

                httpRequest.onreadystatechange = function () {
                    if (this.readyState === _constants.HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status === _constants.HTTP.STATUS.OK) {
                        resolve(this.response);
                    } else if (this.readyState === _constants.HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status !== _constants.HTTP.STATUS.OK) {
                        reject(this.status);
                    }
                };

                KeycloakFunctions.LOGGER.trace('Receiving token');
                httpRequest.send(body);
            });
        }
    }, {
        key: 'refreshToken',
        value: function refreshToken(directConnection, authEndpoint, realmName, appName, _refreshToken) {
            var _createRefreshConnect = this.createRefreshConnection(directConnection, authEndpoint, realmName, appName, _refreshToken),
                connection = _createRefreshConnect.connection,
                content = _createRefreshConnect.content;

            return this.receiveToken(connection, content);
        }
    }]);
    return KeycloakFunctions;
}();

KeycloakFunctions.LOGGER = _logging.LoggerFactory.getLogger('KeycloakFunctions');

exports.KeycloakFunctions = KeycloakFunctions;

/***/ }),
/* 212 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.KeycloakConnection = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

var _constants = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var KeycloakConnection = function () {
    function KeycloakConnection() {
        (0, _classCallCheck3.default)(this, KeycloakConnection);
    }

    (0, _createClass3.default)(KeycloakConnection, [{
        key: 'createDirectConnection',
        value: function createDirectConnection(authEndpoint, realmName) {
            (0, _utils.checkMethod)('createDirectConnection');
            (0, _utils.checkParam)(authEndpoint, 'authEndpoint');
            (0, _utils.checkParam)(realmName, 'realmName');

            var httpRequest = new XMLHttpRequest();
            httpRequest.open(_constants.HTTP.METHOD.POST, authEndpoint + '/auth/realms/' + realmName + '/protocol/openid-connect/token', true);
            httpRequest.setRequestHeader(_constants.HTTP.HEADER_NAME.CONTENT_TYPE, _constants.HTTP.CONTENT_TYPE.APPLICATION_X_WWW_FORM_URLENCODED);
            httpRequest.responseType = _constants.RESPONSE_TYPE.JSON;

            return httpRequest;
        }
    }, {
        key: 'createServerProxyConnection',
        value: function createServerProxyConnection(authEndpoint, realmName) {
            (0, _utils.checkMethod)('createServerProxyConnection');
            (0, _utils.checkParam)(authEndpoint, 'authEndpoint');

            var httpRequest = new XMLHttpRequest();
            httpRequest.open(_constants.HTTP.METHOD.POST, authEndpoint, true);
            httpRequest.setRequestHeader(_constants.HTTP.HEADER_NAME.CONTENT_TYPE, _constants.HTTP.CONTENT_TYPE.TEXT_PLAIN);
            if ((0, _utils.exists)(realmName)) {
                httpRequest.setRequestHeader(_constants.HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM, realmName);
            }
            httpRequest.responseType = _constants.RESPONSE_TYPE.JSON;

            return httpRequest;
        }
    }]);
    return KeycloakConnection;
}();

exports.KeycloakConnection = KeycloakConnection;

/***/ }),
/* 213 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.SecurityHttpClientInterceptor = undefined;

var _classCallCheck2 = __webpack_require__(0);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(1);

var _createClass3 = _interopRequireDefault(_createClass2);

var _utils = __webpack_require__(2);

var _logging = __webpack_require__(5);

var _constants = __webpack_require__(14);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var SecurityHttpClientInterceptor = function () {
    function SecurityHttpClientInterceptor() {
        (0, _classCallCheck3.default)(this, SecurityHttpClientInterceptor);

        this.token = null;
        this.appName = null;
        this.realm = null;
    }

    (0, _createClass3.default)(SecurityHttpClientInterceptor, [{
        key: 'setToken',
        value: function setToken(token) {
            this.token = token;
        }
    }, {
        key: 'setAppName',
        value: function setAppName(appName) {
            this.appName = appName;
        }
    }, {
        key: 'setRealm',
        value: function setRealm(realm) {
            this.realm = realm;
        }
    }, {
        key: 'handleRequest',
        value: function handleRequest(httpRequest) {
            (0, _utils.checkMethod)('handleRequest');
            (0, _utils.checkParam)(httpRequest, 'httpRequest');

            if ((0, _utils.exists)(this.token)) {
                SecurityHttpClientInterceptor.LOGGER.trace('Using token', this.token);
                httpRequest.setRequestHeader(_constants.HTTP.HEADER_NAME.AUTHORIZATION, 'Bearer ' + this.token);
            }

            if ((0, _utils.exists)(this.appName)) {
                SecurityHttpClientInterceptor.LOGGER.trace('Using appName', this.appName);
                httpRequest.setRequestHeader(_constants.HTTP.HEADER_NAME.X_PLATFORM_SECURITY_APPLICATION, this.appName);
            }

            if ((0, _utils.exists)(this.realm)) {
                SecurityHttpClientInterceptor.LOGGER.trace('Using realm', this.realm);
                httpRequest.setRequestHeader(_constants.HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM, this.realm);
            }

            httpRequest.setRequestHeader(_constants.HTTP.HEADER_NAME.X_PLATFORM_SECURITY_BEARER_ONLY, 'true');
        }
    }]);
    return SecurityHttpClientInterceptor;
}();

SecurityHttpClientInterceptor.LOGGER = _logging.LoggerFactory.getLogger('SecurityHttpClientInterceptor');

exports.SecurityHttpClientInterceptor = SecurityHttpClientInterceptor;

/***/ })
/******/ ]);
});
//# sourceMappingURL=rico.js.map