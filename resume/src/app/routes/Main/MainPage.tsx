import React, { Fragment, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocalize } from '@hooks/useLocalize';
import Loading from '@components/Loading/Loading';
import { useStores } from '@stores/store';
import useStyles from './MainPage.jss';
import LinkButton from '@components/LinkButton/LinkButton';
import Guthub from '@icons/Github';
import Skype from '@icons/Skype';
import Telegram from '@icons/Telegram';
import { getPhoneNumber } from '@utils/formatter';
import { toJS } from 'mobx';
import { useTranslation } from 'react-i18next';
import SimpleCard from '@components/Cards/SimpleCards';
import classNames from 'classnames';
import PhoneIphone from '@material-ui/icons/PhoneIphone';
import Linkedin from '@icons/Linkedin';

const MainPage = () : JSX.Element => {
	const classes = useStyles();
	const { i18n } = useTranslation();
	const { commonStore, cvStore } = useStores();
	const { cvData, getCvData } = cvStore;

	useEffect(() => {
		getCvData().catch(e => console.log(e));
	}, []);


	return (
		<Loading isReady={Boolean(cvData)} classes={classes.root}>
			<Helmet>
				<title>{ process.env.APP_NAME }</title>
			</Helmet>
			{ Object.entries(cvData ?? {}).map(([name, cvData]) => {
				const data = cvData.localized.find(x => x.langMatches.includes(i18n.language));
				if (!data)
					return false;

				return (
					<SimpleCard key={name} classes={classes.card}>
						<header className={classes.header}>
							<div className={classes.headerImg}>
								<img className={classNames('elevation-z10')} src={cvData.avatar} />
							</div>
							<div className={classes.headerInfo}>
								<h1 className='font-bold'>{data.name}</h1>
								<h2 className='font-normal'>{data.position}</h2>
								<ul>
									{ data.contacts.tel?.map(x => {
										const { normal, display } = getPhoneNumber(x);
										return <li key={normal}><LinkButton to={{pathname:`tel:${normal}`}} target="_blank"><PhoneIphone className={classes.itemImg}/>{display}</LinkButton></li>;
									}) }
									{ data.contacts.skype?.map(x => <li key={x}><LinkButton to={{pathname:`skype:${x}?userinfo`}} target="_blank"><Skype classes={classes.itemImg}/>{x}</LinkButton></li>) }
									{ data.contacts.github?.map(x => <li key={x}><LinkButton to={{pathname:`https://github.com/${x}`}} target="_blank"><Guthub classes={classes.itemImg}/>{x}</LinkButton></li>) }
									{ data.contacts.telegram?.map(x => <li key={x}><LinkButton to={{pathname:`https://t.me/${x}`}} target="_blank"><Telegram classes={classes.itemImg}/>{x}</LinkButton></li>) }
									{ data.contacts.linkedin?.map(x => <li key={x}><LinkButton to={{pathname:`https://t.me/${x}`}} target="_blank"><Linkedin classes={classes.itemImg}/>{x}</LinkButton></li>) }
								</ul>
							</div>
						</header>
						<main>

						</main>
						<div className={classes.title}>

							{/*<hr/>*/}
						</div>
					</SimpleCard>
				);
			}) }
		</Loading>
	);
};

export default MainPage;
