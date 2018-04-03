import Component from '../../common/component/Component';
import CardList from '../model/CardList';
import Card from '../model/Card';
import CardView from './CardView';
import CardController from '../controller/CardController';
import Dispatcher from '../../common/event/Dispatcher';
import EditableTitleView from './EditableTitleView';

const APPEND_CARD_BUTTON_TEXT = 'Add card';

class CardListView extends Component {
    private _cardList: CardList;
    private _cardsView: Array<CardView>;
    private _itemsContainer: Component;
    private _removeEvent: Dispatcher;
    private _controller: CardController;

    constructor(cardList: CardList, controller: CardController) {
        super({className: 'cardlist'});

        this._cardList = cardList;

        this._controller = controller;

        this._cardsView = [];
        this._removeEvent = new Dispatcher();

        cardList.changedCardsEvent().addListener(() => {
            this.invalidate();
        });

        const titleContainer = new EditableTitleView(this._cardList);
        this.addChild(titleContainer);

        const removeListIcon = new Component({className: 'remove-list-icon remove-icon'});
        removeListIcon.setTextContent('X');
        removeListIcon.listen('click', () =>  this._removeEvent.dispatch(this._cardList));
        this.addChild(removeListIcon);

        this._itemsContainer = new Component({className: 'items-container'});
        this.addChild(this._itemsContainer);
        
        const appendCardButton = new Component({className: 'append-card'});
        appendCardButton.setTextContent(APPEND_CARD_BUTTON_TEXT);
        this.addChild(appendCardButton);

        appendCardButton.listen('click', () => {
            this._cardList.appendCard(this._controller.addCard());
        });

        this.invalidate();
    }

    removeEvent(): Dispatcher {
        return this._removeEvent;
    }

    invalidate() { // TODO: optimize: remove only deleted item and append added item
        this._itemsContainer.removeChildren();

        const cards = this._cardList.cards();
        for (const card of cards)
        {
            const view = this._createCardView(card);
            this._cardsView.push(view);
            this._itemsContainer.addChild(view);
        }
    }

    id(): string {
        return this._cardList.id();
    }

    private _createCardView(card: Card): CardView {
        const view = new CardView(card);
        view.removeCardEvent().addListener(() => {
            this._controller.removeCard(card);
            this._cardList.removeCard(card);
        });
        return view;
    }
}

export default CardListView;