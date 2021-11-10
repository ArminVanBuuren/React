import React, { useContext } from 'react';
import { observer } from 'mobx-react';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContentWrapper from '@components/SnackbarContentWrapper/SnackbarContentWrapper';
import { StoresContext } from '@stores/store';
import { useLocalize } from '@hooks/useLocalize';
import { useTranslation } from 'react-i18next';

export default observer((): JSX.Element => {
	const stores = useContext(StoresContext);
	const { ready } = useTranslation();
	const { t } = useLocalize();
	const { notificationInfo, openNotificationBar, closeNotificationBar, checkNewMessages } = stores.commonStore;

	return (
		<Snackbar key={notificationInfo.key}
				  open={openNotificationBar && ready}
				  anchorOrigin={{
					  vertical: 'top',
					  horizontal: 'right',
				  }}
				  autoHideDuration={notificationInfo.autoHideDuration}
				  onClose={(EO, reason) => {
					  // if (reason === 'clickaway')
						//   return;
					  closeNotificationBar();
				  }}
				  TransitionProps={{
					  onExit:checkNewMessages,
				  }}
		>
			<SnackbarContentWrapper variant={notificationInfo.variant}
									message={t(notificationInfo.messageCode)}
									onClose={closeNotificationBar}
			/>
		</Snackbar>
	);
});