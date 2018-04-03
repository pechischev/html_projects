import Component from '../../common/component/Component';
import EditableTitleView from './EditableTitleView';
import Card from '../model/Card';
import Dispatcher from '../../common/event/Dispatcher';

class CardView extends Component {
    private _card: Card;
    private _removeCardEvent: Dispatcher;

    constructor(card: Card) {
        super({className: 'card'});

        this._card = card;
        this._removeCardEvent = new Dispatcher();

        const removeCardIcon = new Component({className: 'remove-card-icon remove-icon'});
        removeCardIcon.setTextContent('X');
        removeCardIcon.listen('click', () => this._removeCardEvent.dispatch());
        this.addChild(removeCardIcon);

        const titleContainer = new EditableTitleView(card);
        this.addChild(titleContainer);
    }

    removeCardEvent(): Dispatcher {
        return this._removeCardEvent;
    }

    card(): Card {
        return this._card;
    }
}

export default CardView;