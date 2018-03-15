interface IDispatcher {

    addListener(callback: Function, scope?: Object): void;

    dispatch(): void;

    removeListener(callback: Function): void;
}

export = IDispatcher;