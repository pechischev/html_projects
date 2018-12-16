import { INode } from "map/model/node/INode";
import { NodeView } from "map/view/item/NodeView";
import { MovementController } from "map/controller/MovementController";
import { Layer } from "common/canvas/Layer";
import { Coordinate } from "common/math/Coordinate";
import { ConnectionFrame } from "map/view/item/ConnectionFrame";

export class NodeLayer extends Layer<NodeView> {
	readonly mouseDownItemEvent = this.createDispatcher();
	readonly createConnectEvent = this.createDispatcher();

	update(appendedNodes: INode[], removedNodes: INode[] = []) {
		removedNodes.forEach((node) => {
			const index = this.getIndex(node.id());
			if (index === -1) {
				return;
			}
			const shape = this._items[index];
			shape.remove();
			this._items.splice(index, 1);
			this.removeDisposable(shape);
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

	intersects(coordinate: Coordinate): boolean {
		return this._items.some((shape) => {
			const i = shape.shape().getAllIntersections(coordinate);
			return !!i.length;
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

	private appendNode(node: INode) {
		const nodeView = new NodeView(node);
		this.addDisposable(nodeView);
		nodeView.shape().on("mousedown", (event) => {
			const isCtrl = event.evt.ctrlKey;
			this.mouseDownItemEvent.dispatch(node.id(), isCtrl);
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