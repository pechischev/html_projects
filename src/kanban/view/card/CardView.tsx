import * as React from 'react';
import EditableContainer from '../EditableContainer';
import Card from '../../model/Card';
import MemoryStorage from '../memoryStorage/MemoryStorage';
import ICardViewProps from './ICardViewProps';
import ActionCreator from '../../action/ActionCreator';
import { Draggable } from 'react-beautiful-dnd';

class CardView extends MemoryStorage<ICardViewProps, any> {
    private _card: Card;

    constructor(props: ICardViewProps) {
        super(props);

        this._card = props.card;
    }

    render() {
        return (
            <Draggable draggableId={this._card.id()} index={this.props.index}>
                {(dragProvided, dragSnapshot) => {
                    return (
                        <li className="list-group-item card"
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                        >
                            <div className="title-container">
                                <EditableContainer storage={this._storage} item={this._card}/>
                                <span className="remove-button clickable" onClick={this._removeCard.bind(this)}>X</span>
                            </div>
                            {dragProvided.placeholder}
                        </li>
                    );
                }}
            </Draggable>
        );
    }

    private _removeCard() {
        this._storage.dispatch(ActionCreator.removeCardAction(this.props.listId, this._card));
    }
}

export default CardView;