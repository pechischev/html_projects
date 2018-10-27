import { INode } from "map/model/node/INode";
import { IListener } from "common/event/IListener";

export interface INodeGroup extends INode, IListener {
	addChild(child: INode);

	removeChild(child: INode);

	children(): INode[];

	contains(item: INode): boolean;
}