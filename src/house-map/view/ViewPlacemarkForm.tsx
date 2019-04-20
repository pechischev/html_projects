import * as _ from "lodash";
import { Component } from "react";
import { InnerForm } from "house-map/components/InnerForm";
import * as React from "react";
import { PlacemarkItem } from "house-map/model/PlacemarkItem";
import { LayerData } from "house-map/model/LayerData";

interface IViewPlacemarkForm {
	show: boolean;
	item: PlacemarkItem;

	onClose(): void;
}

interface IViewPlacemarkFormState {
	images: LayerData[];
	title: string;
	layer: number;
}

const LAYER_OFFSET = 20;
const MARGIN = 50;

export class ViewPlacemarkForm extends Component<IViewPlacemarkForm, IViewPlacemarkFormState> {
	state = {
		images: [],
		title: "",
		layer: 0,
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
				{this.renderLayer()}
			</InnerForm>
		);
	}

	private close() {
		const {onClose} = this.props;
		this.setState({
			layer: 0,
		});
		onClose();
	}

	private renderLayer() {
		const {images, layer} = this.state;
		const revertImages = _.reverse(images.slice());
		const image = !!revertImages[layer] ? revertImages[layer].getImage() : "";
		const title = !!revertImages[layer] ? revertImages[layer].getTitle() : "";
		return (
			<div className="layer-container">
				<div className="layer-image">
					<img src={ image } className="layer-image__image" />
				</div>
				<div className="layer-list">
					{revertImages.map((item, index) =>
						<span
							key={index}
							className="layer-list__item"
							data-active={layer == index}
							style={{
								top: LAYER_OFFSET * index,
								zIndex: (images.length + 1) - index
							}}
							onClick={() => this.setState({layer: index})}
						/>)
					}
					<span className="layer-list__title" style={{
						top: LAYER_OFFSET * (images.length + 1),
					}}>{title}</span>
				</div>
			</div>
		);
	}
}