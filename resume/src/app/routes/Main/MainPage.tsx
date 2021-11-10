import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocalize } from '@hooks/useLocalize';
import Loading from '@components/Loading/Loading';
import useStyles from './MainPage.jss';

const MainPage = () : JSX.Element => {
	const classes = useStyles();
	const { MM } = useLocalize();

	return (
		<Loading>
			<Helmet>
				<title>{ process.env.APP_NAME }</title>
			</Helmet>
			<div className={classes.title}>
				<h1>{MM('title')}</h1>
			</div>
		</Loading>
	);
};

export default MainPage;
