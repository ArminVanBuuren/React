import { Theme } from '@material-ui/core';
import { ThemeNames, ThemeTypeKey } from '@components/Theme/themeColors';
import { themes } from '@components/Theme/initThemes';

export interface ILayoutSettings {
	activeTheme: ThemeNames;
	themeType: ThemeTypeKey;
	themes: Record<string, Record<string, Theme>>;
}

export const LayoutSettings: ILayoutSettings = {
    activeTheme: 'blue',
	themeType: 'light',
    themes: themes,
};
