import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		display: 'inline-block',
		fill: 'currentcolor',
		width: 24,
		height: 24,
		flexShrink: 0,
		userSelect: 'none',
		transition: 'fill 200ms cubic-bezier(0.4, 0, 0.2, 1) 0ms',
	},
}));

export default useStyles;