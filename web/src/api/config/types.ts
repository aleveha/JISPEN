export interface ApiReturnType<T> {
	data?: T;
	error?: ApiError;
}

export interface ApiError {
	statusCode: number;
	message?: string | string[];
	error?: string;
}
