import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { Order, SortAs } from "./types";

dayjs.extend(customParseFormat);

function descendingComparator<T>(a: T, b: T, orderBy: keyof T, sortAs?: SortAs): number {
	const stringA = String(a[orderBy]);
	const stringB = String(b[orderBy]);

	switch (sortAs) {
		case "string":
			return stringB.localeCompare(stringA);
		case "date":
			const dateA = dayjs(stringA, "DD.MM.YYYY", true);
			const dateB = dayjs(stringB, "DD.MM.YYYY", true);

			if (dateB.isSame(dateA)) {
				return 0;
			}
			return dateB.isBefore(dateA) ? 1 : -1;
		default:
			if (b[orderBy] === a[orderBy]) {
				return 0;
			}
			return b[orderBy] > a[orderBy] ? 1 : -1;
	}
}

export function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key,
	sortAs?: SortAs
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy, sortAs) : (a, b) => -descendingComparator(a, b, orderBy, sortAs);
}
