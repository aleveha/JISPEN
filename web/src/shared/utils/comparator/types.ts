export type Order = "asc" | "desc";
export type SortAs = "string" | "date";

export interface HeadCell<T> {
	id: keyof T;
	label: string;
	sortAs?: SortAs;
	width?: number;
}
