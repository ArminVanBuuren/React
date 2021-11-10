import React, { createContext, ReactNode, useState } from 'react';
import { merge } from 'lodash';
import { ILayoutSettings, LayoutSettings } from '@components/Theme/settings';

export interface ISettingsContext {
    settings?: ILayoutSettings;
	updateSettings: (update: ILayoutSettings) => void;
}

const SettingsContext = createContext<ISettingsContext>({
    settings: LayoutSettings,
    updateSettings: () => undefined,
});

export interface SettingsProps {
    settings?: ILayoutSettings,
    children?: ReactNode,
}

export const SettingsProvider = ({ settings = LayoutSettings, children }: SettingsProps): JSX.Element => {
    const [currentSettings, setCurrentSettings] = useState(settings);

    const handleUpdateSettings = (update: ILayoutSettings = {} as ILayoutSettings) => {
        const merged = merge({}, currentSettings, update);
        setCurrentSettings(merged);
    };

    return (
        <SettingsContext.Provider
            value={{
                settings: currentSettings,
                updateSettings: handleUpdateSettings,
            }}
        >
            {children}
        </SettingsContext.Provider>
    );
};

export default SettingsContext;
