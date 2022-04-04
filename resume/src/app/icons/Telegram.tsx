import React from 'react';
import TelegramLogo from '@assets/imgs/telegram-logo.svg';
import useStyles from '@icons/svgitem.jss';
import { SvgItemProps } from '@icons/svgItemProps';
import classNames from 'classnames';

export default (props: SvgItemProps): JSX.Element => {
	const classes = useStyles();
	return <img className={classNames(classes.root, props.classes)} src={TelegramLogo} />;
};