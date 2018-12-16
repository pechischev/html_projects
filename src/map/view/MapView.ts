import { Component } from "common/component/Component";
import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { Coordinate } from "common/math/Coordinate";
import { MovementController } from "map/controller/MovementController";
import { IShape } from "common/canvas/IShape";
import { ConnectionLayer } from "map/view/ConnectionLayer";
import { GridLayer } from "./GridLayer";
import { Toolbar } from "./Toolbar";
import { NodeLayer } from "./NodeLayer";

export class MapView extends Component {
	readonly clickCanvasEvent = this.createDispatcher();
	readonly clickItemEvent = this.createDispatcher();
	readonly createItemEvent = this.createDispatcher();
	readonly dropItemEvent = this.createDispatcher();
	readonly createLinkEvent = this.createDispatcher();

	private _toolbar = new Toolbar({blockName: "map-toolbar"});
	private _nodeLayer = new NodeLayer();
	private _gridLayer = new GridLayer();
	private _connectionLayer = new ConnectionLayer();
	private _canvas: Konva.Stage;
	private _movementController = new MovementController(this._nodeLayer, this._gridLayer);

	constructor() {
		super({blockName: "map"});

		this.addDisposable(this._nodeLayer);
		this.addDisposable(this._gridLayer);
		this.addDisposable(this._connectionLayer);

		this.addChild(this._toolbar);

		const tools = new Component({blockName: "map-tools"});
		this.addChild(tools);

		const canvasContainer = new Component({blockName: "canvas-container"});
		this.addChild(canvasContainer);

		this._canvas = new Konva.Stage({
			container: canvasContainer.element(),
			name: "stage"
		});
		this._canvas.on("click", (event) => {
			if (event.target.name() != this._canvas.name()) {
				return;
			}
			this.clickCanvasEvent.dispatch();
		});
		this._canvas.on("dragend", (event) => {
			const mouseEvent = event.evt;
			const view = event.target;
			// TODO: warning - current view is only NodeView
			this.dropItemEvent.dispatch(view.id(), MovementController.toRelative(new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY)));
		});
		this._canvas.on("mousemove", (event) => {
			const mouseEvent = event.evt;
			this._movementController.updateGridLayer(new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY));
		});
		this._canvas.add(this._gridLayer.layer());
		this._canvas.add(this._nodeLayer.layer());
		this._canvas.add(this._connectionLayer.layer());

		// grid layer
		this.addListener(this._gridLayer.clickItemEvent, (item: IShape) => {
			this._gridLayer.showCell(false);
			this.createItemEvent.dispatch(MovementController.toRelative(item.position()));
		});
		this.addListener(this._gridLayer.clickLayerEvent, () => this._canvas.fire("click"));

		// node layer
		this.addListener(this._nodeLayer.clickLayerEvent, () => this.clickCanvasEvent.dispatch());
		this.addListener(this._nodeLayer.mouseDownItemEvent, (id, isCtrl) => this.clickItemEvent.dispatch(id, isCtrl));
		this.addListener(this._nodeLayer.createConnectEvent, (pos: Coordinate) => {
			const startPos = pos;

			this._canvas.on("mousemove", (event) => {
				const mousePos = new Coordinate(event.evt.offsetX, event.evt.offsetY);
				this._connectionLayer.drawLine(startPos, mousePos);
			});
			this._canvas.on("mouseup", (event) => {
				const mousePos = new Coordinate(event.evt.offsetX, event.evt.offsetY);
				const startItem = this._nodeLayer.getItemByCoordinate(startPos);
				const lastItem = this._nodeLayer.getItemByCoordinate(mousePos);
				if (lastItem) {
					this.createLinkEvent.dispatch(startItem.node(), lastItem.node());
				}
				this._connectionLayer.clearLine();
				this._canvas.off("mousemove mouseup");
			});
		});

		window.addEventListener("DOMContentLoaded", this.resizeCanvas.bind(this));
		window.addEventListener("resize", this.resizeCanvas.bind(this));
	}

	toolbar(): Toolbar {
		return this._toolbar;
	}

	updateSelection(selection: string[]) {
		this._nodeLayer.updateSelection(selection);
	}

	update(appendedNodes: INode[], removedNodes: INode[] = []) {
		this._nodeLayer.update(appendedNodes, removedNodes);
	}

	private resizeCanvas() {
		this._canvas.setWidth(this.width());
		this._canvas.setHeight(this.height());
	}
}
