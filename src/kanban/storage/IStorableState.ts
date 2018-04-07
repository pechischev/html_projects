import List from '../model/List';
import User from '../model/User';

interface IStorableState {
    lists: Array<List>;
    user?: User;
}

export default IStorableState;