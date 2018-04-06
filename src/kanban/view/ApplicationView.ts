import Component from '../../common/component/Component';
import CardListView from './CardListView';
import CardList from '../model/CardList';
import CardController from '../controller/CardController';
import Dispatcher from '../../common/event/Dispatcher';
import ListMovementController from '../controller/ListMovementController';
import CardListPresenter from '../controller/CardListPresenter';
import TagName from '../../common/dom/TagName';

const APPEND_LIST_BUTTON_TEXT = 'Append List';

class ApplicationView extends Component {
    private _cardListViews: Array<CardListView>;
    private _itemsContainer: Component;
    private _cardController: CardController;
    private _listPresenter: CardListPresenter;
    private _movementController: ListMovementController;

    constructor() {
        super({className: 'application'});

        this._cardListViews = [];

        this._itemsContainer = new Component({className: 'items-container'});
        this.addChild(this._itemsContainer);

        this._movementController = new ListMovementController(this._cardListViews, this._itemsContainer);
        this._listPresenter = new CardListPresenter(this);

        const appendListButton = new Component({
            className: 'append-list',
            tagName: TagName.BUTTON
        });
        appendListButton.setTextContent(APPEND_LIST_BUTTON_TEXT);
        this.addChild(appendListButton);
        appendListButton.listen('click', () => {
            this._listPresenter.appendList();
        });

        this._cardController = this._listPresenter.cardController();
        this._movementController.changeListPositionEvent().addListener((list: CardList, index: number) => this._listPresenter.insertList(list, index));
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
        itemView.removeEvent().addListener((list: CardList) => this._listPresenter.removeList(list));
        itemView.listen('mousedown', (event: MouseEvent) => {
            if (event.defaultPrevented)
            {
                return;
            }
            this._movementController.move(itemView, event);
            event.preventDefault();
        });
        return itemView;
    }
}

export default ApplicationView;