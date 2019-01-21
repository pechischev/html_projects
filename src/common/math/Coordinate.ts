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

	distance(coordinate: Coordinate): number {
		const dx = this.x - coordinate.x;
		const dy = this.y - coordinate.y;
		return Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
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
		return new Coordinate(this.x, this.y);
	}

	static equals(first: Coordinate, second: Coordinate): boolean {
		return (first.x == second.x) && (first.y == second.y);
	}

	static difference(a: Coordinate, b: Coordinate): Coordinate {
		return new Coordinate(a.x - b.x, a.y - b.y);
	}
}
