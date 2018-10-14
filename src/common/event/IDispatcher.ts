import { Types } from "common/types/Types";

export interface IDispatcher {

	addListener(callback: Types.Handler, scope?: object): void;

	dispatch<T>(args?: T): void;

	removeListener(callback: Types.Handler, scope?: object): void;
}
