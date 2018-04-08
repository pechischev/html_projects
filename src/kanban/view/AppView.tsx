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
                <div className="panel">
                    <button className="btn btn-primary" onClick={this._exit.bind(this)}>Exit</button>
                    <button className="btn btn-primary" onClick={this._appendList.bind(this)}>Append list</button>
                </div>
                <div className="list-container row">
                    {this._storage.getState().lists.map((list: List) => {
                        return <ListView key={list.id()}
                                         list={list}
                                         storage={this._storage}
                        />;
                    })}
                </div>
            </div>
        );
    }

    private _exit() {
        this._storage.dispatch(ActionCreator.exitAction());
    }

    private _appendList() {
        this._storage.dispatch(ActionCreator.appendActions());
    }
}

export default AppView;