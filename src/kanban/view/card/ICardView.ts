import { IMemoryStorage } from "kanban/view/memoryStorage/IMemoryStorage";
import { Card } from "kanban/model/Card";

export interface ICardView extends IMemoryStorage {
    card: Card;
    index: number;
    listId: string;
}