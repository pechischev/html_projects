import { IStorableState } from "./IStorableState";
import { Utils } from "common/utils/Utils";
import { ArrayUtils } from "common/utils/ArrayUtils";

interface ICallback {
    key?: string;
    // tslint:disable-next-line:ban-types
    callback?: Function;
}

export class Storage {
    private _state: IStorableState;
    private _callbacks: ICallback[];
    // tslint:disable-next-line:ban-types
    private _reducer: Function;

    // tslint:disable-next-line:ban-types
    constructor(reducer: Function, initialState?: IStorableState) {
        this._state = initialState;
        this._callbacks = [];

        this._reducer = reducer;

        this.dispatch({});
    }

    getState(): IStorableState {
        return this._state;
    }

    dispatch(action: any) {
        this._state = this._reducer(this._state, action);

        for (const item of this._callbacks) {
            item.callback();
        }
    }

    // tslint:disable-next-line:ban-types
    subscribe(callback: Function): string {
        const key = Utils.getUid();
        this._callbacks.push({key, callback});
        return key;
    }

    unsubscribeByKey(key: string) {
        const index = ArrayUtils.findIndex(this._callbacks, (item: ICallback) => item.key == key);

        if (index != -1) {
            this._callbacks.splice(index, 1);
        }
    }
}