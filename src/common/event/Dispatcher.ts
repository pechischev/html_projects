import IDispatcher from './IDispatcher';

class Dispatcher implements IDispatcher {
    private _listeners: Array<{callback: Function, scope?: any}>;

    constructor() {
        this._listeners = [];
    }

    addListener(callback: Function, scope?: any) {
        if (this._hasListener(callback))
        {
            return;
        }
        this._listeners.push({callback, scope: scope});
    }

    dispatch(args?: any, ...otherArgs: any[]) { // TODO: fix transfer arguments to function
        for (let i = 0; i < this._listeners.length; ++i)
        {
            const obj = this._listeners[i];
            if (!obj.callback)
            {
                continue;
            }
            obj.callback(args, ...otherArgs);
        }
    }

    removeListener(callback: Function) {
       const index = this._listeners.findIndex((obj) => {
           return obj.callback == callback;
       });
       if (index == -1)
       {
            return;
       }
       this._listeners.splice(index, 1);
    }

    private _hasListener(callback: Function): boolean {
        return !!this._listeners.find((obj) => {
            return obj.callback == callback;
        });
    }
}

export default Dispatcher;