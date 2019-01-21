import { Disposable } from "common/component/Disposable";
import { KonvaEventObject } from "konva";
import { NodeView } from "map/view/item/NodeView";
import { LinkLine } from "map/view/item/LinkLine";
import { INode } from "map/model/node/INode";
import { ConnectionFrame } from "map/view/item/ConnectionFrame";
import { NodeLayer } from "map/view/NodeLayer";
import { LineLayer } from "map/view/LineLayer";
import { Grid } from "map/view/Grid";
import { ILink } from "map/model/link/ILink";
import { Coordinate } from "common/math/Coordinate";
import { ConnectionService } from "map/service/ConnectionService";
import { CoordinateConverter } from "map/service/CoordinateConverter";

export class GridController extends Disposable {
	readonly selectNodeEvent = this.createDispatcher();
	readonly selectLinkEvent = this.createDispatcher();
	readonly connectEvent = this.createDispatcher();
	readonly createNodeEvent = this.createDispatcher();

	private _nodes: NodeView[] = [];
	private _lines: LinkLine[] = [];

	private _nodeLayer: NodeLayer;
	private _lineLayer: LineLayer;

	private _view: Grid;

	constructor(view: Grid) {
		super();

		this._view = view;
		this._nodeLayer = view.nodeLayer();
		this._lineLayer = view.lineLayer();

		this.addListener(this._nodeLayer.clickCellEvent, this.onCreateNode, this);
	}

	updateNodes(appended: INode[], removed: INode[]) {
		for (const node of removed) {
			const index = this._nodes.findIndex((view) => view.getId() == node.id());
			if (index === -1) {
				return;
			}
			const view = this._nodes[index];
			this._nodeLayer.clearItem(view);
			this._nodes.splice(index, 1);
			// this.removeDisposable(shape); TODO: возникает ошибка в Disposable
		}

		const canvasApi = this._view.canvasApi();
		for (const node of appended) {
			const view = new NodeView(node);
			view.shape().on("mousedown", (event) => {
				const isCtrl = event.evt.ctrlKey;
				this.selectNodeEvent.dispatch(node, isCtrl);
			});

			this.addDisposable(view);

			const frame = new ConnectionFrame();
			view.setFrame(frame);

			this.addListener(frame.clickEvent, (event: KonvaEventObject<MouseEvent>) => {
				const startPos = new Coordinate(event.evt.offsetX, event.evt.offsetY);
				this._lineLayer.showConnectionLine(true);

				const mouseMoveKey = this.addListener(canvasApi.mouseMoveEvent, (event: KonvaEventObject<MouseEvent>) => {
					const mousePos = new Coordinate(event.evt.offsetX, event.evt.offsetY);
					frame.setVisible(true);
					this._lineLayer.drawConnectionLine(startPos, mousePos);
				});
				const mouseUpKey = this.addListener(canvasApi.clickEvent, (event: KonvaEventObject<MouseEvent>) => {
					const mousePos = new Coordinate(event.evt.offsetX, event.evt.offsetY);
					const lastItem = this._nodeLayer.getViewByCoordinate(mousePos);
					if (lastItem) {
						this.connectEvent.dispatch(ConnectionService.connect(view, lastItem));
					}
					frame.setVisible(false);
					this._lineLayer.showConnectionLine(false);
					this.removeListener(mouseMoveKey);
					this.removeListener(mouseUpKey);
				});
			});

			this._nodeLayer.drawItem(view);
			this._nodes.push(view);
		}
	}

	updateSelection(selection: string[]) {
		this._nodes.forEach((view) => {
			const isSelected = !!~selection.indexOf(view.getId());
			view.setSelected(isSelected);
		});
		this._lines.forEach((view) => {
			const link = view.link();
			const isSelected = !!~selection.indexOf(link.id());
			view.setSelected(isSelected);
		});
	}

	appendLine(link: ILink) {
		const line = new LinkLine(link);
		this.addListener(line.clickEvent, (event: KonvaEventObject<MouseEvent>) => {
			const isCtrl = event.evt.ctrlKey;
			this.selectLinkEvent.dispatch(link, isCtrl);
		});
		this._lineLayer.drawItem(line);
		this._lines.push(line);
	}

	removeLine(link: ILink) {
		const index = this._lines.findIndex((item) => item.link().id() == link.id());
		if (index === -1) {
			return;
		}
		const view = this._lines[index];
		this._lineLayer.clearItem(view);
		this._lines.splice(index, 1);
	}

	private onCreateNode(position: Coordinate) {
		this.createNodeEvent.dispatch(CoordinateConverter.toRelative(position));
	}
}