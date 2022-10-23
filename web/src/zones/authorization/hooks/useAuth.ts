import { userJwtState } from "@state/user/user-jwt-state";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useCallback, useEffect } from "react";

export const useAuth = () => {
	const router = useRouter();
	const [userAccessToken, setUserAccessToken] = useAtom(userJwtState);
	const accessToken = getCookie("accessToken") as string;

	const setUser = useCallback(
		(accessToken: string | null) => {
			if (!accessToken) {
				deleteCookie("accessToken");
			} else {
				setCookie("accessToken", accessToken);
			}
			setUserAccessToken(accessToken);
		},
		[setUserAccessToken]
	);

	useEffect(() => {
		if (accessToken && !userAccessToken) {
			setUserAccessToken(accessToken);
		}
	}, [accessToken, router, setUserAccessToken, userAccessToken]);

	return [userAccessToken, setUser] as const;
};
