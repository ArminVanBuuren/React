import React from 'react';
import { Router, Switch, Route, Redirect } from 'react-router-dom';

import { SettingsProvider } from '@contexts/SettingsContext';
import { StoresContext, useStores } from '@stores/store';
import MainTheme from '@components/Theme/MainTheme';
import GlobalCss from '@components/Theme/GlobalCss';
import history from '@utils/history';
import MainRoute, { NotFoundPage, ServerErrorPage } from '@routes/index';
import MainSnackbar from '@views/MainSnackbar/MainSnackbar';
import ChangeThemeButton from '@views/Theme/ThemeButton';

const App = (): JSX.Element => {
	const stores = useStores();
	return (
		<SettingsProvider>
			<StoresContext.Provider value={stores}>
					<MainTheme>
						<GlobalCss />
						<MainSnackbar />
						<ChangeThemeButton />
						<Router history={history}>
							<Switch>
								<Route path={process.env.MAIN_PATH} component={MainRoute} />
								<Route path={`${process.env.MAIN_PATH}/ServerError`} component={ServerErrorPage} />
								<Route path={`${process.env.MAIN_PATH}/NotFound`} component={NotFoundPage} />
								<Redirect from='/' to={`${process.env.MAIN_PATH}/NotFound`} />
							</Switch>
						</Router>
					</MainTheme>
			</StoresContext.Provider>
		</SettingsProvider>
	);
};

export default App;
