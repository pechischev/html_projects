import * as React from 'react';
import ListView from 'kanban/view/list/ListView';
import List from 'kanban/model/List';
import MemoryStorage from 'kanban/view/memoryStorage/MemoryStorage';
import IMemoryStorageProps from 'kanban/view/memoryStorage/IMemoryStorageProps';
import ActionCreator from 'kanban/action/ActionCreator';
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd';
import Config from 'kanban/config/Config';

class AppView extends MemoryStorage {
    constructor(props: IMemoryStorageProps) {
        super(props);
    }

    render(): any {
        return (
            <div id="container">
                <div className="panel">
                    <button className="btn btn-primary" onClick={this._exit.bind(this)}>Exit</button>
                    <button className="btn btn-primary" onClick={this._appendList.bind(this)}>Append list</button>
                </div>
                <DragDropContext onDragEnd={this._onDragEnd.bind(this)}>
                    <div>
                        <Droppable droppableId="list-container" type={Config.LIST_TYPE} direction='horizontal'>
                            {(dropProvided) => {
                                return (
                                    <ul className="list-container"
                                         ref={dropProvided.innerRef}
                                         {...dropProvided.droppableProps}>
                                        {this._storage.getState().lists.map((list: List, index) => {
                                            return <ListView key={list.id()}
                                                             list={list}
                                                             storage={this._storage}
                                                             index={index}
                                            />;
                                        })}
                                        {dropProvided.placeholder}
                                    </ul>
                                );
                            }}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>
        );
    }

    private _exit() {
        this._storage.dispatch(ActionCreator.exitAction());
    }

    private _appendList() {
        this._storage.dispatch(ActionCreator.appendActions());
    }

    private _onDragEnd(result: DropResult) {
        const {destination, source, type} = result;

        if (!destination)
        {
            return;
        }
        const staysOldPosition = destination.droppableId == source.droppableId && destination.index == source.index;
        if (staysOldPosition)
        {
            return;
        }
        if (type == Config.CARD_TYPE)
        {
            this._storage.dispatch(ActionCreator.moveCardAction(destination, source));
        }
        else if (type == Config.LIST_TYPE)
        {
            const context = {listId: result.draggableId, oldIndex: source.index, newIndex: destination.index};
            this._storage.dispatch(ActionCreator.moveListAction(context));
        }
    }
}

export default AppView;