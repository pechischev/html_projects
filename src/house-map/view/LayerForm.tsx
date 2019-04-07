import { TextField, Fab } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import * as React from "react";
import { Component } from "react";
import { UploadFile } from "house-map/components/UploadFile";
import { LayerData } from "house-map/model/LayerData";

const sha1 = require("sha1");

interface ILayerFormProps {
	images: {[key: string]: LayerData};

	updateImages(images: {[key: string]: LayerData}): void;
}

export class LayerForm extends Component<ILayerFormProps> {
	render() {
		return (
			<div>
				<div>
					{ Object.keys(this.props.images).map((key) => this.renderPreview(key)) }
				</div>
				<UploadFile
					fileTypes={ [".jpeg", ".png", ".jpg"] }
					onLoaded={ (ev) => {
						const {images, updateImages} = this.props;
						const item = (ev.target as any & { result: string }).result;
						const hash = sha1(item);
						const data = new LayerData(item, hash, "Этаж");
						updateImages({...images, [hash]: data});
					} }
				/>
			</div>
		);
	}

	private renderPreview(key: string) {
		const data = this.props.images[key];
		return (
			<div className="preview-container">
				<TextField
					label="Название схемы"
					margin="normal"
					variant="outlined"
					value={data.getTitle()}
					onChange={(event) => data.setTitle(event.target.value)}
				/>
				<img src={ data.getImage() } className="preview-container__image" key={ key }/>
				<Fab className="preview-container__remove-icon" onClick={ () => this.removeImage(key) }>
					<DeleteIcon/>
				</Fab>
			</div>
		);
	}

	private removeImage(key: string) {
		const {images, updateImages} = this.props;
		delete images[key];
		updateImages(images);
	}
}