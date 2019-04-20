import { Component, ChangeEvent, RefObject, createRef } from "react";
import * as React from "react";
import { Button } from "@material-ui/core";

interface IUploadFileProps {
	fileTypes: string[];

	multiple?: boolean;

	onLoad?(ev: ProgressEvent, file: File): void;
	onLoaded?(ev: ProgressEvent, file: File): void;
}

export class UploadFile extends Component<IUploadFileProps> {
	private inputRef: RefObject<HTMLInputElement> = createRef();

	render() {
		const {fileTypes = [], multiple = false} = this.props;
		return (
			<div style={{margin: "15px 0"}}>
				<Button  onClick={this.loadImage.bind(this)}>Загрузить изображение</Button>
				<input
					ref={this.inputRef}
					type="file"
					multiple={multiple}
					accept={fileTypes.join(", ")}
					onChange={this.onInputChange.bind(this)}
					style={{visibility: "hidden"}}
				/>
			</div>
		);
	}

	private onInputChange(event: ChangeEvent<HTMLInputElement>) {
		const {onLoaded, onLoad} = this.props;
		for (const file of event.target.files) {
			const reader = new FileReader();
			if (onLoad) {
				reader.onload = (ev) => onLoad(ev, file);
			}
			if (onLoaded) {
				reader.onloadend = (ev) => onLoaded(ev, file);
			}
			reader.readAsDataURL(file);
		}
	}

	private loadImage() {
		const input = this.inputRef.current;
		if (!input) {
			return;
		}
		input.click();
	}

}