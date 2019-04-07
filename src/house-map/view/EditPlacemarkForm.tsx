import { Typography, Button } from "@material-ui/core";
import { Component } from "react";
import { InnerForm } from "house-map/components/InnerForm";
import * as React from "react";
import { LayerForm } from "house-map/view/LayerForm";

interface IEditPlacemarkForm {
	show: boolean;

	onClose(): void;
	onUpdate(): void;
	onRemove(): void;
}

interface IEditPlacemarkFormState {
	images: object;
}

export class EditPlacemarkForm extends Component<IEditPlacemarkForm, IEditPlacemarkFormState> {
	state = {
		images: {},
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
					<Button onClick={ this.update.bind(this) }>Сохранить</Button>
					<Button onClick={ this.remove.bind(this) } color="secondary">Удалить</Button>
				</Typography>
				<LayerForm
					images={ this.state.images }
					updateImages={ (images) => this.setState({images}) }
				/>
			</InnerForm>
		);
	}

	private update() {
		const {onUpdate} = this.props;
		onUpdate();
		this.close();
	}

	private remove() {
		const {onRemove} = this.props;
		onRemove();
		this.close();
	}

	private close() {
		const {onClose} = this.props;
		this.setState({images: {}});
		onClose();
	}
}