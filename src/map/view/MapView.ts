import { Component } from "common/component/Component";
import * as Konva from "konva";
import { INode } from "map/model/node/INode";
import { IDispatcher } from "common/event/IDispatcher";
import { GridLayer } from "./GridLayer";
import { Toolbar } from "./Toolbar";
import { NodeLayer } from "./NodeLayer";

export class MapView extends Component {
	private _toolbar = new Toolbar({blockName: "map-toolbar"});
	private _nodeLayer = new NodeLayer();
	private _gridLayer = new GridLayer();

	private _clickCanvasEvent = this.createDispatcher();

	constructor() {
		super({blockName: "map"});

		this.addChild(this._toolbar);

		const tools = new Component({blockName: "map-tools"});
		this.addChild(tools);

		const canvasContainer = new Component({blockName: "canvas-container"});
		this.addChild(canvasContainer);

		const stage = new Konva.Stage({
			container: canvasContainer.element(),
			name: "stage"
		});
		stage.on("click", (event) => {
			if (event.target.name() != stage.name()) {
				return;
			}
			this._clickCanvasEvent.dispatch();
		});
		stage.add(this._gridLayer.layer());
		stage.add(this._nodeLayer.layer());

		window.addEventListener("DOMContentLoaded", () => {
			stage.setWidth(this.width());
			stage.setHeight(this.height());
		});
	}

	clickItemEvent(): IDispatcher {
		return this._nodeLayer.clickItemEvent();
	}

	clickCanvasEvent(): IDispatcher {
		return this._clickCanvasEvent;
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
}
