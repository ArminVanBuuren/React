
class LocalStorageService {
	private readonly ls = window.localStorage;

	public setItem = (key: string, value: string): boolean => {
		value = JSON.stringify(value);
		this.ls.setItem(key, value);
		return true;
	};

	public getItem = (key: string): string | undefined => {
		const value = this.ls.getItem(key) ?? '';
		try {
			return JSON.parse(value);
		} catch (e) {
			return undefined;
		}
	};
}

const service = new LocalStorageService();

export default service;
