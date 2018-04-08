import * as React from 'react';
import EditableContainer from '../EditableContainer';
import CardView from '../card/CardView';
import List from '../../model/List';
import Card from '../../model/Card';
import ActionCreator from '../../action/ActionCreator';
import MemoryStorage from '../memoryStorage/MemoryStorage';
import IListViewProps from './IListViewProps';
import { Droppable } from 'react-beautiful-dnd';
import Config from '../../config/Config';

class ListView extends MemoryStorage<IListViewProps, any> {
    private _list: List;

    constructor(props: IListViewProps) {
        super(props);

        this._list = props.list;
    }

    render() {
        return (
            <div className="cardlist">
                <div className="title-container">
                    <EditableContainer storage={this._storage} item={this._list}/>
                    <span className="remove-button clickable" onClick={this._removeList.bind(this)}>X</span>
                </div>
                <Droppable droppableId={this._list.id()} type={Config.CARD_TYPE}>
                    {(dropProvided, dropSnapshot) => {
                        return (
                            <div>
                                <ul className="list-group"
                                    ref={dropProvided.innerRef}
                                    {...dropProvided.droppableProps}>
                                    {this._list.cards().map((card: Card, index: number) => {
                                        return <CardView key={card.id()}
                                                         card={card}
                                                         storage={this._storage}
                                                         listId={this._list.id()}
                                                         index={index}
                                        />;
                                    })}
                                    {dropProvided.placeholder}
                                </ul>
                                <a className="add-card clickable" href="#" onClick={this._addCard.bind(this)}>Add card</a>
                            </div>
                        );
                    }}
                </Droppable>
            </div>
        );
    }

    private _addCard() {
        this._storage.dispatch(ActionCreator.appendCardAction(this._list.id()));
    }

    private _removeList() {
        this._storage.dispatch(ActionCreator.removeActions(this._list.id()));
    }

}

export default ListView;