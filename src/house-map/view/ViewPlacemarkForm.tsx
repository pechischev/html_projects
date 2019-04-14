import { Component } from "react";
import { InnerForm } from "house-map/components/InnerForm";
import * as React from "react";
import { LayerForm } from "house-map/view/LayerForm";
import { PlacemarkItem } from "house-map/model/PlacemarkItem";

interface IViewPlacemarkForm {
	show: boolean;

	item: PlacemarkItem;

	onClose(): void;
}

interface IViewPlacemarkFormState {
	images: object;
	title: string;
}

export class ViewPlacemarkForm extends Component<IViewPlacemarkForm, IViewPlacemarkFormState> {
	state = {
		images: {},
		title: "",
	};

	componentWillUpdate(nextProps: IViewPlacemarkForm) {
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
		const {show} = this.props;
		return (
			<InnerForm
				title={ this.state.title }
				show={ show }
				onClose={ this.close.bind(this) }
				className="form-layer"
			>
				<LayerForm
					images={ this.state.images }
					updateImages={ (images) => this.setState({images}) }
				/>
			</InnerForm>
		);
	}

	private close() {
		const {onClose} = this.props;
		onClose();
	}
}