import { apiClient } from "@api/config";
import { ApiError, ApiReturnType } from "@api/config/types";
import { axiosErrorHelper } from "@api/utils/apiErrorHelper";
import { LoginFormValues } from "@zones/authorization/forms/login-form";
import { AxiosError } from "axios";
import { User } from "./types";

export async function loginUser(data: LoginFormValues): Promise<ApiReturnType<User>> {
	return apiClient
		.post<User>("auth/login", data)
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}

export async function registerUser(data: LoginFormValues): Promise<ApiReturnType<User>> {
	return apiClient
		.post<User>("auth/register", data)
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}
