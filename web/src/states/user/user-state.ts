import { atom } from "jotai";

export interface UserState {
	accessToken: string;
	email: string;
}

export const userState = atom<UserState | null>(null);
