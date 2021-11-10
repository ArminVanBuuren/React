import i18next from 'i18next';
import { Locales } from '@app-types/Locales';

// namespace MainPage
export const MM = (item: string): string => {
	return i18next.t(`${Locales.MM}.${item}`);
};

// namespace NotFoundPage
export const NF = (item: string): string => {
	return i18next.t(`${Locales.NF}.${item}`);
};

// namespace ServerErrorPage
export const SE = (item: string): string => {
	return i18next.t(`${Locales.SE}.${item}`);
};

// namespace TableComponent
export const TBL = (item: string): string => {
	return i18next.t(`${Locales.TBL}.${item}`);
};

// namespace SimpleComponents
export const SC = (item: string): string => {
	return i18next.t(`${Locales.SC}.${item}`);
};

// namespace Errors
export const ERR = (item: string): string => {
	return i18next.t(`${Locales.ERR}.${item}`);
};