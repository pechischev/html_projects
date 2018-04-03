import Card from '../model/Card';

class CardController {
    private _cards: Array<Card>;

    constructor() {
        this._cards = [];
    }

    addCard(): Card {
        const card = new Card();
        this._cards.push(card);
        return card;
    }

    removeCard(card: Card) {
        const index = this._cards.indexOf(card);
        if (index == -1)
        {
            throw new Error('Card is not exist');
        }
        this._cards.splice(index, 1);
    }
}

export default CardController;