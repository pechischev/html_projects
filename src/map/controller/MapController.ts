import { SelectionList } from "map/controller/SelectionList";
import { notImplement } from "common/utils/tools";
import { Disposable } from "common/component/Disposable";
import { MapView } from "map/view/MapView";
import { NodeList } from "map/controller/NodeList";
import { INode } from "map/model/node/INode";
import { NodeFactory } from "map/controller/factory/NodeFactory";
import { INodeGroup } from "map/model/node/INodeGroup";
import { Coordinate } from "common/math/Coordinate";
import { MovementController } from "map/controller/MovementController";

export class MapController extends Disposable {
	private _selectionList = new SelectionList();
	private _nodeList = new NodeList();
	private _movementController: MovementController;
	private _view: MapView;

	constructor(view: MapView) {
		super();
		this._view = view;

		this._movementController = new MovementController(this._nodeList);
		this._view.setController(this._movementController);

		this.addListener(this._view.clickItemEvent, this.changeSelection, this);
		this.addListener(this._view.clickCanvasEvent, () => this._selectionList.setSelection([]));
		this.addListener(this._view.createItemEvent, this.appendNode, this);

		this.addListener(this._selectionList.changeSelectionEvent, this.updateSelection, this);

		this.addListener(this._nodeList.groupEvent, this.renderView, this);
		this.addListener(this._nodeList.ungroupEvent, this.renderView, this);
	}

	connect() {
		notImplement();
	}

	disconnect() {
		notImplement();
	}

	appendNode(position: Coordinate) {
		const node = NodeFactory.createItem();
		node.setPosition(MovementController.toRelative(position));
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