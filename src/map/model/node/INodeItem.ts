import { INode } from "map/model/node/INode";

export interface INodeItem extends INode {
	setType(type: string);

	type(): string;
}