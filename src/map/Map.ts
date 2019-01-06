import { NodeController } from "map/controller/NodeController";
import { SelectionList } from "map/controller/list/SelectionList";
import { Coordinate } from "common/math/Coordinate";
import { ConnectionController } from "map/controller/ConnectionController";
import { Component } from "common/component/Component";
import { Grid } from "map/view/Grid";
import { Toolbar } from "map/view/Toolbar";
import { INode } from "map/model/node/INode";

export class Map extends Component {
	private _selectionList: SelectionList;
	private _nodeController: NodeController;
	private _connectionController: ConnectionController;

	private _view: Grid;
	private _toolbar: Toolbar;

	constructor() {
		super({blockName: "map"});
		this._selectionList = new SelectionList();

		this._toolbar = new Toolbar({blockName: "map-toolbar"});
		this.addChild(this._toolbar);

		const tools = new Component({blockName: "map-tools"});
		this.addChild(tools);

		this._nodeController = new NodeController(this._selectionList);
		this._connectionController = new ConnectionController(this._nodeController.getNodeList());
		this._view = new Grid(this._nodeController, this._connectionController);
		this.addChild(this._view);

		this.initCommands();

		this.addDisposable(this._selectionList);
		this.addDisposable(this._nodeController);
		this.addDisposable(this._connectionController);

		this.addListener(this._nodeController.changedListEvent, this.onChangeList, this);
	}

	appendNode() {
		const position = new Coordinate();
		this._nodeController.createNode(position);
	}

	removeNodes() {
		const nodes = this._nodeController.getSelectedNodes();
		this._nodeController.removeNodes(nodes);
	}

	group() {
		const nodes = this._nodeController.getSelectedNodes();
		if (nodes.length < 2) {
			return;
		}
		this._nodeController.createGroup(nodes);
	}

	ungroup() {
		const nodes = this._nodeController.getSelectedNodes();
		this._nodeController.removeGroup(nodes);
	}

	private initCommands() {
		const toolbar = this._toolbar;
		toolbar.register(() => this.appendNode(), "Append node");
		toolbar.register(() => this.group(), "Group");
		toolbar.register(() => this.ungroup(), "Ungroup");
		toolbar.register(() => this.removeNodes(), "Remove node");
	}

	private onChangeList(appended: INode[], removed: INode[]) {
		for (const item of removed) {
			this._connectionController.removeAllConnections(item.id());
		}
	}
}