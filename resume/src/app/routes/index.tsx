import React from 'react';
import { Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';
import MainPage from './Main/MainPage';
import NotFoundPage from './NotFound/NotFoundPage';
import ServerErrorPage from './ServerError/ServerErrorPage';

export default (): JSX.Element => {
	const { path } = useRouteMatch();
	return (
		<Switch>
			<Route exact path={path} component={MainPage} />
			<Route path={`${process.env.MAIN_PATH}/ServerError`} component={ServerErrorPage} />
			<Route path={`${process.env.MAIN_PATH}/NotFound`} component={NotFoundPage} />
			<Redirect from='/' to={`${process.env.MAIN_PATH}/NotFound`} />
		</Switch>
	);
};

export { default as NotFoundPage } from './NotFound/NotFoundPage';
export { default as ServerErrorPage } from './ServerError/ServerErrorPage';