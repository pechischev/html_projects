import List from '../model/List';
import Card from '../model/Card';
import User from '../model/User';

interface IUserData {
    user: User;
    lists: Array<List>;
}

class UserDataLoader {
    static load(json: any): IUserData {
        const user = new User(json.user.email, json.user.password);
        const lists = [];
        for (const listJson of json.lists) {
            const list = new List(listJson.title, listJson.id);
            for (const cardJson of listJson.cards) {
                const card = new Card(cardJson.title, cardJson.id);
                list.appendCard(card);
            }
            lists.push(list);
        }
        return {user, lists};
    }

    static getUserData(email: string, password: string): any {
        const data = JSON.parse(localStorage.getItem("trello"));
        if (!data)
        {
            return null;
        }

        return data.find((dataItem: any) => (dataItem.user.email === email && dataItem.user.password == password));
    }

    static userExists(email: string): boolean {
        const data = JSON.parse(localStorage.getItem("trello"));
        if (!data)
        {
            return false;
        }
        return !!data.find((dataItem: any) => (dataItem.user.email === email));
    }
}

export default UserDataLoader;