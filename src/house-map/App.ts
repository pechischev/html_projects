import { Component } from "common/component/Component";
import { YMap } from "house-map/map/YMap";
import { Button } from "common/button/Button";

export class App extends Component {
	private map: YMap;
	private control: Component;

	constructor() {
		super({blockName: "house-map"});

		this.control = new Component({blockName: "control-block"});
		this.addChild(this.control);
	}

	init() {
		ymaps.ready().then(() => {
			this.map = new YMap();
			this.addChild(this.map);
			this.initCommands();
		});
	}

	private initCommands() {
		const appendImage = new Button({content: "append image"});
		appendImage.clickEvent.addListener(() => {
			const box = this.map.createPolygon();
			box.startDraw();
		});
		this.control.addChild(appendImage);
	}
}
