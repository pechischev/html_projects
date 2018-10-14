export class Coordinate {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	equals(coordinate: Coordinate): boolean {
		return (this.x == coordinate.x) && (this.y == coordinate.y);
	}

	distance(coordinate: Coordinate): Coordinate {
		return new Coordinate(this.x - coordinate.x, this.y - coordinate.y);
	}
}
