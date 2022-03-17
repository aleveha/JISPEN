import React, { useEffect } from "react";
import { NextPage } from "next";
import { toast } from "react-hot-toast";
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "@state/user";

const HomePage: NextPage = () => {
	const router = useRouter();
	const [user] = useRecoilState(userState);

	useEffect(() => {
		console.log(user);
		if (!user) {
			router.push("/login").then(() => toast("Vyžadováno přihlášení", { style: { backgroundColor: "#facc15" } }));
		}
		router.push("/templates");
	}, [user]);

	return (
		<div className="h-screen flex justify-center items-center">
			<h1 className="text-6xl font-medium text-primary">JISPEN</h1>
		</div>
	);
};

export default HomePage;
