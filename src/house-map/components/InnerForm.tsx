import { Typography, Paper, IconButton } from "@material-ui/core";
import * as React from "react";
import CloseIcon from "@material-ui/icons/Close";

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
				<IconButton onClick={onClose} style={{float: "left"}}>
					<CloseIcon/>
				</IconButton>
				<Typography variant={ "title" } style={{padding: 12}}>{ title }</Typography>
			</div>
			{children}
		</Paper>
	);
};