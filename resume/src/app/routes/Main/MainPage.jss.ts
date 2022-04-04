import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
	root: {
		padding: 20,
		margin: 'auto',
		'@media screen and (min-width: 1200px)': {
			width: 1200
		}
	},
	card: {
		padding: '7%',
		'@media screen and (max-width: 767px)': {
			padding: 24,
		}
	},
	title: {
		textAlign: 'center',
		top: '50%',
		left: 0,
		right: 0,
		margin: 'auto',
		position: 'fixed',
	},
	header: {
		display: 'flex',
		justifyContent: 'stretch',
		flexDirection: 'row',
		'@media screen and (max-width: 767px)': {
			flexDirection: 'column'
		}
	},
	headerImg: {
		'& img': {
			borderRadius: '50%',
			width: 240
		},
		'@media screen and (max-width: 767px)': {
			margin: 'auto'
		}
	},
	itemImg: {
		paddingRight: theme.spacing(1),
	},
	headerInfo: {
		width: '100%',
		paddingLeft: '10%',
		paddingTop: 15,
		display: 'flex',
		flexDirection: 'column',
		'@media screen and (max-width: 767px)': {
			paddingLeft: 0,
			textAlign: 'center'
		},
		'& > h2': {
			color: 'rgb(200, 170, 140)',
		},
		'& > ul': {
			display: 'flex',
			flexWrap: 'wrap',
			flexDirection: 'row',
			listStyleType: 'none',
			padding: 0,
			'& > li': {
				display: 'flex',
				padding: '5px 10px 5px 0',
				flex: '1 1 230px',
				'@media screen and (max-width: 767px)': {
					flex: '0 1 auto',
				},
			},
			'@media screen and (max-width: 767px)': {
				flexDirection: 'column',
				margin: 'auto',
			},
		}
	}
}));

export default useStyles;
