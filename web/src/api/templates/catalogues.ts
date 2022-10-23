import { apiClient } from "@api/config";
import { ApiError, ApiReturnType } from "@api/config/types";
import { axiosErrorHelper } from "@api/index";
import { LoadingCode, TerritorialUnit, Waste, WasteCompanyType, Zipcode } from "@api/templates/types";
import { AxiosError } from "axios";

export async function getLoadingCodes(): Promise<ApiReturnType<LoadingCode[]>> {
	return apiClient
		.get<LoadingCode[]>("template/loading-codes")
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}

export async function getTerritorialUnits(): Promise<ApiReturnType<TerritorialUnit[]>> {
	return apiClient
		.get<TerritorialUnit[]>("template/territorial-units")
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}

export async function getWaste(): Promise<ApiReturnType<Waste[]>> {
	return apiClient
		.get<Waste[]>("template/waste")
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}

export async function getWasteCompaniesTypes(): Promise<ApiReturnType<WasteCompanyType[]>> {
	return apiClient
		.get<WasteCompanyType[]>("template/waste-company-types")
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}

export async function getZipCodes(): Promise<ApiReturnType<Zipcode[]>> {
	return apiClient
		.get<Zipcode[]>("template/zipcodes")
		.then(res => {
			return { data: res.data };
		})
		.catch(async (err: Error | AxiosError<ApiError>) => {
			return { error: await axiosErrorHelper(err) };
		});
}
