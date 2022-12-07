import { Order } from "@shared/utils/comparator/types";
import { RecordsTableColumns } from "@zones/records/components/records-table";
import { MassUnit } from "@zones/records/forms/edit-record-form";
import { TemplatesTableColumns } from "@zones/templates/components/templates-table";

export interface Sorting<T> {
	column: keyof T;
	direction: Order;
}

export type SortingState = {
	massUnit: MassUnit;
	templates?: Sorting<TemplatesTableColumns>;
	records?: Sorting<RecordsTableColumns>;
};

export type UserSorting = keyof SortingState;
