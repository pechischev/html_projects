import { List, User } from "kanban/model";

export interface IStorableState {
    lists: List[];
    user?: User;
    error?: Error;
}