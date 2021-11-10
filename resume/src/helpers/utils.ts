
export type EnumKeyType = { [s: string]: string };
export function convertToObject<T>(enumerable: EnumKeyType, func: (key: string, value: string) => T): Record<string, T> {
	const result: Record<string, T> = {};
	Object.keys(enumerable).forEach(key => {
		const value = enumerable[key];
		result[key] = func(key, value);
	});
	return result;
}

export function convertToMap<T>(enumerable: EnumKeyType, func: (key: string, value: string) => T): Map<string, T> {
	const result = new Map<string, T>();
	Object.keys(enumerable).forEach(key => {
		const value = enumerable[key];
		result.set(key, func(key, value));
	});
	return result;
}

export type EnumKeyNumberType = { [s: string]: number | string };
export function getEnumValueNumbers<T extends number = number>(enumerable: EnumKeyNumberType): Array<T> {
	const result = new Array<T>();
	const keysValues = Object.keys(enumerable);
	for (let i = 0; i < keysValues.length; i++) {
		const key = keysValues[i];
		const value = enumerable[key];
		if (typeof value === 'number')
			result.push(value as T);
	}
	return result;
}

export function convertAll<K, V, NV>(source: Map<K, V>, func: (key: K, value: V) => NV): Map<K, NV> {
	const result = new Map<K, NV>();
	source.forEach((value, key) => {
		result.set(key, func(key, value));
	});
	return result;
}

export function convertMapToObject<K extends string, V>(source: Map<K, V>): Record<K, V> {
	const newObject = {} as Record<K, V> ;
	for (const [key, value] of source) {
		newObject[key] = value;
	}
	return newObject;
}

export function combineToMap<K, V>(keys: Array<K> | ReadonlyArray<K>, values: Array<V> | ReadonlyArray<V>): Map<K, V>{
	const result = new Map<K, V>();
	keys.forEach((key, i) => result.set(key, values[i]));
	return result;
}

export type EnumStringType = { [s: string]: string };
export function mapEnum<T>(enumerable: EnumStringType, fn: (value: string) => T): T[] {
	return Object.keys(enumerable).map(key => {
		const value = enumerable[key];
		return fn(value);
	});
}

export function anyIsNumber(input: any): boolean {
	const valueInt = Number.parseInt(input);
	if (isNaN(valueInt) || valueInt === Infinity)
		return false;
	return input.toString().length === valueInt.toString().length;
}

export function convertHexToRGB(hex: string): string | undefined {

	if (hex.match('rgba')) {
		const triplet = hex.slice(5).split(',').slice(0, -1).join(',');
		return triplet;
	}

	let c:string[] | number;
	if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
		c = hex.substring(1).split('');
		if (c.length === 3) {
			c = [c[0], c[0], c[1], c[1], c[2], c[2]];
		}
		c = Number('0x' + c.join(''));

		return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
	}
}

export function lightenDarkenColor(col: string, amt: number) {

	let usePound = false;

	if (col[0] === "#") {
		col = col.slice(1);
		usePound = true;
	}

	const num = parseInt(col,16);

	let r = (num >> 16) + amt;

	if (r > 255) r = 255;
	else if (r < 0) r = 0;

	let b = ((num >> 8) & 0x00FF) + amt;

	if (b > 255) b = 255;
	else if (b < 0) b = 0;

	let g = (num & 0x0000FF) + amt;

	if (g > 255) g = 255;
	else if (g < 0) g = 0;

	return (usePound?"#":"") + (g | (b << 8) | (r << 16)).toString(16);
}