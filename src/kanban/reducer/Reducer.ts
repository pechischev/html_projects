import ApplicationAction from '../action/ApplicationAction';
import ApplicationHelper from '../controller/ApplicationHelper';
import IStorableState from '../storage/IStorableState';
import Action from '../action/Action';

const Reducer = (state: IStorableState = {lists: []}, action: Action) => {
    const {type, context} = action;
    switch (type) {
        case ApplicationAction.APPEND_LIST:
            return ApplicationHelper.appendList(state);
        case ApplicationAction.APPEND_CARD:
            return ApplicationHelper.appendCardToList(state, context);
        case ApplicationAction.REMOVE_LIST:
            return ApplicationHelper.removeList(state, context);
        case ApplicationAction.REMOVE_CARD:
            return ApplicationHelper.removeCard(state, context);
        case ApplicationAction.AUTH:
            return ApplicationHelper.auth(state, context);
        case ApplicationAction.EXIT_FROM_SESSION:
            return ApplicationHelper.exitFromSession(state);
        case ApplicationAction.UPDATE_ITEM:
            return state;
        case ApplicationAction.MOVE_CARD:
            return ApplicationHelper.moveCard(state, context);
        case ApplicationAction.MOVE_LIST:
            return ApplicationHelper.moveList(state, context);
        default:
            return state;
    }
};

export default Reducer;