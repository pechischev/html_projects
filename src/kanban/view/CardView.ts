import Component from '../../common/component/Component';
import Card from '../model/Card';
import Dispatcher from '../../common/event/Dispatcher';

class CardView extends Component {
    private _card: Card;
    private _removeCardEvent: Dispatcher;

    constructor(card: Card) {
        super({className: 'card'});

        this._card = card;
        this._removeCardEvent = new Dispatcher();

        const titleContainer = new Component({ className: 'title'});
        titleContainer.setTextContent(card.title());
        this.addChild(titleContainer);

        const removeCardIcon = new Component({className: 'remove-card-icon remove-icon'});
        removeCardIcon.setTextContent('X');
        removeCardIcon.listen('click', () => this._removeCardEvent.dispatch());
        this.addChild(removeCardIcon);

        this._card.titleChangedEvent().addListener(() => {
            titleContainer.setTextContent(this._card.title());
        });
    }

    removeCardEvent(): Dispatcher {
        return this._removeCardEvent;
    }

    card(): Card {
        return this._card;
    }
}

export default CardView;