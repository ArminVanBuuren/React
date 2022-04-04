import { action, observable } from 'mobx';
import { CvData } from '@app-types/cv/cvUserData';
import CommonStore from '@stores/commonStore';
import { AxiosInstance } from 'axios';
import { CvApiClient } from '@api/cvApiClient';
import { ActionResult } from '@app-types/ActionResult';
import { HttpSuccessCode } from '@app-types/HttpStatusCode';
import BaseStore from '@stores/baseStore';
import { convertToObject } from '@helpers/utils';

enum CvActions {
	GetCv = 'GetCv',
}

export default class CvStore extends BaseStore<CvApiClient> {

	constructor(commonStore: CommonStore, instance: AxiosInstance) {
		super(commonStore, new CvApiClient(instance), convertToObject(CvActions, (key, value) => value));
	}

	@observable
	public cvData: CvData | null;

	public getCvData = async (): Promise<void> => {
		this.setCvData(await this.client.getCvData());
	};

	@action
	private setCvData = (response: ActionResult<CvData>): void => {
		const { statusCode, result } = response;

		this.setAction(CvActions.GetCv, () => {
			this.setStatus(response);
		});

		if (statusCode in HttpSuccessCode) {
			this.cvData = result;
		}
	};
}