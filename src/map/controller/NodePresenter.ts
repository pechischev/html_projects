import { Listener } from "common/event/Listener";
import { INode } from "map/model/node/INode";
import { SelectController } from "map/controller/SelectController";
import { NodeGroup } from "map/model/node/NodeGroup";

export class NodePresenter extends Listener {
	private _selectController = new SelectController();
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
		const addedNodes = nodes.filter((node: INode) => !this.hasNodeById(node.id()));
		if (!addedNodes.length) {
			return;
		}
		this._nodes.push(...addedNodes);
		this.setSelection(addedNodes);
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

	}

	ungroup() {

	}

	getGroupNodes(): NodeGroup[] {
		return this._nodes.filter((node: INode) => this._groups.indexOf(node.id()) > -1) as NodeGroup[];
	}

	private hasNodeById(id: string): boolean {
		return this.getNodeIndex(id) > -1;
	}

	private getNodeIndex(id: string): number {
		return this._nodes.findIndex((node: INode) => node.id() == id)
	}
}
