import React, { ReactNode } from 'react';
import Card from '@material-ui/core/Card';
import classNames from 'classnames';

export interface SimpleCardProps {
	children: ReactNode;
	classes?: string;
	px?: number;
	py?: number;
	mt?: number;
	mb?: number;
}

const SimpleCard = ({ children, classes, px, py, mt, mb }: SimpleCardProps): JSX.Element => {
	const cls = [
		px ? `px-${px}` : '',
		py ? `py-${py}` : '',
		mt ? `mt-${mt}` : '',
		mb ? `mb-${mb}` : '',
	];

	return (
		<Card elevation={6} className={classNames('h-full', cls, classes)}>
			{children}
		</Card>
	);
};

export default SimpleCard;
