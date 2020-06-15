import {checkParam, exists} from '../utils'
import { LogLevel } from "./constants";

// private methods
const LOCALS = {
    pad (text, size) {
        let result = '' + text;
        while (result.length < size) {
            result = '0' + result;
        }
        return result;
    },
    internalLog () {
        const args = Array.from(arguments);
        const func = args.shift();
        const context = args.shift();
        const logLevel = args.shift();
        const date = new Date();
        const dateString =  date.getFullYear() + '-' + LOCALS.pad(date.getMonth() + 1, 2) + '-' + LOCALS.pad(date.getDate(), 2) + ' ' + LOCALS.pad(date.getHours(), 2) + ':' + LOCALS.pad(date.getMinutes(), 2) + ':' + LOCALS.pad(date.getSeconds(), 2) + '.' + LOCALS.pad(date.getMilliseconds(), 3);
        func(dateString, logLevel.text, context, ...args);

    },
    getCookie (name) {
        if (exists(window) && exists(window.document) && exists(window.document.cookie)) {       
            const value = '; ' + window.document.cookie;
            const parts = value.split('; ' + name + '=');
            if ( parts.length === 2 ) {
                return parts.pop().split(';').shift();
            }
        }
    }
};


// public
class Logger {

    constructor(context, rootLogger) {
        this.context = context;
        this.rootLogger = rootLogger;
        const cookieLogLevel = LOCALS.getCookie('RICO_LOGGER_' + this.context);
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

    trace() {
        if (exists(console) && this.isLogLevel(LogLevel.TRACE)) {
            LOCALS.internalLog(console.log, this.context, LogLevel.TRACE, ...arguments);
        }
    }

    debug() {
        if (exists(console) && this.isLogLevel(LogLevel.DEBUG)) {
            LOCALS.internalLog(console.log, this.context, LogLevel.DEBUG, ...arguments);
        }
    }

    info() {
        if (exists(console) && this.isLogLevel(LogLevel.INFO)) {
            LOCALS.internalLog(console.log, this.context, LogLevel.INFO, ...arguments);
        }
    }

    warn() {
        if (exists(console) && this.isLogLevel(LogLevel.WARN)) {
            LOCALS.internalLog(console.warn, this.context, LogLevel.WARN, ...arguments);
        }
    }

    error() {
        if (exists(console) && this.isLogLevel(LogLevel.ERROR)) {
            LOCALS.internalLog(console.error, this.context, LogLevel.ERROR, ...arguments);
        }
    }

    getLogLevel() {
        if (exists(this.logLevel)) {
            return this.logLevel;
        } else if (exists(this.rootLogger)) {
            return this.rootLogger.getLogLevel();
        } else {
            return LogLevel.INFO;
        }
    }

    setLogLevel(level) {
        this.logLevel = level;
    }

    setLogLevelByName(levelName) {
        if (exists(LogLevel[levelName])) {
            this.logLevel = LogLevel[levelName];
        }
    }

    isLogLevel(level) {
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

    isLogLevelUsable(level) {
        checkParam(level, 'level');
        if (level.level) {
            return this.getLogLevel().level >= level.level;
        } else {
            return false;
        }
    }
}

export { Logger };
