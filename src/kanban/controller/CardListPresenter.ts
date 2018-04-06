import CardList from '../model/CardList';
import CardController from '../controller/CardController';
import ApplicationView from '../view/ApplicationView';

class CardListPresenter {
    private _cardsList: Array<CardList>;
    private _cardController: CardController;
    private _view: ApplicationView;

    constructor(view: ApplicationView) {
        this._cardsList = [];
        this._view = view;

        this._cardController = new CardController();
    }

    cardController(): CardController {
        return this._cardController;
    }

    appendList() {
        const list = new CardList();
        this.insertList(list);
    }

    removeList(cardList: CardList) {
        const index = this._getCardListIndexById(cardList.id());
        if (index == -1)
        {
            throw new Error('Card list is not exist');
        }
        this._cardsList.splice(index, 1);

        for (const card of cardList.cards())
        {
            this._cardController.removeCard(card);
        }
        this._view.render(this._cardsList);
    }

    insertList(list: CardList, position: number = this._cardsList.length) {
        const index = this._getCardListIndexById(list.id());
        if (index != -1)
        {
            this._cardsList.splice(index, 1);
        }
        this._cardsList.splice(position, 0, list);
        this._view.render(this._cardsList);
    }

    private _getCardListIndexById(id: string): number {
        return this._cardsList.findIndex((item) => {
            return item.id() == id;
        });
    }
}

export default CardListPresenter;