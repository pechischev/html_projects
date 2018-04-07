import { default as ListAction } from '../action/ListAction';
import ListHelper from '../controller/ListHelper';
import IStorableState from '../store/IStorableState';

const lineReducer = (state: IStorableState = {lists: []}, action: {type: string, content: any}) => {
    const {type, content} = action;
    switch (type) {
        case ListAction.APPEND_LIST:
            return ListHelper.appendList(state);
        case ListAction.APPEND_CARD:
            return ListHelper.appendCardToList(state, content);
        case ListAction.REMOVE_LIST:
            return ListHelper.removeList(state, content);
        case ListAction.REMOVE_CARD:
            return ListHelper.removeCard(state, content);
        default:
            return state;
    }
};

export default lineReducer;