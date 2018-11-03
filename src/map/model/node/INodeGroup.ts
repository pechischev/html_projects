import { INode } from "map/model/node/INode";

export interface INodeGroup extends INode {
	addChild(child: INode);
	removeChild(child: INode);

	appendChildren(children: INode[]);
	removeChildren(children: INode[]);

	children(): string[];

	contains(item: INode): boolean;
}