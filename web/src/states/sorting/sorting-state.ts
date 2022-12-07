import { SortingState } from "@state/sorting/types";
import { atom } from "jotai";

export const sortingState = atom<SortingState>({ massUnit: "kg" });
