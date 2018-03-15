import IDispatcher from './IDispatcher';

export default class Dispatcher implements IDispatcher {
    private _listeners: Array<{callback: Function, scope: Object|null}>;

    constructor() {
        this._listeners = [];
    }

    addListener(callback: Function, scope?: Object) {
        if (this._hasListener(callback))
        {
            return;
        }
        this._listeners.push({callback, scope: scope || null});
    }

    dispatch() {
        for (let i = 0; i < this._listeners.length; ++i)
        {
            const obj = this._listeners[i];
            if (!obj.callback)
            {
                continue;
            }
            obj.callback.apply(obj.scope);
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

    private _hasListener(callback: Function) {
        return !!this._listeners.find((obj) => {
            return obj.callback == callback;
        });
    }
}