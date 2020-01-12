import { IAction } from "./IAction";
import { Card } from "kanban/model";
import { AppActions } from "./AppActions";
import { DraggableLocation } from "react-beautiful-dnd";

export class ActionCreator {
    static appendActions(): IAction {
        return {type: AppActions.APPEND_LIST};
    }

    static removeActions(id: string): IAction {
        return {type: AppActions.REMOVE_LIST, context: { id }};
    }

    static appendCardAction(id: string): IAction {
        return {type: AppActions.APPEND_CARD, context: { id }};
    }

    static removeCardAction(listId: string, card: Card): IAction {
        return {type: AppActions.REMOVE_CARD, context: {id: listId, card}};
    }

    static authAction(email: string, password: string): IAction {
        return {type: AppActions.AUTH, context: {email, password}};
    }

    static exitAction(): IAction {
        return {type: AppActions.EXIT_FROM_SESSION};
    }

    static updateItemAction(): IAction {
        return {type: AppActions.UPDATE_ITEM};
    }

    static moveCardAction(destination: DraggableLocation, source: DraggableLocation): IAction {
        return {type: AppActions.MOVE_CARD, context: {destination, source}};
    }

    static moveListAction(context: {listId: string, oldIndex: number, newIndex: number}): IAction {
        return {type: AppActions.MOVE_LIST, context};
    }
}