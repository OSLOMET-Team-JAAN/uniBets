const windowEventBus = {
    on(event: string, callback: EventListener) {
        window.addEventListener(event, (e) => callback(e));
    },
    dispatch(event: string, data?: any) {
        window.dispatchEvent(new CustomEvent(event, {detail: data}));
    },
    remove(event: string, callback: EventListener) {
        window.removeEventListener(event, callback);
    },
};

export default windowEventBus;