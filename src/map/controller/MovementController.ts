import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";
import { NodeList } from "map/controller/NodeList";
import { INode } from "map/model/node/INode";

export class MovementController extends Disposable {
	static CELL_WIDTH = 150;
	static CELL_HEIGHT = 110;

	readonly changedCellEvent = this.createDispatcher();

	private _cellPosition = new Coordinate();
	private _nodeList: NodeList;

	constructor(list: NodeList) {
		super();

		this._nodeList = list;
	}

	getPositionByItems(nodes: INode[]): Coordinate {
		let pos: Coordinate = null;
		for (const node of nodes) {
			const itemPosition = node.position();
			if (!pos) {
				pos = itemPosition;
				continue;
			}
			const isLeft = pos.x > itemPosition.x;
			const isTop = pos.y > itemPosition.y;
			if (isLeft && isTop) {
				pos = itemPosition;
			} else if (isLeft) {
				pos = itemPosition;
			}
		}
		return pos;
	}

	move(node: INode, position: Coordinate) {
		let newPos = MovementController.toRelative(position);
		if (!this.isEmptyCell(newPos)) {
			newPos = node.position();
		}
		node.setPosition(newPos);
	}

	updateCell(mousePos: Coordinate) {
		const newPos = MovementController.toRelative(new Coordinate(mousePos.x, mousePos.y));
		if (!this.isEmptyCell(newPos) || this._cellPosition.equals(newPos)) {
			return;
		}

		this._cellPosition = newPos;
		this.changedCellEvent.dispatch(newPos);
	}

	isEmptyCell(position: Coordinate): boolean {
		return !this.getNodeByPosition(position);
	}

	private getNodeByPosition(position: Coordinate): INode|null {
		const nodes = this._nodeList.nodes();
		return nodes.filter((node) => !node.parent()).find((node) => position.equals(node.position())) || null;
	}

	static toRelative(position: Coordinate): Coordinate {
		return new Coordinate(position.x / this.CELL_WIDTH, position.y / this.CELL_HEIGHT).floor();
	}

	static toAbsolute(position: Coordinate): Coordinate {
		return new Coordinate(position.x * this.CELL_WIDTH, position.y * this.CELL_HEIGHT);
	}
}