import { Paper } from "@material-ui/core";
import { Component } from "react";
import * as React from "react";

interface IForm extends React.HTMLAttributes<HTMLDivElement> {
}

export class Form extends Component<IForm> {
	render() {
		const {children, ...rest} = this.props;
		return (
			<Paper elevation={2} {...rest}>
				{children}
			</Paper>
		);
	}
}