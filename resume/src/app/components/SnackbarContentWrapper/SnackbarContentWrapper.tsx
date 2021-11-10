import React, { ReactElement } from 'react';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import WarningIcon from '@material-ui/icons/Warning';
import ErrorIcon from '@material-ui/icons/Error';
import CloseIcon from '@material-ui/icons/Close';

import { NotifyVariants } from '@app-types/NotifyVariants';
import { useStyles } from '@components/SnackbarContentWrapper/SnackbarContentWrapper.jss';
import classNames from 'classnames';


export interface SnackbarContentWrapperProps {
	className?: string;
	message: string;
	onClose: () => void;
	variant: NotifyVariants;
}

const enumToStringMap = {
	[NotifyVariants.Info]: InfoIcon,
	[NotifyVariants.Success]: CheckCircleIcon,
	[NotifyVariants.Warning]: WarningIcon,
	[NotifyVariants.Error]: ErrorIcon,
};

export default ({ className, message, onClose, variant }: SnackbarContentWrapperProps): JSX.Element => {
	const classes = useStyles();
	const Icon = enumToStringMap[variant];

	return (
		<SnackbarContent
			className={classNames((classes as Record<string, string>)[NotifyVariants[variant]], className)}
			aria-describedby='client-snackbar'
			message={
				<span id='client-snackbar' className={classes.message}>
					<Icon className={classNames(classes.icon, classes.iconVariant)} />
					{message}
				</span>
			}
			action={[
				<IconButton key='close'
							aria-label='Close'
							color='inherit'
							onClick={onClose}
				>
					<CloseIcon className={classes.icon} />
				</IconButton>
			]}
		/>
	);
};