import { IDispatcher } from "common/event/IDispatcher";
import { Types } from "common/types/Types";

export interface IListener {
	listen(event: string, handler: Types.Handler);

	unlisten(event: string, handler: Types.Handler);

	dispatch<T>(event: string, value?: T);

	getListener(event: string): IDispatcher;
}