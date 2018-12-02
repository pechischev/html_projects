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
		return (this.x == coordinate.x) && (this.y == coordinate.y);
	}

	distance(coordinate: Coordinate): Coordinate {
		return new Coordinate(this.x - coordinate.x, this.y - coordinate.y);
	}
}
