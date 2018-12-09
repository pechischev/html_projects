import { IDispatcher } from "common/event/IDispatcher";

export interface IContent {
	readonly changedTitle: IDispatcher;

	title(): string;

	setTitle(title: string);
}
