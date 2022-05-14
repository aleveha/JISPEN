import React, { useCallback } from "react";
import { NextPage } from "next";
import { Button } from "@ui/button";
import { ButtonType } from "@ui/button/types";
import { useRouter } from "next/router";

export const PageNotFound: NextPage = () => {
	const router = useRouter();

	const onClick = useCallback(async () => {
		await router.back();
	}, [router]);

	return (
		<div className="w-screen h-screen">
			<div className="w-full h-2/3 flex flex-col justify-center px-36">
				<h1 className="text-6xl font-bold text-primary mb-4">Ale ne, něco se pokazilo.</h1>
				<h2 className="text-3xl font-medium text-secondary">
					Omylem jsme vás zavedli na stránku, která zatím neexistuje.
				</h2>
				<Button className="w-fit mt-20" onClick={onClick} variant={ButtonType.secondary}>
					Zpět do aplikaci JISPEN
				</Button>
			</div>
			<div className="h-1/3 flex justify-center items-center bg-secondary" />
		</div>
	);
};
