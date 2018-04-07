import Action from './Action';
import Card from '../model/Card';
import { default as Actions } from '../action/Actions';

class ActionCreator {
    static appendActions(): Action {
        return {type: Actions.APPEND_LIST};
    }

    static removeActions(id: string): Action {
        return {type: Actions.REMOVE_LIST, context: { id }};
    }

    static appendCardAction(id: string): Action {
        return {type: Actions.APPEND_CARD, context: { id }};
    }

    static removeCardAction(listId: string, card: Card): Action {
        return {type: Actions.REMOVE_CARD, context: {id: listId, card}};
    }

    static authAction(email: string, password: string): Action {
        return {type: Actions.AUTH, context: {email, password}};
    }
}

export default ActionCreator;