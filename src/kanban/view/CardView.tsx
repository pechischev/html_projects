import * as React from 'react';
import EditableContainer from './EditableContainer';
import Card from '../model/Card';
import Store from '../store/Store';
import { default as ListAction } from '../action/ListAction';

class CardView extends React.Component<any, any> {
    private _card: Card;
    private _store: Store;
    private _unsubscribeKey: string;

    constructor(props: any) {
        super();

        this._card = props.card;
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
            <li className="list-group-item card">
                <div className="title-container">
                    <EditableContainer text={this._card.title()}/>
                    <span className="remove-button clickable" onClick={this._removeCard.bind(this)}>X</span>
                </div>
            </li>
        );
    }

    private _removeCard() {
        this._store.dispatch({type: ListAction.REMOVE_CARD, content: {id: this.props.listId, card: this._card}});
    }
}

export default CardView;