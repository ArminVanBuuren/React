import React, { useContext, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import IconButton from '@material-ui/core/IconButton';
import FormatColorFill from '@material-ui/icons/FormatColorFill';
import Slide from '@material-ui/core/Slide';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel'
import Switch from '@material-ui/core/Switch';
import Check from '@material-ui/icons/Check';
import classNames from 'classnames';
import useSettings from '@hooks/useSettings';
import { useStyles } from '@views/Theme/ThemeButton.jss';
import { ILayoutSettings } from '@components/Theme/settings';
import { SC } from '@utils/localizer';
import localStorage from '@utils/localStorageService';
import { ThemeTypeKey } from '@components/Theme/themeColors';
import { StoresContext } from '@stores/store';


export default observer((): JSX.Element => {
	const classes = useStyles();
	const stores = useContext(StoresContext);
	const { isBusy } = stores.commonStore;
	const { settings, updateSettings } = useSettings();
	const [active, setActive] = useState(false);
	const [anchorEl, setAnchorEl] = useState<any>(null);

	const handleClose = () => {
		setAnchorEl(null);
		setActive(false);
	};

	const updateThemeSettings = (newSettings: ILayoutSettings) => {
		updateSettings(newSettings as ILayoutSettings);

		if (newSettings.activeTheme) {
			saveTheme(newSettings.activeTheme);
		}

		if (newSettings.themeType) {
			saveThemeType(newSettings.themeType);
		}
	};

	const saveTheme = (theme: string) => {
		localStorage.setItem('activeTheme', theme);
	};

	const saveThemeType = (themeType: string) => {
		localStorage.setItem('themeType', themeType);
	};

	useEffect(() => {
		const activeTheme = localStorage.getItem('activeTheme');
		const themeType = localStorage.getItem('themeType');

		if (settings?.themes) {
			const userSettings: any = {};

			if (activeTheme && settings.activeTheme !== activeTheme && activeTheme in settings.themes) {
				userSettings.activeTheme = activeTheme;
			}
			else {
				saveTheme(settings.activeTheme);
			}

			if (themeType && settings.themeType !== themeType && themeType as ThemeTypeKey) {
				userSettings.themeType = themeType as ThemeTypeKey;
			}
			else {
				saveThemeType(settings.themeType);
			}

			if (Object.keys(userSettings).length > 0) {
				updateSettings(userSettings as ILayoutSettings);
			}
		}

	},[]);


	const handleMouseMove = (event: any) => {

		if (isBusy) {
			setActive(false);
			return;
		}

		event = event || window.event; // IE-ism
		const eventDoc = (event.target && event.target.ownerDocument) || document;
		const doc = eventDoc.documentElement;
		const body = eventDoc.body;

		if (event.pageX == null && event.clientX != null) {
			event.pageX = event.clientX +
				(doc && doc.scrollLeft || body && body.scrollLeft || 0) -
				(doc && doc.clientLeft || body && body.clientLeft || 0);
			event.pageY = event.clientY +
				(doc && doc.scrollTop  || body && body.scrollTop  || 0) -
				(doc && doc.clientTop  || body && body.clientTop  || 0 );
		}

		const scrollTop = doc && doc.scrollTop  || body && body.scrollTop  || 0;
		const blockWidth = Math.trunc((window.innerWidth / 100) * 12);
		const blockHeight = Math.trunc((window.innerHeight / 100) * 12);

		if (event.pageX >= (window.innerWidth - blockWidth) && event.pageX <= window.innerWidth
			&& event.pageY >= scrollTop && event.pageY <= scrollTop + blockHeight) {
			setActive(true);
		}
		else if (anchorEl == null) {
			setActive(false);
		}
	};

	useEffect(() => {
		document.onmousemove = handleMouseMove;
		return () => {
			document.onmousemove = null;
		};
	}, [anchorEl, isBusy]);
	

	return (
		<div className={classes.root}>
			<Slide in={active} direction='left' timeout={300}>
				<div>
					<IconButton className={classNames(classes.buttonTheme)}
								key='chooseTheme'
								aria-label='ChooseTheme'
								color='inherit'
								onClick={(EO) => setAnchorEl(EO.currentTarget)}
					>
						<FormatColorFill color='secondary' />
					</IconButton>
					<Menu className={classes.menu}
						  classes={{paper: classes.paper}}
						  id='theme-menu'
						  elevation={6}
						  getContentAnchorEl={null}
						  anchorOrigin={{
							  vertical: 'bottom',
							  horizontal: 'center',
						  }}
						  transformOrigin={{
							  vertical: 'top',
							  horizontal: 'right',
						  }}
						  anchorEl={anchorEl}
						  open={Boolean(anchorEl)}
						  onClose={handleClose}>
						{settings?.themes && Object.keys(settings.themes).map((key) => (
							<MenuItem key={key} className={classes.menuItem} onClick={() => {
								updateThemeSettings({ activeTheme: key } as ILayoutSettings);
							}}>
								<div className={`elevation-z6 ${classes.themeItem} ${(classes as Record<string, string>)[key]}`}>
									{ settings.activeTheme === key && <Check className={classes.themeCheck} /> }
								</div>
							</MenuItem>
						))}
						<li className={classes.menuItemThemeType} >
							<FormControlLabel label={SC('DarkMode')}
											  labelPlacement='start'
											  control={
												  <Switch checked={settings?.themeType === 'dark'}
														  onChange={() => {
															  updateThemeSettings({ themeType: settings?.themeType === 'light' ? 'dark' : 'light' } as ILayoutSettings);
														  }}
														  value='checkedA'
														  color='secondary'
														  inputProps={{ 'aria-label': 'secondary checkbox' }}
												  />
											  }
							/>
						</li>
					</Menu>
				</div>
			</Slide>
		</div>
	);
});
