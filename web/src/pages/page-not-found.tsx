import { Button } from "@shared/components/button/button";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { NextPage } from "next";
import Link from "next/link";
import React from "react";

const PageNotFoundComponent: NextPage = () => {
	return (
		<div className="flex h-full w-full flex-col items-center justify-center">
			<span className="text-[6rem] text-primary md:text-[12rem]">404</span>
			<h1 className="mb-6 text-center text-5xl font-bold text-primary-dark">Stránka neexistuje</h1>
			<h2 className="mb-16 text-center text-xl font-medium text-grey">
				Omylem jsme vás zavedli na stránku, která zatím neexistuje.
			</h2>
			<Link href="/" passHref>
				<Button variant="primary">Zpět do aplikaci JISPEN</Button>
			</Link>
		</div>
	);
};

export const Page = withDashboardLayout(PageNotFoundComponent);
