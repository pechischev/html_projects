import * as React from 'react';
import EditableContainer from '../EditableContainer';
import CardView from '../card/CardView';
import List from '../../model/List';
import Card from '../../model/Card';
import ActionCreator from '../../action/ActionCreator';
import MemoryStorage from '../memoryStorage/MemoryStorage';
import IListViewProps from './IListViewProps';

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
                    <EditableContainer item={this._list}/>
                    <span className="remove-button clickable" onClick={this._removeList.bind(this)}>X</span>
                </div>
                <ul className="list-group">
                    {this._list.cards().map((card: Card) => {
                        return <CardView key={card.id()} card={card} storage={this._storage} listId={this._list.id()}/>;
                    })}
                </ul>
                <a className="add-card clickable" href="#" onClick={this._addCard.bind(this)}>Add card</a>
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