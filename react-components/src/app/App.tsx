import React, { useEffect, useState } from 'react';
import Loading from '@components/Loading/Loading';

export default (): JSX.Element => {

	const [enabled, setEnabled] = useState(false);

	useEffect(() => {
		setTimeout(() => {
			console.log(1)
			setEnabled(true);
		}, 2000);
	});

	return (
		<div>

		</div>
	);
};

// <Loading isReady={enabled}>
// 	test
// </Loading>