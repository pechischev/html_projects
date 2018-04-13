import List from 'kanban/model/List';
import User from 'kanban/model/User';

interface IStorableState {
    lists: Array<List>;
    user?: User;
    error?: Error;
}

export default IStorableState;