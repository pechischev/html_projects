import IDispatcher from 'common/event/IDispatcher';
import ArrayUtils from 'common/utils/ArrayUtils';

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
        this._listeners.push({callback, scope: scope || null});
    }

    dispatch(args?: any, ...otherArgs: any[]) {
        for (let i = 0; i < this._listeners.length; ++i)
        {
            const obj = this._listeners[i];
            if (!obj.callback)
            {
                continue;
            }
            const params = [args, ...otherArgs];
            obj.callback.apply(obj.scope, ...params);
        }
    }

    removeListener(callback: Function, scope?: any) {
       const index = ArrayUtils.findIndex(this._listeners, (obj: any) => {
           return obj.callback == callback && obj.scope === scope;
       });
       if (index == -1)
       {
            return;
       }
       this._listeners.splice(index, 1);
    }

    private _hasListener(callback: Function): boolean {
        return !!ArrayUtils.find(this._listeners, (obj: any) => {
            return obj.callback == callback;
        });
    }
}

export default Dispatcher;