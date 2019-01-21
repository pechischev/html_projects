import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";
import { CanvasApi } from "common/canvas/api/CanvasApi";
import { KonvaEventObject } from "konva";
import { LineLayer } from "map/view/LineLayer";
import { NodeLayer } from "map/view/NodeLayer";

export class ConnectionController extends Disposable {
	private _lineLayer: LineLayer;
	private _nodeLayer: NodeLayer;
	private _canvasApi: CanvasApi;

	constructor(lineLayer: LineLayer, nodeLayer: NodeLayer, canvasApi: CanvasApi) {
		super();

		this._lineLayer = lineLayer;
		this._nodeLayer = nodeLayer;
		this._canvasApi = canvasApi;
	}

	connect(position: Coordinate) {
		this.addListener(this._canvasApi.mouseMoveEvent, (event: KonvaEventObject<MouseEvent>) => {
			const mousePos = new Coordinate(event.evt.offsetX, event.evt.offsetY);
			this._lineLayer.drawConnectionLine(position, mousePos);
		});
	}
}