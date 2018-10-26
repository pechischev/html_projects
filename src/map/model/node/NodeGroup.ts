import { INode } from "map/model/node/INode";
import { AbstractNode } from "./AbstractNode";

export class NodeGroup extends AbstractNode {
	private readonly _children: INode[] = [];

	addChild(child: INode) {

	}

	removeChild(child: INode) {

	}

	children(): INode[] {
		return this._children;
	}
}