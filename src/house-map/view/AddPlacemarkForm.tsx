import { Typography, Button, TextField } from "@material-ui/core";
import * as _ from "lodash";
import { Component, ChangeEvent } from "react";
import { InnerForm } from "house-map/components/InnerForm";
import * as React from "react";
import { LayerForm } from "house-map/view/LayerForm";
import { IFormData } from "house-map/model/IFormData";
import { LayerData } from "house-map/model/LayerData";

interface IAddPlacemarkForm {
	show: boolean;

	onClose(): void;

	onAppend(data: IFormData): void;
}

interface IAddPlacemarkFormState {
	title: string;
	images: {[key: string]: LayerData};
}

export class AddPlacemarkForm extends Component<IAddPlacemarkForm, IAddPlacemarkFormState> {
	state = {
		images: {},
		title: "",
	};

	render() {
		const {show} = this.props;
		return (
			<InnerForm
				title={ "Добавление" }
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
					<Button variant="contained" onClick={ this.append.bind(this) }>Сохранить</Button>
				</Typography>
			</InnerForm>
		);
	}

	private close() {
		const {onClose} = this.props;
		this.setState({images: {}});
		onClose();
	}

	private append() {
		const {onAppend} = this.props;
		const {images, title} = this.state;
		onAppend({
			title,
			images: _.values(images)
		});
		this.close();
	}

	private setTitle(event: ChangeEvent<HTMLInputElement>) {
		this.setState({
			title: event.target.value
		});
	}
}
