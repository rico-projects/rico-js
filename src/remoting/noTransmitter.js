export default class NoTransmitter {

    transmit(commands, onDone) {
        // do nothing special
        onDone([]);
    }

    signal() {
        // do nothing
    }

    reset() {
        // do nothing
    }
}