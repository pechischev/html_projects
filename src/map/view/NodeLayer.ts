import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { NodeView } from "map/view/item/NodeView";
import { Layer } from "common/canvas/Layer";
import { Coordinate } from "common/math/Coordinate";
import { ConnectionFrame } from "map/view/item/ConnectionFrame";
import { Cell } from "map/view/item/Cell";
import { Size } from "common/math/Size";
import { Config } from "map/config/Config";
import { CanvasApi } from "common/canvas/api/CanvasApi";
import { CoordinateConverter } from "map/service/CoordinateConverter";
import { ConnectionService } from "map/service/ConnectionService";

export class NodeLayer extends Layer<NodeView> {
	readonly mouseDownItemEvent = this.createDispatcher();
	readonly connectEvent = this.createDispatcher();
	readonly createItemEvent = this.createDispatcher();

	private _cell = new Cell();
	private _canvasApi: CanvasApi;
	private _line = new Konva.Line({
		points: [],
		stroke: "red",
	});

	constructor(api: CanvasApi) {
		super();

		this._cell.setSize(new Size(Config.CELL_WIDTH, Config.CELL_HEIGHT)); // TODO: передавать размеры ячейки параметром
		this.layer().add(this._cell.shape());
		this.layer().add(this._line);

		this.addListener(this._cell.updateEvent, () => this._layer.batchDraw());
		this.addListener(this._cell.clickEvent, () => {
			this._cell.setVisible(false);
			this.createItemEvent.dispatch(this._cell.position());
		});

		this.addListener(api.mouseMoveEvent, (event: Konva.KonvaEventObject<MouseEvent>) => {
			const mouseEvent = event.evt;
			const mousePos = new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY);
			this.updateCellPosition(mousePos);
		});

		this._canvasApi = api;
	}

	update(appendedNodes: INode[], removedNodes: INode[] = []) {
		removedNodes.forEach((node) => {
			const index = this.getIndex(node.id());
			if (index === -1) {
				return;
			}
			const shape = this._items[index];
			shape.remove();
			this._items.splice(index, 1);
			// this.removeDisposable(shape); TODO: возникает ошибка в Disposable
		});

		appendedNodes.forEach((node) => {
			this.appendNode(node);
		});

		this.invalidate();
	}

	updateSelection(selection: string[]) {
		this._items.forEach((shape) => {
			const isSelected = selection.indexOf(shape.getId()) > -1;
			shape.setSelected(isSelected);
		});
	}

	getItemByCoordinate(position: Coordinate): NodeView|null {
		for (const item of this._items) {
			const clientRect = item.shape().getClientRect();
			const contains = (position.x >= clientRect.x &&
				position.x <= clientRect.x + clientRect.width &&
				position.y >= clientRect.y &&
				position.y <= clientRect.y + clientRect.height
			);
			if (contains) {
				return item;
			}
		}
		return null;
	}

	intersects(coordinate: Coordinate): boolean {
		return this._items.some((shape) => {
			const i = shape.shape().getAllIntersections(coordinate);
			return !!i.length;
		});
	}

	private updateCellPosition(pos: Coordinate) {
		const isEmpty = !this.getItemByCoordinate(pos);
		this._cell.setVisible(isEmpty);
		if (!isEmpty) {
			return;
		}
		const newPos = CoordinateConverter.toGridPosition(pos);
		const oldPos = CoordinateConverter.toGridPosition(this._cell.position());
		if (Coordinate.equals(newPos, oldPos)) {
			return;
		}
		this._cell.setPosition(newPos);
	}

	private appendNode(node: INode) { // TODO: упростить
		const nodeView = new NodeView(node);
		this.addDisposable(nodeView);
		nodeView.shape().on("mousedown", (event) => {
			const isCtrl = event.evt.ctrlKey;
			this.mouseDownItemEvent.dispatch(node, isCtrl);
		});
		const position = CoordinateConverter.toAbsolute(node.position());
		nodeView.setPosition(position);
		this.addListener(node.changedPositionEvent, () => {
			nodeView.setPosition(CoordinateConverter.toAbsolute(node.position()));
		});

		const frame = new ConnectionFrame(nodeView);
		this.addListener(frame.mouseDownEvent, (position: Coordinate) => {
			this._line.visible(true);

			const mouseMoveKey = this.addListener(this._canvasApi.mouseMoveEvent, (event: Konva.KonvaEventObject<MouseEvent>) => {
				const mousePos = new Coordinate(event.evt.offsetX, event.evt.offsetY);
				this.drawLine(position, mousePos);
			});
			const mouseUpKey = this.addListener(this._canvasApi.mouseUpEvent, (event: Konva.KonvaEventObject<MouseEvent>) => {
				const mousePos = new Coordinate(event.evt.offsetX, event.evt.offsetY);
				const lastItem = this.getItemByCoordinate(mousePos);
				this._line.visible(false);

				if (lastItem) {
					this.connectEvent.dispatch(ConnectionService.connect(nodeView, lastItem));
				}
				this.removeListener(mouseMoveKey);
				this.removeListener(mouseUpKey);
			});
		});
		this.drawItem(nodeView);
	}

	private getIndex(id: string): number {
		return this._items.findIndex((shape) => shape.getId() == id);
	}

	private drawLine(startPos: Coordinate, endPos: Coordinate) {
		this._line.points([startPos.x, startPos.y, endPos.x, endPos.y]);
		this._line.moveToTop();
		this._layer.batchDraw();
	}
}