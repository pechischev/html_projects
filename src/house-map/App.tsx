import { Switch, FormControlLabel, Button } from "@material-ui/core";
import { Component, RefObject, createRef } from "react";
import * as React from "react";
import IEvent = ymaps.IEvent;
import { Popup } from "./components/Popup";
import { Form } from "./components/Form";

interface IState {
	canEdit: boolean;
	currentPos: number[];
	showForm: boolean;
}

export class App extends Component<{}, IState> {
	state = {
		canEdit: true,
		currentPos: [],
		showForm: false,
	};

	private map: ymaps.Map;
	private mapRef: HTMLDivElement;
	private popupRef: RefObject<Popup> = createRef();

	componentDidMount() {
		window.addEventListener("DOMContentLoaded", () => this.init());
	}

	render() {
		return (
			<div className="house-map">
				<div className="control-block">
					<FormControlLabel
						control={
							<Switch
								checked={ this.state.canEdit }
								onChange={ (event) => this.setState({canEdit: event.target.checked}) }
								value="canEdit"
								color={ "primary" }
							/>
						}
						label="Режим редактирования"
					/>
				</div>
				<div className="map" ref={ (ref) => this.mapRef = ref }>
					<Form className={ "form-layer" } style={{display: this.state.showForm ? "" : "none"}}/>
				</div>
				<Popup
					ref={ this.popupRef }
					title={ "Добавить схемы для здания?" }
					renderActions={ (props) => {
						return (
							<>
								<Button
									color="primary"
									onClick={() => {
										props.show(false);
										this.appendPlacemark(this.state.currentPos);
									}}
								>
									Добавить
								</Button>
								<Button color="secondary" onClick={ () => props.show(false) }>Отменить</Button>
							</>
						);
					} }
				/>
			</div>
		);
	}

	init() {
		ymaps.ready().then(() => {
			this.map = new ymaps.Map(this.mapRef, {
				// Координаты центра карты.
				// Порядок по умолчанию: «широта, долгота».
				// Чтобы не определять координаты центра карты вручную,
				// воспользуйтесь инструментом Определение координат.
				center: [56.630842, 47.886089],
				// Уровень масштабирования. Допустимые значения:
				// от 0 (весь мир) до 19.
				zoom: 16,
				controls: []
			}, {
				balloonMaxWidth: 200,
			} as any);
			this.map.events.add("click", (event: IEvent) => {
				if (!this.state.canEdit) {
					return;
				}
				const coords = event.get("coords") as number[];
				this.setState({
					currentPos: coords
				});
				const popup = this.popupRef.current;
				if (!popup.isShow()) {
					popup.open();
				}
			});
		});
	}

	private appendPlacemark(coords: number[]) {
		const placemark = new ymaps.Placemark(coords, {}, {
			preset: "islands#circleIcon",
			iconColor: "#009ae4"
		} as any);
		placemark.events
			.add(["mouseenter", "mouseleave"], (event: IEvent) => {
				const color = (event.get("type") as any) == "mouseenter" ? "#3caa3c" : "#009ae4";
				(event.get("target") as ymaps.Placemark).options.set("iconColor", color as any);
			})
			.add("click", (event: IEvent) => this.setState({showForm: true}));
		this.map.geoObjects.add(placemark);
	}
}
