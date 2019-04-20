import { Toolbar, IconButton, Typography, Button, AppBar, StyledComponentProps, withStyles } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import classNames from "classnames";
import * as React from "react";
import { Component, ReactNode } from "react";
import { Sidebar } from "./Sidebar";

const drawerWidth = 240;

const styles = (theme) => ({
	root: {
		display: "flex",
	},
	appBar: {
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
	},
	appBarShift: {
		width: `calc(100% - ${drawerWidth}px)`,
		marginLeft: drawerWidth,
		transition: theme.transitions.create(["margin", "width"], {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
	},
	menuButton: {
		marginLeft: 12,
		marginRight: 20,
	},
	hide: {
		display: "none",
	},
	content: {
		flexGrow: 1,
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.leavingScreen,
		}),
		width: 100
	},
	contentShift: {
		transition: theme.transitions.create("width", {
			easing: theme.transitions.easing.easeOut,
			duration: theme.transitions.duration.enteringScreen,
		}),
		width: `calc(100% - ${drawerWidth}px)`,
	},
});

interface IAppWrapperImpl extends StyledComponentProps {
	links?: object[];

	render(): ReactNode;
}

export const AppWrapper = withStyles(styles, {withTheme: true})(class AppWrapperImpl extends Component<IAppWrapperImpl> {
	state = {
		open: false,
	};

	changeOpen(value: boolean) {
		this.setState({open: value});
	}

	render() {
		const {children, classes, render} = this.props;
		const {open} = this.state;
		return (
			<div className="house-map">
				<AppBar
					position="fixed"
					className={ classNames(classes.appBar, {
						[classes.appBarShift]: open,
					}) }>
					<Toolbar>
						<IconButton
							style={ {
								marginLeft: -12,
								marginRight: 20,
							} }
							color="inherit"
							aria-label="Menu"
							onClick={() => this.changeOpen(true)}
							className={ classNames(classes.menuButton, open && classes.hide) }
						>
							<MenuIcon/>
						</IconButton>
						<Typography variant="h6" color="inherit" style={ {flexGrow: 1} }>
							House Map
						</Typography>
						<Button color="inherit">Вход</Button>
					</Toolbar>
				</AppBar>
				<Sidebar open={ open } changeOpen={ this.changeOpen.bind(this) }/>
				<main
					className={classNames(classes.content, {
						[classes.contentShift]: open,
						["house-map-content"]: true
					})}
				>
					{render()}
					{children}
				</main>
			</div>
		);
	}
});
