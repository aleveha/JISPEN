import { DiscriminatedUnion } from "@shared/types/types";

export type ApiReturnType<T> = DiscriminatedUnion<T>;

export interface ApiError {
	statusCode: number;
	message?: string | string[];
	error?: string;
}
