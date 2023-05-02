const eventBus = {
    on(event: string, callback: EventListener) {
        document.addEventListener(event, (e) => callback(e));
    },
    dispatch(event: string, data?: any) {
        document.dispatchEvent(new CustomEvent(event, {detail: data}));
    },
    remove(event: string, callback: EventListener) {
        document.removeEventListener(event, callback);
    },
};

export default eventBus;

//https://developer.mozilla.org/en-US/docs/Web/Events/Creating_and_triggering_events
//https://www.bezkoder.com/react-typescript-authentication-example/