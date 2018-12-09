import { INode } from "map/model/node/INode";
import { NodeView } from "map/view/item/NodeView";
import { MovementController } from "map/controller/MovementController";
import { Layer } from "common/canvas/Layer";
import { Coordinate } from "common/math/Coordinate";

export class NodeLayer extends Layer {
	readonly clickItemEvent = this.createDispatcher();
	private _shapes: NodeView[] = [];

	update(appendedNodes: INode[], removedNodes: INode[] = []) {
		removedNodes.forEach((node) => {
			const index = this.getIndex(node.id());
			if (index === -1) {
				return;
			}
			const shape = this._shapes[index];
			shape.remove();
			this._shapes.splice(index, 1);
		});

		appendedNodes.forEach((node) => {
			this.appendNode(node);
		});

		this.invalidate();
	}

	invalidate() {
		this._layer.removeChildren();
		if (this._shapes.length) {
			this._layer.add(...this._shapes);
		}
		this._layer.draw();
	}

	updateSelection(selection: string[]) {
		this._shapes.forEach((shape) => {
			const isSelected = selection.indexOf(shape.getId()) > -1;
			shape.setSelected(isSelected);
		});
	}

	intersects(coordinate: Coordinate): boolean {
		return this._shapes.some((shape) => {
			const i = shape.getAllIntersections(coordinate);
			return !!i.length;
		});
	}

	private appendNode(node: INode) {
		const shape = new NodeView(node);
		shape.on("mousedown", (event) => {
			const isCtrl = event.evt.ctrlKey;
			this.clickItemEvent.dispatch(node.id(), isCtrl);
		});
		shape.on("click", (event) => event.cancelBubble = true);
		const position = MovementController.toAbsolute(node.position());
		shape.setPosition(position);
		this.addListener(node.changedPositionEvent, () => {
			shape.setPosition(MovementController.toAbsolute(node.position()));
			this._layer.batchDraw();
		});
		this.addListener(shape.updateEvent, () => this._layer.batchDraw());
		this._shapes.push(shape);
	}

	private getIndex(id: string): number {
		return this._shapes.findIndex((shape) => shape.getId() == id);
	}
}