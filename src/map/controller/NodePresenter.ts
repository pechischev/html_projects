import { Listener } from "common/event/Listener";
import { INode } from "map/model/node/INode";
import { SelectionController } from "map/controller/SelectionController";
import { INodeGroup } from "map/model/node/INodeGroup";
import { NodeGroup } from "map/model/node/NodeGroup";

export class NodePresenter extends Listener {
	private _selectController = new SelectionController();
	private _nodes: INode[] = [];
	private _groups: string[] = [];

	setSelection(items: INode[]) {
		const ids = items.map((item: INode) => item.id());
		this._selectController.setSelection(ids);
	}

	getSelection(): INode[] {
		return this._nodes.filter((node: INode) => this._selectController.isSelected(node.id()));
	}

	appendNodes(nodes: INode[] = []) {
		const newNodes = nodes.filter((node: INode) => !this.hasNodeById(node.id()));
		if (!newNodes.length) {
			return;
		}
		this._nodes.push(...newNodes);
		this.setSelection(newNodes);
	}

	removeNodes(nodes: INode[] = []) {
		nodes.forEach((node: INode) => {
			if (this.isGroup(node.id())) {
				this.removeNodes(this.getChildren(node));
				this.removeGroup(node as INodeGroup);
			}
			const index = this.getNodeIndex(node.id());
			if (index == -1) {
				return;
			}
			this._nodes.splice(index, 1);
			this._selectController.deselect(node.id());
		});
	}

	nodes(): INode[] {
		return this._nodes;
	}

	group(items: INode[], parent: INodeGroup = null) {
		const length = items.length;
		if (!length) {
			return;
		}
		const group = new NodeGroup(); // TODO: don't create group
		group.appendChildren(items);

		if (parent) {
			parent.removeChildren(items);
			parent.appendChildren([group]);
		}
		this.appendNodes([group]);
		this._groups.push(group.id());
	}

	ungroup(items: INode[], parent: INodeGroup = null) {
		const length = items.length;
		if (!length) {
			return;
		}
		const groups = items.filter((item: INode) => this.isGroup(item.id())) as INodeGroup[];
		for (const group of groups) {
			const children = this.getChildren(group);
			group.removeChildren(children);
			this.removeGroup(group);

			if (parent) {
				parent.removeChildren([group]);
				parent.appendChildren(children);
			}
		}
		this.removeNodes(groups);
	}

	getGroupNodes(): INodeGroup[] {
		return this._nodes.filter((node: INode) => this.isGroup(node.id())) as INodeGroup[];
	}

	getChildren(group: INode): INode[] {
		const groupItem = this.getNodeById(group.id()) as INodeGroup;
		if (!groupItem) {
			return [];
		}
		return groupItem.children().map((id: string) => this.getNodeById(id));
	}

	isGroup(id: string): boolean {
		return this._groups.indexOf(id) > -1;
	}

	getParent(child: INode): INodeGroup|null {
		if (!child.parent()) {
			return null;
		}
		return this.getNodeById(child.parent()) as INodeGroup;
	}

	private hasNodeById(id: string): boolean {
		return this.getNodeIndex(id) > -1;
	}

	private getNodeIndex(id: string): number {
		return this._nodes.findIndex((node: INode) => node.id() == id);
	}
	
	private getNodeById(id: string): INode|null  {
		const index = this.getNodeIndex(id); 
		const node = this._nodes[index];
		return node || null;
	}

	private removeGroup(group: INodeGroup) {
		const index = this._groups.indexOf(group.id());
		if (index < 0) {
			return;
		}
		this._groups.splice(index, 1);
	}
}
