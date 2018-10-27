import { INode } from "./INode";
import { INodeGroup } from "./INodeGroup";
import { AbstractNode } from "./AbstractNode";

export class NodeGroup extends AbstractNode implements INodeGroup {
	private readonly _children: INode[] = [];

	addChild(child: INode) {
		if (child.id() == this.id()) {
			return;
		}
		if (this.contains(child)) {
			return;
		}
		this._children.push(child);
	}

	removeChild(child: INode) {
		if (child.id() == this.id()) {
			return;
		}
		if (!this.contains(child)) {
			return;
		}
		const index = this._children.findIndex((item: INode) => item.id() == child.id());
		this._children.splice(index, 1);
	}

	children(): INode[] {
		return this._children;
	}

	contains(item: INode): boolean {
		return !!this._children.find((child: INode) => child.id() == item.id());
	}
}