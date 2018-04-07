import BaseItem from './BaseItem';
import Card from './Card';
import Dispatcher from '../../common/event/Dispatcher';

const DEFAULT_LIST_TEXT = 'Input list name';

class List extends BaseItem {
    private _cards: Array<Card>;
    private _changedCardsEvent: Dispatcher;

    constructor(title?: string, id?: string) {
        super((title || DEFAULT_LIST_TEXT), id);
        this._cards = [];

        this._changedCardsEvent = new Dispatcher();
    }

    changedCardsEvent(): Dispatcher {
        return this._changedCardsEvent;
    }

    appendCard(card: Card) {
        if (this._hasCard(card))
        {
            return;
        }
        this._cards.push(card);
        this._changedCardsEvent.dispatch();
    }

    removeCard(card: Card) {
        if (!this._hasCard(card))
        {
            return;
        }
        const index = this._getCardIndex(card);
        this._cards.splice(index, 1);
        this._changedCardsEvent.dispatch();
    }

    cards(): Array<Card> {
        return this._cards.slice();
    }

    private _hasCard(card: Card): boolean {
        return this._getCardIndex(card) != -1;
    }

    private _getCardIndex(card: Card): number {
        return this._cards.indexOf(card);
    }
}

export default List;