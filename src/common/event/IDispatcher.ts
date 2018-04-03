interface IDispatcher {

    addListener(callback: Function, scope?: any): void;

    dispatch(args?: any): void;

    removeListener(callback: Function): void;
}

export default IDispatcher;