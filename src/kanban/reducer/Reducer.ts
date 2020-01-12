import { AppActions } from "kanban/action/AppActions";
import { ApplicationHelper } from "kanban/controller/ApplicationHelper";
import { IStorableState } from "kanban/storage/IStorableState";
import { IAction } from "kanban/action/IAction";

export const Reducer = (state: IStorableState = {lists: []}, action: IAction) => {
    const {type, context} = action;
    switch (type) {
        case AppActions.APPEND_LIST:
            return ApplicationHelper.appendList(state);
        case AppActions.APPEND_CARD:
            return ApplicationHelper.appendCardToList(state, context);
        case AppActions.REMOVE_LIST:
            return ApplicationHelper.removeList(state, context);
        case AppActions.REMOVE_CARD:
            return ApplicationHelper.removeCard(state, context);
        case AppActions.AUTH:
            return ApplicationHelper.auth(state, context);
        case AppActions.EXIT_FROM_SESSION:
            return ApplicationHelper.exitFromSession(state);
        case AppActions.UPDATE_ITEM:
            return state;
        case AppActions.MOVE_CARD:
            return ApplicationHelper.moveCard(state, context);
        case AppActions.MOVE_LIST:
            return ApplicationHelper.moveList(state, context);
        default:
            return state;
    }
};