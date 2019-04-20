import {
	Drawer,
	IconButton,
	Divider,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	withStyles,
	StyledComponentProps
} from "@material-ui/core";
import * as React from "react";
import { Component } from "react";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import InboxIcon from "@material-ui/icons/MoveToInbox";

const drawerWidth = 240;

const styles = (theme) => ({
	sidebar: {
		width: drawerWidth,
		flexShrink: 0,
	},
	sidebarContainer: {
		width: drawerWidth,
	},
	sidebarHeader: {
		display: "flex",
		alignItems: "center",
		padding: "0 8px",
		...theme.mixins.toolbar,
		justifyContent: "flex-end",
	},
});

interface ISidebarProps extends StyledComponentProps {
	open: boolean;

	changeOpen(value: boolean): void;
}

class SidebarImpl extends Component<ISidebarProps> {
	render() {
		const {open = true, changeOpen, classes} = this.props;

		return (
			<Drawer
				className={classes.drawer}
				variant="persistent"
				anchor="left"
				open={open}
				classes={{
					paper: classes.sidebarContainer,
				}}
			>
				<div className={classes.sidebarHeader}>
					<IconButton onClick={() => changeOpen(false)}>
						<ChevronLeftIcon />
					</IconButton>
				</div>
				<Divider />
				<List>
					{["Inbox", "Starred", "Send email", "Drafts"].map((text, index) => (
						<ListItem button={true} key={text}>
							<ListItemIcon>
								<InboxIcon />
							</ListItemIcon>
							<ListItemText primary={text} />
						</ListItem>
					))}
				</List>
			</Drawer>
		);
	}
}

export const Sidebar = withStyles(styles, { withTheme: true })(SidebarImpl);