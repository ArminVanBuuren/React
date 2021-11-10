import React, {ReactNode} from 'react';
import classNames from 'classnames';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useStyles } from './PaperSheet.jss';

export interface PaperSheetProps {
	title: string;
	desc: string;
	children: ReactNode;
	whiteBg?: boolean;
	colorMode?: boolean;
	noMargin?: boolean;
	overflowX?: boolean;
}

export default function PaperSheet(props: PaperSheetProps): JSX.Element {
	const classes = useStyles();
	const { title, desc, children, whiteBg = false, noMargin = false, colorMode = false, overflowX = false } = props;

	return (
		<div>
			<Paper className={classNames(classes.root, noMargin && classes.noMargin, colorMode && classes.colorMode)} elevation={4}>
				<Typography variant='h2' component='h2' className={classes.title}>
					{title}
				</Typography>
				<Typography component='p' className={classes.description}>
					{desc}
				</Typography>
				<section className={classNames(classes.content, whiteBg && classes.whiteBg, overflowX && classes.overflowX)}>
					{children}
				</section>
			</Paper>
		</div>
	);
}