import { IMemoryStorage } from "kanban/view/memoryStorage/IMemoryStorage";
import { List } from "kanban/model/List";

export interface IListView extends IMemoryStorage {
    list: List;
    index: number;
}