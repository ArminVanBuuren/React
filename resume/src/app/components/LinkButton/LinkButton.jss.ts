import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root : {
		display: 'inherit',
		flexBasis: 'inherit',
	},
	label: {
		display: 'inherit',
		flexBasis: 'content',
		justifyContent: 'inherit',
		width: '100%',
		alignItems: 'center',
	}
}));

export default useStyles;