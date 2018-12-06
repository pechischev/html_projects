import { Disposable } from "common/component/Disposable";
import { Coordinate } from "common/math/Coordinate";

export class MovementController extends Disposable {
	static CELL_WIDTH = 150;
	static CELL_HEIGHT = 110;

	static toRelative(position: Coordinate): Coordinate {
		return new Coordinate(position.x / this.CELL_WIDTH, position.y / this.CELL_HEIGHT).floor();
	}

	static toAbsolute(position: Coordinate): Coordinate {
		return new Coordinate(position.x * this.CELL_WIDTH, position.y * this.CELL_HEIGHT);
	}

	static toGridPosition(position: Coordinate): Coordinate {
		position = this.toRelative(position);
		return this.toAbsolute(position);
	}
}