import * as React from 'react';
import EditableContainer from '../EditableContainer';
import Card from '../../model/Card';
import MemoryStorage from '../memoryStorage/MemoryStorage';
import ICardViewProps from './ICardViewProps';
import ActionCreator from '../../action/ActionCreator';

class CardView extends MemoryStorage<ICardViewProps, any> {
    private _card: Card;

    constructor(props: ICardViewProps) {
        super(props);

        this._card = props.card;
    }

    render() {
        return (
            <li className="list-group-item card">
                <div className="title-container">
                    <EditableContainer item={this._card}/>
                    <span className="remove-button clickable" onClick={this._removeCard.bind(this)}>X</span>
                </div>
            </li>
        );
    }

    private _removeCard() {
        this._storage.dispatch(ActionCreator.removeCardAction(this.props.listId, this._card));
    }
}

export default CardView;