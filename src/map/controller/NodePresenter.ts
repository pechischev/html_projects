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

	getSelectionNodes(): INode[] {
		return this._nodes.filter((node: INode) => this._selectController.isSelected(node.id()));
	}

	selection(): string[] {
		return this._selectController.getSelectedItems();
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

	group() {
		const selectedItems = this.getSelectionNodes();
		const length = selectedItems.length;
		if (!length || length < 2) {
			return;
		}
		const group = new NodeGroup();
		for (const item of selectedItems) {
			group.addChild(item);
		}
		this.appendNodes([group]);
		this._groups.push(group.id());
	}

	ungroup() {
		const selectedItems = this.getSelectionNodes();
		const length = selectedItems.length;
		if (!length) {
			return;
		}
		const groups = selectedItems.filter((item: INode) => this.isGroupNode(item.id())) as INodeGroup[];
		for (const group of groups) {
			const children = this.getChildrenByGroup(group);
			for (const child of children) {
				group.removeChild(child);
			}
			const index = this._groups.indexOf(group.id());
			this._groups.splice(index, 1);
		}
		this.removeNodes(groups);
	}

	getGroupNodes(): INode[] {
		return this._nodes.filter((node: INode) => this.isGroupNode(node.id()));
	}

	getChildrenByGroup(group: INode): INode[] {
		const groupItem = this.getNodeById(group.id()) as INodeGroup;
		if (!groupItem) {
			return [];
		}
		return groupItem.children().map((id: string) => this.getNodeById(id));
	}

	private getParent(child: INode): INodeGroup|null {
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

	private isGroupNode(id: string): boolean {
		return this._groups.indexOf(id) > -1;
	}
}
