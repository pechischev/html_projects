import { INode } from "map/model/node/INode";
import { NodeView } from "map/view/item/NodeView";
import { MovementController } from "map/controller/MovementController";
import { Layer } from "common/canvas/Layer";
import { Coordinate } from "common/math/Coordinate";

export class NodeLayer extends Layer<NodeView> {
	readonly mouseDownItemEvent = this.createDispatcher();

	update(appendedNodes: INode[], removedNodes: INode[] = []) {
		removedNodes.forEach((node) => {
			const index = this.getIndex(node.id());
			if (index === -1) {
				return;
			}
			const shape = this._items[index];
			shape.shape().remove();
			this._items.splice(index, 1);
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

	private appendNode(node: INode) {
		const nodeView = new NodeView(node);
		nodeView.shape().on("mousedown", (event) => {
			const isCtrl = event.evt.ctrlKey;
			this.mouseDownItemEvent.dispatch(node.id(), isCtrl);
		});
		const position = MovementController.toAbsolute(node.position());
		nodeView.setPosition(position);
		this.addListener(node.changedPositionEvent, () => {
			nodeView.setPosition(MovementController.toAbsolute(node.position()));
		});
		this.drawItem(nodeView);
	}

	private getIndex(id: string): number {
		return this._items.findIndex((shape) => shape.getId() == id);
	}
}