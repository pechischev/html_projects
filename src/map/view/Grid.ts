import { Component } from "common/component/Component";
import * as Konva from "konva";
import { CanvasApi } from "common/canvas/api/CanvasApi";
import { NodeLayer } from "map/view/NodeLayer";
import { LineLayer } from "map/view/LineLayer";
import { NodePresenter } from "map/controller/NodePresenter";
import { ConnectionPresenter } from "map/controller/ConnectionPresenter";
import { INode } from "map/model/node/INode";
import { Coordinate } from "common/math/Coordinate";
import { CoordinateConverter } from "map/service/CoordinateConverter";
import { ILink } from "map/model/link/ILink";
import { Config } from "map/config/Config";
import { GridController } from "map/controller/GridController";

export class Grid extends Component {
	private _canvas: Konva.Stage;
	private _canvasApi: CanvasApi;

	private _nodeLayer: NodeLayer;
	private _lineLayer = new LineLayer();

	private _nodePresenter: NodePresenter;
	private _linkPresenter: ConnectionPresenter;
	private _gridController: GridController;

	private _zoom = 1;
	private _grid = new Konva.FastLayer();

	constructor(nodePresenter: NodePresenter, linkPresenter: ConnectionPresenter) {
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
		this.addDisposable(this._lineLayer);
		this.addDisposable(this._nodeLayer);

		this.redrawCells();
		this._canvas.add(this._grid, this._nodeLayer.layer(), this._lineLayer.layer());

		this._nodePresenter = nodePresenter;
		this.addDisposable(nodePresenter);
		this._linkPresenter = linkPresenter;
		this.addDisposable(linkPresenter);

		this._gridController = new GridController(this);

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

	nodeLayer(): NodeLayer {
		return this._nodeLayer;
	}

	lineLayer(): LineLayer {
		return this._lineLayer;
	}

	canvasApi(): CanvasApi {
		return this._canvasApi;
	}

	private resizeCanvas() {
		this._canvas.setWidth(this.width());
		this._canvas.setHeight(this.height());
		this.redrawCells();
	}

	private initListeners() {
		this.addListener(this._canvasApi.clickEvent, this.onCanvasClick, this);
		this.addListener(this._canvasApi.dragEndEvent, this.onDragEnd, this);

		this.addListener(this._nodeLayer.clickLayerEvent, () => this._canvas.fire("click"));

		this.addListener(this._nodePresenter.changedListEvent, this._gridController.updateNodes, this._gridController);
		this.addListener(this._nodePresenter.changedSelectionEvent, this._gridController.updateSelection, this._gridController);

		this.addListener(this._gridController.selectNodeEvent, (node: INode, isCtrl: boolean) => this._nodePresenter.setSelection([node], isCtrl));
		this.addListener(this._gridController.selectLinkEvent, (item: ILink, isCtrl: boolean) => this._linkPresenter.setSelection([item], isCtrl));
		this.addListener(this._gridController.createNodeEvent, this._nodePresenter.createNode, this._nodePresenter);
		this.addListener(this._gridController.connectEvent, this._linkPresenter.createConnection, this._linkPresenter);

		this.addListener(this._linkPresenter.connectEvent, this._gridController.appendLine, this._gridController);
		this.addListener(this._linkPresenter.disconnectEvent, this._gridController.removeLine, this._gridController);
		this.addListener(this._linkPresenter.changedSelectionEvent, this._gridController.updateSelection, this._gridController);

		window.addEventListener("DOMContentLoaded", this.resizeCanvas.bind(this));
		window.addEventListener("resize", this.resizeCanvas.bind(this));
	}

	private onDragEnd(event: Konva.KonvaEventObject<DragEvent>) { // TODO: вынести из данного места
		const mouseEvent = event.evt;
		const view = event.target;
		const position = new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY);
		const item = this._nodeLayer.getViewByCoordinate(position);
		if (item && item.node().id() == view.id()) {
			// TODO: warning - current view is only NodeView
			this._nodePresenter.insert(item.node(), CoordinateConverter.toRelative(position));
		}
	}

	private onCanvasClick(event: Konva.KonvaEventObject<MouseEvent>) {
		if (event.target.name() != this._canvas.name()) {
			return;
		}
		this._nodePresenter.setSelection([]);
		this._linkPresenter.setSelection([]);
	}

	private redrawCells() {
		this._grid.removeChildren();
		const size = this._canvas.getSize();
		const columns = Math.ceil(size.width / Config.CELL_WIDTH);
		const rows = Math.ceil(size.height / Config.CELL_HEIGHT);
		for (let y = 0; y < rows; ++y) {
			for (let x = 0; x < columns; ++x) {
				const position = CoordinateConverter.toAbsolute(new Coordinate(x, y));
				this._grid.add(new Konva.Rect({
					width: Config.CELL_WIDTH,
					height: Config.CELL_HEIGHT,
					x: position.x,
					y: position.y,
					strokeWidth: 1,
					stroke: "#B4CCCF",
					opacity: 0.3
				}));
			}
		}
		this._grid.draw();
	}
}