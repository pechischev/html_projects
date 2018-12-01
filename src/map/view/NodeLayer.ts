import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { NodeView } from "map/view/item/NodeView";
import { IDispatcher } from "common/event/IDispatcher";
import { Disposable } from "common/component/Disposable";

export class NodeLayer extends Disposable {
	private _layer = new Konva.Layer();
	private _shapes: NodeView[] = [];

	private _clickItemEvent = this.createDispatcher();

	clickItemEvent(): IDispatcher {
		return this._clickItemEvent;
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
		this._layer.draw();
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
			this._clickItemEvent.dispatch(node.id(), isCtrl);
		});
		shape.x(50);
		shape.y(50);
		this._shapes.push(shape);
	}

	private getIndex(id: string): number {
		return this._shapes.findIndex((shape) => shape.getId() == id);
	}
}