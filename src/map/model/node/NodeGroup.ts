import { INode } from "./INode";
import { INodeGroup } from "./INodeGroup";
import { Node } from "./Node";

export class NodeGroup extends Node implements INodeGroup {
	private readonly _children: string[] = [];

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

	private addChild(child: INode) {
		if (child.id() == this.id()) {
			return;
		}
		if (this.contains(child)) {
			return;
		}
		child.setParent(this.id());
		this._children.push(child.id());
	}

	private removeChild(child: INode) {
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
}