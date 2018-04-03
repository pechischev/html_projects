import BaseItem from './BaseItem';

const DEFAULT_CARD_TEXT = 'Input card name';

class Card extends BaseItem {
    constructor(title?: string, id?: string) {
        super(title || DEFAULT_CARD_TEXT, id);
    }
}

export default Card;