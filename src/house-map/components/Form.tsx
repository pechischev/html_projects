import { Paper, Typography } from "@material-ui/core";
import * as React from "react";

export interface IForm extends React.HTMLAttributes<HTMLDivElement> {
	title: string;
}

export const Form = (props: IForm) => {
	const {children, title, ...rest} = props;
	return (
		<Paper elevation={2} {...rest} >
			<Typography variant={ "title" }>{ title }</Typography>
			{children}
		</Paper>
	);
};