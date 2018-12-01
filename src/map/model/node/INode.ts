import { IContent } from "map/model/content/IContent";

export interface INode {
	id(): string;

	setParent(id: string);

	parent(): string|null;

	setContent(content: IContent);

	content(): IContent|null;
}