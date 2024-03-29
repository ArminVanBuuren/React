import React, { ReactNode } from 'react';

export default withLoading(() => {
    return (
        <div>

        </div>
    );
});

export interface WithLoadingProps {
    classes?: string;
    isReady?: boolean;
    children?: ReactNode;
}

export function withLoading<T>(Component: React.ElementType) {
    return (props?: T & WithLoadingProps): JSX.Element => {
        const {classes = '', isReady = true} = props ?? {};

        return (
            <>
                <div>
                    <div className={'classes2.loading'}>
                        <p>loading...</p>
                    </div>
                </div>
                <div>
                    <div className={classes}>
                        <Component {...props}/>
                    </div>
                </div>
            </>
        );
    };
}
