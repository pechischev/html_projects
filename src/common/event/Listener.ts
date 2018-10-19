import { Dispatcher } from "common/event/Dispatcher";
import { IDispatcher } from "common/event/IDispatcher";
import { Types } from "common/types/Types";
import { IListener } from "./IListener";
import Handler = Types.Handler;

export class Listener implements IListener {
	private readonly _handlers: Map<string, IDispatcher> = new Map<string, Dispatcher>();

	listen(event: string, handler: Handler, scope?: object) {
		if (!this._handlers.has(event)) {
			this._handlers.set(event, new Dispatcher());
		}
		const item = this._handlers.get(event);
		if (!item) {
			return;
		}
		item.addListener(handler, scope);
	}

	unlisten(event: string, handler: Handler, scope?: object) {
		const item = this._handlers.get(event);
		if (!item) {
			return;
		}
		item.removeListener(handler, scope);
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
