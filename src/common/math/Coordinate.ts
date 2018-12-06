import { isNumber } from "util";

export class Coordinate {
	x: number;
	y: number;

	constructor(x: number = 0, y: number = 0) {
		this.x = x;
		this.y = y;
	}

	floor(): Coordinate {
		this.x = Math.floor(this.x);
		this.y = Math.floor(this.y);
		return this;
	}

	equals(coordinate: Coordinate): boolean {
		return Coordinate.equals(this, coordinate);
	}

	distance(coordinate: Coordinate): Coordinate {
		return new Coordinate(this.x - coordinate.x, this.y - coordinate.y);
	}

	translate(tx: Coordinate|number, ty?: number): Coordinate {
		if (tx instanceof Coordinate) {
			this.x += tx.x;
			this.y += tx.y;
		} else {
			this.x += tx;
			if (isNumber(ty)) {
				this.y += ty;
			}
		}
		return this;
	}

	static equals(first: Coordinate, second: Coordinate): boolean {
		return (first.x == second.x) && (first.y == second.y);
	}
}
