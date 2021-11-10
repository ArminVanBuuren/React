import React, { ReactNode } from 'react';
import Fade from '@material-ui/core/Fade';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useStyles } from './Loading.jss';
import { useTranslation } from 'react-i18next';

export interface LoadingProps {
    classes?: string;
    isReady?: boolean;
    children: ReactNode;
}

export default ({ classes = '', isReady = true, children }: LoadingProps): JSX.Element => {
    const classes2 = useStyles();
    const { ready } = useTranslation();
    const enabled = ready && isReady;

    return (
        <>
            <Fade in={!enabled} timeout={600} mountOnEnter unmountOnExit>
                <div className={classes2.loading}>
                    <CircularProgress />
                </div>
            </Fade>
            <Fade in={enabled} timeout={600} mountOnEnter>
                <div className={classes}>
                    {children}
                </div>
            </Fade>
        </>
    );
};
