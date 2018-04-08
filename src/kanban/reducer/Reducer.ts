import ApplicationAction from '../action/ApplicationAction';
import ListHelper from '../controller/ListHelper';
import IStorableState from '../storage/IStorableState';
import Action from '../action/Action';

const Reducer = (state: IStorableState = {lists: []}, action: Action) => {
    const {type, context} = action;
    switch (type) {
        case ApplicationAction.APPEND_LIST:
            return ListHelper.appendList(state);
        case ApplicationAction.APPEND_CARD:
            return ListHelper.appendCardToList(state, context);
        case ApplicationAction.REMOVE_LIST:
            return ListHelper.removeList(state, context);
        case ApplicationAction.REMOVE_CARD:
            return ListHelper.removeCard(state, context);
        case ApplicationAction.AUTH:
            return ListHelper.auth(state, context);
        case ApplicationAction.EXIT_FROM_SESSION:
            return ListHelper.exitFromSession(state);
        case ApplicationAction.UPDATE_ITEM:
            return state;
        case ApplicationAction.MOVE_CARD:
            return ListHelper.moveCard(state, context);
        case ApplicationAction.MOVE_LIST:
            return ListHelper.moveList(state, context);
        default:
            return state;
    }
};

export default Reducer;