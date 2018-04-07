import { default as Actions } from '../action/Actions';
import ListHelper from '../controller/ListHelper';
import IStorableState from '../storage/IStorableState';
import Action from '../action/Action';

const Reducer = (state: IStorableState = {lists: []}, action: Action) => {
    const {type, context} = action;
    switch (type) {
        case Actions.APPEND_LIST:
            return ListHelper.appendList(state);
        case Actions.APPEND_CARD:
            return ListHelper.appendCardToList(state, context);
        case Actions.REMOVE_LIST:
            return ListHelper.removeList(state, context);
        case Actions.REMOVE_CARD:
            return ListHelper.removeCard(state, context);
        case Actions.AUTH:
            return ListHelper.auth(state, context);
        default:
            return state;
    }
};

export default Reducer;