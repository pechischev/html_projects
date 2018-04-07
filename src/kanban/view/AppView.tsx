import * as React from 'react';
import ListView from './ListView';
import Store from '../store/Store';
import CardList from '../model/CardList';
import { default as ListAction } from '../action/ListAction';

interface IAppViewProps {
    store: Store;
}

class AppView extends React.Component<IAppViewProps, any> {
    private _store: Store;
    private _unsubscribeKey: string;

    constructor(props: IAppViewProps) {
        super();

        this._store = props.store;
    }

    componentDidMount() {
        this._unsubscribeKey = this._store.subscribe(() => this.forceUpdate());
    }

    componentWillUnmount() {
        if (this._unsubscribeKey)
        {
            this._store.unsubscribeByKey(this._unsubscribeKey);
        }
    }

    render() {
        return (
            <div id="container">
                <div className="list-container row">
                    {this._store.getState().lists.map((list: CardList) => {
                        return <ListView key={list.id()}
                                         list={list}
                                         store={this._store}
                        />;
                    })}
                    <button className="btn btn-default clickable" onClick={this._appendList.bind(this)}>Append list</button>
                </div>
            </div>
        );
    }

    private _appendList() {
        this._store.dispatch({type: ListAction.APPEND_LIST});
    }
}

export default AppView;