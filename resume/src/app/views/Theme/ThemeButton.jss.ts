import { makeStyles } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';
import orange from '@material-ui/core/colors/orange';

export const useStyles = makeStyles((theme) => ({
	root: {
		textAlign: 'center',
		width: '100%',
		position: 'fixed',
		top: 0,
		right: 0,
		zIndex: 999,
	},
	buttonTheme: {
		position: 'absolute',
		top: theme.spacing(2),
		right: theme.spacing(2),
	},
	paper: {
		border: '1px solid',
		borderColor: theme.palette.type === 'light' ? 'rgba(0, 0, 0, 0.23)' : 'rgba(255, 255, 255, 0.23)',
		backgroundColor: theme.palette.background.paper,
		paddingTop: '4px',
		paddingBottom: '4px',
		paddingLeft: '16px',
		paddingRight: '16px',
	},
	menu: {
		'& .MuiMenu-list': {
			minWidth: '150px',
			maxWidth: '150px',
			display: 'flex',
			justifyContent: 'space-between',
			flexWrap: 'wrap',
		},
		// "& li:first-child": {
		// 	marginLeft: '0'
		// },
		// "& li:nth-last-child(2)": {
		// 	marginRight: '0 !important'
		// },
	},
	menuItem: {
		//flex: '1 1 auto',
		borderRadius: '5px',
		padding: '1px',
		textAlign: 'center',
		display: 'inline-block',
		'&:focus': {
			//backgroundColor: theme.palette.primary.main,
			'& .MuiListItemIcon-root, & .MuiListItemText-primary': {
				color: theme.palette.common.white,
			},
		},
	},
	menuItemThemeType: {
		display: 'block',
		flexBasis: '100%',
		textAlign: 'center',
		paddingTop: '4px',
		'& .MuiFormControlLabel-labelPlacementStart': {
			margin: '0',
			marginLeft: '9px',
		},
	},
	themeCheck: {
		position: 'absolute',
		top: '25%',
		left: '0',
		width: '100%',
		height: '50%',
		color: 'white'
	},
	themeItem: {
		margin: 'auto',
		borderRadius: '4px',
		width: '30px',
		height: '30px'
	},
	red: {
		backgroundColor: red[700]
	},
	blue: {
		backgroundColor: blue[700]
	},
	orange: {
		backgroundColor: orange[700]
	},
}));
