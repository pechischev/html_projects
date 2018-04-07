import { default as ListAction } from '../action/ListAction';
import ListHelper from '../controller/ListHelper';
import IStorableState from '../storage/IStorableState';
import Action from '../action/Action';

const LineReducer = (state: IStorableState = {lists: []}, action: Action) => {
    const {type, context} = action;
    switch (type) {
        case ListAction.APPEND_LIST:
            return ListHelper.appendList(state);
        case ListAction.APPEND_CARD:
            return ListHelper.appendCardToList(state, context);
        case ListAction.REMOVE_LIST:
            return ListHelper.removeList(state, context);
        case ListAction.REMOVE_CARD:
            return ListHelper.removeCard(state, context);
        default:
            return state;
    }
};

export default LineReducer;