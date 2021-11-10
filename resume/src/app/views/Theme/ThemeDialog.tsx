import { observer } from 'mobx-react';
import Dialog from '@material-ui/core/Dialog';
import React, { useContext } from 'react';
import { DialogProps } from '@material-ui/core/Dialog/Dialog';
import { StoresContext } from '@stores/store';

export default observer((props: DialogProps): JSX.Element => {
	const stores = useContext(StoresContext);
	const { onEnter, onExit, ...others } = props;
	const { setOpenDialog } = stores.commonStore;

	const handleOnEnter = (node: HTMLElement, isAppearing: boolean) => {
		setOpenDialog(true);
		onEnter && onEnter(node, isAppearing);
	};

	const handleOnExit = (node: HTMLElement) => {
		setOpenDialog(false);
		onExit && onExit(node);
	};

	return (
		<Dialog {...others} //disableBackdropClick
				onEnter={handleOnEnter}
				onExit={handleOnExit}

		/>
	);
});