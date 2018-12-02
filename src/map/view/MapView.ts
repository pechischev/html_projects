import { Component } from "common/component/Component";
import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { Coordinate } from "common/math/Coordinate";
import { MovementController } from "map/controller/MovementController";
import { NodeView } from "map/view/item/NodeView";
import { GridLayer } from "./GridLayer";
import { Toolbar } from "./Toolbar";
import { NodeLayer } from "./NodeLayer";

export class MapView extends Component {
	readonly clickCanvasEvent = this.createDispatcher();
	readonly clickItemEvent = this.createDispatcher();
	readonly createItemEvent = this.createDispatcher();

	private _toolbar = new Toolbar({blockName: "map-toolbar"});
	private _nodeLayer = new NodeLayer();
	private _gridLayer = new GridLayer();
	private _canvas: Konva.Stage;

	private _movementController: MovementController;

	constructor() {
		super({blockName: "map"});

		this.addDisposable(this._nodeLayer);
		this.addDisposable(this._gridLayer);

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
			if (view instanceof NodeView) {
				this._movementController.move(view.node(), new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY));
			}
		});
		this._canvas.add(this._gridLayer.layer());
		this._canvas.add(this._nodeLayer.layer());

		// grid layer
		this.addListener(this._gridLayer.clickItemEvent, (pos) => {
			this._gridLayer.showCell(false);
			this.createItemEvent.dispatch(pos);
		});
		this.addListener(this._gridLayer.clickLayerEvent, () => this._canvas.fire("click"));

		// node layer
		this.addListener(this._nodeLayer.clickLayerEvent, () => this.clickCanvasEvent.dispatch());
		this.addListener(this._nodeLayer.clickItemEvent, (id, isCtrl) => this.clickItemEvent.dispatch(id, isCtrl));

		window.addEventListener("DOMContentLoaded", this.resizeCanvas.bind(this));
		window.addEventListener("resize", this.resizeCanvas.bind(this));
	}

	setController(controller: MovementController) {
		this._movementController = controller;
		this._canvas.on("mousemove", (event) => {
			const mouseEvent = event.evt;
			const position = new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY);
			this._gridLayer.showCell(this._movementController.isEmptyCell(MovementController.toRelative(position)));
			this._movementController.updateCell(position);
		});
		this.addListener(controller.changedCellEvent, this._gridLayer.updateCellPosition, this._gridLayer);
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
