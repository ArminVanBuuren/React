import { action, computed, observable } from 'mobx';
import CommonStore from '@stores/commonStore';
import { HttpClientErrorCode, HttpServerErrorCode, HttpSuccessCode, ActionResult } from '@app-types/index';
import { Locales } from '@app-types/Locales';

export default abstract class BaseStore<TClient> {

	@observable
	public action: string | null;

	@observable
	public prevAction: string | null;

	@observable
	public statusCode: number | null = null;

	@computed
	public get loading(): boolean {
		return !this.statusCode;
	}

	@computed
	public get success(): boolean {
		return this.statusCode != null && this.statusCode in HttpSuccessCode;
	}

	@computed
	public get serverError(): boolean {
		if (this.statusCode != null
			&& this.statusCode !== HttpClientErrorCode.NotFound
			&& (this.statusCode in HttpClientErrorCode || this.statusCode in HttpServerErrorCode)) {
			console.error('Failed to initialize');
			return true;
		}
		return false;
	}

	@computed
	public get notFound(): boolean {
		return this.statusCode != null && this.statusCode === HttpClientErrorCode.NotFound;
	}

	protected constructor(protected readonly commonStore: CommonStore, protected readonly client: TClient, protected readonly actions: Record<string, string>) {
		this.setAction = this.setAction.bind(this);
		this.setStatus = this.setStatus.bind(this);
		this.resetStore = this.resetStore.bind(this);
	}

	@action
	setAction(action: string, actionFunc?: () => void): void {
		this.prevAction = this.action;
		this.action = action;
		this.statusCode = null;

		if (actionFunc)
			actionFunc();
	}

	@action
	setStatus<T>(result: ActionResult<T>): void {
		const { statusCode = HttpServerErrorCode.Internal, message, messageCode } = result;

		this.statusCode = statusCode;

		if (message) {
			console.error(`${this.action && this.actions[this.action]} ${statusCode} (${message})`);
		}

		if (messageCode) {
			this.commonStore.notify(messageCode);
		}
		else if (!(statusCode in HttpSuccessCode) && this.action) {
			const mnpActionName = this.actions[this.action];
			this.commonStore.notify(`${Locales.ERR}.failedAction.${mnpActionName}`);
		}
	}

	@action
	resetStore(): void {
		this.action = null;
	}
}
