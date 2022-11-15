import { Order } from "@shared/utils/comparator/types";
import { RecordsTableColumns } from "@zones/records/components/records-table";
import { TemplatesTableColumns } from "@zones/templates/components/templates-table";

export interface Sorting<T> {
	column: keyof T;
	direction: Order;
}

export type TableSortingState = {
	templates?: Sorting<TemplatesTableColumns>;
	records?: Sorting<RecordsTableColumns>;
};

export type Tables = keyof TableSortingState;
