import ClientConnector from './clientConnector'
import ClientDolphin from './clientDolphin'
import ClientModelStore from './clientModelStore'
import NoTransmitter from './noTransmitter'
import { LoggerFactory } from '../logging';


class DolphinBuilder {

    constructor() {
        this.slackMS = 300;
        this.maxBatchSize = 50;
        this.transmitter = null;
    }

    withSlackMS(slackMS) {
        this.slackMS = slackMS;
        return this;
    }

    withMaxBatchSize(maxBatchSize) {
        this.maxBatchSize = maxBatchSize;
        return this;
    }

    withTransmitter(transmitter) {
        this.transmitter = transmitter;
        return this;
    }

    build() {
        const clientDolphin = new ClientDolphin();
        let transmitter;
        if (this.transmitter) {
            transmitter = this.transmitter;
        } else {
            transmitter = new NoTransmitter();
        }
        clientDolphin.setClientConnector(new ClientConnector(transmitter, clientDolphin, this.slackMS, this.maxBatchSize));
        clientDolphin.setClientModelStore(new ClientModelStore(clientDolphin));
        DolphinBuilder.LOGGER.debug("Remoting client initialized", clientDolphin, transmitter);
        return clientDolphin;
    }
}

DolphinBuilder.LOGGER = LoggerFactory.getLogger('DolphinBuilder');

const dolphinBuilder = new DolphinBuilder();

export { dolphinBuilder }