import { Disposable } from "common/component/Disposable";
import { NodeList } from "map/controller/NodeList";
import { SelectionList } from "map/controller/SelectionList";
import { WorkArea } from "map/view/WorkArea";
import { NodeFactory } from "map/controller/factory/NodeFactory";

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

	}

	appendNode() {
		const node = NodeFactory.createItem();
		this._nodeList.appendNodes([node]);
		this._view.update([node]);
		this.changeSelection(node.id());
	}

	removeNode() {
		const selection = this._selectionList.getSelection();
		const nodes = this._nodeList.getNodesById(selection);
		this._nodeList.removeNodes(nodes);
		this._view.update([], nodes);
	}

	group() {

	}

	ungroup() {

	}

	private changeSelection(id: string, isMulti?: boolean) {
		this._selectionList.setSelection([id], isMulti);
	}

	private updateSelection() {
		this._view.updateSelection(this._selectionList.getSelection());
	}
}