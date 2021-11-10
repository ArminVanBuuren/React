import { useTranslation } from 'react-i18next';
import { Locales } from '@app-types/Locales';
import { convertToObject } from '@helpers/utils';

export function useLocalize(): Record<string, (item: string) => string> {
	const { t } = useTranslation();
	const result = convertToObject<(item: string) => string>(Locales, (key, value) => (item: string) => t(`${value}.${item}`) );
	result.t = (item: string) => t(item);
	return result;
}