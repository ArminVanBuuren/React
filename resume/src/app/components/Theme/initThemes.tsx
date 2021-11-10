import { createTheme, Theme } from '@material-ui/core/styles';
import { forEach, merge } from 'lodash';
import { themeColors } from './themeColors';
import themeOptions from './themeOptions';

function createThemes() {
	const themes: Record<string, Record<string, Theme>> = {};

	forEach(themeColors, (themeType, name) => {
		const themeTypes: Record<string, Theme> = {};

		forEach(themeType, (theme, type) => {
			const merged = merge({}, themeOptions, theme);
			themeTypes[type] = createTheme(merged);
		});

		themes[name] = themeTypes;
	});

	return themes;
}

export const themes = createThemes();
