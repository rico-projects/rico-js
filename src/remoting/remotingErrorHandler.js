import { LoggerFactory } from '../logging';

export default class RemotingErrorHandler {

    onError(error) {
        RemotingErrorHandler.LOGGER.error(error);
    }

}

RemotingErrorHandler.LOGGER = LoggerFactory.getLogger('RemotingErrorHandler');