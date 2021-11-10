import { action, computed, observable } from 'mobx';
import { NotifyVariants } from '@app-types/NotifyVariants';

export interface MessageInfo {
	readonly key: number;
	readonly autoHideDuration: number;
	readonly variant: NotifyVariants;
	readonly messageCode: string;
}

export default class CommonStore {

	private readonly _queueMessages: Array<MessageInfo>;
	private readonly defaultMessage: MessageInfo = {
		key: -1,
		variant: NotifyVariants.Error,
		autoHideDuration: 100,
		messageCode: ''
	};
	private isMessageActive: boolean;

	public constructor() {
		this._queueMessages = new Array<MessageInfo>();
		this.isMessageActive = false;
	}

	@observable
	private _openedDialogs: number | null = 0;
	@action
	public setOpenDialog = (open: boolean): void => {
		if (!this._openedDialogs || this._openedDialogs < 0)
			this._openedDialogs = 0;
		this._openedDialogs = open ? this._openedDialogs + 1 : this._openedDialogs - 1;
	};

	@computed
	public get isBusy(): boolean {
		return (this._openedDialogs && this._openedDialogs > 0) || Boolean(this._openNotificationBar);
	}

	@observable
	private _notificationInfo: MessageInfo | null;
	@computed
	public get notificationInfo(): MessageInfo {
		return this._notificationInfo ?? this.defaultMessage;
	}

	@observable
	private _openNotificationBar: boolean | null;
	@computed
	public get openNotificationBar(): boolean {
		return Boolean(this._openNotificationBar);
	}

	@action
	public notify = (messageCode: string, variant = NotifyVariants.Error, autoHideDuration = 3000): void => {
		const message: MessageInfo = {
			key: Math.floor(Math.random() * 999),
			autoHideDuration: autoHideDuration,
			variant: variant,
			messageCode: messageCode
		};

		if (this.isMessageActive) {
			this._queueMessages.push(message);
		}
		else {
			this.isMessageActive = true;
			this._openNotificationBar = true;
			this._notificationInfo = message;
		}
	};

	@action
	public closeNotificationBar = (): void => {
		this._openNotificationBar = false;
	};

	@action
	public checkNewMessages = (): void => {

		if (this._queueMessages.length > 0) {
			const newMessage = this._queueMessages.shift();

			if (!newMessage)
				return;

			this._notificationInfo = newMessage;
			this._openNotificationBar = true;

			return;
		}

		this.isMessageActive = false;
	};
}