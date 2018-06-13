export default class EventBus {

    constructor() {
        this.eventHandlers = [];
    }

    onEvent(eventHandler) {
        this.eventHandlers.push(eventHandler);
    }

    trigger(event) {
        this.eventHandlers.forEach(handle => handle(event));
    }
}