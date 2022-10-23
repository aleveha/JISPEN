import { ApiError, ApiReturnType } from "@api/config/types";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

interface FetcherParams<T, K = any> {
	axiosInstance: AxiosInstance;
	method: "get" | "post" | "delete";
	url: string;
	data?: K;
	accessToken?: string;
	config?: AxiosRequestConfig<T>;
}

export async function fetcher<T, K = any>({ axiosInstance, method, url, data, accessToken, config }: FetcherParams<T, K>): Promise<ApiReturnType<T>> {
	let promise: Promise<AxiosResponse<T>>;
	const configWithAuthorization: AxiosRequestConfig<T> = { ...config, headers: { Authorization: `Bearer ${accessToken}` } };

	switch (method) {
		case "get":
			promise = axiosInstance.get<T>(url, configWithAuthorization);
			break;
		case "post":
			promise = axiosInstance.post<T>(url, data, configWithAuthorization);
			break;
		case "delete":
			promise = axiosInstance.delete<T>(url, configWithAuthorization);
			break;
	}

	return await promise
		.then(res => ({ data: res.data }))
		.catch(async (err: Error | AxiosError<ApiError>) => ({ error: await axiosErrorHelper(err) }));
}

export async function axiosErrorHelper(error: Error | AxiosError): Promise<ApiError> {
	if (axios.isAxiosError(error) && error.response) {
		return error.response?.data;
	}

	console.error(error);
	return { statusCode: 500, message: "Unknown error" };
}
