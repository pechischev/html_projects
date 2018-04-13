import Action from 'kanban/action/Action';
import Card from 'kanban/model/Card';
import ApplicationAction from 'kanban/action/ApplicationAction';
import { DraggableLocation } from 'react-beautiful-dnd';

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

    static moveCardAction(destination: DraggableLocation, source: DraggableLocation): Action {
        return {type: ApplicationAction.MOVE_CARD, context: {destination, source}};
    }

    static moveListAction(context: {listId: string, oldIndex: number, newIndex: number}): Action {
        return {type: ApplicationAction.MOVE_LIST, context};
    }
}

export default ActionCreator;