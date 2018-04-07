import IStorableState from './IStorableState';
import Utils from '../../common/utils/Utils';

class Store {
    private _state: IStorableState;
    private _callbacks: Map<string, Function>;
    private _reducer: Function;

    constructor(reducer: Function, initialState?: IStorableState) {
        this._state = initialState;
        this._callbacks = new Map<string, Function>();

        this._reducer = reducer;

        this.dispatch({});
    }

    getState(): IStorableState {
        return this._state;
    }

    dispatch(action: any) {
        this._state = this._reducer(this._state, action);
        this._callbacks.forEach((callback: Function) => callback());
    }

    subscribe(callback: Function): string {
        const key = Utils.getUid();
        this._callbacks.set(key, callback);
        return key;
    }

    unsubscribeByKey(key: string) {
        this._callbacks.delete(key);
    }
}

export default Store;