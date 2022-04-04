import React from 'react';
import useStyles from './LinkButton.jss';
import { Link, LinkProps } from 'react-router-dom';

export default ({ children, ...other }: LinkProps): JSX.Element => {
	const classes = useStyles();
	return (
		<Link className={classes.root} {...other}>
			<span className={classes.label}>{children}</span>
		</Link>
	);
};