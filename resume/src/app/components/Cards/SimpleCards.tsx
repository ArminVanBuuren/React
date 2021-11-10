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

const SimpleCard = ({ children, classes, px = 3, py = 2, mt = 0, mb = 0 }: SimpleCardProps): JSX.Element => {
	return (
		<Card elevation={6} className={classNames('h-full', classes, `px-${px}`, `py-${py}`, `mt-${mt}`, `mb-${mb}`)}>
			{children}
		</Card>
	);
};

export default SimpleCard;
