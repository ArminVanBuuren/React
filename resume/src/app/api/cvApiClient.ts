import { AxiosInstance } from 'axios';
import { CvData } from '@app-types/cv/cvUserData';
import { ActionResult } from '@app-types/ActionResult';

export class CvApiClient {

	constructor(private instance: AxiosInstance) {
	}

	public getCvData = (): Promise<ActionResult<CvData>> => {
		return this.instance.get('/data/data.json');
	};

}