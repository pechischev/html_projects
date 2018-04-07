import * as React from 'react';
import EditableContainer from './EditableContainer';
import CardView from './CardView';
import CardList from '../model/CardList';
import Card from '../model/Card';
import Store from '../store/Store';
import { default as ListAction } from '../action/ListAction';

class ListView extends React.Component<any, any> {
    private _list: CardList;
    private _store: Store;
    private _unsubscribeKey: string;

    constructor(props: any) {
        super();

        this._list = props.list;
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
            <div className="cardlist">
                <div className="title-container">
                    <EditableContainer text={this._list.title()}/>
                    <span className="remove-button clickable" onClick={this._removeList.bind(this)}>X</span>
                </div>
                <ul className="list-group">
                    {this._list.cards().map((card: Card) => {
                        return <CardView key={card.id()} card={card} store={this._store} listId={this._list.id()}/>;
                    })}
                </ul>
                <a className="add-card clickable" href="#" onClick={this._addCard.bind(this)}>Add card</a>
            </div>
        );
    }

    private _addCard() {
        this._store.dispatch({type: ListAction.APPEND_CARD, content: {id: this._list.id()}});
    }

    private _removeList() {
        this._store.dispatch({type: ListAction.REMOVE_LIST, content: {id: this._list.id()}});
    }

}

export default ListView;