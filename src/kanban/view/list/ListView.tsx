import * as React from "react";
import { EditableContainer } from "kanban/view/EditableContainer";
import { CardView } from "kanban/view/card/CardView";
import { Card, List } from "kanban/model";
import { ActionCreator } from "kanban/action/ActionCreator";
import { MemoryStorage } from "kanban/view/memoryStorage/MemoryStorage";
import { IListView } from "./IListView";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { Config } from "kanban/config/Config";

export class ListView extends MemoryStorage<IListView, any> {
    private _list: List;

    constructor(props: IListView) {
        super(props);

        this._list = props.list;
    }

    render(): any {
        return (
            <Draggable draggableId={this._list.id()} index={this.props.index}>
                {(dragProvided, dragSnapshot) => {
                    return (
                        <li className="list-item">
                            <div className="cardlist"
                                 ref={dragProvided.innerRef}
                                 {...dragProvided.draggableProps}
                                 {...dragProvided.dragHandleProps}>
                                <div className="title-container">
                                    <EditableContainer storage={this._storage} item={this._list}/>
                                    <span className="remove-button clickable"
                                          onClick={this._removeList.bind(this)}>X</span>
                                </div>
                                <Droppable droppableId={this._list.id()} type={Config.CARD_TYPE}>
                                    {(dropProvided) => {
                                        return (
                                            <div>
                                                <ul className="list-group"
                                                    ref={dropProvided.innerRef}
                                                    {...dropProvided.droppableProps}>
                                                    {this._list.cards().map((card: Card, index: number) => {
                                                        return (
                                                            <CardView key={card.id()}
                                                                         card={card}
                                                                         storage={this._storage}
                                                                         listId={this._list.id()}
                                                                         index={index}
                                                            />
                                                        );
                                                    })}
                                                    {dropProvided.placeholder}
                                                </ul>
                                                <a className="add-card clickable" href="#"
                                                   onClick={this._addCard.bind(this)}>Add card</a>
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                            {dragProvided.placeholder}
                        </li>
                    );
                }}
            </Draggable>
        );
    }

    private _addCard() {
        this._storage.dispatch(ActionCreator.appendCardAction(this._list.id()));
    }

    private _removeList() {
        this._storage.dispatch(ActionCreator.removeActions(this._list.id()));
    }

}