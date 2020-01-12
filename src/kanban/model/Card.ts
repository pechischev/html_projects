import { BaseItem } from "kanban/model/BaseItem";
import { Message } from "kanban/config/Message";

export class Card extends BaseItem {
    constructor(title?: string, id?: string) {
        super(title || Message.DEFAULT_CARD_TEXT, id);
    }
}