import CardList from '../model/CardList';
import Card from '../model/Card';
import IStorableState from '../store/IStorableState';

class ListHelper {
    static appendList(state: IStorableState): IStorableState {
        state.lists.push(new CardList());
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

    static getListIndexById(id: string, lists: Array<CardList>): number {
        return lists.findIndex((listItem: CardList) => id == listItem.id());
    }

    static getListById(id: string, lists: Array<CardList>): CardList|undefined {
        const index = this.getListIndexById(id, lists);
        if (index == -1)
        {
            return undefined;
        }
        return lists[index];
    }
}

export default ListHelper;