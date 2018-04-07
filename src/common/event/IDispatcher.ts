interface IDispatcher {

    addListener(callback: Function, scope?: any): void;

    dispatch(args?: any, ...otherArgs: any[]): void;

    removeListener(callback: Function, scope?: any): void;
}

export default IDispatcher;