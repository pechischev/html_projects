import Action from './Action';
import Card from '../model/Card';
import { default as ApplicationAction } from '../action/ApplicationAction';

class ActionCreator {
    static appendActions(): Action {
        return {type: ApplicationAction.APPEND_LIST};
    }

    static removeActions(id: string): Action {
        return {type: ApplicationAction.REMOVE_LIST, context: { id }};
    }

    static appendCardAction(id: string): Action {
        return {type: ApplicationAction.APPEND_CARD, context: { id }};
    }

    static removeCardAction(listId: string, card: Card): Action {
        return {type: ApplicationAction.REMOVE_CARD, context: {id: listId, card}};
    }

    static authAction(email: string, password: string): Action {
        return {type: ApplicationAction.AUTH, context: {email, password}};
    }

    static exitAction(): Action {
        return {type: ApplicationAction.EXIT_FROM_SESSION};
    }

    static updateItemAction(): Action {
        return {type: ApplicationAction.UPDATE_ITEM};
    }
}

export default ActionCreator;