import { exists } from "../utils";
import { Logger } from "./logger";

const ROOT_LOGGER = new Logger('ROOT');

// private methods
const LOCALS = {
    loggers: new Map()
};


// public
class LoggerFactory {

    static getLogger(context) {
        if (!exists(context) || context === 'ROOT') {
            return ROOT_LOGGER;
        }
        const existingLogger = LOCALS.loggers.get(context);
        if (existingLogger) {
            return existingLogger;
        }

        const logger = new Logger(context, ROOT_LOGGER);
        LOCALS.loggers.set(context, logger);
        return logger;
    }
}

export { LoggerFactory }