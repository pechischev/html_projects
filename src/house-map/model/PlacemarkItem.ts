import Placemark = ymaps.Placemark;
import { Disposable } from "common/component/Disposable";
import IEvent = ymaps.IEvent;

export class PlacemarkItem  extends Disposable {
	readonly clickEvent = this.createDispatcher();

	private title = "";
	private coords: number[] = [];
	private placemark: Placemark;

	constructor(title: string, coords: number[]) {
		super();

		this.title = title;
		this.coords = coords;

		this.placemark = new ymaps.Placemark(coords, {}, {
			preset: "islands#circleIcon",
			iconColor: "#009ae4"
		} as any);
		this.placemark.events
			.add(["mouseenter", "mouseleave"], (event: IEvent) => {
				const color = (event.get("type") as any) == "mouseenter" ? "#3caa3c" : "#009ae4";
				(event.get("target") as Placemark).options.set("iconColor", color as any);
			})
			.add("click", (event: IEvent) => this.clickEvent.dispatch(this, event));
	}

	setTitle(title: string) {
		this.title = title;
	}

	getTitle(): string {
		return this.title;
	}

	getCoords(): number[] {
		return this.coords;
	}

	getPlacemark(): Placemark {
		return this.placemark;
	}
}