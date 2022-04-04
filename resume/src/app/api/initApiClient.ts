import { HttpServerErrorCode, ActionResult, HttpSuccessCode } from '@app-types/index';
import axios, { AxiosInstance } from 'axios';

export default function(baseURL?: string): AxiosInstance {
	const axiosInstance = axios.create({
		baseURL: (process.env.ROUTE_PREFIX ?? '') + (baseURL ?? ''),
		timeout: 10000,
		withCredentials: true,
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json',
			'Cache-Control': 'no-cache',
			'Pragma': 'no-cache',
			'Expires': '0',
		},
	});

	const interceptor = axiosInstance.interceptors.response.use(
		(response) => ({
				statusCode: HttpSuccessCode.OK,
				result: response.data,
			} as ActionResult),
		(error) => new ActionFailed(error)
	);
	axiosInstance.interceptors.request.eject(interceptor);

	return axiosInstance;
}

class ActionFailed implements ActionResult {
	public statusCode: number;
	public message: string;
	public result: null;

	constructor(error: any){
		this.statusCode = error?.response?.status ?? HttpServerErrorCode.Internal;
		this.message = error?.response?.statusText ?? 'Internal application error!';
	}
}
