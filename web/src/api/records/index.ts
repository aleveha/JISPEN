import { apiClient } from "@api/config";
import { ApiReturnType } from "@api/config/types";
import { CreateRecordDto, Record } from "@api/records/types";
import { axiosErrorHelper } from "@api/utils/apiErrorHelper";

export async function getRecords(userId: number): Promise<ApiReturnType<Record[]>> {
	return apiClient
		.get<Record[]>("/records/all", { params: { userId } })
		.then(res => ({ data: res.data }))
		.catch(async err => ({ error: await axiosErrorHelper(err) }));
}

export async function deleteRecord(recordId: number): Promise<ApiReturnType<Record>> {
	return apiClient
		.delete<Record>("/records/delete", { params: { id: recordId } })
		.then(res => ({ data: res.data }))
		.catch(async err => ({ error: await axiosErrorHelper(err) }));
}

export async function createRecord(record: CreateRecordDto): Promise<ApiReturnType<Record>> {
	return apiClient
		.post<Record>("/records/create", record)
		.then(res => ({ data: res.data }))
		.catch(async err => ({ error: await axiosErrorHelper(err) }));
}
