import IStorableState from 'kanban/storage/IStorableState';
import List from 'kanban/model/List';
import Card from 'kanban/model/Card';
import User from 'kanban/model/User';
import Config from 'kanban/config/Config';
import ArrayUtils from 'common/utils/ArrayUtils';
import Utils from 'common/utils/Utils';

class Serializer {
    private _data: Array<any>;

    constructor() {

        this._data = [];
    }

    init() {
        const data = this._getDataFromLocaleStorage();
        if (!data)
        {
            Utils.getStorage().setItem(Config.APP_NAME, JSON.stringify([]));
        }
    }

    save(state: IStorableState) {
        if (state.error || !state.user)
        {
            return;
        }
        const data = this._getDataFromLocaleStorage();
        const storageData = {
            user: this._serializeUser(state.user),
            lists: this._serializeLists(state.lists)
        };

        const currentUser = ArrayUtils.find(data, (dataItem: any) => (dataItem.user.email === storageData.user.email));
        if (!currentUser)
        {
            data.push(storageData);
        }
        else
        {
            currentUser.lists = storageData.lists;
        }

        Utils.getStorage().setItem(Config.APP_NAME, JSON.stringify(data));
    }

    private _serializeUser(user: User): any {
        return {
            email: user.email(),
            password: user.password()
        };
    }

    private _serializeLists(lists: Array<List>): any[] {
        const listsJson = [];
        for (const list of lists)
        {
            const json = {
                id: list.id(),
                title: list.title(),
                cards: this._serializeCards(list.cards())
            };

            listsJson.push(json);
        }
        return listsJson;
    }

    private _serializeCards(cards: Array<Card>): any[] {
        const cardsJson = [];
        for (const card of cards)
        {
            const json = {
                id: card.id(),
                title: card.title()
            };
            cardsJson.push(json);
        }
        return cardsJson;
    }

    private _getDataFromLocaleStorage(): any {
        return JSON.parse(Utils.getStorage().getItem(Config.APP_NAME));
    }
}

export default Serializer;