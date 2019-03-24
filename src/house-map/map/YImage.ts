import Polygon = ymaps.geometryEditor.Polygon;

export class YImage {
	polygon: ymaps.Polygon;

	constructor(image: string, geometry: any = []) {
		this.polygon = new ymaps.Polygon(geometry, {}, {
			fillMethod: "stretch",
			fillImageHref: image,
			outline: false
		});

		const stateMonitor = new ymaps.Monitor(this.polygon.editor.state);
		stateMonitor.add("drawing", (newValue: object) => {
			this.polygon.options.set("strokeColor",  !!newValue ? "#FF0000" : "" as any);
		});
	}

	startDraw() {
		(this.polygon.editor as Polygon).startDrawing();
	}

	endDraw() {
		(this.polygon.editor as Polygon).stopDrawing();
	}
}