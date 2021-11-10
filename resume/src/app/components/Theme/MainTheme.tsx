import React, { ReactNode } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import CssVars from './CssVars';
import useSettings from '@hooks/useSettings';

export interface MnpThemeProps {
	children?: ReactNode;
}

const MainTheme = ({ children }: MnpThemeProps): JSX.Element => {
	const { settings } = useSettings();
	const activeTheme = { ...settings?.themes[settings.activeTheme][settings.themeType] };

	return (
		<ThemeProvider theme={activeTheme}>
			<CssBaseline />
			<CssVars>{children}</CssVars>
		</ThemeProvider>
	);
};

export default MainTheme;
