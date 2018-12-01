import * as Konva from "konva";

export class Cell extends Konva.Rect {
	constructor() {
		super({
			width: 220,
			height: 155,
			stroke: "#D5D5D5",
			strokeWidth: 1,
		});

		this.on("mouseover", () => {
			this.fill("#F0F4F7");
			this.draw();
		});

		this.on("mouseout", () => {
			this.fill("#FFFFFF");
			this.draw();
		});
	}

	setPosition(x: number, y: number) {
		this.x(x);
		this.y(y);
	}
}