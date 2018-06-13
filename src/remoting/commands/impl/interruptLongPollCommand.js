import {INTERRUPT_LONG_POLL_COMMAND_ID} from '../commandConstants'

export default class InterruptLongPollCommand {

    constructor() {
        this.id = INTERRUPT_LONG_POLL_COMMAND_ID;
    }
}