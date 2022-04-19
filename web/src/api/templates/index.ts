import { AxiosError } from "axios";
import { apiClient } from "@api/config";
import { ApiError, ApiReturnType } from "@api/config/types";
import { Template } from "@api/templates/types";
import { axiosErrorHelper } from "@api/utils/apiErrorHelper";
import { TemplateDTO } from "@api/templates/dto";

export async function getUserTemplates(userId: number): Promise<ApiReturnType<Template[]>> {
	return await apiClient
		.get<Template[]>("/template/all", {
			params: {
				userId,
			},
		})
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}

export async function deleteTemplate(templateId: number): Promise<ApiReturnType<Template>> {
	return await apiClient
		.delete<Template>("/template/delete", {
			params: {
				id: templateId,
			},
		})
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}

export async function createTemplate(template: TemplateDTO): Promise<ApiReturnType<Template>> {
	return await apiClient
		.post<Template>("/template/create", template)
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}
