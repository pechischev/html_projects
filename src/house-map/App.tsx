import { Switch, FormControlLabel, Button } from "@material-ui/core";
import { AppController } from "house-map/AppController";
import { EFormType } from "house-map/interfaces";
import { PlacemarkItem } from "house-map/model/PlacemarkItem";
import { AddPlacemarkForm } from "house-map/view/AddPlacemarkForm";
import { EditPlacemarkForm } from "house-map/view/EditPlacemarkForm";
import * as React from "react";
import { Component, RefObject, createRef } from "react";
import { ViewPlacemarkForm } from "house-map/view/ViewPlacemarkForm";
import { Popup } from "./components/Popup";
import IEvent = ymaps.IEvent;

interface IState {
	canEdit: boolean;
	currentPos: number[];
	mode: EFormType;
}

export class App extends Component<{}, IState> {
	state = {
		canEdit: false,
		currentPos: [],
		mode: EFormType.NONE
	};

	private controller = new AppController();
	private map: ymaps.Map;
	private mapRef: HTMLDivElement;
	private popupRef: RefObject<Popup> = createRef();

	componentDidMount() {
		window.addEventListener("DOMContentLoaded", () => this.init());

		this.controller.createItemEvent.addListener((item: PlacemarkItem) => {
			this.map.geoObjects.add(item.getPlacemark());
			this.setState({mode: EFormType.APPEND});
		});
		this.controller.selectItemEvent.addListener(() => {
			const mode = this.state.canEdit ? EFormType.EDIT : EFormType.VIEW;
			this.setState({mode});
		});
		this.controller.removeItemEvent.addListener((item: PlacemarkItem) => {
			this.map.geoObjects.remove(item.getPlacemark());
			this.setState({mode: EFormType.APPEND});
		});
	}

	render() {
		const showAddForm = this.state.mode == EFormType.APPEND;
		const showEditForm = this.state.mode == EFormType.EDIT;
		const showViewForm = this.state.mode == EFormType.VIEW;
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
					<AddPlacemarkForm
						show={showAddForm}
						onClose={() => this.setState({mode: EFormType.NONE})}
						onAppend={(data) => this.controller.createItem(this.state.currentPos, data)}
					/>
					<EditPlacemarkForm
						show={showEditForm}
						item={this.controller.getSelectedItem()}
						onClose={() => this.setState({mode: EFormType.NONE})}
						onUpdate={(data) => this.controller.updateItem(data)}
						onRemove={() => this.controller.removeItem()}
					/>
					<ViewPlacemarkForm
						show={showViewForm}
						item={this.controller.getSelectedItem()}
						onClose={() => this.setState({mode: EFormType.NONE})}
					/>
				</div>
				<Popup
					ref={ this.popupRef }
					title={ "Добавить схемы для здания?" }
					renderActions={ (props) => {
						return (
							<>
								<Button
									color="primary"
									onClick={ () => {
										props.show(false);
										this.setState({mode: EFormType.APPEND});
									} }
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
				center: [56.630842, 47.886089],
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
				this.setState({currentPos: coords});
				const popup = this.popupRef.current;
				if (!popup.isShow()) {
					popup.open();
				}
			});
		});
	}
}
