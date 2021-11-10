import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

export const useStyles = makeStyles((theme) => ({
	Info: {
		backgroundColor: theme.palette.primary.main,
	},
	Success: {
		backgroundColor: green[500],
	},
	Warning: {
		backgroundColor: amber[700],
	},
	Error: {
		backgroundColor: theme.palette.error.main,
	},
	icon: {
		fontSize: 20,
		color: theme.palette.error.contrastText,
	},
	iconVariant: {
		opacity: 0.9,
		marginRight: theme.spacing(1),
	},
	message: {
		display: 'flex',
		alignItems: 'center',
		color: theme.palette.error.contrastText
	},
}));