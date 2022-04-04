
export interface ActionResult<T = null> {
	statusCode: number;
	result: T;
	message: string | null;
	messageCode?: string | null;
}