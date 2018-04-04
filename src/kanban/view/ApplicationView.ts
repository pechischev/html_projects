import Component from '../../common/component/Component';
import CardListView from './CardListView';
import CardList from '../model/CardList';
import CardController from '../controller/CardController';
import Dispatcher from '../../common/event/Dispatcher';
import ListMovementController from '../controller/ListMovementController';
import TagName from '../../common/dom/TagName';

const APPEND_LIST_BUTTON_TEXT = 'Append List';

class ApplicationView extends Component {
    private _cardListViews: Array<CardListView>;
    private _itemsContainer: Component;
    private _cardController: CardController|null;
    private _movementController: ListMovementController;
    private _addCardListEvent: Dispatcher;
    private _removeListEvent: Dispatcher;

    constructor() {
        super({className: 'application'});

        this._cardListViews = [];

        this._cardController = null;

        this._itemsContainer = new Component({className: 'items-container'});
        this.addChild(this._itemsContainer);

        this._movementController = new ListMovementController(this._cardListViews, this._itemsContainer);

        this._addCardListEvent = new Dispatcher();
        this._removeListEvent = new Dispatcher();

        const appendListButton = new Component({
            className: 'append-list',
            tagName: TagName.BUTTON
        });
        appendListButton.setTextContent(APPEND_LIST_BUTTON_TEXT);
        this.addChild(appendListButton);
        appendListButton.listen('click', () => {
            this._addCardListEvent.dispatch();
        });
    }

    setCardController(controller: CardController) {
        this._cardController = controller;
    }

    addCardListEvent(): Dispatcher {
        return this._addCardListEvent;
    }

    changeListPositionEvent(): Dispatcher {
        return this._movementController.changeListPositionEvent();
    }

    removeListEvent(): Dispatcher {
        return this._removeListEvent;
    }

    render(cardsList: Array<CardList>) {
        this._itemsContainer.removeChildren();
        this._cardListViews.splice(0, this._cardListViews.length);

        for (const list of cardsList)
        {
            const view = this._createCardListView(list);
            this._cardListViews.push(view);

            this._itemsContainer.addChild(view);
            view.invalidate();
        }
    }

    invalidate() {
        for (const list of this._cardListViews)
        {
            list.invalidate();
        }
    }

    private _createCardListView(cardList: CardList): CardListView {
        const itemView = new CardListView(cardList, this._cardController);
        itemView.removeEvent().addListener((item: CardList) => this._removeListEvent.dispatch(item));
        itemView.listen('mousedown', (event: MouseEvent) => {
            if (event.defaultPrevented)
            {
                return;
            }
            this._movementController.move(itemView, event);
        });
        return itemView;
    }
}

export default ApplicationView;