import { SelectionList } from "map/controller/list/SelectionList";
import { notImplement } from "common/utils/tools";
import { Disposable } from "common/component/Disposable";
import { MapView } from "map/view/MapView";
import { NodeList } from "map/controller/list/NodeList";
import { INode } from "map/model/node/INode";
import { NodeFactory } from "map/controller/factory/NodeFactory";
import { INodeGroup } from "map/model/node/INodeGroup";
import { Coordinate } from "common/math/Coordinate";
import { Grid } from "map/controller/Grid";

export class MapController extends Disposable {
	private _selectionList = new SelectionList();
	private _nodeList = new NodeList();
	private _grid = new Grid();
	private _view: MapView;

	constructor(view: MapView) {
		super();
		this._view = view;

		this.addListener(this._view.clickItemEvent, (id: string, isCtrl: boolean) =>
			this.changeSelection(this._nodeList.getNodesById([id]), isCtrl)
		);
		this.addListener(this._view.clickCanvasEvent, () => this.changeSelection([]));
		this.addListener(this._view.createItemEvent, this.appendNode, this);
		this.addListener(this._view.dropItemEvent, this._grid.insert, this._grid);

		this.addListener(this._selectionList.changeSelectionEvent, this.updateSelection, this);

		this.addListener(this._nodeList.changedListEvent, this.renderView, this);
		this.addListener(this._nodeList.changedListEvent, (items: INode[]) => this.changeSelection(items));
	}

	connect() {
		notImplement();
	}

	disconnect() {
		notImplement();
	}

	appendNode(position: Coordinate) {
		const node = NodeFactory.createItem();
		this.addListener(node.changeParentEvent, () => this._grid.changeLayer(node));
		this._grid.insert(node, position);
		this._nodeList.appendNodes([node]);
	}

	removeNode() {
		const selection = this._selectionList.getSelection();
		const nodes = this._nodeList.getNodesById(selection);
		this._nodeList.removeNodes(nodes);
		this.removeFromGrid(nodes);
	}

	group() {
		const selection = this._selectionList.getSelection();
		if (selection.length < 2) {
			return;
		}
		const nodes = this._nodeList.getNodesById(selection);
		const group = NodeFactory.createGroup("group");
		this.addListener(group.changeParentEvent, () => this._grid.changeLayer(group));
		this._nodeList.group(nodes, group);
		this._grid.insert(group, this._grid.getLeftTopPosition(nodes));
	}

	ungroup() {
		const selection = this._selectionList.getSelection();
		const nodes = this._nodeList.getNodesById(selection);
		const groups = nodes.filter((item: INode) => this._nodeList.isGroup(item.id())) as INodeGroup[];
		if (!groups.length) {
			return;
		}
		this.removeFromGrid(groups);
		this._nodeList.ungroup(groups);
	}

	private changeSelection(items: INode[], isMulti: boolean = false) {
		this._selectionList.setSelection(items.map((item) => item.id()), isMulti);
	}

	private updateSelection() {
		this._view.updateSelection(this._selectionList.getSelection());
	}

	private renderView(appended: INode[], removed: INode[]) {
		this._view.update(appended, removed);
	}

	private removeFromGrid(items: INode[]) {
		for (const item of items) {
			this._grid.pop(item);
		}
	}
}