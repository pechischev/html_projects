import { Dispatcher } from "common/event/Dispatcher";
import { IDispatcher } from "common/event/IDispatcher";
import { Types } from "common/types/Types";
import Component from "./Component";
import { IDisposable } from "./IDisposable";

export class Disposable implements IDisposable {
	private _listenedEvents: Map<IDisposable, Map<string, IDispatcher>> = new Map();
	private _listenedEventsCleaners: Map<IDisposable, Map<string, () => void>> = new Map();
	private _dependentObjectHandlersIds: Map<IDisposable, number[]> = new Map();
	private _handlerCleaners: Array<() => void> = [];
	private _dependentObjects: IDisposable[] = [];

	dispose() {
		this.destruct();
		this.removeDependency(...this._dependentObjects);
		for (const handlerCleaner of this._handlerCleaners) {
			handlerCleaner();
		}
		for (const dependentObject of this._dependentObjects) {
			dependentObject.dispose();
		}
		delete this._dependentObjects;
		delete this._handlerCleaners;
		delete this._listenedEvents;
	}

	protected destruct() {
		// Can override
	}

	protected createDispatcher(): IDispatcher {
		const dispatcher = new Dispatcher();
		this.addDisposable(dispatcher);
		return dispatcher;
	}

	protected addDisposable(dependentObject: IDisposable) {
		this._dependentObjects.push(dependentObject);
		this._dependentObjectHandlersIds.set(dependentObject, []);
		this._listenedEvents.set(dependentObject, new Map());
		this._listenedEventsCleaners.set(dependentObject, new Map());
	}

	protected removeDisposable(dependentObject: IDisposable) {
		this.removeDependency(dependentObject);
		this._dependentObjects.splice(this._dependentObjects.indexOf(dependentObject), 1);
		dependentObject.dispose();
	}

	protected addListener(dispatcher: IDispatcher, handler: Types.Handler, scope: object = null): number {
		dispatcher.addListener(handler, scope);
		const handlerCleanerId = this._handlerCleaners.length;
		this._handlerCleaners.push(() => {
			dispatcher.removeListener(handler, scope);
		});
		return handlerCleanerId;
	}

	protected removeListener(handlerId: number) {
		if (!this._handlerCleaners.hasOwnProperty(handlerId)) {
			throw new Error(`No event with id ${handlerId}`);
		}
		this._handlerCleaners[handlerId]();
		delete this._handlerCleaners[handlerId];
		for (const [, ids] of this._dependentObjectHandlersIds) {
			ids.splice(ids.indexOf(handlerId), 1);
		}
	}

	protected listen(type: string, target: Component, handler: (event: Event) => void): number {
		if (!this._listenedEvents.has(target)) {
			this._listenedEvents.set(target, new Map());
			this._listenedEventsCleaners.set(target, new Map());
		}
		const componentEvents = this._listenedEvents.get(target);
		const componentEventsCleaner = this._listenedEventsCleaners.get(target);
		if (!componentEvents.has(type)) {
			const event = this.createDispatcher();
			componentEvents.set(type, event);

			const dispatchEvent = (browserEvent: Event) => event.dispatch(browserEvent);

			target.displayObject().addEventListener(type, dispatchEvent);
			componentEventsCleaner.set(type, () => target.displayObject().removeEventListener(type, dispatchEvent));
		}
		const handlerId = this.addListener(componentEvents.get(type), handler);

		if (!this._dependentObjectHandlersIds.has(target)) {
			this._dependentObjectHandlersIds.set(target, []);
		}
		this._dependentObjectHandlersIds.get(target).push(handlerId);
		return handlerId;
	}

	protected unlisten(id: number) {
		this.removeListener(id);
		for (const [dependentObject, ids] of this._dependentObjectHandlersIds) {
			if (!ids.length) {
				this.removeDependency(dependentObject);
			}
		}
	}

	private removeDependency(...dependentObjects: IDisposable[]) {
		for (const dependentObject of dependentObjects) {
			for (const handlerId of this._dependentObjectHandlersIds.get(dependentObject)) {
				this.removeListener(handlerId);
			}
			for (const cleaner of this._listenedEventsCleaners.get(dependentObject).values()) {
				cleaner();
			}
			this._listenedEventsCleaners.delete(dependentObject);
			this._dependentObjectHandlersIds.delete(dependentObject);
			this._listenedEvents.delete(dependentObject);
		}
	}
}