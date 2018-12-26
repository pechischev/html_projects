import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { NodeView } from "map/view/item/NodeView";
import { MovementController } from "map/controller/MovementController";
import { Layer } from "common/canvas/Layer";
import { Coordinate } from "common/math/Coordinate";
import { ConnectionFrame } from "map/view/item/ConnectionFrame";
import { Cell } from "map/view/item/Cell";
import { Size } from "common/math/Size";
import { Config } from "map/config/Config";
import { CanvasApi } from "common/canvas/api/CanvasApi";

export class NodeLayer extends Layer<NodeView> {
	readonly mouseDownItemEvent = this.createDispatcher();
	readonly createConnectEvent = this.createDispatcher();
	readonly createItemEvent = this.createDispatcher();

	private _cell = new Cell();

	constructor(api: CanvasApi) {
		super();

		this._cell.setSize(new Size(Config.CELL_WIDTH, Config.CELL_HEIGHT)); // TODO: передавать размеры ячейки параметром
		this.layer().add(this._cell.shape());

		this.addListener(this._cell.updateEvent, () => this._layer.batchDraw());
		this.addListener(this._cell.clickEvent, () => {
			this._cell.setVisible(false);
			this.createItemEvent.dispatch(this._cell.position());
		});

		this.addListener(api.mouseMoveEvent, (event: Konva.KonvaEventObject<MouseEvent>) => {
			const mouseEvent = event.evt;
			const mousePos = new Coordinate(mouseEvent.offsetX, mouseEvent.offsetY);
			const isEmpty = !this.getItemByCoordinate(mousePos);
			this._cell.setVisible(isEmpty);
			if (!isEmpty) {
				return;
			}
			this.updateCellPosition(mousePos);
		});
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
		const newPos = MovementController.toGridPosition(pos);
		const oldPos = MovementController.toGridPosition(this._cell.position());
		if (Coordinate.equals(newPos, oldPos)) {
			return;
		}
		this._cell.setPosition(newPos);
	}

	private appendNode(node: INode) {
		const nodeView = new NodeView(node);
		this.addDisposable(nodeView);
		nodeView.shape().on("mousedown", (event) => {
			const isCtrl = event.evt.ctrlKey;
			this.mouseDownItemEvent.dispatch(node, isCtrl);
		});
		const position = MovementController.toAbsolute(node.position());
		nodeView.setPosition(position);
		this.addListener(node.changedPositionEvent, () => {
			nodeView.setPosition(MovementController.toAbsolute(node.position()));
		});
		const frame = new ConnectionFrame(nodeView);
		this.addListener(frame.mouseDownEvent, (...args) => this.createConnectEvent.dispatch(...args));
		this.drawItem(nodeView);
	}

	private getIndex(id: string): number {
		return this._items.findIndex((shape) => shape.getId() == id);
	}
}