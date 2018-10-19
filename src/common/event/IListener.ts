import { IDispatcher } from "common/event/IDispatcher";
import { Types } from "common/types/Types";

export interface IListener {
	listen(event: string, handler: Types.Handler, scope?: object);

	unlisten(event: string, handler: Types.Handler, scope?: object);

	dispatch<T>(event: string, value?: T);

	getListener(event: string): IDispatcher;
}