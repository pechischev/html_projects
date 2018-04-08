import List from '../model/List';
import Card from '../model/Card';
import User from '../model/User';
import IStorableState from '../storage/IStorableState';
import UserDataLoader from './Loader';
import { DraggableLocation } from 'react-beautiful-dnd';
import ArrayUtils from '../../common/utils/ArrayUtils';
import Config from '../config/Config';

class ListHelper { // TODO: rename to ApplicationHelper
    static auth(state: IStorableState, context: {email: string, password: string}): IStorableState {
        const {email, password} = context;
        state.error = null;

        if (email.match(Config.EMAIL_PATTERN))
        {
            if (!UserDataLoader.userExists(email))
            {
                state.user = new User(email, password);
                return state;
            }
            const data = UserDataLoader.getUserData(email, password);
            if (!data)
            {
                state.error = new Error("Error! Check the correctness of the entered data");
            }
            else
            {
                const {user, lists} = UserDataLoader.load(data);
                state.user = user;
                state.lists = lists;
            }
        }
        else
        {
            state.error = new Error("Error! Email is not correct. Please enter the email again");
        }
        return state;
    }

    static exitFromSession(state: IStorableState) {
        state.user = null;
        state.lists = [];
        return state;
    }

    static moveList(state: IStorableState, context: any): IStorableState {
        const {listId, oldIndex, newIndex} = context;
        let lists = state.lists.slice();
        state.lists = ArrayUtils.replacePositionTo(lists, oldIndex, newIndex);
        return state;
    }

    static moveCard(state: IStorableState, context: {destination: DraggableLocation, source: DraggableLocation}): IStorableState {
        const sourceListId = context.source.droppableId;
        const oldIndex = context.source.index;

        const targetListId = context.destination.droppableId;
        const newIndex = context.destination.index;

        const lists = state.lists.slice();
        const sourceListIndex = lists.findIndex((list: List) => list.id() == sourceListId);
        const currentList = lists[sourceListIndex];

        if (sourceListId == targetListId)
        {
            const cards = ArrayUtils.replacePositionTo(currentList.cards(), oldIndex, newIndex);
            currentList.setCards(cards);
        }
        else
        {
            const targetListIndex = lists.findIndex((list: List) => list.id() == targetListId);
            const card = currentList.cards()[oldIndex];
            currentList.removeCard(card);
            lists[targetListIndex].insertCardTo(card, newIndex);
        }

        state.lists = lists;
        return state;
    }

    static appendList(state: IStorableState): IStorableState {
        state.lists.push(new List());
        return state;
    }

    static appendCardToList(state: IStorableState, context: {id: string}): IStorableState {
        const {id} = context;
        const card = new Card();
        const list = this.getListById(id, state.lists);
        if (list)
        {
            list.appendCard(card);
        }
        return state;
    }

    static removeList(state: IStorableState, context: {id: string}): IStorableState {
        const {id} = context;
        const index = this.getListIndexById(id, state.lists);
        if (index != -1)
        {
            state.lists.splice(index, 1);
        }
        return state;
    }

    static removeCard(state: IStorableState, context: {id: string, card: Card}): IStorableState {
        const {id, card} = context;
        const list = this.getListById(id, state.lists);
        if (list)
        {
            list.removeCard(card);
        }
        return state;
    }

    static getListIndexById(id: string, lists: Array<List>): number {
        return lists.findIndex((listItem: List) => id == listItem.id());
    }

    static getListById(id: string, lists: Array<List>): List|undefined {
        const index = this.getListIndexById(id, lists);
        if (index == -1)
        {
            return undefined;
        }
        return lists[index];
    }
}

export default ListHelper;