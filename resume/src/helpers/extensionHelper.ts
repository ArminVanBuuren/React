
export {};


declare global {
	interface String {
		isEmpty(): boolean;
		trimEndByChar(charToRemove: string): string;
		format(...replacements: any[]): string;
	}
	interface Map<K, V> {
		convertAll<K, V, NV>(func: (key: K, value: V) => NV): Map<K, NV>;
	}
	interface Date {
		isValid(): boolean;
	}
}

if (!String.prototype.isEmpty) {
	String.prototype.isEmpty = function (): boolean {
		return this === null || this === undefined || this.length === 0;
	};
}

if (!String.prototype.trimEndByChar){
	String.prototype.trimEndByChar = function (charToRemove: string): string {
		const removeCh = charToRemove.charAt(0);
		let result:string = <string>this;

		while(result.length > 0 && result.charAt(result.length - 1) === removeCh) {
			result = result.substring(0, result.length - 1);
		}
		return result;
	};
}

if (!String.prototype.format) {
	String.prototype.format = function(...args: any[]) {
		return this.replace(/{(\d+)}/g, function(match, number) {
			return typeof args[number] != 'undefined'
				? args[number]
				: match;
		});
	};
}

if (!Map.prototype.convertAll) {
	Map.prototype.convertAll = function<K, V, NV>(func: (key: K, value: V) => NV): Map<K, NV> {
		const source: Map<K, V> = this as Map<K, V>;
		const result = new Map<K, NV>();

		source.forEach((value, key) => {
			result.set(key, func(key, value));
		});

		return result;
	};
}

if (!Date.prototype.isValid) {
	Date.prototype.isValid = function (): boolean {
		return this && !isNaN(Number(this)) && this.toString() !== 'Invalid Date' && this instanceof Date;
	};
}