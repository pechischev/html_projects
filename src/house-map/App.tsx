import { Button } from "@material-ui/core";
import { AppController } from "house-map/AppController";
import { EFormType } from "house-map/interfaces";
import { PlacemarkItem } from "house-map/model/PlacemarkItem";
import { AddPlacemarkForm } from "house-map/view/AddPlacemarkForm";
import { AppWrapper } from "house-map/view/AppWrapper";
import { EditPlacemarkForm } from "house-map/view/EditPlacemarkForm";
import { ViewPlacemarkForm } from "house-map/view/ViewPlacemarkForm";
import * as React from "react";
import { Component, RefObject, createRef } from "react";
import { Popup } from "./components/Popup";
import IEvent = ymaps.IEvent;

interface IState {
	currentPos: number[];
	mode: EFormType;
}

export class App extends Component<{}, IState> {
	state = {
		currentPos: [],
		mode: EFormType.NONE
	};

	private controller = new AppController();
	private map: ymaps.Map;
	private mapRef: HTMLElement;
	private popupRef: RefObject<Popup> = createRef();

	componentDidMount() {
		window.addEventListener("DOMContentLoaded", () => this.init());

		this.controller.createItemEvent.addListener((item: PlacemarkItem) => {
			this.map.geoObjects.add(item.getPlacemark());
			this.setState({mode: EFormType.APPEND});
		});
		this.controller.selectItemEvent.addListener(() => {
			const mode = this.canEdit() ? EFormType.EDIT : EFormType.VIEW;
			this.setState({mode});
		});
		this.controller.removeItemEvent.addListener((item: PlacemarkItem) => {
			this.map.geoObjects.remove(item.getPlacemark());
			this.setState({mode: EFormType.APPEND});
		});
	}

	render() {
		return (
			<AppWrapper
				render={() => {
					return (
						<>
							<div className="map" ref={ (ref) => this.mapRef = ref }/>
							{this.renderForms()}
						</>
					);
				}}
			>
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
			</AppWrapper>
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
				if (!this.canEdit()) {
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

	private renderForms() {
		const showAddForm = this.state.mode == EFormType.APPEND;
		const showEditForm = this.state.mode == EFormType.EDIT;
		const showViewForm = this.state.mode == EFormType.VIEW;
		return (
			<>
				<AddPlacemarkForm
					show={ showAddForm }
					onClose={ () => this.setState({mode: EFormType.NONE}) }
					onAppend={ (data) => this.controller.createItem(this.state.currentPos, data) }
				/>
				<EditPlacemarkForm
					show={ showEditForm }
					item={ this.controller.getSelectedItem() }
					onClose={ () => this.setState({mode: EFormType.NONE}) }
					onUpdate={ (data) => this.controller.updateItem(data) }
					onRemove={ () => this.controller.removeItem() }
				/>
				<ViewPlacemarkForm
					show={ showViewForm }
					item={ this.controller.getSelectedItem() }
					onClose={ () => this.setState({mode: EFormType.NONE}) }
				/>
			</>
		);
	}

	private canEdit(): boolean {
		return JSON.parse(localStorage.getItem("edit")) || false;
	}
}
