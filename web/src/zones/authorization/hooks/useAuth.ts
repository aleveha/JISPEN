import { UserState, userState } from "@state/user/user-state";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export const useAuth = () => {
	const router = useRouter();
	const [user, setUser] = useAtom(userState);
	const accessToken = getCookie("access_token") as string;
	const userEmail = getCookie("user_email") as string;

	const handleUserChange = useCallback(
		(userState: UserState | null) => {
			if (!userState) {
				deleteCookie("access_token");
				deleteCookie("user_email");
			} else {
				setCookie("access_token", userState.accessToken);
				setCookie("user_email", userState.email);
			}
			setUser(userState);
		},
		[setUser]
	);

	useEffect(() => {
		if (accessToken && userEmail && !user) {
			handleUserChange({ accessToken, email: userEmail });
		}
	}, [accessToken, router, handleUserChange, user, userEmail]);

	return [user, handleUserChange] as const;
};
