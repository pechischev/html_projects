import BaseItem from './BaseItem';
import Message from '../message/Message';

class Card extends BaseItem {
    constructor(title?: string, id?: string) {
        super(title || Message.DEFAULT_CARD_TEXT, id);
    }
}

export default Card;