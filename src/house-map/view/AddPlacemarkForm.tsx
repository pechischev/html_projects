import { Typography, Button } from "@material-ui/core";
import * as _ from "lodash";
import { Component } from "react";
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
				<Typography variant={ "button" }>
					<Button onClick={ this.append.bind(this) }>Сохранить</Button>
				</Typography>
				<LayerForm
					images={ this.state.images }
					updateImages={ (images) => this.setState({images}) }
				/>
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
}
