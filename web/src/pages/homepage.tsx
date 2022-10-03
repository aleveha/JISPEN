import { withDashboardLayout } from "@shared/components/layout/layout";
import { NextPage } from "next";
import React from "react";

const HomePageComponent: NextPage = () => {
	return (
		<div className="h-full space-y-8">
			<h1 className="text-3xl font-medium text-primary md:text-4xl">Vítejte v&nbsp;aplikaci JISPEN</h1>
			<p className="max-w-3xl text-grey">
				Program pro&nbsp;evidenci odpadů v&nbsp;nemocnicích a&nbsp;ve&nbsp;zdravotnických zařízeních s&nbsp;možností exportu dat
				do&nbsp;specializovaného software ENVITA pro&nbsp;následnou automatizovanou tvorbu Ročního hlášení o&nbsp;produkci a&nbsp;nakládání
				s&nbsp;odpady resp. Souhrnných údajů z&nbsp;průběžné evidence&nbsp;dle platné vyhlášky zákona o&nbsp;odpadech 541/2020&nbsp;Sb.
			</p>
		</div>
	);
};

export const Page = withDashboardLayout(HomePageComponent);
