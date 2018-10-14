import { Dispatcher } from "common/event/Dispatcher";
import { IDispatcher } from "common/event/IDispatcher";
import { Types } from "common/types/Types";
import { IListener } from "./IListener";
import Handler = Types.Handler;

export class Listener implements IListener {
	private readonly _handlers: Map<string, IDispatcher> = new Map<string, Dispatcher>();

	constructor(events: string[] = []) {
		events.forEach((event: string) => this._handlers.set(event, new Dispatcher()));
	}

	listen(event: string, handler: Handler) {
		if (!this._handlers.has(event)) {
			this._handlers.set(event, new Dispatcher());
		}
		const item = this._handlers.get(event);
		if (!item) {
			return;
		}
		item.addListener(handler);
	}

	unlisten(event: string, handler: Handler) {
		const item = this._handlers.get(event);
		if (!item) {
			return;
		}
		item.removeListener(handler);
	}

	dispatch<T>(event: string, value?: T) {
		const item = this._handlers.get(event);
		if (!item) {
			return;
		}
		item.dispatch(value);
	}

	getListener(event: string): IDispatcher | null {
		const item = this._handlers.get(event);
		return item || null;
	}
}
