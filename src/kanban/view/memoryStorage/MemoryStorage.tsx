import * as React from "react";
import Storage from "kanban/storage/Storage";
import IMemoryStorageProps from "kanban/view/memoryStorage/IMemoryStorageProps";

/**
 * @template P {Props}, S {State}
 */
class MemoryStorage<P = IMemoryStorageProps, S = any> extends React.Component<P, S> {
    protected _storage: Storage;
    private _unsubscribeKey: string;

    constructor(props: IMemoryStorageProps) {
        super();

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

export default MemoryStorage;