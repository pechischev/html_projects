import { Typography, Button } from "@material-ui/core";
import { Component } from "react";
import { InnerForm } from "house-map/components/InnerForm";
import * as React from "react";

interface IEditPlacemarkForm {
	show: boolean;

	onClose(): void;
	onUpdate(): void;
	onRemove(): void;
}

export class EditPlacemarkForm extends Component<IEditPlacemarkForm> {
	render() {
		const {show, onClose} = this.props;
		return (
			<InnerForm
				title={ "Добавление" }
				show={ show }
				onClose={ onClose.bind(this) }
				className="form-layer"
			>
				<div>
					<p>Загрузка изображения</p>
				</div>
				<Typography variant={ "button" }>
					<Button onClick={ this.update.bind(this) }>Сохранить</Button>
					<Button onClick={ this.remove.bind(this) } color="secondary">Удалить</Button>
				</Typography>
			</InnerForm>
		);
	}

	private update() {
		const {onUpdate, onClose} = this.props;
		onUpdate();
		onClose();
	}

	private remove() {
		const {onRemove, onClose} = this.props;
		onRemove();
		onClose();
	}
}