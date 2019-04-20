import { Typography, Button, TextField } from "@material-ui/core";
import * as _ from "lodash";
import { Component, ChangeEvent } from "react";
import { InnerForm } from "house-map/components/InnerForm";
import * as React from "react";
import { LayerForm } from "house-map/view/LayerForm";
import { IFormData } from "house-map/model/IFormData";
import { PlacemarkItem } from "house-map/model/PlacemarkItem";

interface IEditPlacemarkForm {
	show: boolean;

	item: PlacemarkItem;

	onClose(): void;
	onUpdate(data: IFormData): void;
	onRemove(): void;
}

interface IEditPlacemarkFormState {
	images: object;
	title: string;
}

export class EditPlacemarkForm extends Component<IEditPlacemarkForm, IEditPlacemarkFormState> {
	state = {
		images: {},
		title: "",
	};

	componentWillUpdate(nextProps: IEditPlacemarkForm) {
		if (!nextProps.item) {
			return;
		}
		if (this.props.item != nextProps.item) {
			this.setState({
				title: nextProps.item.getTitle(),
				images: nextProps.item.getImages()
			});
		}
	}

	render() {
		const {show, item} = this.props;
		return (
			<InnerForm
				title={ "Редактирование" }
				show={ show }
				onClose={ this.close.bind(this) }
				className="form-layer"
			>
				<TextField
					label="Название метки"
					margin="normal"
					value={this.state.title	}
					onChange={this.setTitle.bind(this)}
				/>
				<LayerForm
					images={ this.state.images }
					updateImages={ (images) => this.setState({images}) }
				/>
				<Typography variant={ "button" }>
					<Button variant="contained" onClick={ this.update.bind(this) }>Сохранить</Button>
					<Button variant="contained" onClick={ this.remove.bind(this) } color="secondary">Удалить</Button>
				</Typography>
			</InnerForm>
		);
	}

	private update() {
		const {onUpdate} = this.props;
		const {images, title} = this.state;
		onUpdate({
			title,
			images: _.values(images)
		});
		this.close();
	}

	private remove() {
		const {onRemove} = this.props;
		onRemove();
		this.close();
	}

	private close() {
		const {onClose} = this.props;
		onClose();
	}

	private setTitle(event: ChangeEvent<HTMLInputElement>) {
		this.setState({
			title: event.target.value
		});
	}
}