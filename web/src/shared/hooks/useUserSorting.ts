import { sortingState } from "@state/sorting/sorting-state";
import { SortingState, UserSorting } from "@state/sorting/types";
import { getCookie, setCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";

export function useUserSorting() {
	const [userSorting, setUserSorting] = useAtom(sortingState);
	const tableSortingCookie = getCookie("table_sorting") as string;

	const handleTableSortingChange = useCallback(
		(key: UserSorting, value: SortingState[UserSorting]) => {
			setUserSorting(prev => ({ ...prev, [key]: value }));
			setCookie("user_sorting", JSON.stringify({ ...userSorting, [key]: value }));
		},
		[setUserSorting, userSorting]
	);

	useEffect(() => {
		if (tableSortingCookie && !userSorting) {
			setUserSorting(JSON.parse(tableSortingCookie));
		}
	}, [setUserSorting, userSorting, tableSortingCookie]);

	return [userSorting, handleTableSortingChange] as const;
}
