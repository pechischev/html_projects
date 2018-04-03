import CardList from '../model/CardList';
import ApplicationView from '../view/ApplicationView';

class CardListPresenter {
    private _cardsList: Array<CardList>;
    private _view: ApplicationView;

    constructor(view: ApplicationView) {
        this._cardsList = [];

        this._view = view;
        this._view.addCardListEvent().addListener(() => this._createCardList());
        this._view.removeEvent().addListener((cardList: CardList) => {
            this._removeCardList(cardList);
        });
    }

    private _createCardList() {
        const cardList = new CardList();
        this._cardsList.push(cardList);
        this._view.appendCardListView(cardList);
    }

    private _removeCardList(cardList: CardList) {
        const index = this._getCardListIndexById(cardList.id());
        if (index == -1)
        {
            throw new Error('Card list is not exist');
        }
        this._cardsList.splice(index, 1);
        this._view.removeCardListView(cardList);
    }

    private _getCardListIndexById(id: string): number {
        return this._cardsList.findIndex((item) => {
            return item.id() == id;
        });
    }
}

export default CardListPresenter;