import React from 'react';
import { useLocalize } from '@hooks/useLocalize';
import Loading from '@components/Loading/Loading';
import { Helmet } from 'react-helmet';
import useStyles from './NotFoundPage.jss';

const NotFoundPage = (): JSX.Element => {
	const classes = useStyles();
	const { NF } = useLocalize();

	return (
		<Loading>
			<Helmet>
				<title>{ process.env.APP_NAME }</title>
			</Helmet>
			<div className={classes.title}>
				<h1>{NF('title')}</h1>
			</div>
		</Loading>
	);
};

export default NotFoundPage;
