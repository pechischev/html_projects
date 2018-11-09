import { IListener } from "common/event/IListener";
import { IContent } from "map/model/content/IContent";

export interface INode extends IListener {
	id(): string;

	setParent(id: string);

	parent(): string|null;

	setContent(content: IContent);

	content(): IContent|null;
}