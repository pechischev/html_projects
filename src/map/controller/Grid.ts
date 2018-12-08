import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";
import { INode } from "map/model/node/INode";

interface ICell { // TODO: вынести интерфейс
	id: string;
	position: Coordinate;
	layer: string|null;
}

export class Grid extends Disposable {
	private _cells: ICell[] = [];

	getLeftTopPosition(children: INode[]): Coordinate {
		let pos: Coordinate = null;
		for (const child of children) {
			const itemPosition = child.position();
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

	isEmptyCell(position: Coordinate, layer: string = null): boolean {
		return !this._cells.filter((cell) => cell.layer == layer && Coordinate.equals(position, cell.position)).length;
	}

	insert(item: INode, position: Coordinate) {
		if (!this.isEmptyCell(position, item.parent())) {
			item.setPosition(item.position());
			return;
		}
		let cell = this._cells.find((cell) => cell.id == item.id());
		if (!cell) {
			cell = {id: item.id(), layer: item.parent(), position};
			this._cells.push(cell);
		}
		cell.position = position;
		item.setPosition(position);
	}

	pop(item: INode) {
		const index = this._cells.findIndex((cell) => cell.id == item.id());
		if (index == -1) {
			return;
		}
		this._cells.splice(index, 1);
	}

	changeLayer(item: INode) {
		const cell = this._cells.find((cell) => cell.id == item.id());
		if (!cell) {
			throw new Error("Cell isn't exist");
		}
		const position = this.getNearestEmptyCell(item.position(), item.parent());
		cell.layer = item.parent();
		this.insert(item, position);
	}

	getNearestEmptyCell(position: Coordinate, layer: string = null): Coordinate {
		const visited = [];
		const isEmpty = (pos: Coordinate) => {
			return this.isEmptyCell(pos, layer);
		};
		const next = (pos: Coordinate, visited: Coordinate[]): Coordinate => {
			if (visited.indexOf(pos) > -1) {
				return null;
			}
			if (isEmpty(pos)) {
				return pos;
			}
			visited.push(pos);
			if (pos.x <= 0 || pos.y <= 0) {
				return null;
			}
			return next(pos.translate(1, 0), visited)
				|| next(pos.translate(0, -1), visited)
				|| next(pos.translate(-1, 0), visited)
				|| next(pos.translate(0, 1), visited);
		};
		return next(position, visited);
	}
}