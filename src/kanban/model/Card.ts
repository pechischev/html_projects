import BaseItem from 'kanban/model/BaseItem';
import Message from 'kanban/message/Message';

class Card extends BaseItem {
    constructor(title?: string, id?: string) {
        super(title || Message.DEFAULT_CARD_TEXT, id);
    }
}

export default Card;