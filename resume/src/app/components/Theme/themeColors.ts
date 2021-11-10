import { PaletteOptions, SimplePaletteColorOptions, } from '@material-ui/core/styles/createPalette';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

export interface CustomTheme {
	palette: PaletteOptions;
	selectionPalette: SimplePaletteColorOptions;
	overrides?: any;
}

const backgroundLight = {
	paper: '#fff',
	default: '#f8f8f8',
};

const textLight = {
	primary: 'rgb(52,49,76)',
	secondary: 'rgba(52, 49, 76)',
	disabled: 'rgba(52, 49, 76, 0.38)',
	hint: 'rgba(52, 49, 76, 0.38)',
};

const textDark = {
	primary: 'rgb(222,222,222)',
	secondary: 'rgba(222,222,222)',
	disabled: 'rgba(222,222,222, 0.38)',
	hint: 'rgba(222,222,222, 0.38)',
};

const errorColor = {
	//main: '#FF3D57',
	main: '#ff2d4a',
	contrastText: '#ffffff',
};

export type ThemeType = {
	light: CustomTheme;
	dark: CustomTheme;
};

export type ThemeTypeKey = keyof ThemeType;

export const themeColors: Record<string, ThemeType> = {
	red: {
		light: {
			palette: {
				type: 'light',
				primary: {
					main: '#ef2933',
					contrastText: '#ffffff',
				},
				secondary: {
					main: '#ef2933',
					contrastText: '#ffffff',
				},
				error: errorColor,
				text: textLight,
				background: backgroundLight,
			},
			selectionPalette: {
				main: red[100]
			},
			overrides: {
				MuiMenu: {
					paper: {
						backgroundColor: backgroundLight.default,
					}
				},
			},
		},
		dark: {
			palette: {
				type: 'dark',
				primary: {
					main: '#ef2933',
					contrastText: '#ffffff',
				},
				secondary: {
					main: '#ef2933',
					contrastText: '#ffffff',
				},
				text: {
					primary: 'rgb(200,200,200)',
					secondary: 'rgba(200,200,200)',
					disabled: 'rgba(200,200,200, 0.38)',
					hint: 'rgba(200,200,200, 0.38)',
				},
				error: errorColor,
				background: {
					paper: '#22272b',
					default: '#171c20',
				},
			},
			selectionPalette: {
				main: '#892835'
			},
			overrides: {
				MuiMenu: {
					paper: {
						backgroundColor: '#1f2226',
					}
				},
			},
		},
	},
	blue: {
		light: {
			palette: {
				type: 'light',
				primary: {
					main: blue[700],
					contrastText: '#ffffff',
				},
				secondary: {
					main: red['A200'],
					contrastText: textLight.primary,
				},
				error: errorColor,
				text: textLight,
				background: backgroundLight,
			},
			selectionPalette: {
				main: '#b3d4fc'
			},
			overrides: {
				MuiMenu: {
					paper: {
						backgroundColor: backgroundLight.default,
					}
				},
			},
		},
		dark: {
			palette: {
				type: 'dark',
				primary: {
					main: blue[700],
					contrastText: '#ffffff',
				},
				secondary: {
					main: red['A400'],
					contrastText: textLight.primary,
				},
				error: errorColor,
				text: textDark,
				background: {
					paper: '#222A45',
					default: '#1a2038',
				},
			},
			selectionPalette: {
				main: '#344991'
			},
			overrides: {
				MuiMenu: {
					paper: {
						backgroundColor: '#1d243e',
					}
				},
			},
		},
	},
	orange: {
		light: {
			palette: {
				type: 'light',
				primary: {
					main: orange[500],
					contrastText: '#ffffff',
				},
				secondary: {
					main: orange[500],
					contrastText: '#ffffff',
				},
				error: errorColor,
				text: textLight,
				background: backgroundLight,
			},
			selectionPalette: {
				main: '#ffe7ae'
			},
			overrides: {
				MuiMenu: {
					paper: {
						backgroundColor: backgroundLight.default,
					}
				},
			},
		},
		dark: {
			palette: {
				type: 'dark',
				primary: {
					main: orange[300],
					contrastText: '#222a45',
				},
				secondary: {
					main: orange[300],
					contrastText: '#222a45',
				},
				error: errorColor,
				text: textDark,
				background: {
					paper: '#424242',
					default: '#303030',
				},
			},
			selectionPalette: {
				main: '#726646'
			},
			overrides: {
				MuiMenu: {
					paper: {
						backgroundColor: '#393939',
					}
				},
			},
		},
	},
};

export type ThemeNames = keyof typeof themeColors;