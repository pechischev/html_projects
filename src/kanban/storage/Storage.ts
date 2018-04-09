import IStorableState from './IStorableState';
import Utils from '../../common/utils/Utils';
import ArrayUtils from '../../common/utils/ArrayUtils';

type CallbackType = {
    key?: string;
    callback?: Function;
};

class Storage {
    private _state: IStorableState;
    private _callbacks: Array<CallbackType>;
    private _reducer: Function;

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

    subscribe(callback: Function): string {
        const key = Utils.getUid();
        this._callbacks.push({key, callback});
        return key;
    }

    unsubscribeByKey(key: string) {
        let index = ArrayUtils.findIndex(this._callbacks, (item: CallbackType) => item.key == key);

        if (index != -1)
        {
            this._callbacks.splice(index, 1);
        }
    }
}

export default Storage;