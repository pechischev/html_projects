import { Typography, Button, Paper } from "@material-ui/core";
import * as React from "react";

export interface IInnerForm extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
	show: boolean;

	onClose(): void;
}

export const InnerForm = (props: IInnerForm) => {
	const {show = false, title, children, onClose, ...rest} = props;
	return (
		<Paper elevation={2} {...rest} style={ {display: show ? "" : "none"} } >
			<div>
				<Typography variant={ "title" }>{ title }</Typography>
				<Button variant="contained" onClick={() => onClose()}>Close</Button>
			</div>
			{children}
		</Paper>
	);
};