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
		exports["ricojs"] = factory();
	else
		root["ricojs"] = factory();
})(window, function() {
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
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
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./src/logging/constants.js
var LogLevel = {
  NONE: {
    name: 'NONE',
    text: '[NONE ]',
    level: 0
  },
  ALL: {
    name: 'ALL',
    text: '[ALL  ]',
    level: 100
  },
  TRACE: {
    name: 'TRACE',
    text: '[TRACE]',
    level: 5
  },
  DEBUG: {
    name: 'DEBUG',
    text: '[DEBUG]',
    level: 4
  },
  INFO: {
    name: 'INFO',
    text: '[INFO ]',
    level: 3
  },
  WARN: {
    name: 'WARN',
    text: '[WARN ]',
    level: 2
  },
  ERROR: {
    name: 'ERROR',
    text: '[ERROR]',
    level: 1
  }
};

// CONCATENATED MODULE: ./src/utils/index.js
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
  var scheme;

  if (matches[4] && matches[4].length > 1) {
    scheme = matches[4].substring(0, matches[4].length - 1);
  }

  var path = matches[13];
  var query;

  if (matches[16] && matches[16].length > 1) {
    query = matches[16].substring(1, matches[16].length);
    var hashes = query.split('&');
    query = hashes.reduce(function (params, hash) {
      var _hash$split = hash.split('='),
          _hash$split2 = _slicedToArray(_hash$split, 2),
          key = _hash$split2[0],
          val = _hash$split2[1];

      return Object.assign(params, _defineProperty({}, key, val));
    }, {});
  }

  var fragment;

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
// CONCATENATED MODULE: ./src/logging/logger.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }



var LOCALS = {
  pad: function pad(text, size) {
    var result = '' + text;

    while (result.length < size) {
      result = '0' + result;
    }

    return result;
  },
  internalLog: function internalLog() {
    var args = Array.from(arguments);
    var func = args.shift();
    var context = args.shift();
    var logLevel = args.shift();
    var date = new Date();
    var dateString = date.getFullYear() + '-' + LOCALS.pad(date.getMonth() + 1, 2) + '-' + LOCALS.pad(date.getDate(), 2) + ' ' + LOCALS.pad(date.getHours(), 2) + ':' + LOCALS.pad(date.getMinutes(), 2) + ':' + LOCALS.pad(date.getSeconds(), 2) + '.' + LOCALS.pad(date.getMilliseconds(), 3);
    func.apply(void 0, [dateString, logLevel.text, context].concat(_toConsumableArray(args)));
  },
  getCookie: function getCookie(name) {
    if (exists(window) && exists(window.document) && exists(window.document.cookie)) {
      var value = '; ' + window.document.cookie;
      var parts = value.split('; ' + name + '=');

      if (parts.length === 2) {
        return parts.pop().split(';').shift();
      }
    }
  }
};

var logger_Logger = function () {
  function Logger(context, rootLogger) {
    _classCallCheck(this, Logger);

    this.context = context;
    this.rootLogger = rootLogger;
    var cookieLogLevel = LOCALS.getCookie('RICO_LOGGER_' + this.context);

    switch (cookieLogLevel) {
      case 'NONE':
        this.logLevel = LogLevel.NONE;
        break;

      case 'ALL':
        this.logLevel = LogLevel.ALL;
        break;

      case 'TRACE':
        this.logLevel = LogLevel.TRACE;
        break;

      case 'DEBUG':
        this.logLevel = LogLevel.DEBUG;
        break;

      case 'INFO':
        this.logLevel = LogLevel.INFO;
        break;

      case 'WARN':
        this.logLevel = LogLevel.WARN;
        break;

      case 'ERROR':
        this.logLevel = LogLevel.ERROR;
        break;
    }
  }

  _createClass(Logger, [{
    key: "trace",
    value: function trace() {
      if (exists(console) && this.isLogLevel(LogLevel.TRACE)) {
        LOCALS.internalLog.apply(LOCALS, [console.log, this.context, LogLevel.TRACE].concat(Array.prototype.slice.call(arguments)));
      }
    }
  }, {
    key: "debug",
    value: function debug() {
      if (exists(console) && this.isLogLevel(LogLevel.DEBUG)) {
        LOCALS.internalLog.apply(LOCALS, [console.log, this.context, LogLevel.DEBUG].concat(Array.prototype.slice.call(arguments)));
      }
    }
  }, {
    key: "info",
    value: function info() {
      if (exists(console) && this.isLogLevel(LogLevel.INFO)) {
        LOCALS.internalLog.apply(LOCALS, [console.log, this.context, LogLevel.INFO].concat(Array.prototype.slice.call(arguments)));
      }
    }
  }, {
    key: "warn",
    value: function warn() {
      if (exists(console) && this.isLogLevel(LogLevel.WARN)) {
        LOCALS.internalLog.apply(LOCALS, [console.warn, this.context, LogLevel.WARN].concat(Array.prototype.slice.call(arguments)));
      }
    }
  }, {
    key: "error",
    value: function error() {
      if (exists(console) && this.isLogLevel(LogLevel.ERROR)) {
        LOCALS.internalLog.apply(LOCALS, [console.error, this.context, LogLevel.ERROR].concat(Array.prototype.slice.call(arguments)));
      }
    }
  }, {
    key: "getLogLevel",
    value: function getLogLevel() {
      if (exists(this.logLevel)) {
        return this.logLevel;
      } else if (exists(this.rootLogger)) {
        return this.rootLogger.getLogLevel();
      } else {
        return LogLevel.INFO;
      }
    }
  }, {
    key: "setLogLevel",
    value: function setLogLevel(level) {
      this.logLevel = level;
    }
  }, {
    key: "setLogLevelByName",
    value: function setLogLevelByName(levelName) {
      if (exists(LogLevel[levelName])) {
        this.logLevel = LogLevel[levelName];
      }
    }
  }, {
    key: "isLogLevel",
    value: function isLogLevel(level) {
      if (this.getLogLevel() === LogLevel.NONE) {
        return false;
      }

      if (this.getLogLevel() === LogLevel.ALL) {
        return true;
      }

      if (this.getLogLevel() === LogLevel.TRACE) {
        return true;
      }

      if (this.getLogLevel() === LogLevel.DEBUG && level !== LogLevel.TRACE) {
        return true;
      }

      if (this.getLogLevel() === LogLevel.INFO && level !== LogLevel.TRACE && level !== LogLevel.DEBUG) {
        return true;
      }

      if (this.getLogLevel() === LogLevel.WARN && level !== LogLevel.TRACE && level !== LogLevel.DEBUG && level !== LogLevel.INFO) {
        return true;
      }

      if (this.getLogLevel() === LogLevel.ERROR && level !== LogLevel.TRACE && level !== LogLevel.DEBUG && level !== LogLevel.INFO && level !== LogLevel.WARN) {
        return true;
      }

      return false;
    }
  }, {
    key: "isLogLevelUseable",
    value: function isLogLevelUseable(level) {
      checkParam(level, 'level');

      if (level.level) {
        return this.getLogLevel().level >= level.level;
      } else {
        return false;
      }
    }
  }]);

  return Logger;
}();


// CONCATENATED MODULE: ./src/logging/loggerfactory.js
function loggerfactory_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function loggerfactory_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function loggerfactory_createClass(Constructor, protoProps, staticProps) { if (protoProps) loggerfactory_defineProperties(Constructor.prototype, protoProps); if (staticProps) loggerfactory_defineProperties(Constructor, staticProps); return Constructor; }



var ROOT_LOGGER = new logger_Logger('ROOT');
var loggerfactory_LOCALS = {
  loggers: new Map()
};

var loggerfactory_LoggerFactory = function () {
  function LoggerFactory() {
    loggerfactory_classCallCheck(this, LoggerFactory);
  }

  loggerfactory_createClass(LoggerFactory, null, [{
    key: "getLogger",
    value: function getLogger(context) {
      if (!exists(context) || context === 'ROOT') {
        return ROOT_LOGGER;
      }

      var existingLogger = loggerfactory_LOCALS.loggers.get(context);

      if (existingLogger) {
        return existingLogger;
      }

      var logger = new logger_Logger(context, ROOT_LOGGER);
      loggerfactory_LOCALS.loggers.set(context, logger);
      return logger;
    }
  }]);

  return LoggerFactory;
}();


// CONCATENATED MODULE: ./src/logging/index.js



// CONCATENATED MODULE: ./src/platform/client.js
function client_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }




var Client = function Client() {
  client_classCallCheck(this, Client);
};

Client.LOGGER = loggerfactory_LoggerFactory.getLogger('Client');
Client.services = new Map();
Client.serviceProviders = new Map();
Client.configuration = {};

Client.getService = function (name) {
  var service = Client.services.get(name);

  if (!exists(service)) {
    var provider = Client.serviceProviders.get(name);

    if (!exists(provider)) {
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

  if (!exists(provider)) {
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


// CONCATENATED MODULE: ./src/platform/serviceProvider.js
function serviceProvider_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function serviceProvider_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function serviceProvider_createClass(Constructor, protoProps, staticProps) { if (protoProps) serviceProvider_defineProperties(Constructor.prototype, protoProps); if (staticProps) serviceProvider_defineProperties(Constructor, staticProps); return Constructor; }



var serviceProvider_ServiceProvider = function () {
  function ServiceProvider(serviceClass, name, client) {
    serviceProvider_classCallCheck(this, ServiceProvider);

    checkMethod('constructor');
    checkParam(serviceClass, 'serviceClass');
    checkParam(name, 'name');
    this.serviceInstance = new serviceClass(client);
    this.name = name;
  }

  serviceProvider_createClass(ServiceProvider, [{
    key: "getName",
    value: function getName() {
      return this.name;
    }
  }, {
    key: "getService",
    value: function getService() {
      return this.serviceInstance;
    }
  }]);

  return ServiceProvider;
}();


// CONCATENATED MODULE: ./src/platform/constants.js
var RESPONSE_TYPE = {
  ARRAY_BUFFER: 'arraybuffer',
  TEXT: 'text',
  JSON: 'json'
};
var HTTP = {
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
var SECURITY = {
  AUTH_ENDPOINT: '/openid-connect'
};
// CONCATENATED MODULE: ./src/http/httpResponse.js
function httpResponse_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function httpResponse_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function httpResponse_createClass(Constructor, protoProps, staticProps) { if (protoProps) httpResponse_defineProperties(Constructor.prototype, protoProps); if (staticProps) httpResponse_defineProperties(Constructor, staticProps); return Constructor; }



var httpResponse_HttpResponse = function () {
  function HttpResponse(url, status, content, headers) {
    httpResponse_classCallCheck(this, HttpResponse);

    this.url = url;
    this.status = status;
    this.content = content;
    this.headers = {};

    if (exists(headers) && typeof headers === 'string') {
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

  httpResponse_createClass(HttpResponse, [{
    key: "getUrl",
    value: function getUrl() {
      return this.url;
    }
  }, {
    key: "getContent",
    value: function getContent() {
      return this.content;
    }
  }, {
    key: "getStatus",
    value: function getStatus() {
      return this.status;
    }
  }, {
    key: "getHeaders",
    value: function getHeaders() {
      return this.headers;
    }
  }, {
    key: "getHeaderByName",
    value: function getHeaderByName(name) {
      checkMethod('getHeaderByName');
      checkParam(name, 'name');
      return this.headers[name.toLowerCase()];
    }
  }]);

  return HttpResponse;
}();


// CONCATENATED MODULE: ./src/http/httpException.js
function httpException_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function httpException_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function httpException_createClass(Constructor, protoProps, staticProps) { if (protoProps) httpException_defineProperties(Constructor.prototype, protoProps); if (staticProps) httpException_defineProperties(Constructor, staticProps); return Constructor; }

var HttpException = function () {
  function HttpException(message, status, timedout) {
    httpException_classCallCheck(this, HttpException);

    this.message = message;
    this.status = status || 0;
    this.timedout = timedout || false;
  }

  httpException_createClass(HttpException, [{
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


// CONCATENATED MODULE: ./src/http/executor.js
function executor_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function executor_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function executor_createClass(Constructor, protoProps, staticProps) { if (protoProps) executor_defineProperties(Constructor.prototype, protoProps); if (staticProps) executor_defineProperties(Constructor, staticProps); return Constructor; }






var executor_Executor = function () {
  function Executor(configuration, client) {
    executor_classCallCheck(this, Executor);

    this.configuration = configuration;
    this.client = client;
  }

  executor_createClass(Executor, [{
    key: "execute",
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
          var httpException = new HttpException(message, this.status, true);
          Executor.LOGGER.error(httpException);
          reject(httpException);
        };

        httpRequest.onerror = function () {
          var message = this.statusText || 'Unspecified error occured';
          var httpException = new HttpException(message, this.status);
          Executor.LOGGER.error(httpException);
          reject(httpException);
        };

        httpRequest.onreadystatechange = function () {
          if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE) {
            Executor.LOGGER.trace('Request to ', self.configuration.url, 'finished with', this.status);
          }

          if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status >= 200 && this.status < 300) {
            var httpResponse = new httpResponse_HttpResponse(this.url, this.status, this.response, this.getAllResponseHeaders());

            for (var _i2 = 0; _i2 < responseInterceptors.length; _i2++) {
              var responseInterceptor = responseInterceptors[_i2];
              responseInterceptor.handleResponse(httpResponse);
            }

            resolve(httpResponse);
          } else if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status >= 300) {
            var httpException = new HttpException(this.statusText, this.status);
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
              var header = {
                name: name,
                value: value
              };
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
              var httpException = new HttpException(msg.message, msg.status, msg.timedout);
              Executor.LOGGER.error(httpException);
              reject(httpException);
            } else {
              var httpResponse = new httpResponse_HttpResponse(msg.url, msg.status, msg.response, msg.responseHeaders);

              for (var _i3 = 0; _i3 < responseInterceptors.length; _i3++) {
                var responseInterceptor = responseInterceptors[_i3];
                responseInterceptor.handleResponse(httpResponse);
              }

              resolve(httpResponse);
            }
          };

          worker.onerror = function (event) {
            var httpException = new HttpException(event.data, 0, false);
            reject(httpException);
          };

          worker.postMessage({
            conf: _this.configuration,
            timeout: timeoutToUse,
            requestHeaders: collectedRequestHeaders
          });
        } catch (error) {
          var httpException = new HttpException(error, 0, false);
          reject(httpException);
        }
      };

      workerCall = workerCall.bind(this);
      return new Promise(function (resolve, reject) {
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

executor_Executor.LOGGER = loggerfactory_LoggerFactory.getLogger('Executor');

// CONCATENATED MODULE: ./src/http/reponseBuilder.js
function reponseBuilder_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function reponseBuilder_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function reponseBuilder_createClass(Constructor, protoProps, staticProps) { if (protoProps) reponseBuilder_defineProperties(Constructor.prototype, protoProps); if (staticProps) reponseBuilder_defineProperties(Constructor, staticProps); return Constructor; }




var reponseBuilder_ResponseBuilder = function () {
  function ResponseBuilder(configuration, client) {
    reponseBuilder_classCallCheck(this, ResponseBuilder);

    this.configuration = configuration;
    this.executor = new executor_Executor(configuration, client);
  }

  reponseBuilder_createClass(ResponseBuilder, [{
    key: "readBytes",
    value: function readBytes() {
      this.configuration.responseType = RESPONSE_TYPE.ARRAY_BUFFER;
      return this.executor;
    }
  }, {
    key: "readString",
    value: function readString() {
      this.configuration.responseType = RESPONSE_TYPE.TEXT;
      return this.executor;
    }
  }, {
    key: "readObject",
    value: function readObject() {
      this.configuration.responseType = RESPONSE_TYPE.JSON;
      return this.executor;
    }
  }, {
    key: "withoutResult",
    value: function withoutResult() {
      return this.executor;
    }
  }]);

  return ResponseBuilder;
}();


// CONCATENATED MODULE: ./src/http/requestBuilder.js
function requestBuilder_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function requestBuilder_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function requestBuilder_createClass(Constructor, protoProps, staticProps) { if (protoProps) requestBuilder_defineProperties(Constructor.prototype, protoProps); if (staticProps) requestBuilder_defineProperties(Constructor, staticProps); return Constructor; }




var requestBuilder_RequestBuilder = function () {
  function RequestBuilder(configuration, client) {
    requestBuilder_classCallCheck(this, RequestBuilder);

    this.configuration = configuration;
    this.reponseBuilder = new reponseBuilder_ResponseBuilder(configuration, client);
  }

  requestBuilder_createClass(RequestBuilder, [{
    key: "withHeader",
    value: function withHeader(name, value) {
      if (!this.configuration.headers) {
        this.configuration.headers = [];
      }

      this.configuration.headers.push({
        name: name,
        value: value
      });
      return this;
    }
  }, {
    key: "withHeadersInfo",
    value: function withHeadersInfo(headersInfo) {
      if (exists(headersInfo)) {
        if (!this.configuration.headers) {
          this.configuration.headers = [];
        }

        for (var name in headersInfo) {
          if (headersInfo.hasOwnProperty(name)) {
            var value = headersInfo[name];
            this.configuration.headers.push({
              name: name,
              value: value
            });
          }
        }
      }

      return this;
    }
  }, {
    key: "withContent",
    value: function withContent(data) {
      this.configuration.requestBody = data;
      return this.reponseBuilder;
    }
  }, {
    key: "withoutContent",
    value: function withoutContent() {
      return this.reponseBuilder;
    }
  }]);

  return RequestBuilder;
}();


// CONCATENATED MODULE: ./src/http/httpClient.js
function httpClient_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function httpClient_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function httpClient_createClass(Constructor, protoProps, staticProps) { if (protoProps) httpClient_defineProperties(Constructor.prototype, protoProps); if (staticProps) httpClient_defineProperties(Constructor, staticProps); return Constructor; }




var httpClient_HttpClient = function () {
  function HttpClient(client) {
    httpClient_classCallCheck(this, HttpClient);

    this.client = client;
  }

  httpClient_createClass(HttpClient, [{
    key: "request",
    value: function request(url, method) {
      var configuration = {
        url: url,
        method: method
      };
      this.requestBuilder = new requestBuilder_RequestBuilder(configuration, this.client);
      return this.requestBuilder;
    }
  }, {
    key: "get",
    value: function get(url) {
      return this.request(url, HTTP.METHOD.GET);
    }
  }, {
    key: "post",
    value: function post(url) {
      return this.request(url, HTTP.METHOD.POST);
    }
  }, {
    key: "put",
    value: function put(url) {
      return this.request(url, HTTP.METHOD.PUT);
    }
  }, {
    key: "delete",
    value: function _delete(url) {
      return this.request(url, HTTP.METHOD.DELETE);
    }
  }]);

  return HttpClient;
}();


// CONCATENATED MODULE: ./src/http/httpClientInterceptor.js
function httpClientInterceptor_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function httpClientInterceptor_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function httpClientInterceptor_createClass(Constructor, protoProps, staticProps) { if (protoProps) httpClientInterceptor_defineProperties(Constructor.prototype, protoProps); if (staticProps) httpClientInterceptor_defineProperties(Constructor, staticProps); return Constructor; }

var HttpClientInterceptor = function () {
  function HttpClientInterceptor() {
    httpClientInterceptor_classCallCheck(this, HttpClientInterceptor);

    this.requestHandlers = new Set();
    this.responseHandlers = new Set();
  }

  httpClientInterceptor_createClass(HttpClientInterceptor, [{
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


// CONCATENATED MODULE: ./src/http/index.js





function register(client) {
  if (exists(client)) {
    var httpClientProvider = new serviceProvider_ServiceProvider(httpClient_HttpClient, 'HttpClient', client);
    var httpClientInterceptorProvider = new serviceProvider_ServiceProvider(HttpClientInterceptor, 'HttpClientInterceptor', client);
    client.registerServiceProvider(httpClientProvider);
    client.registerServiceProvider(httpClientInterceptorProvider);
  }
}


// CONCATENATED MODULE: ./src/platform/clientScope.js
function clientScope_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clientScope_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function clientScope_createClass(Constructor, protoProps, staticProps) { if (protoProps) clientScope_defineProperties(Constructor.prototype, protoProps); if (staticProps) clientScope_defineProperties(Constructor, staticProps); return Constructor; }






var clientScope_ClientScope = function () {
  function ClientScope() {
    clientScope_classCallCheck(this, ClientScope);

    this.clientIds = new Map();
  }

  clientScope_createClass(ClientScope, [{
    key: "handleRequest",
    value: function handleRequest(httpRequest) {
      checkMethod('handleRequest');
      checkParam(httpRequest, 'httpRequest');
      var clientId = this.getClientId(httpRequest.url);

      if (exists(clientId)) {
        ClientScope.LOGGER.trace('Using ClientId', clientId);
        httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_CLIENT_SESSION_ID, clientId);
      }
    }
  }, {
    key: "handleResponse",
    value: function handleResponse(httpResponse) {
      checkMethod('handleResponse');
      checkParam(httpResponse, 'httpResponse');
      var clientId = this.getClientId(httpResponse.url);
      var newClientId = httpResponse.getHeaderByName(HTTP.HEADER_NAME.X_CLIENT_SESSION_ID);

      if (exists(clientId) && exists(newClientId) && clientId !== newClientId) {
        throw new Error('Client Id does not match!');
      }

      if (!exists(clientId) && exists(newClientId)) {
        ClientScope.LOGGER.debug('New ClientId found', newClientId);
        this.setClientId(httpResponse.url, newClientId);
      }
    }
  }, {
    key: "initServiceProvider",
    value: function initServiceProvider(client) {
      checkMethod('initServiceProvider');
      checkParam(client, 'client');
      client.getService('HttpClientInterceptor').addRequestInterceptor(this);
      client.getService('HttpClientInterceptor').addResponseInterceptor(this);
    }
  }, {
    key: "getClientId",
    value: function getClientId(url) {
      var result = parseUrl(url);
      var key = ClientScope.calcKey(result.hostname, result.port);
      return this.clientIds.get(key);
    }
  }, {
    key: "setClientId",
    value: function setClientId(url, clientId) {
      var result = parseUrl(url);
      var key = ClientScope.calcKey(result.hostname, result.port);
      this.clientIds.set(key, clientId);
      ClientScope.LOGGER.trace('Setting ClientId', clientId, 'for', url, 'with key', key);
    }
  }]);

  return ClientScope;
}();

clientScope_ClientScope.calcKey = function (hostname, port) {
  return hostname + port;
};

clientScope_ClientScope.LOGGER = loggerfactory_LoggerFactory.getLogger('ClientScope');

function clientScope_register(client) {
  if (exists(client)) {
    var clientScopeProvider = new serviceProvider_ServiceProvider(clientScope_ClientScope, 'ClientScope');
    client.registerServiceProvider(clientScopeProvider);
  }
}


// CONCATENATED MODULE: ./src/remoting/commands/commandConstants.js
var ATTRIBUTE_METADATA_CHANGED_COMMAND_ID = 'AttributeMetadataChanged';
var CALL_ACTION_COMMAND_ID = 'CallAction';
var CHANGE_ATTRIBUTE_METADATA_COMMAND_ID = 'ChangeAttributeMetadata';
var CREATE_CONTEXT_COMMAND_ID = 'CreateContext';
var CREATE_CONTROLLER_COMMAND_ID = 'CreateController';
var CREATE_PRESENTATION_MODEL_COMMAND_ID = 'CreatePresentationModel';
var DELETE_PRESENTATION_MODEL_COMMAND_ID = 'DeletePresentationModel';
var DESTROY_CONTEXT_COMMAND_ID = 'DestroyContext';
var DESTROY_CONTROLLER_COMMAND_ID = 'DestroyController';
var INTERRUPT_LONG_POLL_COMMAND_ID = 'InterruptLongPoll';
var PRESENTATION_MODEL_DELETED_COMMAND_ID = 'PresentationModelDeleted';
var START_LONG_POLL_COMMAND_ID = 'StartLongPoll';
var VALUE_CHANGED_COMMAND_ID = 'ValueChanged';
var ID = "id";
var ATTRIBUTE_ID = "a_id";
var PM_ID = "p_id";
var CONTROLLER_ID = "c_id";
var PM_TYPE = "t";
var NAME = "n";
var VALUE = "v";
var PARAMS = "p";
var PM_ATTRIBUTES = "a";
// CONCATENATED MODULE: ./src/remoting/commandBatcher.js
function commandBatcher_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function commandBatcher_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function commandBatcher_createClass(Constructor, protoProps, staticProps) { if (protoProps) commandBatcher_defineProperties(Constructor.prototype, protoProps); if (staticProps) commandBatcher_defineProperties(Constructor, staticProps); return Constructor; }



var commandBatcher_BlindCommandBatcher = function () {
  function BlindCommandBatcher() {
    var folding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
    var maxBatchSize = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 50;

    commandBatcher_classCallCheck(this, BlindCommandBatcher);

    this.folding = folding;
    this.maxBatchSize = maxBatchSize;
  }

  commandBatcher_createClass(BlindCommandBatcher, [{
    key: "batch",
    value: function batch(queue) {
      var batch = [];
      var batchLength = 0;

      while (queue[batchLength] && batchLength <= this.maxBatchSize) {
        var element = queue[batchLength];
        batchLength++;

        if (this.folding) {
          if (element.command.id == VALUE_CHANGED_COMMAND_ID && batch.length > 0 && batch[batch.length - 1].command.id == VALUE_CHANGED_COMMAND_ID && element.command.attributeId == batch[batch.length - 1].command.attributeId) {
            batch[batch.length - 1].command.newValue = element.command.newValue;
          } else if (element.command.id == PRESENTATION_MODEL_DELETED_COMMAND_ID) {} else {
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


// CONCATENATED MODULE: ./src/remoting/constants.js
var JS_STRING_TYPE = 'string';
var REMOTING_BEAN = 0;
var BYTE = 1;
var SHORT = 2;
var INT = 3;
var LONG = 4;
var FLOAT = 5;
var DOUBLE = 6;
var BOOLEAN = 7;
var STRING = 8;
var DATE = 9;
var ENUM = 10;
var CALENDAR = 11;
var LOCAL_DATE_FIELD_TYPE = 55;
var LOCAL_DATE_TIME_FIELD_TYPE = 52;
var ZONED_DATE_TIME_FIELD_TYPE = 54;
var ADDED_TYPE = "ADDED";
var REMOVED_TYPE = "REMOVED";
// CONCATENATED MODULE: ./src/remoting/commands/impl/valueChangedCommand.js
function valueChangedCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function valueChangedCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function valueChangedCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) valueChangedCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) valueChangedCommand_defineProperties(Constructor, staticProps); return Constructor; }




var valueChangedCommand_ValueChangedCommand = function () {
  function ValueChangedCommand() {
    valueChangedCommand_classCallCheck(this, ValueChangedCommand);

    this.id = VALUE_CHANGED_COMMAND_ID;
  }

  valueChangedCommand_createClass(ValueChangedCommand, [{
    key: "init",
    value: function init(attributeId, newValue) {
      checkMethod('ValueChangedCommand.init()');
      checkParam(attributeId, 'attributeId');
      this.attributeId = attributeId;
      this.newValue = newValue;
    }
  }]);

  return ValueChangedCommand;
}();


// CONCATENATED MODULE: ./src/remoting/commands/impl/attributeMetadataChangedCommand.js
function attributeMetadataChangedCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function attributeMetadataChangedCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function attributeMetadataChangedCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) attributeMetadataChangedCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) attributeMetadataChangedCommand_defineProperties(Constructor, staticProps); return Constructor; }




var attributeMetadataChangedCommand_AttributeMetadataChangedCommand = function () {
  function AttributeMetadataChangedCommand() {
    attributeMetadataChangedCommand_classCallCheck(this, AttributeMetadataChangedCommand);

    this.id = ATTRIBUTE_METADATA_CHANGED_COMMAND_ID;
  }

  attributeMetadataChangedCommand_createClass(AttributeMetadataChangedCommand, [{
    key: "init",
    value: function init(attributeId, metadataName, value) {
      checkMethod('AttributeMetadataChangedCommand.init()');
      checkParam(attributeId, 'attributeId');
      checkParam(metadataName, 'metadataName');
      this.attributeId = attributeId;
      this.metadataName = metadataName;
      this.value = value;
    }
  }]);

  return AttributeMetadataChangedCommand;
}();


// CONCATENATED MODULE: ./src/remoting/commands/impl/callActionCommand.js
function callActionCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function callActionCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function callActionCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) callActionCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) callActionCommand_defineProperties(Constructor, staticProps); return Constructor; }




var callActionCommand_CallActionCommand = function () {
  function CallActionCommand() {
    callActionCommand_classCallCheck(this, CallActionCommand);

    this.id = CALL_ACTION_COMMAND_ID;
  }

  callActionCommand_createClass(CallActionCommand, [{
    key: "init",
    value: function init(controllerid, actionName, params) {
      checkMethod('CreateControllerCommand.init()');
      checkParam(controllerid, 'controllerid');
      checkParam(actionName, 'actionName');
      this.controllerid = controllerid;
      this.actionName = actionName;
      this.params = params;
    }
  }]);

  return CallActionCommand;
}();


// CONCATENATED MODULE: ./src/remoting/commands/impl/changeAttributeMetadataCommand.js
function changeAttributeMetadataCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function changeAttributeMetadataCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function changeAttributeMetadataCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) changeAttributeMetadataCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) changeAttributeMetadataCommand_defineProperties(Constructor, staticProps); return Constructor; }




var changeAttributeMetadataCommand_ChangeAttributeMetadataCommand = function () {
  function ChangeAttributeMetadataCommand() {
    changeAttributeMetadataCommand_classCallCheck(this, ChangeAttributeMetadataCommand);

    this.id = CHANGE_ATTRIBUTE_METADATA_COMMAND_ID;
  }

  changeAttributeMetadataCommand_createClass(ChangeAttributeMetadataCommand, [{
    key: "init",
    value: function init(attributeId, metadataName, value) {
      checkMethod('ChangeAttributeMetadataCommand.init()');
      checkParam(attributeId, 'attributeId');
      checkParam(metadataName, 'metadataName');
      this.attributeId = attributeId;
      this.metadataName = metadataName;
      this.value = value;
    }
  }]);

  return ChangeAttributeMetadataCommand;
}();


// CONCATENATED MODULE: ./src/remoting/commands/impl/createContextCommand.js
function createContextCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var createContextCommand_CreateContextCommand = function CreateContextCommand() {
  createContextCommand_classCallCheck(this, CreateContextCommand);

  this.id = CREATE_CONTEXT_COMMAND_ID;
};


// CONCATENATED MODULE: ./src/remoting/commands/impl/createControllerCommand.js
function createControllerCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createControllerCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function createControllerCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) createControllerCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) createControllerCommand_defineProperties(Constructor, staticProps); return Constructor; }




var createControllerCommand_CreateControllerCommand = function () {
  function CreateControllerCommand() {
    createControllerCommand_classCallCheck(this, CreateControllerCommand);

    this.id = CREATE_CONTROLLER_COMMAND_ID;
  }

  createControllerCommand_createClass(CreateControllerCommand, [{
    key: "init",
    value: function init(controllerName, parentControllerId) {
      checkMethod('CreateControllerCommand.init()');
      checkParam(controllerName, 'controllerName');
      this.controllerName = controllerName;
      this.parentControllerId = parentControllerId;
    }
  }]);

  return CreateControllerCommand;
}();


// CONCATENATED MODULE: ./src/remoting/commands/impl/createPresentationModelCommand.js
function createPresentationModelCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function createPresentationModelCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function createPresentationModelCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) createPresentationModelCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) createPresentationModelCommand_defineProperties(Constructor, staticProps); return Constructor; }




var createPresentationModelCommand_CreatePresentationModelCommand = function () {
  function CreatePresentationModelCommand() {
    createPresentationModelCommand_classCallCheck(this, CreatePresentationModelCommand);

    this.id = CREATE_PRESENTATION_MODEL_COMMAND_ID;
  }

  createPresentationModelCommand_createClass(CreatePresentationModelCommand, [{
    key: "init",
    value: function init(presentationModel) {
      checkMethod('CreatePresentationModelCommand.init()');
      checkParam(presentationModel, 'presentationModel');
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


// CONCATENATED MODULE: ./src/remoting/commands/impl/deletePresentationModelCommand.js
function deletePresentationModelCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function deletePresentationModelCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function deletePresentationModelCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) deletePresentationModelCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) deletePresentationModelCommand_defineProperties(Constructor, staticProps); return Constructor; }




var deletePresentationModelCommand_DeletePresentationModelCommand = function () {
  function DeletePresentationModelCommand() {
    deletePresentationModelCommand_classCallCheck(this, DeletePresentationModelCommand);

    this.id = DELETE_PRESENTATION_MODEL_COMMAND_ID;
  }

  deletePresentationModelCommand_createClass(DeletePresentationModelCommand, [{
    key: "init",
    value: function init(pmId) {
      checkMethod('DeletePresentationModelCommand.init()');
      checkParam(pmId, 'pmId');
      this.pmId = pmId;
    }
  }]);

  return DeletePresentationModelCommand;
}();


// CONCATENATED MODULE: ./src/remoting/commands/impl/destroyContextCommand.js
function destroyContextCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var destroyContextCommand_DestroyContextCommand = function DestroyContextCommand() {
  destroyContextCommand_classCallCheck(this, DestroyContextCommand);

  this.id = DESTROY_CONTEXT_COMMAND_ID;
};


// CONCATENATED MODULE: ./src/remoting/commands/impl/destroyControllerCommand.js
function destroyControllerCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function destroyControllerCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function destroyControllerCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) destroyControllerCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) destroyControllerCommand_defineProperties(Constructor, staticProps); return Constructor; }




var destroyControllerCommand_DestroyControllerCommand = function () {
  function DestroyControllerCommand() {
    destroyControllerCommand_classCallCheck(this, DestroyControllerCommand);

    this.id = DESTROY_CONTROLLER_COMMAND_ID;
  }

  destroyControllerCommand_createClass(DestroyControllerCommand, [{
    key: "init",
    value: function init(controllerId) {
      checkMethod('DestroyControllerCommand.init()');
      checkParam(controllerId, 'controllerId');
      this.controllerId = controllerId;
    }
  }]);

  return DestroyControllerCommand;
}();


// CONCATENATED MODULE: ./src/remoting/commands/impl/interruptLongPollCommand.js
function interruptLongPollCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var interruptLongPollCommand_InterruptLongPollCommand = function InterruptLongPollCommand() {
  interruptLongPollCommand_classCallCheck(this, InterruptLongPollCommand);

  this.id = INTERRUPT_LONG_POLL_COMMAND_ID;
};


// CONCATENATED MODULE: ./src/remoting/commands/impl/presentationModelDeletedCommand.js
function presentationModelDeletedCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function presentationModelDeletedCommand_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function presentationModelDeletedCommand_createClass(Constructor, protoProps, staticProps) { if (protoProps) presentationModelDeletedCommand_defineProperties(Constructor.prototype, protoProps); if (staticProps) presentationModelDeletedCommand_defineProperties(Constructor, staticProps); return Constructor; }




var presentationModelDeletedCommand_PresentationModelDeletedCommand = function () {
  function PresentationModelDeletedCommand() {
    presentationModelDeletedCommand_classCallCheck(this, PresentationModelDeletedCommand);

    this.id = PRESENTATION_MODEL_DELETED_COMMAND_ID;
  }

  presentationModelDeletedCommand_createClass(PresentationModelDeletedCommand, [{
    key: "init",
    value: function init(pmId) {
      checkMethod('PresentationModelDeletedCommand.init()');
      checkParam(pmId, 'pmId');
      this.pmId = pmId;
    }
  }]);

  return PresentationModelDeletedCommand;
}();


// CONCATENATED MODULE: ./src/remoting/commands/impl/startLongPollCommand.js
function startLongPollCommand_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var startLongPollCommand_StartLongPollCommand = function StartLongPollCommand() {
  startLongPollCommand_classCallCheck(this, StartLongPollCommand);

  this.id = START_LONG_POLL_COMMAND_ID;
};


// CONCATENATED MODULE: ./src/remoting/commands/codecError.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function codecError_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var CodecError = function (_Error) {
  _inherits(CodecError, _Error);

  function CodecError(message) {
    codecError_classCallCheck(this, CodecError);

    return _possibleConstructorReturn(this, _getPrototypeOf(CodecError).call(this, message));
  }

  return CodecError;
}(_wrapNativeSuper(Error));


// CONCATENATED MODULE: ./src/remoting/commands/codec.js
function codec_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { codec_typeof = function _typeof(obj) { return typeof obj; }; } else { codec_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return codec_typeof(obj); }

function codec_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function codec_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function codec_createClass(Constructor, protoProps, staticProps) { if (protoProps) codec_defineProperties(Constructor.prototype, protoProps); if (staticProps) codec_defineProperties(Constructor, staticProps); return Constructor; }




















var codec_Codec = function () {
  function Codec() {
    codec_classCallCheck(this, Codec);
  }

  codec_createClass(Codec, null, [{
    key: "_encodeAttributeMetadataChangedCommand",
    value: function _encodeAttributeMetadataChangedCommand(command) {
      checkMethod("Codec.encodeAttributeMetadataChangedCommand");
      checkParam(command, "command");
      checkParam(command.attributeId, "command.attributeId");
      checkParam(command.metadataName, "command.metadataName");
      var jsonCommand = {};
      jsonCommand[ID] = ATTRIBUTE_METADATA_CHANGED_COMMAND_ID;
      jsonCommand[ATTRIBUTE_ID] = command.attributeId;
      jsonCommand[NAME] = command.metadataName;
      jsonCommand[VALUE] = command.value;
      return jsonCommand;
    }
  }, {
    key: "_decodeAttributeMetadataChangedCommand",
    value: function _decodeAttributeMetadataChangedCommand(jsonCommand) {
      checkMethod("Codec.decodeAttributeMetadataChangedCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");
      checkParam(jsonCommand[NAME], "jsonCommand[NAME]");
      var command = new attributeMetadataChangedCommand_AttributeMetadataChangedCommand();
      command.attributeId = jsonCommand[ATTRIBUTE_ID];
      command.metadataName = jsonCommand[NAME];
      command.value = jsonCommand[VALUE];
      return command;
    }
  }, {
    key: "_encodeCallActionCommand",
    value: function _encodeCallActionCommand(command) {
      checkMethod("Codec.encodeCallActionCommand");
      checkParam(command, "command");
      checkParam(command.controllerid, "command.controllerid");
      checkParam(command.actionName, "command.actionName");
      checkParam(command.params, "command.params");
      var jsonCommand = {};
      jsonCommand[ID] = CALL_ACTION_COMMAND_ID;
      jsonCommand[CONTROLLER_ID] = command.controllerid;
      jsonCommand[NAME] = command.actionName;
      jsonCommand[PARAMS] = command.params.map(function (param) {
        var result = {};
        result[NAME] = param.name;

        if (exists(param.value)) {
          result[VALUE] = param.value;
        }

        return result;
      });
      return jsonCommand;
    }
  }, {
    key: "_decodeCallActionCommand",
    value: function _decodeCallActionCommand(jsonCommand) {
      checkMethod("Codec.decodeCallActionCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");
      checkParam(jsonCommand[NAME], "jsonCommand[NAME]");
      checkParam(jsonCommand[PARAMS], "jsonCommand[PARAMS]");
      var command = new callActionCommand_CallActionCommand();
      command.controllerid = jsonCommand[CONTROLLER_ID];
      command.actionName = jsonCommand[NAME];
      command.params = jsonCommand[PARAMS].map(function (param) {
        return {
          'name': param[NAME],
          'value': exists(param[VALUE]) ? param[VALUE] : null
        };
      });
      return command;
    }
  }, {
    key: "_encodeChangeAttributeMetadataCommand",
    value: function _encodeChangeAttributeMetadataCommand(command) {
      checkMethod("Codec.encodeChangeAttributeMetadataCommand");
      checkParam(command, "command");
      checkParam(command.attributeId, "command.attributeId");
      checkParam(command.metadataName, "command.metadataName");
      var jsonCommand = {};
      jsonCommand[ID] = CHANGE_ATTRIBUTE_METADATA_COMMAND_ID;
      jsonCommand[ATTRIBUTE_ID] = command.attributeId;
      jsonCommand[NAME] = command.metadataName;
      jsonCommand[VALUE] = command.value;
      return jsonCommand;
    }
  }, {
    key: "_decodeChangeAttributeMetadataCommand",
    value: function _decodeChangeAttributeMetadataCommand(jsonCommand) {
      checkMethod("Codec.decodeChangeAttributeMetadataCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");
      checkParam(jsonCommand[NAME], "jsonCommand[NAME]");
      var command = new changeAttributeMetadataCommand_ChangeAttributeMetadataCommand();
      command.attributeId = jsonCommand[ATTRIBUTE_ID];
      command.metadataName = jsonCommand[NAME];
      command.value = jsonCommand[VALUE];
      return command;
    }
  }, {
    key: "_encodeCreateContextCommand",
    value: function _encodeCreateContextCommand(command) {
      checkMethod("Codec.encodeCreateContextCommand");
      checkParam(command, "command");
      var jsonCommand = {};
      jsonCommand[ID] = CREATE_CONTEXT_COMMAND_ID;
      return jsonCommand;
    }
  }, {
    key: "_decodeCreateContextCommand",
    value: function _decodeCreateContextCommand(jsonCommand) {
      checkMethod("Codec.decodeCreateContextCommand");
      checkParam(jsonCommand, "jsonCommand");
      var command = new createContextCommand_CreateContextCommand();
      return command;
    }
  }, {
    key: "_encodeCreateControllerCommand",
    value: function _encodeCreateControllerCommand(command) {
      checkMethod("Codec._encodeCreateControllerCommand");
      checkParam(command, "command");
      checkParam(command.controllerName, "command.controllerName");
      var jsonCommand = {};
      jsonCommand[ID] = CREATE_CONTROLLER_COMMAND_ID;
      jsonCommand[NAME] = command.controllerName;
      jsonCommand[CONTROLLER_ID] = command.parentControllerId;
      return jsonCommand;
    }
  }, {
    key: "_decodeCreateControllerCommand",
    value: function _decodeCreateControllerCommand(jsonCommand) {
      checkMethod("Codec._decodeCreateControllerCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[NAME], "jsonCommand[NAME]");
      checkParam(jsonCommand[CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");
      var command = new createControllerCommand_CreateControllerCommand();
      command.controllerName = jsonCommand[NAME];
      command.parentControllerId = jsonCommand[CONTROLLER_ID];
      return command;
    }
  }, {
    key: "_encodeCreatePresentationModelCommand",
    value: function _encodeCreatePresentationModelCommand(command) {
      checkMethod("Codec.encodeCreatePresentationModelCommand");
      checkParam(command, "command");
      checkParam(command.pmId, "command.pmId");
      checkParam(command.pmType, "command.pmType");
      var jsonCommand = {};
      jsonCommand[ID] = CREATE_PRESENTATION_MODEL_COMMAND_ID;
      jsonCommand[PM_ID] = command.pmId;
      jsonCommand[PM_TYPE] = command.pmType;
      jsonCommand[PM_ATTRIBUTES] = command.attributes.map(function (attribute) {
        var result = {};
        result[NAME] = attribute.propertyName;
        result[ATTRIBUTE_ID] = attribute.id;

        if (exists(attribute.value)) {
          result[VALUE] = attribute.value;
        }

        return result;
      });
      return jsonCommand;
    }
  }, {
    key: "_decodeCreatePresentationModelCommand",
    value: function _decodeCreatePresentationModelCommand(jsonCommand) {
      checkMethod("Codec.decodeCreatePresentationModelCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[PM_ID], "jsonCommand[PM_ID]");
      checkParam(jsonCommand[PM_TYPE], "jsonCommand[PM_TYPE]");
      var command = new createPresentationModelCommand_CreatePresentationModelCommand();
      command.pmId = jsonCommand[PM_ID];
      command.pmType = jsonCommand[PM_TYPE];
      command.attributes = jsonCommand[PM_ATTRIBUTES].map(function (attribute) {
        return {
          'propertyName': attribute[NAME],
          'id': attribute[ATTRIBUTE_ID],
          'value': exists(attribute[VALUE]) ? attribute[VALUE] : null
        };
      });
      return command;
    }
  }, {
    key: "_encodeDeletePresentationModelCommand",
    value: function _encodeDeletePresentationModelCommand(command) {
      checkMethod("Codec._encodeDeletePresentationModelCommand");
      checkParam(command, "command");
      checkParam(command.pmId, "command.pmId");
      var jsonCommand = {};
      jsonCommand[ID] = DELETE_PRESENTATION_MODEL_COMMAND_ID;
      jsonCommand[PM_ID] = command.pmId;
      return jsonCommand;
    }
  }, {
    key: "_decodeDeletePresentationModelCommand",
    value: function _decodeDeletePresentationModelCommand(jsonCommand) {
      checkMethod("Codec._decodeDeletePresentationModelCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[PM_ID], "jsonCommand[PM_ID]");
      var command = new deletePresentationModelCommand_DeletePresentationModelCommand();
      command.pmId = jsonCommand[PM_ID];
      return command;
    }
  }, {
    key: "_encodeDestroyContextCommand",
    value: function _encodeDestroyContextCommand(command) {
      checkMethod("Codec._encodeDestroyContextCommand");
      checkParam(command, "command");
      var jsonCommand = {};
      jsonCommand[ID] = DESTROY_CONTEXT_COMMAND_ID;
      return jsonCommand;
    }
  }, {
    key: "_decodeDestroyContextCommand",
    value: function _decodeDestroyContextCommand(jsonCommand) {
      checkMethod("Codec._decodeDestroyContextCommand");
      checkParam(jsonCommand, "jsonCommand");
      var command = new destroyContextCommand_DestroyContextCommand();
      return command;
    }
  }, {
    key: "_encodeDestroyControllerCommand",
    value: function _encodeDestroyControllerCommand(command) {
      checkMethod("Codec._encodeDestroyControllerCommand");
      checkParam(command, "command");
      checkParam(command.controllerId, "command.controllerId");
      var jsonCommand = {};
      jsonCommand[ID] = DESTROY_CONTROLLER_COMMAND_ID;
      jsonCommand[CONTROLLER_ID] = command.controllerId;
      return jsonCommand;
    }
  }, {
    key: "_decodeDestroyControllerCommand",
    value: function _decodeDestroyControllerCommand(jsonCommand) {
      checkMethod("Codec._decodeDestroyControllerCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[CONTROLLER_ID], "jsonCommand[CONTROLLER_ID]");
      var command = new destroyControllerCommand_DestroyControllerCommand();
      command.controllerId = jsonCommand[CONTROLLER_ID];
      return command;
    }
  }, {
    key: "_encodeInterruptLongPollCommand",
    value: function _encodeInterruptLongPollCommand(command) {
      checkMethod("Codec._encodeInterruptLongPollCommand");
      checkParam(command, "command");
      var jsonCommand = {};
      jsonCommand[ID] = INTERRUPT_LONG_POLL_COMMAND_ID;
      return jsonCommand;
    }
  }, {
    key: "_decodeInterruptLongPollCommand",
    value: function _decodeInterruptLongPollCommand(jsonCommand) {
      checkMethod("Codec._decodeInterruptLongPollCommand");
      checkParam(jsonCommand, "jsonCommand");
      var command = new interruptLongPollCommand_InterruptLongPollCommand();
      return command;
    }
  }, {
    key: "_encodePresentationModelDeletedCommand",
    value: function _encodePresentationModelDeletedCommand(command) {
      checkMethod("Codec._encodePresentationModelDeletedCommand");
      checkParam(command, "command");
      checkParam(command.pmId, "command.pmId");
      var jsonCommand = {};
      jsonCommand[ID] = PRESENTATION_MODEL_DELETED_COMMAND_ID;
      jsonCommand[PM_ID] = command.pmId;
      return jsonCommand;
    }
  }, {
    key: "_decodePresentationModelDeletedCommand",
    value: function _decodePresentationModelDeletedCommand(jsonCommand) {
      checkMethod("Codec._decodePresentationModelDeletedCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[PM_ID], "jsonCommand[PM_ID]");
      var command = new presentationModelDeletedCommand_PresentationModelDeletedCommand();
      command.pmId = jsonCommand[PM_ID];
      return command;
    }
  }, {
    key: "_encodeStartLongPollCommand",
    value: function _encodeStartLongPollCommand(command) {
      checkMethod("Codec._encodeStartLongPollCommand");
      checkParam(command, "command");
      var jsonCommand = {};
      jsonCommand[ID] = START_LONG_POLL_COMMAND_ID;
      return jsonCommand;
    }
  }, {
    key: "_decodeStartLongPollCommand",
    value: function _decodeStartLongPollCommand(jsonCommand) {
      checkMethod("Codec._decodeStartLongPollCommand");
      checkParam(jsonCommand, "jsonCommand");
      var command = new startLongPollCommand_StartLongPollCommand();
      return command;
    }
  }, {
    key: "_encodeValueChangedCommand",
    value: function _encodeValueChangedCommand(command) {
      checkMethod("Codec.encodeValueChangedCommand");
      checkParam(command, "command");
      checkParam(command.attributeId, "command.attributeId");
      var jsonCommand = {};
      jsonCommand[ID] = VALUE_CHANGED_COMMAND_ID;
      jsonCommand[ATTRIBUTE_ID] = command.attributeId;

      if (exists(command.newValue)) {
        jsonCommand[VALUE] = command.newValue;
      }

      return jsonCommand;
    }
  }, {
    key: "_decodeValueChangedCommand",
    value: function _decodeValueChangedCommand(jsonCommand) {
      checkMethod("Codec.decodeValueChangedCommand");
      checkParam(jsonCommand, "jsonCommand");
      checkParam(jsonCommand[ATTRIBUTE_ID], "jsonCommand[ATTRIBUTE_ID]");
      var command = new valueChangedCommand_ValueChangedCommand();
      command.attributeId = jsonCommand[ATTRIBUTE_ID];

      if (exists(jsonCommand[VALUE])) {
        command.newValue = jsonCommand[VALUE];
      } else {
        command.newValue = null;
      }

      return command;
    }
  }, {
    key: "encode",
    value: function encode(commands) {
      checkMethod("Codec.encode");
      checkParam(commands, "commands");
      var self = this;
      return JSON.stringify(commands.map(function (command) {
        if (command.id === ATTRIBUTE_METADATA_CHANGED_COMMAND_ID) {
          return self._encodeAttributeMetadataChangedCommand(command);
        } else if (command.id === CALL_ACTION_COMMAND_ID) {
          return self._encodeCallActionCommand(command);
        } else if (command.id === CHANGE_ATTRIBUTE_METADATA_COMMAND_ID) {
          return self._encodeChangeAttributeMetadataCommand(command);
        } else if (command.id === CREATE_CONTEXT_COMMAND_ID) {
          return self._encodeCreateContextCommand(command);
        } else if (command.id === CREATE_CONTROLLER_COMMAND_ID) {
          return self._encodeCreateControllerCommand(command);
        } else if (command.id === CREATE_PRESENTATION_MODEL_COMMAND_ID) {
          return self._encodeCreatePresentationModelCommand(command);
        } else if (command.id === DELETE_PRESENTATION_MODEL_COMMAND_ID) {
          return self._encodeDeletePresentationModelCommand(command);
        } else if (command.id === DESTROY_CONTEXT_COMMAND_ID) {
          return self._encodeDestroyContextCommand(command);
        } else if (command.id === DESTROY_CONTROLLER_COMMAND_ID) {
          return self._encodeDestroyControllerCommand(command);
        } else if (command.id === INTERRUPT_LONG_POLL_COMMAND_ID) {
          return self._encodeInterruptLongPollCommand(command);
        } else if (command.id === PRESENTATION_MODEL_DELETED_COMMAND_ID) {
          return self._encodePresentationModelDeletedCommand(command);
        } else if (command.id === START_LONG_POLL_COMMAND_ID) {
          return self._encodeStartLongPollCommand(command);
        } else if (command.id === VALUE_CHANGED_COMMAND_ID) {
          return self._encodeValueChangedCommand(command);
        } else {
          throw new CodecError('Command of type ' + command.id + ' can not be handled');
        }
      }));
    }
  }, {
    key: "decode",
    value: function decode(transmitted) {
      checkMethod("Codec.decode");
      checkParam(transmitted, "transmitted");

      if (codec_typeof(transmitted) === JS_STRING_TYPE) {
        var self = this;
        return JSON.parse(transmitted).map(function (command) {
          if (command.id === ATTRIBUTE_METADATA_CHANGED_COMMAND_ID) {
            return self._decodeAttributeMetadataChangedCommand(command);
          } else if (command.id === CALL_ACTION_COMMAND_ID) {
            return self._decodeCallActionCommand(command);
          } else if (command.id === CHANGE_ATTRIBUTE_METADATA_COMMAND_ID) {
            return self._decodeChangeAttributeMetadataCommand(command);
          } else if (command.id === CREATE_CONTEXT_COMMAND_ID) {
            return self._decodeCreateContextCommand(command);
          } else if (command.id === CREATE_CONTROLLER_COMMAND_ID) {
            return self._decodeCreateControllerCommand(command);
          } else if (command.id === CREATE_PRESENTATION_MODEL_COMMAND_ID) {
            return self._decodeCreatePresentationModelCommand(command);
          } else if (command.id === DELETE_PRESENTATION_MODEL_COMMAND_ID) {
            return self._decodeDeletePresentationModelCommand(command);
          } else if (command.id === DESTROY_CONTEXT_COMMAND_ID) {
            return self._decodeDestroyContextCommand(command);
          } else if (command.id === DESTROY_CONTROLLER_COMMAND_ID) {
            return self._decodeDestroyControllerCommand(command);
          } else if (command.id === INTERRUPT_LONG_POLL_COMMAND_ID) {
            return self._decodeInterruptLongPollCommand(command);
          } else if (command.id === PRESENTATION_MODEL_DELETED_COMMAND_ID) {
            return self._decodePresentationModelDeletedCommand(command);
          } else if (command.id === START_LONG_POLL_COMMAND_ID) {
            return self._decodeStartLongPollCommand(command);
          } else if (command.id === VALUE_CHANGED_COMMAND_ID) {
            return self._decodeValueChangedCommand(command);
          } else {
            throw new CodecError('Command of type ' + command.id + ' can not be handled');
          }
        });
      } else {
        throw new CodecError('Can not decode data that is not of type string');
      }
    }
  }]);

  return Codec;
}();


// CONCATENATED MODULE: ./src/remoting/eventBus.js
function eventBus_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function eventBus_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function eventBus_createClass(Constructor, protoProps, staticProps) { if (protoProps) eventBus_defineProperties(Constructor.prototype, protoProps); if (staticProps) eventBus_defineProperties(Constructor, staticProps); return Constructor; }

var EventBus = function () {
  function EventBus() {
    eventBus_classCallCheck(this, EventBus);

    this.eventHandlers = [];
  }

  eventBus_createClass(EventBus, [{
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


// CONCATENATED MODULE: ./src/remoting/clientPresentationModel.js
function clientPresentationModel_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clientPresentationModel_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function clientPresentationModel_createClass(Constructor, protoProps, staticProps) { if (protoProps) clientPresentationModel_defineProperties(Constructor.prototype, protoProps); if (staticProps) clientPresentationModel_defineProperties(Constructor, staticProps); return Constructor; }


var presentationModelInstanceCount = 0;

var clientPresentationModel_ClientPresentationModel = function () {
  function ClientPresentationModel(id, presentationModelType) {
    clientPresentationModel_classCallCheck(this, ClientPresentationModel);

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

    this.invalidBus = new EventBus();
    this.dirtyValueChangeBus = new EventBus();
  }

  clientPresentationModel_createClass(ClientPresentationModel, [{
    key: "copy",
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
    key: "addAttributes",
    value: function addAttributes(attributes) {
      var _this = this;

      if (!attributes || attributes.length < 1) return;
      attributes.forEach(function (attr) {
        _this.addAttribute(attr);
      });
    }
  }, {
    key: "addAttribute",
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
        _this2.invalidBus.trigger({
          source: _this2
        });
      });
    }
  }, {
    key: "onInvalidated",
    value: function onInvalidated(handleInvalidate) {
      this.invalidBus.onEvent(handleInvalidate);
    }
  }, {
    key: "getAttributes",
    value: function getAttributes() {
      return this.attributes.slice(0);
    }
  }, {
    key: "getAt",
    value: function getAt(propertyName) {
      return this.findAttributeByPropertyName(propertyName);
    }
  }, {
    key: "findAllAttributesByPropertyName",
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
    key: "findAttributeByPropertyName",
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
    key: "findAttributeByQualifier",
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
    key: "findAttributeById",
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
    key: "syncWith",
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


// CONCATENATED MODULE: ./src/remoting/clientConnector.js
function clientConnector_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clientConnector_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function clientConnector_createClass(Constructor, protoProps, staticProps) { if (protoProps) clientConnector_defineProperties(Constructor.prototype, protoProps); if (staticProps) clientConnector_defineProperties(Constructor, staticProps); return Constructor; }






var clientConnector_ClientConnector = function () {
  function ClientConnector(transmitter, clientDolphin) {
    var slackMS = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
    var maxBatchSize = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 50;

    clientConnector_classCallCheck(this, ClientConnector);

    this.commandQueue = [];
    this.currentlySending = false;
    this.pushEnabled = false;
    this.waiting = false;
    this.transmitter = transmitter;
    this.clientDolphin = clientDolphin;
    this.slackMS = slackMS;
    this.codec = new codec_Codec();
    this.commandBatcher = new commandBatcher_BlindCommandBatcher(true, maxBatchSize);
  }

  clientConnector_createClass(ClientConnector, [{
    key: "setCommandBatcher",
    value: function setCommandBatcher(newBatcher) {
      this.commandBatcher = newBatcher;
    }
  }, {
    key: "setPushEnabled",
    value: function setPushEnabled(enabled) {
      this.pushEnabled = enabled;
    }
  }, {
    key: "setPushListener",
    value: function setPushListener(newListener) {
      this.pushListener = newListener;
    }
  }, {
    key: "setReleaseCommand",
    value: function setReleaseCommand(newCommand) {
      this.releaseCommand = newCommand;
    }
  }, {
    key: "send",
    value: function send(command, onFinished) {
      this.commandQueue.push({
        command: command,
        handler: onFinished
      });

      if (this.currentlySending) {
        this.release();
        return;
      }

      this.doSendNext();
    }
  }, {
    key: "doSendNext",
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
        }, function (error) {
          callback.onError(error);
        });
      } else {
        setTimeout(function () {
          return _this.doSendNext();
        }, this.slackMS);
      }
    }
  }, {
    key: "handle",
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
    key: "handleDeletePresentationModelCommand",
    value: function handleDeletePresentationModelCommand(serverCommand) {
      var model = this.clientDolphin.findPresentationModelById(serverCommand.pmId);
      if (!model) return null;
      this.clientDolphin.getClientModelStore().deletePresentationModel(model, true);
      return model;
    }
  }, {
    key: "handleCreatePresentationModelCommand",
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
      var clientPm = new clientPresentationModel_ClientPresentationModel(serverCommand.pmId, serverCommand.pmType);
      clientPm.addAttributes(attributes);

      if (serverCommand.clientSideOnly) {
        clientPm.clientSideOnly = true;
      }

      this.clientDolphin.getClientModelStore().add(clientPm, false);
      this.clientDolphin.updatePresentationModelQualifier(clientPm);
      return clientPm;
    }
  }, {
    key: "handleValueChangedCommand",
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
    key: "handleAttributeMetadataChangedCommand",
    value: function handleAttributeMetadataChangedCommand(serverCommand) {
      var clientAttribute = this.clientDolphin.getClientModelStore().findAttributeById(serverCommand.attributeId);
      if (!clientAttribute) return null;
      clientAttribute[serverCommand.metadataName] = serverCommand.value;
      return null;
    }
  }, {
    key: "listen",
    value: function listen() {
      if (!this.pushEnabled) return;
      if (this.waiting) return;

      if (!this.currentlySending) {
        this.doSendNext();
      }
    }
  }, {
    key: "enqueuePushCommand",
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
    key: "release",
    value: function release() {
      if (!this.waiting) return;
      this.waiting = false;
      this.transmitter.signal(this.releaseCommand);
    }
  }]);

  return ClientConnector;
}();


clientConnector_ClientConnector.LOGGER = loggerfactory_LoggerFactory.getLogger('ClientConnector');
// CONCATENATED MODULE: ./src/remoting/clientAttribute.js
function clientAttribute_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { clientAttribute_typeof = function _typeof(obj) { return typeof obj; }; } else { clientAttribute_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return clientAttribute_typeof(obj); }

function clientAttribute_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clientAttribute_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function clientAttribute_createClass(Constructor, protoProps, staticProps) { if (protoProps) clientAttribute_defineProperties(Constructor.prototype, protoProps); if (staticProps) clientAttribute_defineProperties(Constructor, staticProps); return Constructor; }




var clientAttribute_ClientAttribute = function () {
  function ClientAttribute(propertyName, qualifier, value) {
    clientAttribute_classCallCheck(this, ClientAttribute);

    this.propertyName = propertyName;
    this.id = "" + ClientAttribute.clientAttributeInstanceCount++ + "C";
    this.valueChangeBus = new EventBus();
    this.qualifierChangeBus = new EventBus();
    this.setValue(value);
    this.setQualifier(qualifier);
  }

  clientAttribute_createClass(ClientAttribute, [{
    key: "copy",
    value: function copy() {
      var result = new ClientAttribute(this.propertyName, this.getQualifier(), this.getValue());
      return result;
    }
  }, {
    key: "setPresentationModel",
    value: function setPresentationModel(presentationModel) {
      if (this.presentationModel) {
        throw new Error("You can not set a presentation model for an attribute that is already bound.");
      }

      this.presentationModel = presentationModel;
    }
  }, {
    key: "getPresentationModel",
    value: function getPresentationModel() {
      return this.presentationModel;
    }
  }, {
    key: "getValue",
    value: function getValue() {
      return this.value;
    }
  }, {
    key: "setValueFromServer",
    value: function setValueFromServer(newValue) {
      var verifiedValue = ClientAttribute.checkValue(newValue);
      if (this.value === verifiedValue) return;
      var oldValue = this.value;
      this.value = verifiedValue;
      this.valueChangeBus.trigger({
        'oldValue': oldValue,
        'newValue': verifiedValue,
        'sendToServer': false
      });
    }
  }, {
    key: "setValue",
    value: function setValue(newValue) {
      var verifiedValue = ClientAttribute.checkValue(newValue);
      if (this.value === verifiedValue) return;
      var oldValue = this.value;
      this.value = verifiedValue;
      this.valueChangeBus.trigger({
        'oldValue': oldValue,
        'newValue': verifiedValue,
        'sendToServer': true
      });
    }
  }, {
    key: "setQualifier",
    value: function setQualifier(newQualifier) {
      if (this.qualifier === newQualifier) return;
      var oldQualifier = this.qualifier;
      this.qualifier = newQualifier;
      this.qualifierChangeBus.trigger({
        'oldValue': oldQualifier,
        'newValue': newQualifier
      });
      this.valueChangeBus.trigger({
        "oldValue": this.value,
        "newValue": this.value,
        'sendToServer': false
      });
    }
  }, {
    key: "getQualifier",
    value: function getQualifier() {
      return this.qualifier;
    }
  }, {
    key: "onValueChange",
    value: function onValueChange(eventHandler) {
      this.valueChangeBus.onEvent(eventHandler);
      eventHandler({
        "oldValue": this.value,
        "newValue": this.value,
        'sendToServer': false
      });
    }
  }, {
    key: "onQualifierChange",
    value: function onQualifierChange(eventHandler) {
      this.qualifierChangeBus.onEvent(eventHandler);
    }
  }, {
    key: "syncWith",
    value: function syncWith(sourceAttribute) {
      if (sourceAttribute) {
        this.setQualifier(sourceAttribute.getQualifier());
        this.setValue(sourceAttribute.value);
      }
    }
  }], [{
    key: "checkValue",
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

      if (this.SUPPORTED_VALUE_TYPES.indexOf(clientAttribute_typeof(result)) > -1 || result instanceof Date) {
        ok = true;
      }

      if (!ok) {
        throw new Error("Attribute values of this type are not allowed: " + clientAttribute_typeof(value));
      }

      return result;
    }
  }]);

  return ClientAttribute;
}();


clientAttribute_ClientAttribute.LOGGER = loggerfactory_LoggerFactory.getLogger('ClientAttribute');
clientAttribute_ClientAttribute.SUPPORTED_VALUE_TYPES = ["string", "number", "boolean"];
clientAttribute_ClientAttribute.clientAttributeInstanceCount = 0;
// CONCATENATED MODULE: ./src/remoting/clientDolphin.js
function clientDolphin_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clientDolphin_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function clientDolphin_createClass(Constructor, protoProps, staticProps) { if (protoProps) clientDolphin_defineProperties(Constructor.prototype, protoProps); if (staticProps) clientDolphin_defineProperties(Constructor, staticProps); return Constructor; }




var clientDolphin_ClientDolphin = function () {
  function ClientDolphin() {
    clientDolphin_classCallCheck(this, ClientDolphin);
  }

  clientDolphin_createClass(ClientDolphin, [{
    key: "setClientConnector",
    value: function setClientConnector(clientConnector) {
      this.clientConnector = clientConnector;
    }
  }, {
    key: "getClientConnector",
    value: function getClientConnector() {
      return this.clientConnector;
    }
  }, {
    key: "send",
    value: function send(command, onFinished) {
      this.clientConnector.send(command, onFinished);
    }
  }, {
    key: "attribute",
    value: function attribute(propertyName, qualifier, value) {
      return new clientAttribute_ClientAttribute(propertyName, qualifier, value);
    }
  }, {
    key: "presentationModel",
    value: function presentationModel(id, type) {
      var model = new clientPresentationModel_ClientPresentationModel(id, type);

      for (var _len = arguments.length, attributes = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
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
    key: "setClientModelStore",
    value: function setClientModelStore(clientModelStore) {
      this.clientModelStore = clientModelStore;
    }
  }, {
    key: "getClientModelStore",
    value: function getClientModelStore() {
      return this.clientModelStore;
    }
  }, {
    key: "listPresentationModelIds",
    value: function listPresentationModelIds() {
      return this.getClientModelStore().listPresentationModelIds();
    }
  }, {
    key: "listPresentationModels",
    value: function listPresentationModels() {
      return this.getClientModelStore().listPresentationModels();
    }
  }, {
    key: "findAllPresentationModelByType",
    value: function findAllPresentationModelByType(presentationModelType) {
      return this.getClientModelStore().findAllPresentationModelByType(presentationModelType);
    }
  }, {
    key: "getAt",
    value: function getAt(id) {
      return this.findPresentationModelById(id);
    }
  }, {
    key: "findPresentationModelById",
    value: function findPresentationModelById(id) {
      return this.getClientModelStore().findPresentationModelById(id);
    }
  }, {
    key: "deletePresentationModel",
    value: function deletePresentationModel(modelToDelete) {
      this.getClientModelStore().deletePresentationModel(modelToDelete, true);
    }
  }, {
    key: "updatePresentationModelQualifier",
    value: function updatePresentationModelQualifier(presentationModel) {
      var _this = this;

      presentationModel.getAttributes().forEach(function (sourceAttribute) {
        _this.updateAttributeQualifier(sourceAttribute);
      });
    }
  }, {
    key: "updateAttributeQualifier",
    value: function updateAttributeQualifier(sourceAttribute) {
      if (!sourceAttribute.getQualifier()) return;
      var attributes = this.getClientModelStore().findAllAttributesByQualifier(sourceAttribute.getQualifier());
      attributes.forEach(function (targetAttribute) {
        targetAttribute.setValue(sourceAttribute.getValue());
      });
    }
  }, {
    key: "startPushListening",
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
    key: "stopPushListening",
    value: function stopPushListening() {
      this.clientConnector.setPushEnabled(false);
    }
  }]);

  return ClientDolphin;
}();


// CONCATENATED MODULE: ./src/remoting/attribute.js
function attribute_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Attribute = function Attribute() {
  attribute_classCallCheck(this, Attribute);
};


Attribute.QUALIFIER_PROPERTY = "qualifier";
Attribute.VALUE = "value";
// CONCATENATED MODULE: ./src/remoting/commands/commandFactory.js
function commandFactory_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function commandFactory_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function commandFactory_createClass(Constructor, protoProps, staticProps) { if (protoProps) commandFactory_defineProperties(Constructor.prototype, protoProps); if (staticProps) commandFactory_defineProperties(Constructor, staticProps); return Constructor; }















var commandFactory_CommandFactory = function () {
  function CommandFactory() {
    commandFactory_classCallCheck(this, CommandFactory);
  }

  commandFactory_createClass(CommandFactory, null, [{
    key: "createCreateContextCommand",
    value: function createCreateContextCommand() {
      return new createContextCommand_CreateContextCommand();
    }
  }, {
    key: "createCreateControllerCommand",
    value: function createCreateControllerCommand(controllerName, parentControllerId) {
      var command = new createControllerCommand_CreateControllerCommand();
      command.init(controllerName, parentControllerId);
      return command;
    }
  }, {
    key: "createCallActionCommand",
    value: function createCallActionCommand(controllerid, actionName, params) {
      var command = new callActionCommand_CallActionCommand();
      command.init(controllerid, actionName, params);
      return command;
    }
  }, {
    key: "createDestroyControllerCommand",
    value: function createDestroyControllerCommand(controllerId) {
      var command = new destroyControllerCommand_DestroyControllerCommand();
      command.init(controllerId);
      return command;
    }
  }, {
    key: "createDestroyContextCommand",
    value: function createDestroyContextCommand() {
      return new destroyContextCommand_DestroyContextCommand();
    }
  }, {
    key: "createStartLongPollCommand",
    value: function createStartLongPollCommand() {
      return new startLongPollCommand_StartLongPollCommand();
    }
  }, {
    key: "createInterruptLongPollCommand",
    value: function createInterruptLongPollCommand() {
      return new interruptLongPollCommand_InterruptLongPollCommand();
    }
  }, {
    key: "createCreatePresentationModelCommand",
    value: function createCreatePresentationModelCommand(presentationModel) {
      var command = new createPresentationModelCommand_CreatePresentationModelCommand();
      command.init(presentationModel);
      return command;
    }
  }, {
    key: "createDeletePresentationModelCommand",
    value: function createDeletePresentationModelCommand(pmId) {
      var command = new deletePresentationModelCommand_DeletePresentationModelCommand();
      command.init(pmId);
      return command;
    }
  }, {
    key: "createPresentationModelDeletedCommand",
    value: function createPresentationModelDeletedCommand(pmId) {
      var command = new presentationModelDeletedCommand_PresentationModelDeletedCommand();
      command.init(pmId);
      return command;
    }
  }, {
    key: "createValueChangedCommand",
    value: function createValueChangedCommand(attributeId, newValue) {
      var command = new valueChangedCommand_ValueChangedCommand();
      command.init(attributeId, newValue);
      return command;
    }
  }, {
    key: "createChangeAttributeMetadataCommand",
    value: function createChangeAttributeMetadataCommand(attributeId, metadataName, value) {
      var command = new changeAttributeMetadataCommand_ChangeAttributeMetadataCommand();
      command.init(attributeId, metadataName, value);
      return command;
    }
  }, {
    key: "createAttributeMetadataChangedCommand",
    value: function createAttributeMetadataChangedCommand(attributeId, metadataName, value) {
      var command = new attributeMetadataChangedCommand_AttributeMetadataChangedCommand();
      command.init(attributeId, metadataName, value);
      return command;
    }
  }]);

  return CommandFactory;
}();


// CONCATENATED MODULE: ./src/remoting/clientModelStore.js
function clientModelStore_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clientModelStore_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function clientModelStore_createClass(Constructor, protoProps, staticProps) { if (protoProps) clientModelStore_defineProperties(Constructor.prototype, protoProps); if (staticProps) clientModelStore_defineProperties(Constructor, staticProps); return Constructor; }







var clientModelStore_ClientModelStore = function () {
  function ClientModelStore(clientDolphin) {
    clientModelStore_classCallCheck(this, ClientModelStore);

    this.clientDolphin = clientDolphin;
    this.presentationModels = new Map();
    this.presentationModelsPerType = new Map();
    this.attributesPerId = new Map();
    this.attributesPerQualifier = new Map();
    this.modelStoreChangeBus = new EventBus();
  }

  clientModelStore_createClass(ClientModelStore, [{
    key: "getClientDolphin",
    value: function getClientDolphin() {
      return this.clientDolphin;
    }
  }, {
    key: "registerAttribute",
    value: function registerAttribute(attribute) {
      var _this = this;

      this.addAttributeById(attribute);

      if (attribute.getQualifier()) {
        this.addAttributeByQualifier(attribute);
      }

      attribute.onValueChange(function (evt) {
        if (evt.newValue !== evt.oldValue && evt.sendToServer === true) {
          var command = commandFactory_CommandFactory.createValueChangedCommand(attribute.id, evt.newValue);

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
        _this.clientDolphin.getClientConnector().send(commandFactory_CommandFactory.createChangeAttributeMetadataCommand(attribute.id, Attribute.QUALIFIER_PROPERTY, evt.newValue), null);
      });
    }
  }, {
    key: "add",
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
          connector.send(commandFactory_CommandFactory.createCreatePresentationModelCommand(model), null);
        }

        model.getAttributes().forEach(function (attribute) {
          _this2.registerAttribute(attribute);
        });
        this.modelStoreChangeBus.trigger({
          'eventType': ADDED_TYPE,
          'clientPresentationModel': model
        });
        added = true;
      }

      return added;
    }
  }, {
    key: "remove",
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
        this.modelStoreChangeBus.trigger({
          'eventType': REMOVED_TYPE,
          'clientPresentationModel': model
        });
        removed = true;
      }

      return removed;
    }
  }, {
    key: "findAttributesByFilter",
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
    key: "addPresentationModelByType",
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
    key: "removePresentationModelByType",
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
    key: "listPresentationModelIds",
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
    key: "listPresentationModels",
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
    key: "findPresentationModelById",
    value: function findPresentationModelById(id) {
      return this.presentationModels.get(id);
    }
  }, {
    key: "findAllPresentationModelByType",
    value: function findAllPresentationModelByType(type) {
      if (!type || !this.presentationModelsPerType.has(type)) {
        return [];
      }

      return this.presentationModelsPerType.get(type).slice(0);
    }
  }, {
    key: "deletePresentationModel",
    value: function deletePresentationModel(model, notify) {
      if (!model) {
        return;
      }

      if (this.containsPresentationModel(model.id)) {
        this.remove(model);

        if (!notify || model.clientSideOnly) {
          return;
        }

        this.clientDolphin.getClientConnector().send(commandFactory_CommandFactory.createPresentationModelDeletedCommand(model.id), null);
      }
    }
  }, {
    key: "containsPresentationModel",
    value: function containsPresentationModel(id) {
      return this.presentationModels.has(id);
    }
  }, {
    key: "addAttributeById",
    value: function addAttributeById(attribute) {
      if (!attribute || this.attributesPerId.has(attribute.id)) {
        return;
      }

      this.attributesPerId.set(attribute.id, attribute);
    }
  }, {
    key: "removeAttributeById",
    value: function removeAttributeById(attribute) {
      if (!attribute || !this.attributesPerId.has(attribute.id)) {
        return;
      }

      this.attributesPerId.delete(attribute.id);
    }
  }, {
    key: "findAttributeById",
    value: function findAttributeById(id) {
      return this.attributesPerId.get(id);
    }
  }, {
    key: "addAttributeByQualifier",
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
    key: "removeAttributeByQualifier",
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
    key: "findAllAttributesByQualifier",
    value: function findAllAttributesByQualifier(qualifier) {
      if (!qualifier || !this.attributesPerQualifier.has(qualifier)) {
        return [];
      }

      return this.attributesPerQualifier.get(qualifier).slice(0);
    }
  }, {
    key: "onModelStoreChange",
    value: function onModelStoreChange(eventHandler) {
      this.modelStoreChangeBus.onEvent(eventHandler);
    }
  }, {
    key: "onModelStoreChangeForType",
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


clientModelStore_ClientModelStore.LOGGER = loggerfactory_LoggerFactory.getLogger('ClientModelStore');
// CONCATENATED MODULE: ./src/remoting/noTransmitter.js
function noTransmitter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function noTransmitter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function noTransmitter_createClass(Constructor, protoProps, staticProps) { if (protoProps) noTransmitter_defineProperties(Constructor.prototype, protoProps); if (staticProps) noTransmitter_defineProperties(Constructor, staticProps); return Constructor; }

var NoTransmitter = function () {
  function NoTransmitter() {
    noTransmitter_classCallCheck(this, NoTransmitter);
  }

  noTransmitter_createClass(NoTransmitter, [{
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


// CONCATENATED MODULE: ./src/remoting/dolphinBuilder.js
function dolphinBuilder_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function dolphinBuilder_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function dolphinBuilder_createClass(Constructor, protoProps, staticProps) { if (protoProps) dolphinBuilder_defineProperties(Constructor.prototype, protoProps); if (staticProps) dolphinBuilder_defineProperties(Constructor, staticProps); return Constructor; }







var dolphinBuilder_DolphinBuilder = function () {
  function DolphinBuilder() {
    dolphinBuilder_classCallCheck(this, DolphinBuilder);

    this.slackMS = 300;
    this.maxBatchSize = 50;
    this.transmitter = null;
  }

  dolphinBuilder_createClass(DolphinBuilder, [{
    key: "withSlackMS",
    value: function withSlackMS(slackMS) {
      this.slackMS = slackMS;
      return this;
    }
  }, {
    key: "withMaxBatchSize",
    value: function withMaxBatchSize(maxBatchSize) {
      this.maxBatchSize = maxBatchSize;
      return this;
    }
  }, {
    key: "withTransmitter",
    value: function withTransmitter(transmitter) {
      this.transmitter = transmitter;
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      var clientDolphin = new clientDolphin_ClientDolphin();
      var transmitter;

      if (this.transmitter) {
        transmitter = this.transmitter;
      } else {
        transmitter = new NoTransmitter();
      }

      clientDolphin.setClientConnector(new clientConnector_ClientConnector(transmitter, clientDolphin, this.slackMS, this.maxBatchSize));
      clientDolphin.setClientModelStore(new clientModelStore_ClientModelStore(clientDolphin));
      DolphinBuilder.LOGGER.debug("Remoting client initialized", clientDolphin, transmitter);
      return clientDolphin;
    }
  }]);

  return DolphinBuilder;
}();

dolphinBuilder_DolphinBuilder.LOGGER = loggerfactory_LoggerFactory.getLogger('DolphinBuilder');
var dolphinBuilder = new dolphinBuilder_DolphinBuilder();

// CONCATENATED MODULE: ./src/remoting/connector.js
function connector_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function connector_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function connector_createClass(Constructor, protoProps, staticProps) { if (protoProps) connector_defineProperties(Constructor.prototype, protoProps); if (staticProps) connector_defineProperties(Constructor, staticProps); return Constructor; }




var DOLPHIN_BEAN = '@@@ R_BEAN @@@';
var ACTION_CALL_BEAN = '@@@ CONTROLLER_ACTION_CALL_BEAN @@@';
var HIGHLANDER_BEAN = '@@@ HIGHLANDER_BEAN @@@';
var DOLPHIN_LIST_SPLICE = '@R:LS@';
var SOURCE_SYSTEM = '@@@ SOURCE_SYSTEM @@@';
var SOURCE_SYSTEM_CLIENT = 'client';
var SOURCE_SYSTEM_SERVER = 'server';

var connector_Connector = function () {
  function Connector(url, dolphin, classRepository, config) {
    connector_classCallCheck(this, Connector);

    checkMethod('Connector(url, dolphin, classRepository, config)');
    checkParam(url, 'url');
    checkParam(dolphin, 'dolphin');
    checkParam(classRepository, 'classRepository');
    var self = this;
    this.dolphin = dolphin;
    this.config = config;
    this.classRepository = classRepository;

    this.highlanderPMResolver = function () {};

    this.highlanderPMPromise = new Promise(function (resolve) {
      self.highlanderPMResolver = resolve;
    });
    dolphin.getClientModelStore().onModelStoreChange(function (event) {
      var model = event.clientPresentationModel;
      var sourceSystem = model.findAttributeByPropertyName(SOURCE_SYSTEM);

      if (exists(sourceSystem) && sourceSystem.value === SOURCE_SYSTEM_SERVER) {
        if (event.eventType === ADDED_TYPE) {
          self.onModelAdded(model);
        } else if (event.eventType === REMOVED_TYPE) {
          self.onModelRemoved(model);
        }
      }
    });
  }

  connector_createClass(Connector, [{
    key: "connect",
    value: function connect() {
      var that = this;
      that.dolphin.startPushListening(commandFactory_CommandFactory.createStartLongPollCommand(), commandFactory_CommandFactory.createInterruptLongPollCommand());
    }
  }, {
    key: "onModelAdded",
    value: function onModelAdded(model) {
      checkMethod('Connector.onModelAdded(model)');
      checkParam(model, 'model');
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
    key: "onModelRemoved",
    value: function onModelRemoved(model) {
      checkMethod('Connector.onModelRemoved(model)');
      checkParam(model, 'model');
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
    key: "invoke",
    value: function invoke(command) {
      checkMethod('Connector.invoke(command)');
      checkParam(command, 'command');
      var dolphin = this.dolphin;
      return new Promise(function (resolve, reject) {
        dolphin.send(command, {
          onFinished: function onFinished(params) {
            resolve(params);
          },
          onError: function onError(reason) {
            reject(reason);
          }
        });
      });
    }
  }, {
    key: "getHighlanderPM",
    value: function getHighlanderPM() {
      return this.highlanderPMPromise;
    }
  }]);

  return Connector;
}();



// CONCATENATED MODULE: ./src/remoting/beanManager.js
function beanManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function beanManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function beanManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) beanManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) beanManager_defineProperties(Constructor, staticProps); return Constructor; }




var beanManager_BeanManager = function () {
  function BeanManager(classRepository) {
    beanManager_classCallCheck(this, BeanManager);

    checkMethod('BeanManager(classRepository)');
    checkParam(classRepository, 'classRepository');
    this.classRepository = classRepository;
    this.addedHandlers = new Map();
    this.removedHandlers = new Map();
    this.updatedHandlers = new Map();
    this.arrayUpdatedHandlers = new Map();
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

  beanManager_createClass(BeanManager, [{
    key: "_handleBeanAdded",
    value: function _handleBeanAdded(type, bean) {
      var handlerList = this.addedHandlers.get(type);

      if (exists(handlerList)) {
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
    key: "_handleBeanRemoved",
    value: function _handleBeanRemoved(type, bean) {
      var handlerList = this.removedHandlers.get(type);

      if (exists(handlerList)) {
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
    key: "_handleArrayUpdate",
    value: function _handleArrayUpdate(type, bean, propertyName, index, count, newElements) {
      var handlerList = this.arrayUpdatedHandlers.get(type);

      if (exists(handlerList)) {
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
    key: "_handleBeanUpdate",
    value: function _handleBeanUpdate(type, bean, propertyName, newValue, oldValue) {
      var handlerList = this.updatedHandlers.get(type);

      if (exists(handlerList)) {
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
    key: "notifyBeanChange",
    value: function notifyBeanChange(bean, propertyName, newValue) {
      checkMethod('BeanManager.notifyBeanChange(bean, propertyName, newValue)');
      checkParam(bean, 'bean');
      checkParam(propertyName, 'propertyName');
      return this.classRepository.notifyBeanChange(bean, propertyName, newValue);
    }
  }, {
    key: "notifyArrayChange",
    value: function notifyArrayChange(bean, propertyName, index, count, removedElements) {
      checkMethod('BeanManager.notifyArrayChange(bean, propertyName, index, count, removedElements)');
      checkParam(bean, 'bean');
      checkParam(propertyName, 'propertyName');
      checkParam(index, 'index');
      checkParam(count, 'count');
      checkParam(removedElements, 'removedElements');
      this.classRepository.notifyArrayChange(bean, propertyName, index, count, removedElements);
    }
  }, {
    key: "isManaged",
    value: function isManaged(bean) {
      checkMethod('BeanManager.isManaged(bean)');
      checkParam(bean, 'bean');
      throw new Error("Not implemented yet");
    }
  }, {
    key: "create",
    value: function create(type) {
      checkMethod('BeanManager.create(type)');
      checkParam(type, 'type');
      throw new Error("Not implemented yet");
    }
  }, {
    key: "add",
    value: function add(type, bean) {
      checkMethod('BeanManager.add(type, bean)');
      checkParam(type, 'type');
      checkParam(bean, 'bean');
      throw new Error("Not implemented yet");
    }
  }, {
    key: "addAll",
    value: function addAll(type, collection) {
      checkMethod('BeanManager.addAll(type, collection)');
      checkParam(type, 'type');
      checkParam(collection, 'collection');
      throw new Error("Not implemented yet");
    }
  }, {
    key: "remove",
    value: function remove(bean) {
      checkMethod('BeanManager.remove(bean)');
      checkParam(bean, 'bean');
      throw new Error("Not implemented yet");
    }
  }, {
    key: "removeAll",
    value: function removeAll(collection) {
      checkMethod('BeanManager.removeAll(collection)');
      checkParam(collection, 'collection');
      throw new Error("Not implemented yet");
    }
  }, {
    key: "removeIf",
    value: function removeIf(predicate) {
      checkMethod('BeanManager.removeIf(predicate)');
      checkParam(predicate, 'predicate');
      throw new Error("Not implemented yet");
    }
  }, {
    key: "onAdded",
    value: function onAdded(type, eventHandler) {
      var self = this;

      if (!exists(eventHandler)) {
        eventHandler = type;
        checkMethod('BeanManager.onAdded(eventHandler)');
        checkParam(eventHandler, 'eventHandler');
        this.allAddedHandlers = this.allAddedHandlers.concat(eventHandler);
        return {
          unsubscribe: function unsubscribe() {
            self.allAddedHandlers = self.allAddedHandlers.filter(function (value) {
              return value !== eventHandler;
            });
          }
        };
      } else {
        checkMethod('BeanManager.onAdded(type, eventHandler)');
        checkParam(type, 'type');
        checkParam(eventHandler, 'eventHandler');
        var handlerList = this.addedHandlers.get(type);

        if (!exists(handlerList)) {
          handlerList = [];
        }

        this.addedHandlers.set(type, handlerList.concat(eventHandler));
        return {
          unsubscribe: function unsubscribe() {
            var handlerList = self.addedHandlers.get(type);

            if (exists(handlerList)) {
              self.addedHandlers.set(type, handlerList.filter(function (value) {
                return value !== eventHandler;
              }));
            }
          }
        };
      }
    }
  }, {
    key: "onRemoved",
    value: function onRemoved(type, eventHandler) {
      var self = this;

      if (!exists(eventHandler)) {
        eventHandler = type;
        checkMethod('BeanManager.onRemoved(eventHandler)');
        checkParam(eventHandler, 'eventHandler');
        this.allRemovedHandlers = this.allRemovedHandlers.concat(eventHandler);
        return {
          unsubscribe: function unsubscribe() {
            self.allRemovedHandlers = self.allRemovedHandlers.filter(function (value) {
              return value !== eventHandler;
            });
          }
        };
      } else {
        checkMethod('BeanManager.onRemoved(type, eventHandler)');
        checkParam(type, 'type');
        checkParam(eventHandler, 'eventHandler');
        var handlerList = this.removedHandlers.get(type);

        if (!exists(handlerList)) {
          handlerList = [];
        }

        this.removedHandlers.set(type, handlerList.concat(eventHandler));
        return {
          unsubscribe: function unsubscribe() {
            var handlerList = self.removedHandlers.get(type);

            if (exists(handlerList)) {
              self.removedHandlers.set(type, handlerList.filter(function (value) {
                return value !== eventHandler;
              }));
            }
          }
        };
      }
    }
  }, {
    key: "onBeanUpdate",
    value: function onBeanUpdate(type, eventHandler) {
      var self = this;

      if (!exists(eventHandler)) {
        eventHandler = type;
        checkMethod('BeanManager.onBeanUpdate(eventHandler)');
        checkParam(eventHandler, 'eventHandler');
        this.allUpdatedHandlers = this.allUpdatedHandlers.concat(eventHandler);
        return {
          unsubscribe: function unsubscribe() {
            self.allUpdatedHandlers = self.allUpdatedHandlers.filter(function (value) {
              return value !== eventHandler;
            });
          }
        };
      } else {
        checkMethod('BeanManager.onBeanUpdate(type, eventHandler)');
        checkParam(type, 'type');
        checkParam(eventHandler, 'eventHandler');
        var handlerList = this.updatedHandlers.get(type);

        if (!exists(handlerList)) {
          handlerList = [];
        }

        this.updatedHandlers.set(type, handlerList.concat(eventHandler));
        return {
          unsubscribe: function unsubscribe() {
            var handlerList = self.updatedHandlers.get(type);

            if (exists(handlerList)) {
              self.updatedHandlers.set(type, handlerList.filter(function (value) {
                return value !== eventHandler;
              }));
            }
          }
        };
      }
    }
  }, {
    key: "onArrayUpdate",
    value: function onArrayUpdate(type, eventHandler) {
      var self = this;

      if (!exists(eventHandler)) {
        eventHandler = type;
        checkMethod('BeanManager.onArrayUpdate(eventHandler)');
        checkParam(eventHandler, 'eventHandler');
        this.allArrayUpdatedHandlers = this.allArrayUpdatedHandlers.concat(eventHandler);
        return {
          unsubscribe: function unsubscribe() {
            self.allArrayUpdatedHandlers = self.allArrayUpdatedHandlers.filter(function (value) {
              return value !== eventHandler;
            });
          }
        };
      } else {
        checkMethod('BeanManager.onArrayUpdate(type, eventHandler)');
        checkParam(type, 'type');
        checkParam(eventHandler, 'eventHandler');
        var handlerList = this.arrayUpdatedHandlers.get(type);

        if (!exists(handlerList)) {
          handlerList = [];
        }

        this.arrayUpdatedHandlers.set(type, handlerList.concat(eventHandler));
        return {
          unsubscribe: function unsubscribe() {
            var handlerList = self.arrayUpdatedHandlers.get(type);

            if (exists(handlerList)) {
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


beanManager_BeanManager.LOGGER = loggerfactory_LoggerFactory.getLogger('BeanManager');
// CONCATENATED MODULE: ./src/remoting/classRepository.js
function classRepository_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { classRepository_typeof = function _typeof(obj) { return typeof obj; }; } else { classRepository_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return classRepository_typeof(obj); }

function classRepository_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function classRepository_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function classRepository_createClass(Constructor, protoProps, staticProps) { if (protoProps) classRepository_defineProperties(Constructor.prototype, protoProps); if (staticProps) classRepository_defineProperties(Constructor, staticProps); return Constructor; }





var classRepository_ClassRepository = function () {
  function ClassRepository(dolphin) {
    classRepository_classCallCheck(this, ClassRepository);

    checkMethod('ClassRepository(dolphin)');
    checkParam(dolphin, 'dolphin');
    this.dolphin = dolphin;
    this.classes = new Map();
    this.beanFromDolphin = new Map();
    this.beanToDolphin = new Map();
    this.classInfos = new Map();
    this.beanAddedHandlers = [];
    this.beanRemovedHandlers = [];
    this.propertyUpdateHandlers = [];
    this.arrayUpdateHandlers = [];
    this.blocked = null;
  }

  classRepository_createClass(ClassRepository, [{
    key: "sendListSplice",
    value: function sendListSplice(classRepository, modelId, propertyName, from, to, newElements) {
      var dolphin = classRepository.dolphin;
      var model = dolphin.findPresentationModelById(modelId);

      if (exists(model)) {
        var classInfo = classRepository.classes.get(model.presentationModelType);
        var type = classInfo[propertyName];

        if (exists(type)) {
          var attributes = [dolphin.attribute('@@@ SOURCE_SYSTEM @@@', null, 'client'), dolphin.attribute('source', null, modelId), dolphin.attribute('attribute', null, propertyName), dolphin.attribute('from', null, from), dolphin.attribute('to', null, to), dolphin.attribute('count', null, newElements.length)];
          newElements.forEach(function (element, index) {
            attributes.push(dolphin.attribute(index.toString(), null, ClassRepository.toDolphin(classRepository, type, element)));
          });
          dolphin.presentationModel.apply(dolphin, [null, '@DP:LS@'].concat(attributes));
        }
      }
    }
  }, {
    key: "validateList",
    value: function validateList(classRepository, type, bean, propertyName) {
      var list = bean[propertyName];

      if (!exists(list)) {
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
    key: "block",
    value: function block(bean, propertyName) {
      if (exists(this.blocked)) {
        throw new Error('Trying to create a block while another block exists');
      }

      this.blocked = {
        bean: bean,
        propertyName: propertyName
      };
    }
  }, {
    key: "isBlocked",
    value: function isBlocked(bean, propertyName) {
      return exists(this.blocked) && this.blocked.bean === bean && this.blocked.propertyName === propertyName;
    }
  }, {
    key: "unblock",
    value: function unblock() {
      this.blocked = null;
    }
  }, {
    key: "notifyBeanChange",
    value: function notifyBeanChange(bean, propertyName, newValue) {
      checkMethod('ClassRepository.notifyBeanChange(bean, propertyName, newValue)');
      checkParam(bean, 'bean');
      checkParam(propertyName, 'propertyName');
      var modelId = this.beanToDolphin.get(bean);

      if (exists(modelId)) {
        var model = this.dolphin.findPresentationModelById(modelId);

        if (exists(model)) {
          var classInfo = this.classes.get(model.presentationModelType);
          var type = classInfo[propertyName];
          var attribute = model.findAttributeByPropertyName(propertyName);

          if (exists(type) && exists(attribute)) {
            var oldValue = attribute.getValue();
            attribute.setValue(ClassRepository.toDolphin(this, type, newValue));
            return ClassRepository.fromDolphin(this, type, oldValue);
          }
        }
      }
    }
  }, {
    key: "notifyArrayChange",
    value: function notifyArrayChange(bean, propertyName, index, count, removedElements) {
      checkMethod('ClassRepository.notifyArrayChange(bean, propertyName, index, count, removedElements)');
      checkParam(bean, 'bean');
      checkParam(propertyName, 'propertyName');
      checkParam(index, 'index');
      checkParam(count, 'count');
      checkParam(removedElements, 'removedElements');

      if (this.isBlocked(bean, propertyName)) {
        return;
      }

      var modelId = this.beanToDolphin.get(bean);
      var array = bean[propertyName];

      if (exists(modelId) && exists(array)) {
        var removedElementsCount = Array.isArray(removedElements) ? removedElements.length : 0;
        this.sendListSplice(this, modelId, propertyName, index, index + removedElementsCount, array.slice(index, index + count));
      }
    }
  }, {
    key: "onBeanAdded",
    value: function onBeanAdded(handler) {
      checkMethod('ClassRepository.onBeanAdded(handler)');
      checkParam(handler, 'handler');
      this.beanAddedHandlers.push(handler);
    }
  }, {
    key: "onBeanRemoved",
    value: function onBeanRemoved(handler) {
      checkMethod('ClassRepository.onBeanRemoved(handler)');
      checkParam(handler, 'handler');
      this.beanRemovedHandlers.push(handler);
    }
  }, {
    key: "onBeanUpdate",
    value: function onBeanUpdate(handler) {
      checkMethod('ClassRepository.onBeanUpdate(handler)');
      checkParam(handler, 'handler');
      this.propertyUpdateHandlers.push(handler);
    }
  }, {
    key: "onArrayUpdate",
    value: function onArrayUpdate(handler) {
      checkMethod('ClassRepository.onArrayUpdate(handler)');
      checkParam(handler, 'handler');
      this.arrayUpdateHandlers.push(handler);
    }
  }, {
    key: "registerClass",
    value: function registerClass(model) {
      checkMethod('ClassRepository.registerClass(model)');
      checkParam(model, 'model');

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
    key: "unregisterClass",
    value: function unregisterClass(model) {
      checkMethod('ClassRepository.unregisterClass(model)');
      checkParam(model, 'model');
      this.classes['delete'](model.id);
    }
  }, {
    key: "load",
    value: function load(model) {
      checkMethod('ClassRepository.load(model)');
      checkParam(model, 'model');
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
    key: "unload",
    value: function unload(model) {
      checkMethod('ClassRepository.unload(model)');
      checkParam(model, 'model');
      var bean = this.beanFromDolphin.get(model.id);
      this.beanFromDolphin['delete'](model.id);
      this.beanToDolphin['delete'](bean);
      this.classInfos['delete'](model.id);

      if (exists(bean)) {
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
    key: "spliceListEntry",
    value: function spliceListEntry(model) {
      checkMethod('ClassRepository.spliceListEntry(model)');
      checkParam(model, 'model');
      var source = model.findAttributeByPropertyName('source');
      var attribute = model.findAttributeByPropertyName('attribute');
      var from = model.findAttributeByPropertyName('from');
      var to = model.findAttributeByPropertyName('to');
      var count = model.findAttributeByPropertyName('count');

      if (exists(source) && exists(attribute) && exists(from) && exists(to) && exists(count)) {
        var classInfo = this.classInfos.get(source.value);
        var bean = this.beanFromDolphin.get(source.value);

        if (exists(bean) && exists(classInfo)) {
          var type = model.presentationModelType;
          this.validateList(this, type, bean, attribute.value);
          var newElements = [],
              element = null;

          for (var i = 0; i < count.value; i++) {
            element = model.findAttributeByPropertyName(i.toString());

            if (!exists(element)) {
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
    key: "mapParamToDolphin",
    value: function mapParamToDolphin(param) {
      if (!exists(param)) {
        return param;
      }

      var type = classRepository_typeof(param);

      if (type === 'object') {
        if (param instanceof Date) {
          return param.toISOString();
        } else {
          var value = this.beanToDolphin.get(param);

          if (exists(value)) {
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
    key: "mapDolphinToBean",
    value: function mapDolphinToBean(value) {
      return ClassRepository.fromDolphin(this, REMOTING_BEAN, value);
    }
  }]);

  return ClassRepository;
}();

classRepository_ClassRepository.fixType = function (type, value) {
  switch (type) {
    case BYTE:
    case SHORT:
    case INT:
    case LONG:
      return parseInt(value);

    case FLOAT:
    case DOUBLE:
      return parseFloat(value);

    case BOOLEAN:
      return 'true' === String(value).toLowerCase();

    case STRING:
    case ENUM:
      return String(value);

    default:
      return value;
  }
};

classRepository_ClassRepository.fromDolphin = function (classRepository, type, value) {
  if (!exists(value)) {
    return null;
  }

  switch (type) {
    case REMOTING_BEAN:
      return classRepository.beanFromDolphin.get(String(value));

    case DATE:
      return new Date(String(value));

    case CALENDAR:
      return new Date(String(value));

    case LOCAL_DATE_FIELD_TYPE:
      return new Date(String(value));

    case LOCAL_DATE_TIME_FIELD_TYPE:
      return new Date(String(value));

    case ZONED_DATE_TIME_FIELD_TYPE:
      return new Date(String(value));

    default:
      return classRepository_ClassRepository.fixType(type, value);
  }
};

classRepository_ClassRepository.toDolphin = function (classRepository, type, value) {
  if (!exists(value)) {
    return null;
  }

  switch (type) {
    case REMOTING_BEAN:
      return classRepository.beanToDolphin.get(value);

    case DATE:
      return value instanceof Date ? value.toISOString() : value;

    case CALENDAR:
      return value instanceof Date ? value.toISOString() : value;

    case LOCAL_DATE_FIELD_TYPE:
      return value instanceof Date ? value.toISOString() : value;

    case LOCAL_DATE_TIME_FIELD_TYPE:
      return value instanceof Date ? value.toISOString() : value;

    case ZONED_DATE_TIME_FIELD_TYPE:
      return value instanceof Date ? value.toISOString() : value;

    default:
      return classRepository_ClassRepository.fixType(type, value);
  }
};

classRepository_ClassRepository.LOGGER = loggerfactory_LoggerFactory.getLogger('ClassRepository');
/* harmony default export */ var remoting_classRepository = (classRepository_ClassRepository);
// CONCATENATED MODULE: ./src/remoting/controllerProxy.js
function controllerProxy_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function controllerProxy_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function controllerProxy_createClass(Constructor, protoProps, staticProps) { if (protoProps) controllerProxy_defineProperties(Constructor.prototype, protoProps); if (staticProps) controllerProxy_defineProperties(Constructor, staticProps); return Constructor; }




var controllerProxy_ControllerProxy = function () {
  function ControllerProxy(controllerId, model, manager) {
    controllerProxy_classCallCheck(this, ControllerProxy);

    checkMethod('ControllerProxy(controllerId, model, manager)');
    checkParam(controllerId, 'controllerId');
    checkParam(model, 'model');
    checkParam(manager, 'manager');
    this.controllerId = controllerId;
    this.model = model;
    this.manager = manager;
    this.destroyed = false;
    this.onDestroyedHandlers = new Set();
  }

  controllerProxy_createClass(ControllerProxy, [{
    key: "getModel",
    value: function getModel() {
      return this.model;
    }
  }, {
    key: "getId",
    value: function getId() {
      return this.controllerId;
    }
  }, {
    key: "invoke",
    value: function invoke(name, params) {
      checkMethod('ControllerProxy.invoke(name, params)');
      checkParam(name, 'name');

      if (this.destroyed) {
        throw new Error('The controller was already destroyed');
      }

      return this.manager.invokeAction(this.controllerId, name, params);
    }
  }, {
    key: "createController",
    value: function createController(name) {
      return this.manager._createController(name, this.getId());
    }
  }, {
    key: "destroy",
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
    key: "onDestroyed",
    value: function onDestroyed(handler) {
      checkMethod('ControllerProxy.onDestroyed(handler)');
      checkParam(handler, 'handler');
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


controllerProxy_ControllerProxy.LOGGER = loggerfactory_LoggerFactory.getLogger('ControllerProxy');
// CONCATENATED MODULE: ./src/remoting/controllerManager.js
function controllerManager_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function controllerManager_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function controllerManager_createClass(Constructor, protoProps, staticProps) { if (protoProps) controllerManager_defineProperties(Constructor.prototype, protoProps); if (staticProps) controllerManager_defineProperties(Constructor, staticProps); return Constructor; }







var controllerManager_CONTROLLER_ID = 'controllerId';
var MODEL = 'model';
var ERROR_CODE = 'errorCode';

var controllerManager_ControllerManager = function () {
  function ControllerManager(dolphin, classRepository, connector) {
    controllerManager_classCallCheck(this, ControllerManager);

    checkMethod('ControllerManager(dolphin, classRepository, connector)');
    checkParam(dolphin, 'dolphin');
    checkParam(classRepository, 'classRepository');
    checkParam(connector, 'connector');
    this.dolphin = dolphin;
    this.classRepository = classRepository;
    this.connector = connector;
    this.controllers = new Set();
  }

  controllerManager_createClass(ControllerManager, [{
    key: "createController",
    value: function createController(name) {
      return this._createController(name, null);
    }
  }, {
    key: "_createController",
    value: function _createController(name, parentControllerId) {
      checkMethod('ControllerManager.createController(name)');
      checkParam(name, 'name');
      var self = this;
      return new Promise(function (resolve, reject) {
        self.connector.getHighlanderPM().then(function (highlanderPM) {
          var MSG_ERROR_CREATING_CONTROLLER = 'Error creating controller: ';
          self.connector.invoke(commandFactory_CommandFactory.createCreateControllerCommand(name, parentControllerId)).then(function () {
            var controllerId;
            self.getValueWithRetry(function () {
              return highlanderPM.findAttributeByPropertyName(controllerManager_CONTROLLER_ID).getValue();
            }, 'Could not get an controllerID from highlanderPM.').then(function (ctrlId) {
              controllerId = ctrlId;
              return self.getValueWithRetry(function () {
                return highlanderPM.findAttributeByPropertyName(MODEL).getValue();
              }, 'Could not get an modelID from highlanderPM.');
            }).then(function (modelId) {
              return self.getValueWithRetry(function () {
                return self.classRepository.mapDolphinToBean(modelId);
              }, 'Could not get an model from classRepository for ID: ' + modelId);
            }).then(function (model) {
              try {
                var controller = new controllerProxy_ControllerProxy(controllerId, model, self);
                self.controllers.add(controller);
                resolve(controller);
              } catch (e) {
                reject(MSG_ERROR_CREATING_CONTROLLER + e);
              }
            }).catch(function (error) {
              reject(MSG_ERROR_CREATING_CONTROLLER + error);
            });
          }).catch(function (error) {
            reject(MSG_ERROR_CREATING_CONTROLLER + error);
          });
        });
      });
    }
  }, {
    key: "getValueWithRetry",
    value: function getValueWithRetry(getValueCall, errorMessage) {
      return new Promise(function (resolve, reject) {
        var RETRIES = 1000;
        var RETRY_TIME = 5;
        var i = 0;
        var intervalID = setInterval(function () {
          var value = getValueCall();

          if (!(typeof value !== 'undefined' && value !== null)) {
            i++;

            if (i >= RETRIES) {
              clearInterval(intervalID);
              reject(errorMessage + " after " + i + " retries.");
            }
          } else {
            clearInterval(intervalID);
            resolve(value);
          }
        }, RETRY_TIME);
      });
    }
  }, {
    key: "invokeAction",
    value: function invokeAction(controllerId, actionName, params) {
      checkMethod('ControllerManager.invokeAction(controllerId, actionName, params)');
      checkParam(controllerId, 'controllerId');
      checkParam(actionName, 'actionName');
      var self = this;
      return new Promise(function (resolve, reject) {
        var attributes = [self.dolphin.attribute(SOURCE_SYSTEM, null, SOURCE_SYSTEM_CLIENT), self.dolphin.attribute(ERROR_CODE)];
        var pm = self.dolphin.presentationModel.apply(self.dolphin, [null, ACTION_CALL_BEAN].concat(attributes));
        var actionParams = [];

        if (exists(params)) {
          for (var param in params) {
            if (params.hasOwnProperty(param)) {
              var value = self.classRepository.mapParamToDolphin(params[param]);
              actionParams.push({
                name: param,
                value: value
              });
            }
          }
        }

        self.connector.invoke(commandFactory_CommandFactory.createCallActionCommand(controllerId, actionName, actionParams)).then(function () {
          var isError = pm.findAttributeByPropertyName(ERROR_CODE).getValue();

          if (isError) {
            reject(new Error("Server side ControllerAction " + actionName + " caused an error. Please see server log for details."));
          } else {
            resolve();
          }

          self.dolphin.deletePresentationModel(pm);
        }).catch(reject);
      });
    }
  }, {
    key: "destroyController",
    value: function destroyController(controller) {
      checkMethod('ControllerManager.destroyController(controller)');
      checkParam(controller, 'controller');
      var self = this;
      return new Promise(function (resolve, reject) {
        self.connector.getHighlanderPM().then(function (highlanderPM) {
          self.controllers.delete(controller);
          highlanderPM.findAttributeByPropertyName(controllerManager_CONTROLLER_ID).setValue(controller.controllerId);
          self.connector.invoke(commandFactory_CommandFactory.createDestroyControllerCommand(controller.getId())).then(resolve).catch(reject);
        });
      });
    }
  }, {
    key: "destroy",
    value: function destroy() {
      var controllersCopy = this.controllers;
      var promises = [];
      this.controllers = new Set();
      controllersCopy.forEach(function (controller) {
        try {
          promises.push(controller.destroy());
        } catch (e) {}
      });
      return Promise.all(promises);
    }
  }]);

  return ControllerManager;
}();


// EXTERNAL MODULE: ./node_modules/emitter-component/index.js
var emitter_component = __webpack_require__(0);
var emitter_component_default = /*#__PURE__*/__webpack_require__.n(emitter_component);

// CONCATENATED MODULE: ./src/remoting/clientContext.js
function clientContext_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clientContext_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function clientContext_createClass(Constructor, protoProps, staticProps) { if (protoProps) clientContext_defineProperties(Constructor.prototype, protoProps); if (staticProps) clientContext_defineProperties(Constructor, staticProps); return Constructor; }





var clientContext_ClientContext = function () {
  function ClientContext(dolphin, beanManager, controllerManager, connector) {
    clientContext_classCallCheck(this, ClientContext);

    checkMethod('ClientContext(dolphin, beanManager, controllerManager, connector)');
    checkParam(dolphin, 'dolphin');
    checkParam(beanManager, 'beanManager');
    checkParam(controllerManager, 'controllerManager');
    checkParam(connector, 'connector');
    this.dolphin = dolphin;
    this.beanManager = beanManager;
    this._controllerManager = controllerManager;
    this._connector = connector;
    this.connectionPromise = null;
    this.isConnected = false;
  }

  clientContext_createClass(ClientContext, [{
    key: "connect",
    value: function connect() {
      var self = this;
      this.connectionPromise = new Promise(function (resolve, reject) {
        self._connector.connect();

        self._connector.invoke(commandFactory_CommandFactory.createCreateContextCommand()).then(function () {
          self.isConnected = true;
          resolve();
        }).catch(reject);
      });
      return this.connectionPromise;
    }
  }, {
    key: "onConnect",
    value: function onConnect() {
      if (exists(this.connectionPromise)) {
        if (!this.isConnected) {
          return this.connectionPromise;
        } else {
          return new Promise(function (resolve) {
            resolve();
          });
        }
      } else {
        return this.connect();
      }
    }
  }, {
    key: "createController",
    value: function createController(name) {
      checkMethod('ClientContext.createController(name)');
      checkParam(name, 'name');
      return this._controllerManager.createController(name);
    }
  }, {
    key: "disconnect",
    value: function disconnect() {
      var self = this;
      this.dolphin.stopPushListening();
      return new Promise(function (resolve) {
        self._controllerManager.destroy().then(function () {
          self._connector.invoke(commandFactory_CommandFactory.createDestroyContextCommand());

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


emitter_component_default()(clientContext_ClientContext.prototype);
// CONCATENATED MODULE: ./src/remoting/errors.js
function errors_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { errors_typeof = function _typeof(obj) { return typeof obj; }; } else { errors_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return errors_typeof(obj); }

function errors_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function errors_possibleConstructorReturn(self, call) { if (call && (errors_typeof(call) === "object" || typeof call === "function")) { return call; } return errors_assertThisInitialized(self); }

function errors_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function errors_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) errors_setPrototypeOf(subClass, superClass); }

function errors_wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; errors_wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !errors_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return errors_construct(Class, arguments, errors_getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return errors_setPrototypeOf(Wrapper, Class); }; return errors_wrapNativeSuper(Class); }

function errors_isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function errors_construct(Parent, args, Class) { if (errors_isNativeReflectConstruct()) { errors_construct = Reflect.construct; } else { errors_construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) errors_setPrototypeOf(instance, Class.prototype); return instance; }; } return errors_construct.apply(null, arguments); }

function errors_isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function errors_setPrototypeOf(o, p) { errors_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return errors_setPrototypeOf(o, p); }

function errors_getPrototypeOf(o) { errors_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return errors_getPrototypeOf(o); }

var DolphinRemotingError = function (_Error) {
  errors_inherits(DolphinRemotingError, _Error);

  function DolphinRemotingError() {
    var _this;

    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Remoting Error';
    var detail = arguments.length > 1 ? arguments[1] : undefined;

    errors_classCallCheck(this, DolphinRemotingError);

    _this = errors_possibleConstructorReturn(this, errors_getPrototypeOf(DolphinRemotingError).call(this, message));
    _this.detail = detail || undefined;
    return _this;
  }

  return DolphinRemotingError;
}(errors_wrapNativeSuper(Error));
var DolphinSessionError = function (_Error2) {
  errors_inherits(DolphinSessionError, _Error2);

  function DolphinSessionError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Session Error';

    errors_classCallCheck(this, DolphinSessionError);

    return errors_possibleConstructorReturn(this, errors_getPrototypeOf(DolphinSessionError).call(this, message));
  }

  return DolphinSessionError;
}(errors_wrapNativeSuper(Error));
var HttpResponseError = function (_Error3) {
  errors_inherits(HttpResponseError, _Error3);

  function HttpResponseError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Http Response Error';

    errors_classCallCheck(this, HttpResponseError);

    return errors_possibleConstructorReturn(this, errors_getPrototypeOf(HttpResponseError).call(this, message));
  }

  return HttpResponseError;
}(errors_wrapNativeSuper(Error));
var HttpNetworkError = function (_Error4) {
  errors_inherits(HttpNetworkError, _Error4);

  function HttpNetworkError() {
    var message = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'Http Network Error';

    errors_classCallCheck(this, HttpNetworkError);

    return errors_possibleConstructorReturn(this, errors_getPrototypeOf(HttpNetworkError).call(this, message));
  }

  return HttpNetworkError;
}(errors_wrapNativeSuper(Error));
// CONCATENATED MODULE: ./src/remoting/remotingErrorHandler.js
function remotingErrorHandler_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function remotingErrorHandler_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function remotingErrorHandler_createClass(Constructor, protoProps, staticProps) { if (protoProps) remotingErrorHandler_defineProperties(Constructor.prototype, protoProps); if (staticProps) remotingErrorHandler_defineProperties(Constructor, staticProps); return Constructor; }



var RemotingErrorHandler = function () {
  function RemotingErrorHandler() {
    remotingErrorHandler_classCallCheck(this, RemotingErrorHandler);
  }

  remotingErrorHandler_createClass(RemotingErrorHandler, [{
    key: "onError",
    value: function onError(error) {
      RemotingErrorHandler.LOGGER.error(error);
    }
  }]);

  return RemotingErrorHandler;
}();


RemotingErrorHandler.LOGGER = loggerfactory_LoggerFactory.getLogger('RemotingErrorHandler');
// CONCATENATED MODULE: ./src/remoting/platformHttpTransmitter.js
function platformHttpTransmitter_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function platformHttpTransmitter_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function platformHttpTransmitter_createClass(Constructor, protoProps, staticProps) { if (protoProps) platformHttpTransmitter_defineProperties(Constructor.prototype, protoProps); if (staticProps) platformHttpTransmitter_defineProperties(Constructor, staticProps); return Constructor; }








var DOLPHIN_SESSION_TIMEOUT = 408;

var platformHttpTransmitter_PlatformHttpTransmitter = function () {
  function PlatformHttpTransmitter(url, config, client) {
    platformHttpTransmitter_classCallCheck(this, PlatformHttpTransmitter);

    this.url = url;
    this.config = config;
    this.client = client;
    this.headersInfo = exists(config) ? config.headersInfo : null;
    this.failed_attempt = 0;

    var connectionConfig = this._connectionConfig();

    this.maxRetry = exists(connectionConfig) && exists(connectionConfig.maxRetry) ? connectionConfig.maxRetry : 3;
    this.timeout = exists(connectionConfig) && exists(connectionConfig.timeout) ? connectionConfig.timeout : 5000;
  }

  platformHttpTransmitter_createClass(PlatformHttpTransmitter, [{
    key: "_connectionConfig",
    value: function _connectionConfig() {
      return exists(this.config) ? this.config.connection : null;
    }
  }, {
    key: "_handleError",
    value: function _handleError(reject, error) {
      var connectionConfig = this._connectionConfig();

      var errorHandlers = exists(connectionConfig) && exists(connectionConfig.errorHandlers) ? connectionConfig.errorHandlers : [new RemotingErrorHandler()];
      errorHandlers.forEach(function (handler) {
        handler.onError(error);
      });
      reject(error);
    }
  }, {
    key: "_send",
    value: function _send(commands) {
      var _this = this;

      var self = this;
      return new Promise(function (resolve, reject) {
        if (_this.client) {
          var encodedCommands = codec_Codec.encode(commands);

          if (PlatformHttpTransmitter.LOGGER.isLogLevelUseable(LogLevel.DEBUG) && !PlatformHttpTransmitter.LOGGER.isLogLevelUseable(LogLevel.TRACE)) {
            for (var i = 0; i < commands.length; i++) {
              var command = commands[i];

              if (command.id === VALUE_CHANGED_COMMAND_ID) {
                PlatformHttpTransmitter.LOGGER.debug('send', command, encodedCommands);
              }
            }
          }

          var useWorker = commands.length === 1 && commands[0].id === START_LONG_POLL_COMMAND_ID;

          var httpClient = _this.client.getService('HttpClient');

          if (httpClient && self.failed_attempt <= self.maxRetry) {
            httpClient.post(self.url).withHeadersInfo(_this.headersInfo).withContent(encodedCommands).readString().execute(useWorker).then(function (response) {
              resolve(response.content);
            }).catch(function (exception) {
              var status = exception.getStatus();
              self.failed_attempt += 1;

              if (status === DOLPHIN_SESSION_TIMEOUT) {
                self._handleError(reject, new DolphinSessionError('PlatformHttpTransmitter: Session Timeout'));
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
    key: "transmit",
    value: function transmit(commands, onDone, onError) {
      var _this2 = this;

      this._send(commands).then(function (responseText) {
        if (responseText.trim().length > 0) {
          try {
            var responseCommands = codec_Codec.decode(responseText);
            onDone(responseCommands);
          } catch (err) {
            var errorMsg = 'PlatformHttpTransmitter: Parse error: (Incorrect response = ' + responseText + ')';

            _this2.emit('error', new DolphinRemotingError(errorMsg));

            onError(errorMsg);
          }
        } else {
          var _errorMsg = 'PlatformHttpTransmitter: Empty response';

          _this2.emit('error', new DolphinRemotingError(_errorMsg));

          onError(_errorMsg);
        }
      }).catch(function (error) {
        _this2.emit('error', error);

        onError(error);
      });
    }
  }, {
    key: "signal",
    value: function signal(command) {
      var _this3 = this;

      this._send([command]).catch(function (error) {
        return _this3.emit('error', error);
      });
    }
  }]);

  return PlatformHttpTransmitter;
}();


platformHttpTransmitter_PlatformHttpTransmitter.LOGGER = loggerfactory_LoggerFactory.getLogger('PlatformHttpTransmitter');
emitter_component_default()(platformHttpTransmitter_PlatformHttpTransmitter.prototype);
// CONCATENATED MODULE: ./src/remoting/clientContextFactory.js
function clientContextFactory_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function clientContextFactory_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function clientContextFactory_createClass(Constructor, protoProps, staticProps) { if (protoProps) clientContextFactory_defineProperties(Constructor.prototype, protoProps); if (staticProps) clientContextFactory_defineProperties(Constructor, staticProps); return Constructor; }











var clientContextFactory_ClientContextFactory = function () {
  function ClientContextFactory(client) {
    clientContextFactory_classCallCheck(this, ClientContextFactory);

    this.client = client;

    if (!client && ClientContextFactory.legecyClientSupport) {
      ClientContextFactory.LOGGER.warn('Legecy support used.');
      this.client = ClientContextFactory.legecyClientSupport;
    }
  }

  clientContextFactory_createClass(ClientContextFactory, [{
    key: "create",
    value: function create(url, config) {
      checkMethod('connect(url, config)');
      checkParam(url, 'url');
      ClientContextFactory.LOGGER.debug('Creating client context', url, config);
      var transmitter = new platformHttpTransmitter_PlatformHttpTransmitter(url, config, this.client);
      transmitter.on('error', function (error) {
        clientContext.emit('error', error);
      });
      var dolphin = dolphinBuilder.withTransmitter(transmitter).withSlackMS(4).withMaxBatchSize(Number.MAX_SAFE_INTEGER).build();
      var classRepository = new remoting_classRepository(dolphin);
      var beanManager = new beanManager_BeanManager(classRepository);
      var connector = new connector_Connector(url, dolphin, classRepository, config);
      var controllerManager = new controllerManager_ControllerManager(dolphin, classRepository, connector);
      var clientContext = new clientContext_ClientContext(dolphin, beanManager, controllerManager, connector);
      ClientContextFactory.LOGGER.debug('clientContext created with', clientContext);
      return clientContext;
    }
  }]);

  return ClientContextFactory;
}();

clientContextFactory_ClientContextFactory.LOGGER = loggerfactory_LoggerFactory.getLogger('ClientContextFactory');
clientContextFactory_ClientContextFactory.legecyClientSupport = false;

var createClientContext = function createClientContext(client) {
  return new clientContextFactory_ClientContextFactory(client).create;
};


// CONCATENATED MODULE: ./src/remoting/index.js




function remoting_register(client) {
  if (exists(client)) {
    var clientContextFactoryProvider = new serviceProvider_ServiceProvider(clientContextFactory_ClientContextFactory, 'ClientContextFactory', client);
    client.registerServiceProvider(clientContextFactoryProvider);
  }
}


// CONCATENATED MODULE: ./src/security/keycloakConnection.js
function keycloakConnection_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function keycloakConnection_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function keycloakConnection_createClass(Constructor, protoProps, staticProps) { if (protoProps) keycloakConnection_defineProperties(Constructor.prototype, protoProps); if (staticProps) keycloakConnection_defineProperties(Constructor, staticProps); return Constructor; }




var keycloakConnection_KeycloakConnection = function () {
  function KeycloakConnection() {
    keycloakConnection_classCallCheck(this, KeycloakConnection);
  }

  keycloakConnection_createClass(KeycloakConnection, [{
    key: "createDirectConnection",
    value: function createDirectConnection(authEndpoint, realmName) {
      checkMethod('createDirectConnection');
      checkParam(authEndpoint, 'authEndpoint');
      checkParam(realmName, 'realmName');
      var httpRequest = new XMLHttpRequest();
      httpRequest.open(HTTP.METHOD.POST, authEndpoint + '/auth/realms/' + realmName + '/protocol/openid-connect/token', true);
      httpRequest.setRequestHeader(HTTP.HEADER_NAME.CONTENT_TYPE, HTTP.CONTENT_TYPE.APPLICATION_X_WWW_FORM_URLENCODED);
      httpRequest.responseType = RESPONSE_TYPE.JSON;
      return httpRequest;
    }
  }, {
    key: "createServerProxyConnection",
    value: function createServerProxyConnection(authEndpoint, realmName) {
      checkMethod('createServerProxyConnection');
      checkParam(authEndpoint, 'authEndpoint');
      var httpRequest = new XMLHttpRequest();
      httpRequest.open(HTTP.METHOD.POST, authEndpoint, true);
      httpRequest.setRequestHeader(HTTP.HEADER_NAME.CONTENT_TYPE, HTTP.CONTENT_TYPE.TEXT_PLAIN);

      if (exists(realmName)) {
        httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM, realmName);
      }

      httpRequest.responseType = RESPONSE_TYPE.JSON;
      return httpRequest;
    }
  }]);

  return KeycloakConnection;
}();


// CONCATENATED MODULE: ./src/security/keycloakFunctions.js
function keycloakFunctions_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function keycloakFunctions_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function keycloakFunctions_createClass(Constructor, protoProps, staticProps) { if (protoProps) keycloakFunctions_defineProperties(Constructor.prototype, protoProps); if (staticProps) keycloakFunctions_defineProperties(Constructor, staticProps); return Constructor; }






var keycloakFunctions_KeycloakFunctions = function () {
  function KeycloakFunctions() {
    keycloakFunctions_classCallCheck(this, KeycloakFunctions);

    this.connection = new keycloakConnection_KeycloakConnection();
  }

  keycloakFunctions_createClass(KeycloakFunctions, [{
    key: "createLoginConnection",
    value: function createLoginConnection(directConnection, authEndpoint, realmName, appName, user, password) {
      var connection;
      var content;
      var encodedUser = encodeURIComponent(user);
      var encodedPassword = encodeURIComponent(password);
      var encodedAppName = encodeURIComponent(appName);

      if (directConnection) {
        if (exists(appName)) {
          connection = this.connection.createDirectConnection(authEndpoint, realmName);
          content = 'client_id=' + encodedAppName + '&username=' + encodedUser + '&password=' + encodedPassword + '&grant_type=password';
        } else {
          throw Error('No app name set!');
        }
      } else {
        connection = this.connection.createServerProxyConnection(authEndpoint, realmName);
        content = 'username=' + encodedUser + '&password=' + encodedPassword + '&grant_type=password';
      }

      return {
        connection: connection,
        content: content
      };
    }
  }, {
    key: "createRefreshConnection",
    value: function createRefreshConnection(directConnection, authEndpoint, realmName, appName, refreshToken) {
      var connection;
      var content;
      var encodedAppName = encodeURIComponent(appName);

      if (directConnection) {
        if (exists(appName)) {
          connection = this.connection.createDirectConnection(authEndpoint, realmName);
          content = 'grant_type=refresh_token&refresh_token=' + refreshToken + '&client_id=' + encodedAppName;
        } else {
          throw Error('No app name set!');
        }
      } else {
        connection = this.connection.createServerProxyConnection(authEndpoint, realmName);
        content = 'grant_type=refresh_token&refresh_token=' + refreshToken;
      }

      return {
        connection: connection,
        content: content
      };
    }
  }, {
    key: "receiveToken",
    value: function receiveToken(httpRequest, body) {
      return new Promise(function (resolve, reject) {
        httpRequest.ontimeout = function (error) {
          reject(error);
        };

        httpRequest.onerror = function (error) {
          reject(error);
        };

        httpRequest.onreadystatechange = function () {
          if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status === HTTP.STATUS.OK) {
            resolve(this.response);
          } else if (this.readyState === HTTP.XMLHTTPREQUEST_READYSTATE.DONE && this.status !== HTTP.STATUS.OK) {
            reject(this.status);
          }
        };

        KeycloakFunctions.LOGGER.trace('Receiving token');
        httpRequest.send(body);
      });
    }
  }, {
    key: "refreshToken",
    value: function refreshToken(directConnection, authEndpoint, realmName, appName, _refreshToken) {
      var _this$createRefreshCo = this.createRefreshConnection(directConnection, authEndpoint, realmName, appName, _refreshToken),
          connection = _this$createRefreshCo.connection,
          content = _this$createRefreshCo.content;

      return this.receiveToken(connection, content);
    }
  }]);

  return KeycloakFunctions;
}();

keycloakFunctions_KeycloakFunctions.LOGGER = loggerfactory_LoggerFactory.getLogger('KeycloakFunctions');

// CONCATENATED MODULE: ./src/security/securityHttpClientInterceptor.js
function securityHttpClientInterceptor_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function securityHttpClientInterceptor_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function securityHttpClientInterceptor_createClass(Constructor, protoProps, staticProps) { if (protoProps) securityHttpClientInterceptor_defineProperties(Constructor.prototype, protoProps); if (staticProps) securityHttpClientInterceptor_defineProperties(Constructor, staticProps); return Constructor; }





var securityHttpClientInterceptor_SecurityHttpClientInterceptor = function () {
  function SecurityHttpClientInterceptor() {
    securityHttpClientInterceptor_classCallCheck(this, SecurityHttpClientInterceptor);

    this.token = null;
    this.appName = null;
    this.realm = null;
  }

  securityHttpClientInterceptor_createClass(SecurityHttpClientInterceptor, [{
    key: "setToken",
    value: function setToken(token) {
      this.token = token;
    }
  }, {
    key: "setAppName",
    value: function setAppName(appName) {
      this.appName = appName;
    }
  }, {
    key: "setRealm",
    value: function setRealm(realm) {
      this.realm = realm;
    }
  }, {
    key: "handleRequest",
    value: function handleRequest(httpRequest) {
      checkMethod('handleRequest');
      checkParam(httpRequest, 'httpRequest');

      if (exists(this.token)) {
        SecurityHttpClientInterceptor.LOGGER.trace('Using token', this.token);
        httpRequest.setRequestHeader(HTTP.HEADER_NAME.AUTHORIZATION, 'Bearer ' + this.token);
      }

      if (exists(this.appName)) {
        SecurityHttpClientInterceptor.LOGGER.trace('Using appName', this.appName);
        httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_PLATFORM_SECURITY_APPLICATION, this.appName);
      }

      if (exists(this.realm)) {
        SecurityHttpClientInterceptor.LOGGER.trace('Using realm', this.realm);
        httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_PLATFORM_SECURITY_REALM, this.realm);
      }

      httpRequest.setRequestHeader(HTTP.HEADER_NAME.X_PLATFORM_SECURITY_BEARER_ONLY, 'true');
    }
  }]);

  return SecurityHttpClientInterceptor;
}();

securityHttpClientInterceptor_SecurityHttpClientInterceptor.LOGGER = loggerfactory_LoggerFactory.getLogger('SecurityHttpClientInterceptor');

// CONCATENATED MODULE: ./src/security/keycloakSecurity.js
function keycloakSecurity_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function keycloakSecurity_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function keycloakSecurity_createClass(Constructor, protoProps, staticProps) { if (protoProps) keycloakSecurity_defineProperties(Constructor.prototype, protoProps); if (staticProps) keycloakSecurity_defineProperties(Constructor, staticProps); return Constructor; }







var keycloakSecurity_KeycloakSecurity = function () {
  function KeycloakSecurity() {
    keycloakSecurity_classCallCheck(this, KeycloakSecurity);

    this.functions = new keycloakFunctions_KeycloakFunctions();
    this.interceptor = new securityHttpClientInterceptor_SecurityHttpClientInterceptor();
    this.intervall = null;
    this.configuration = {
      directConnection: false,
      authEndpoint: SECURITY.AUTH_ENDPOINT,
      appName: null,
      realmName: null
    };
  }

  keycloakSecurity_createClass(KeycloakSecurity, [{
    key: "login",
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

      var _this$configuration = this.configuration,
          directConnection = _this$configuration.directConnection,
          authEndpoint = _this$configuration.authEndpoint,
          appName = _this$configuration.appName,
          realmName = _this$configuration.realmName;

      var _this$functions$creat = this.functions.createLoginConnection(directConnection, authEndpoint, realmName, appName, user, password),
          connection = _this$functions$creat.connection,
          content = _this$functions$creat.content;

      var self = this;
      return new Promise(function (resolve, reject) {
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
    key: "logout",
    value: function logout() {
      var _this2 = this;

      var self = this;
      KeycloakSecurity.LOGGER.debug('Logout');
      return new Promise(function (resolve) {
        delete self.token;
        self.interceptor.setToken(null);

        if (exists(_this2.intervall)) {
          clearInterval(_this2.intervall);
          _this2.intervall = null;
        }

        resolve();
      });
    }
  }, {
    key: "isAuthorized",
    value: function isAuthorized() {
      return exists(this.token);
    }
  }, {
    key: "initServiceProvider",
    value: function initServiceProvider(client) {
      checkMethod('initServiceProvider');
      checkParam(client, 'client');
      client.getService('HttpClientInterceptor').addRequestInterceptor(this.interceptor);
    }
  }]);

  return KeycloakSecurity;
}();

keycloakSecurity_KeycloakSecurity.TOKEN_EXPIRES_DELTA = 10000;
keycloakSecurity_KeycloakSecurity.MIN_TOKEN_EXPIRES_RUN = 30000;
keycloakSecurity_KeycloakSecurity.LOGGER = loggerfactory_LoggerFactory.getLogger('KeycloakSecurity');

// CONCATENATED MODULE: ./src/security/index.js




function security_register(client) {
  if (exists(client)) {
    var securityProvider = new serviceProvider_ServiceProvider(keycloakSecurity_KeycloakSecurity, 'Security', client);
    client.registerServiceProvider(securityProvider);
  }
}


// CONCATENATED MODULE: ./src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getService", function() { return getService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "hasService", function() { return hasService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "registerServiceProvider", function() { return registerServiceProvider; });
/* concated harmony reexport LoggerFactory */__webpack_require__.d(__webpack_exports__, "LoggerFactory", function() { return loggerfactory_LoggerFactory; });
/* concated harmony reexport LogLevel */__webpack_require__.d(__webpack_exports__, "LogLevel", function() { return LogLevel; });
/* concated harmony reexport HTTP */__webpack_require__.d(__webpack_exports__, "HTTP", function() { return HTTP; });
function src_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function src_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function src_createClass(Constructor, protoProps, staticProps) { if (protoProps) src_defineProperties(Constructor.prototype, protoProps); if (staticProps) src_defineProperties(Constructor, staticProps); return Constructor; }









register(Client);
clientScope_register(Client);
remoting_register(Client);
security_register(Client);
Client.init();
var getService = Client.getService;
var hasService = Client.hasService;
var registerServiceProvider = Client.registerServiceProvider;
Client.LOGGER.info('Rico Version:', "1.0.1");


if (window.Worker && window.Blob && window.URL && URL.createObjectURL) {
  Client.LOGGER.debug('Creating Worker');

  var HttpWorker = function () {
    function HttpWorker() {
      src_classCallCheck(this, HttpWorker);

      this.blob = new Blob(["self.handleTimeout = function() {    const message = this.statusText || 'Timeout occurred';    const workerMessage = {error: true, message, status: this.status, timedout: true};    self.postMessage(workerMessage);};self.handleError = function () {    let message = this.statusText || 'Unspecified error occured';    const workerMessage = {error: true, message, status: this.status, timedout: false};    self.postMessage(workerMessage);};self.handleStateChange = function () {    if (this.readyState === 4 && this.status >= 200 && this.status < 300) {        const workerMessage = {error: false, response: this.response, status: this.status, url: this.url, responseHeaders: this.getAllResponseHeaders()};        self.postMessage(workerMessage);    } else if (this.readyState === 4 && this.status >= 300) {        const workerMessage = {error: true, message: this.statusText, status: this.status, timedout: false};        self.postMessage(workerMessage);    }};self.addEventListener('message', function(event) {    const timeout = event.data.timeout || 0;    const configuration = event.data.conf || {};    const requestHeaders = event.data.requestHeaders || [];        const httpRequest = new XMLHttpRequest();    const async = true;        httpRequest.open(configuration.method, configuration.url, async);    httpRequest.url = configuration.url;    httpRequest.method = configuration.method;    httpRequest.withCredentials = true;    for (let i = 0; i < requestHeaders.length; i++) {        const header = requestHeaders[i];        httpRequest.setRequestHeader(header.name, header.value);    }    if (configuration.headers && configuration.headers.length > 0) {        for (let i = 0; i < configuration.headers.length; i++) {            const header = configuration.headers[i];            httpRequest.setRequestHeader(header.name, header.value);        }    }    httpRequest.timeout = timeout;    if (configuration.responseType) {        httpRequest.responseType = configuration.responseType;    }    httpRequest.ontimeout = self.handleTimeout.bind(httpRequest);    httpRequest.onerror = self.handleError.bind(httpRequest);    httpRequest.onreadystatechange = self.handleStateChange.bind(httpRequest);    httpRequest.send(configuration.requestBody);});"], {
        type: "application/javascript"
      });
    }

    src_createClass(HttpWorker, [{
      key: "createWorker",
      value: function createWorker() {
        return new Worker(URL.createObjectURL(this.blob));
      }
    }]);

    return HttpWorker;
  }();

  var httpWorkerProvider = new serviceProvider_ServiceProvider(HttpWorker, 'HttpWorker');
  Client.registerServiceProvider(httpWorkerProvider);
}


var LOGGER = loggerfactory_LoggerFactory.getLogger('Deprecated:');
var showWarning = true;

function src_warn() {
  if (showWarning) {
    LOGGER.warn('Please do not use "dolphin" anymore, it may be removed in the next version! Use the new API instead!');
    showWarning = false;
  }
}

if (window) {
  window.dolphin = {
    get ClientContextFactory() {
      src_warn();
      clientContextFactory_ClientContextFactory.legecyClientSupport = Client;
      return clientContextFactory_ClientContextFactory;
    },

    get createClientContext() {
      src_warn();
      return createClientContext(Client);
    },

    get LoggerFactory() {
      src_warn();
      return loggerfactory_LoggerFactory;
    },

    get LogLevel() {
      src_warn();
      return LogLevel;
    }

  };
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=rico.js.map