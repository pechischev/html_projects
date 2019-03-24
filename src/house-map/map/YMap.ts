import { Component } from "common/component/Component";
import { YImage } from "house-map/map/YImage";

export class YMap extends Component {
	private map: ymaps.Map;

	constructor() {
		super({blockName: "map"});

		this.map = new ymaps.Map(this.element(), {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			center: [56.630842, 47.886089],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 16,
			controls: []
		});
	}

	setZoom(zoom: number) {
		const min = 14;
		const max = 19;
		this.map.setZoom(Math.max(min, Math.min(zoom, max)));
	}

	createPolygon() {
		const image = "img/Pandirect.svg";
		const imageBox = (new YImage(image));
		this.map.geoObjects.add(imageBox.polygon);
		return imageBox;

	}
}
