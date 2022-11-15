import { tableSortingState } from "@state/table-sorting/table-sorting-state";
import { Tables, TableSortingState } from "@state/table-sorting/types";
import { getCookie, setCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

export function useTableSorting() {
	const [tableSorting, setTableSorting] = useAtom(tableSortingState);
	const tableSortingCookie = getCookie("table_sorting") as string;

	const handleTableSortingChange = useCallback(
		(table: Tables, value: TableSortingState[Tables]) => {
			setTableSorting(prev => ({ ...prev, [table]: value }));
			setCookie("table_sorting", JSON.stringify({ ...tableSorting, [table]: value }));
		},
		[setTableSorting, tableSorting]
	);

	useEffect(() => {
		if (tableSortingCookie && !tableSorting) {
			setTableSorting(JSON.parse(tableSortingCookie));
		}
	}, [setTableSorting, tableSorting, tableSortingCookie]);

	return [tableSorting, handleTableSortingChange] as const;
}
