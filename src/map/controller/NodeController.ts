import { Disposable } from "common/component/Disposable";
import { NodeList } from "map/controller/NodeList";
import { SelectionList } from "map/controller/SelectionList";
import { WorkArea } from "map/view/WorkArea";
import { NodeFactory } from "map/controller/factory/NodeFactory";
import { INode } from "map/model/node/INode";
import { INodeGroup } from "map/model/node/INodeGroup";

export class NodeController extends Disposable {
	private _nodeList = new NodeList();
	private _selectionList: SelectionList;
	private _view: WorkArea;

	constructor(selectionList: SelectionList, view: WorkArea) {
		super();

		this._selectionList = selectionList;
		this._view = view;

		this.addListener(this._view.clickItemEvent(), this.changeSelection, this);
		this.addListener(this._view.clickLayerEvent(), () => this._selectionList.setSelection([]));
		this.addListener(this._selectionList.changeSelectionEvent(), this.updateSelection, this);

		this.addListener(this._nodeList.groupEvent(), this.renderView, this);
		this.addListener(this._nodeList.ungroupEvent(), this.renderView, this);

	}

	appendNode() {
		const node = NodeFactory.createItem();
		this._nodeList.appendNodes([node]);
		this.renderView([node], []);
		this.changeSelection(node.id());
	}

	removeNode() {
		const selection = this._selectionList.getSelection();
		const nodes = this._nodeList.getNodesById(selection);
		this._nodeList.removeNodes(nodes);
		this.renderView([], nodes);
	}

	group() {
		const selection = this._selectionList.getSelection();
		if (selection.length < 2) {
			return;
		}
		const nodes = this._nodeList.getNodesById(selection);
		const group = NodeFactory.createGroup("group");
		this._nodeList.group(nodes, group);
	}

	ungroup() {
		const selection = this._selectionList.getSelection();
		const nodes = this._nodeList.getNodesById(selection);
		const groups = nodes.filter((item: INode) => this._nodeList.isGroup(item.id())) as INodeGroup[];
		this._nodeList.ungroup(groups);
	}

	private changeSelection(id: string, isMulti?: boolean) {
		this._selectionList.setSelection([id], isMulti);
	}

	private updateSelection() {
		this._view.updateSelection(this._selectionList.getSelection());
	}

	private renderView(appended: INode[], removed: INode[]) {
		this._view.update(appended, removed);
	}
}