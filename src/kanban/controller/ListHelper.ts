import List from '../model/List';
import Card from '../model/Card';
import IStorableState from '../storage/IStorableState';

class ListHelper {
    static appendList(state: IStorableState): IStorableState {
        state.lists.push(new List());
        return state;
    }

    static appendCardToList(state: IStorableState, content: any): IStorableState {
        const {id} = content;
        const card = new Card();
        const list = this.getListById(id, state.lists);
        if (list)
        {
            list.appendCard(card);
        }
        return state;
    }

    static removeList(state: IStorableState, content: any): IStorableState {
        const {id} = content;
        const index = this.getListIndexById(id, state.lists);
        if (index != -1)
        {
            state.lists.splice(index, 1);
        }
        return state;
    }

    static removeCard(state: IStorableState, content: any): IStorableState {
        const {id, card} = content;
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