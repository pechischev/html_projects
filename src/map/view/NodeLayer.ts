import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { NodeView } from "map/view/item/NodeView";
import { Disposable } from "common/component/Disposable";
import { MovementController } from "map/controller/MovementController";

export class NodeLayer extends Disposable {
	readonly clickItemEvent = this.createDispatcher();
	readonly clickLayerEvent = this.createDispatcher();
	private _layer = new Konva.Layer();
	private _shapes: NodeView[] = [];

	constructor() {
		super();

		this._layer.on("click", () => this.clickLayerEvent.dispatch());
	}

	layer(): Konva.Layer {
		return this._layer;
	}

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
		this._layer.batchDraw();
	}

	updateSelection(selection: string[]) {
		this._shapes.forEach((shape) => {
			const isSelected = selection.indexOf(shape.getId()) > -1;
			shape.setSelected(isSelected);
		});
	}

	private appendNode(node: INode) {
		const shape = new NodeView(node);
		shape.on("mousedown", (event) => {
			const isCtrl = event.evt.ctrlKey;
			this.clickItemEvent.dispatch(node.id(), isCtrl);
		});
		shape.on("click", (event) => event.cancelBubble = true);
		shape.position(MovementController.toAbsolute(node.position()));
		this.addListener(node.changedPositionEvent, () => {
			shape.position(MovementController.toAbsolute(node.position()));
			this._layer.batchDraw();
		});
		this._shapes.push(shape);
	}

	private getIndex(id: string): number {
		return this._shapes.findIndex((shape) => shape.getId() == id);
	}
}