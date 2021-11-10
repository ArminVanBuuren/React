import React from 'react';
import { variableStyles } from './utilities/variables';
import { animationStyles } from './utilities/animations';
import { borderStyles } from './utilities/border';
import { colorStyles } from './utilities/color';
import { commonStyles } from './utilities/common';
import { positioningStyles } from './utilities/positionings';
import { shadowStyles } from './utilities/shadows';
import { spacingStyles } from './utilities/spacing';
import { typographyStyles } from './utilities/typography';

const GlobalCss = () => {
	variableStyles();
	positioningStyles();
	spacingStyles();
	borderStyles();
	colorStyles();
	shadowStyles();
	typographyStyles();
	commonStyles();
	animationStyles();
	return null;
};

export default React.memo(GlobalCss);