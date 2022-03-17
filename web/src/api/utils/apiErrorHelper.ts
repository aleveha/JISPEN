import axios, { AxiosError } from "axios";
import { ApiError } from "@api/config/types";

export async function axiosErrorHelper(error: Error | AxiosError): Promise<ApiError> {
	if (axios.isAxiosError(error) && error.response) {
		return error.response?.data;
	}
	return { statusCode: 500, message: "Unknown error" };
}
