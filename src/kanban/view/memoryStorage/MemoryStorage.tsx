import * as React from "react";
import { Storage } from "kanban/storage/Storage";
import { IMemoryStorage } from "./IMemoryStorage";

/**
 * @template P {Props}, S {State}
 */
export class MemoryStorage<P extends IMemoryStorage = IMemoryStorage, S = any> extends React.Component<P, S> {
    protected _storage: Storage;
    private _unsubscribeKey: string;

    constructor(props: P) {
        super(props);

        this._storage = props.storage;
    }

    componentDidMount() {
        this._unsubscribeKey = this._storage.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        if (this._unsubscribeKey)
        {
            this._storage.unsubscribeByKey(this._unsubscribeKey);
        }
    }
}