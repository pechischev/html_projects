import { Typography, Button } from "@material-ui/core";
import { Component } from "react";
import { InnerForm } from "house-map/components/InnerForm";
import * as React from "react";

interface IAddPlacemarkForm {
	show: boolean;

	onClose(): void;

	onAppend(): void;
}

export class AddPlacemarkForm extends Component<IAddPlacemarkForm> {
	render() {
		const {show, onClose} = this.props;
		return (
			<InnerForm
				title={ "Добавление" }
				show={ show }
				onClose={ onClose.bind(this) }
				className="form-layer"
			>
				<Typography variant={"body1"}>

				</Typography>
				<Typography variant={ "button" }>
					<Button onClick={ this.append.bind(this) }>Добавить</Button>
				</Typography>
			</InnerForm>
		);
	}

	private append() {
		const {onAppend, onClose} = this.props;
		onAppend();
		onClose();
	}
}