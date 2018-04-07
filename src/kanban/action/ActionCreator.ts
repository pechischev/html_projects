import Action from './Action';
import Card from '../model/Card';
import { default as ListAction } from '../action/ListAction';

class ActionCreator {
    static appendListAction(): Action {
        return {type: ListAction.APPEND_LIST};
    }

    static removeListAction(id: string): Action {
        return {type: ListAction.REMOVE_LIST, context: { id }};
    }

    static appendCardAction(id: string): Action {
        return {type: ListAction.APPEND_CARD, context: { id }};
    }

    static removeCardAction(listId: string, card: Card): Action {
        return {type: ListAction.REMOVE_CARD, context: {id: listId, card}};
    }
}

export default ActionCreator;