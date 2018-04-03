import Component from '../../common/component/Component';
import CardListView from './CardListView';
import CardList from '../model/CardList';
import CardController from '../controller/CardController';
import Dispatcher from '../../common/event/Dispatcher';
import TagName from '../../common/dom/TagName';

const APPEND_LIST_BUTTON_TEXT = 'Append List';

class ApplicationView extends Component {
   private _cardListViews: Array<CardListView>;
   private _itemsContainer: Component;
    private _cardController: CardController;
    private _addCardListEvent: Dispatcher;
    private _addCardEvent: Dispatcher;
    private _removeEvent: Dispatcher;

    constructor() {
        super({ className: 'application' });

        this._cardListViews = [];

        this._cardController = new CardController();

        this._itemsContainer = new Component({className: 'items-container'});
        this.addChild(this._itemsContainer);

        this._addCardListEvent = new Dispatcher();
        this._removeEvent = new Dispatcher();
        this._addCardEvent = new Dispatcher();

        const appendListButton = new Component({className: 'append-list', tagName: TagName.BUTTON});
        appendListButton.setTextContent(APPEND_LIST_BUTTON_TEXT);
        this.addChild(appendListButton);
        appendListButton.listen('click', () => {
            this._addCardListEvent.dispatch();
        });
    }

    addCardListEvent(): Dispatcher {
        return this._addCardListEvent;
    }

    removeEvent(): Dispatcher {
        return this._removeEvent;
    }

    addCardEvent(): Dispatcher {
        return this._addCardEvent;
    }

    appendCardListView(cardList: CardList) {
        const view = this._createCardListView(cardList);
        this._cardListViews.push(view);
        this._itemsContainer.addChild(view);
    }

    removeCardListView(cardList: CardList) {
        const index = this._cardListViews.findIndex((item: CardListView) => {
            return item.id() == cardList.id();
        });
        if (index == -1)
        {
            throw new Error('Card list view is not exist');
        }

        const listView = this._cardListViews[index];
        this._itemsContainer.removeChild(listView);
        this._cardListViews.splice(index, 1);

        for (const card of cardList.cards())
        {
            this._cardController.removeCard(card);
        }
    }

    private _createCardListView(cardList: CardList): CardListView {
        const itemView = new CardListView(cardList, this._cardController);
        itemView.removeEvent().addListener((item: CardList) => this._removeEvent.dispatch(item));
        return itemView;
    }
}

export default ApplicationView;