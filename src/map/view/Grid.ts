import { Component } from "common/component/Component";
import * as Konva from "konva";
import { CanvasApi } from "common/canvas/api/CanvasApi";
import { NodeLayer } from "map/view/NodeLayer";
import { ConnectionLayer } from "map/view/ConnectionLayer";
import { NodeController } from "map/controller/NodeController";
import { ConnectionController } from "map/controller/ConnectionController";
import { INode } from "map/model/node/INode";
import { Coordinate } from "common/math/Coordinate";
import { MovementController } from "map/controller/MovementController";

export class Grid extends Component {
	private _canvas: Konva.Stage;
	private _canvasApi: CanvasApi;

	private _nodeLayer: NodeLayer;
	private _connectionLayer = new ConnectionLayer();

	private _nodeController: NodeController;

	private _zoom = 1;

	constructor(nodeController: NodeController, linkController: ConnectionController) {
		super({
			blockName: "canvas-container"
		});

		this._canvas = new Konva.Stage({
			container: this.element(),
			name: "stage"
		});

		this._canvasApi = new CanvasApi(this._canvas);
		this._nodeLayer = new NodeLayer(this._canvasApi);

		this.addDisposable(this._canvasApi);
		this.addDisposable(this._connectionLayer);
		this.addDisposable(this._nodeLayer);

		this._canvas.add(this._connectionLayer.layer(), this._nodeLayer.layer());

		this._nodeController = nodeController;
		this.addDisposable(nodeController);

		this.initListeners();
	}

	redraw() {
		this._canvas.batchDraw();
	}

	setZoom(zoom: number) {
		this._zoom = zoom;
		this._canvas.scale({x: zoom, y: zoom});
	}

	zoom() {
		return this._zoom;
	}

	private resizeCanvas() {
		this._canvas.setWidth(this.width());
		this._canvas.setHeight(this.height());
	}

	private initListeners() {
		this.addListener(this._canvasApi.clickEvent, () => this._nodeController.setSelection([]));
		this.addListener(this._canvasApi.dragEndEvent, this.onDragEnd, this);

		this.addListener(this._nodeLayer.mouseDownItemEvent, (node: INode, isCtrl: boolean) => this._nodeController.setSelection([node], isCtrl));
		this.addListener(this._nodeLayer.createItemEvent, (position: Coordinate) => this._nodeController.createNode(MovementController.toRelative(position)));
		this.addListener(this._nodeLayer.clickLayerEvent, (event) => this._canvasApi.clickEvent.dispatch(event));

		this.addListener(this._nodeController.changedListEvent, this._nodeLayer.update, this._nodeLayer);
		this.addListener(this._nodeController.changedSelectionEvent, this._nodeLayer.updateSelection, this._nodeLayer);

		window.addEventListener("DOMContentLoaded", this.resizeCanvas.bind(this));
		window.addEventListener("resize", this.resizeCanvas.bind(this));
	}

	private onDragEnd(event: Konva.KonvaEventObject<DragEvent>) { // TODO: вынести из данного места
		const mouseEvent = event.evt;
		const view = event.target;
		const position = new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY);
		const item = this._nodeLayer.getItemByCoordinate(position);
		if (item && item.node().id() == view.id()) {
			// TODO: warning - current view is only NodeView
			this._nodeController.insert(item.node(), MovementController.toRelative(position));
		}
	}
}