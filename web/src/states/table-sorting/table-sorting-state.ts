import { TableSortingState } from "@state/table-sorting/types";
import { atom } from "jotai";

export const tableSortingState = atom<TableSortingState | null>(null);
