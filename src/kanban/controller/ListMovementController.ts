import CardListView from '../view/CardListView';
import Component from '../../common/component/Component';
import Coordinate from '../../common/math/Coordinate';
import Dispatcher from '../../common/event/Dispatcher';

class ListMovementController {
    private _listViews: Array<CardListView>;
    private _baseContainer: Component;
    private _changeListPositionEvent: Dispatcher;
    private _startPosition: Coordinate|null;
    private _sourceIndex: number;
    private _index: number;
    private _selectedItemView: CardListView;

    constructor(listViews: Array<CardListView>, baseContainer: Component) {
        this._listViews = listViews;
        this._baseContainer = baseContainer;
        this._startPosition = null;
        this._index = -1;

        this._changeListPositionEvent = new Dispatcher();
    }

    changeListPositionEvent(): Dispatcher {
        return this._changeListPositionEvent;
    }

    move(itemView: CardListView, event: MouseEvent) {
        const rect = itemView.displayObject().getBoundingClientRect();
        this._startPosition = new Coordinate(event.x - rect.left, event.y - rect.top);

        this._sourceIndex = this._listViews.indexOf(itemView);
        this._selectedItemView = itemView;

        document.onmousemove = this._onMouseMove.bind(this);
        document.onmouseup = this._onMouseUp.bind(this);
    }

    private _onMouseMove(event: MouseEvent) {
        this._selectedItemView.addClassNames('moving');
        this._selectedItemView.setPosition(event.x -  this._startPosition.x, event.y - this._startPosition.y);

        // TODO: доработать рассчет позиции вставки
        const index = this._getIndexByCoordinate(event.x -  this._startPosition.x, event.y - this._startPosition.y);
        this._index = (index != -1) ? index : this._index;

        event.preventDefault();
    }

    private _onMouseUp(event: MouseEvent) {
        this._selectedItemView.removeClassNames('moving');
        this._selectedItemView.setPosition(0, 0);

        if (this._index != this._sourceIndex && this._index != -1)
        {
            this._changeListPositionEvent.dispatch(this._index,  this._selectedItemView.list());
        }

        event.preventDefault();

        this._index = -1;
        this._selectedItemView = null;

        document.onmousemove = null;
        document.onmouseup = null;
    }

    private _getIndexByCoordinate(x: number, y: number): number {
        const elements = document.elementsFromPoint(x, y);
        return this._listViews.findIndex((list: CardListView) => {
            const item = elements.find((elem) => elem === list.displayObject());
            return !!item;
        });

    }
}

export default ListMovementController;