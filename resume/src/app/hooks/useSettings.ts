import { useContext } from 'react';
import SettingsContext, { ISettingsContext } from '@contexts/SettingsContext';

const useSettings = (): ISettingsContext => useContext(SettingsContext);

export default useSettings;
