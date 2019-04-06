import { Dialog, DialogTitle, DialogContent, DialogActions } from "@material-ui/core";
import { Component, ReactNode } from "react";
import * as React from "react";

interface IPopupState {
	open: boolean;
}

interface IPopupProps {
	title: string;
	show?: boolean;

	renderContent?(props: Popup): ReactNode;

	renderActions(props: Popup): ReactNode;
}

export class Popup extends Component<IPopupProps, IPopupState> {
	constructor(props: IPopupProps) {
		super(props);
		this.state = {
			open: false
		};
	}

	render() {
		const {renderContent = null, renderActions, title} = this.props;
		return (
			<Dialog onClose={ () => this.close() } open={ this.state.open }>
				<DialogTitle>{ title }</DialogTitle>
				{ !!renderContent
					? (
						<DialogContent>
							{ renderContent(this) }
						</DialogContent>
					)
					: null
				}
				<DialogActions>
					{ renderActions(this) }
				</DialogActions>
			</Dialog>
		);
	}

	open() {
		this.show(true);
	}

	close() {
		this.show(false);
	}

	show(value: boolean) {
		this.setState({
			open: value
		});
	}

	isShow(): boolean {
		return this.state.open;
	}
}