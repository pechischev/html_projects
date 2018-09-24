import { BaseItem } from "kanban/model/BaseItem";
import Card from "kanban/model/Card";
import Message from "kanban/message/Message";

class List extends BaseItem {
    private _cards: Array<Card>;

    constructor(title?: string, id?: string) {
        super((title || Message.DEFAULT_LIST_TEXT), id);
        this._cards = [];
    }

    setCards(cards: Array<Card>) {
        this._cards = cards;
    }

    appendCard(card: Card) {
        this.insertCardTo(card);
    }

    insertCardTo(card: Card, index: number = this._cards.length) {
        if (this._hasCard(card))
        {
            return;
        }
        this._cards.splice(index, 0, card);
    }

    removeCard(card: Card) {
        if (!this._hasCard(card))
        {
            return;
        }
        const index = this._getCardIndex(card);
        this._cards.splice(index, 1);
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