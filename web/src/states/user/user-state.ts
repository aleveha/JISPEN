import { User } from "@api/authorization/types";
import { atom } from "jotai";

export const userState = atom<User | null>(null);
