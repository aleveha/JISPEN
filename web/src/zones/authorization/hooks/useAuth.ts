import { User } from "@api/authorization/types";
import { userState } from "@state/user/user-state";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

export const useAuth = (): User | null => {
	const router = useRouter();
	const [user] = useAtom(userState);

	useEffect(() => {
		if (!user) {
			router.push("/login").then(() => toast.error("Nejdříve se musíte přihlásit"));
			return;
		}
	}, [router, user]);

	return user;
};
