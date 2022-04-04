import React from 'react';
import SkypeLogo from '@assets/imgs/slype-logo.svg';
import useStyles from '@icons/svgitem.jss';
import { SvgItemProps } from '@icons/svgItemProps';
import classNames from 'classnames';

export default (props: SvgItemProps): JSX.Element => {
	const classes = useStyles();
	return <img className={classNames(classes.root, props.classes)} src={SkypeLogo} />;
};