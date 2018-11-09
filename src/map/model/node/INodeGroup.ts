import { INode } from "map/model/node/INode";

export interface INodeGroup extends INode {
	appendChildren(children: INode[]);

	removeChildren(children: INode[]);

	children(): string[];

	contains(item: INode): boolean;
}