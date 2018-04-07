import * as React from 'react';
import ListView from './list/ListView';
import List from '../model/List';
import MemoryStorage from './memoryStorage/MemoryStorage';
import IMemoryStorageProps from './memoryStorage/IMemoryStorageProps';
import ActionCreator from '../action/ActionCreator';

class AppView extends MemoryStorage {
    constructor(props: IMemoryStorageProps) {
        super(props);
    }

    render() {
        return (
            <div id="container">
                <div className="list-container row">
                    {this._storage.getState().lists.map((list: List) => {
                        return <ListView key={list.id()}
                                         list={list}
                                         storage={this._storage}
                        />;
                    })}
                    <button className="btn btn-default clickable" onClick={this._appendList.bind(this)}>Append list</button>
                </div>
            </div>
        );
    }

    private _appendList() {
        this._storage.dispatch(ActionCreator.appendActions());
    }
}

export default AppView;