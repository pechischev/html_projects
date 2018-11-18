import { Component } from "common/component/Component";
import { TagName } from "common/dom/TagName";

export class MapView extends Component {
	private _canvasContainer: Component;
	private _canvas: Component;
	
	constructor() {
		super({blockName: "map"});

		const toolbar = new Component({blockName: "map-toolbar"});
		this.addChild(toolbar);

		const tools = new Component({blockName: "map-tools"});
		this.addChild(tools);

		this._canvasContainer = new Component({blockName: "map-canvas"});
		this._canvas = new Component({tagName: TagName.CANVAS});
		this._canvasContainer.addChild(this._canvas);
		this.addChild(this._canvasContainer);

		window.addEventListener("resize", this.resizeCanvas.bind(this));
		window.addEventListener("DOMContentLoaded", this.resizeCanvas.bind(this));
	}

	private resizeCanvas() {
		const width = this._canvasContainer.element().offsetWidth;
		const height = this._canvasContainer.element().offsetHeight;
		this._canvas.setWidth(width - 15);
		this._canvas.setHeight(height - 15);
	}
}
