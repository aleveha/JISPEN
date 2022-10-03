import { ApiError } from "@api/config/types";

type DataResponse<DataType> = {
	data: DataType;
	error?: never;
};

interface ErrorResponse<ErrorType> {
	data?: never;
	error: ErrorType;
}

export type DiscriminatedUnion<DataType, ErrorType extends ApiError = ApiError> = DataResponse<DataType> | ErrorResponse<ErrorType>;
