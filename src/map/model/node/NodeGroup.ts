import { INode } from "./INode";
import { INodeGroup } from "./INodeGroup";
import { AbstractNode } from "./AbstractNode";

export class NodeGroup extends AbstractNode implements INodeGroup {
	private readonly _children: string[] = [];

	addChild(child: INode) {
		if (child.id() == this.id()) {
			return;
		}
		if (this.contains(child)) {
			return;
		}
		child.setParent(this.id());
		this._children.push(child.id());
	}

	removeChild(child: INode) {
		if (child.id() == this.id()) {
			return;
		}
		if (!this.contains(child)) {
			return;
		}
		child.setParent(null);
		const index = this._children.findIndex((id: string) => id == child.id());
		this._children.splice(index, 1);
	}

	appendChildren(children: INode[]) {
		for (const child of children) {
			this.addChild(child);
		}
	}

	removeChildren(children: INode[]) {
		for (const child of children) {
			this.removeChild(child);
		}
	}

	children(): string[] {
		return this._children;
	}

	contains(item: INode): boolean {
		return !!this._children.find((id: string) => id == item.id());
	}
}