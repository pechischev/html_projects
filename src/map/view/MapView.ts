import { Component } from "common/component/Component";

export class MapView extends Component {
	private _canvasContainer: Component;
	private _canvas: Component;
	
	constructor() {
		super({className: "map"});

		const toolbar = new Component({className: "map-toolbar"});
		this.addChild(toolbar);

		const tools = new Component({className: "map-tools"});
		this.addChild(tools);

		this._canvasContainer = new Component({className: "map-canvas"});
		this._canvas = new Component({tagName: "canvas"});
		this._canvasContainer.addChild(this._canvas);
		this.addChild(this._canvasContainer);

		window.addEventListener("resize", this.resizeCanvas.bind(this));
		window.addEventListener("DOMContentLoaded", this.resizeCanvas.bind(this));
	}

	private resizeCanvas() {
		const width = this._canvasContainer.element().offsetWidth;
		const height = this._canvasContainer.element().offsetHeight;
		this._canvas.setAttribute({name: "width", value: `${width - 15}px`});
		this._canvas.setAttribute({name: "height", value: `${height - 15}px`});
	}
}
