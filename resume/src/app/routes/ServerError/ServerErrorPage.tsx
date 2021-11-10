import React from 'react';
import { useLocalize } from '@hooks/useLocalize';
import Loading from '@components/Loading/Loading';
import { Helmet } from 'react-helmet';
import useStyles from './ServerErrorPage.jss';

const ServerErrorPage = (): JSX.Element => {
	const classes = useStyles();
	const { SE } = useLocalize();
	const title = SE('title');

	return (
		<Loading>
			<Helmet>
				<title>{ process.env.APP_NAME }</title>
			</Helmet>
			<div className={classes.title}>
				<h1>{title}</h1>
			</div>
		</Loading>
	);
};

export default ServerErrorPage;
