import { IDispatcher } from "common/event/IDispatcher";
import { ArrayUtils } from "common/utils/ArrayUtils";
import { Types } from "common/types/Types";
import { isFunction } from "util";

interface IDispatcherItem {
	callback: Types.Handler;
	scope?: object | null;
	priority?: number;
}

export class Dispatcher implements IDispatcher {
	private _listeners: IDispatcherItem[] = [];

	addListener(callback: Types.Handler, scope: object = null) {
		if (!isFunction(callback)) {
			return;
		}
		if (this._hasListener(callback)) {
			return;
		}
		this._listeners.push({callback, scope});
	}

	dispatch<T>(args?: T) {
		const params = arguments;
		this._listeners.forEach((listener) => {
			if (!listener.callback) {
				return;
			}
			listener.callback.call(listener.scope, params);
		});
	}

	removeListener(callback: Types.Handler, scope: object = null) {
		const index = ArrayUtils.findIndex(this._listeners, (obj: IDispatcherItem) => {
			return obj.callback == callback && obj.scope === scope;
		});
		if (index == -1) {
			return;
		}
		this._listeners.splice(index, 1);
	}

	private _hasListener(callback: Types.Handler): boolean {
		return !!ArrayUtils.find(this._listeners, (obj: any) => {
			return obj.callback == callback;
		});
	}
}
