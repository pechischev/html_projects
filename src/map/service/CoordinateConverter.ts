import { Coordinate } from "common/math/Coordinate";
import { Config } from "map/config/Config";

export class CoordinateConverter {
	static toRelative(position: Coordinate): Coordinate {
		return new Coordinate(position.x / Config.CELL_WIDTH, position.y / Config.CELL_HEIGHT).floor();
	}

	static toAbsolute(position: Coordinate): Coordinate {
		return new Coordinate(position.x * Config.CELL_WIDTH, position.y * Config.CELL_HEIGHT);
	}

	static toGridPosition(position: Coordinate): Coordinate {
		position = this.toRelative(position);
		return this.toAbsolute(position);
	}
}