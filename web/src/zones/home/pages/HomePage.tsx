import React from "react";
import { NextPage } from "next";
import { withLayout } from "@zones/shared/components/layout";

const HomePage: NextPage = () => {
	return (
		<div className="h-full flex flex-col justify-center items-center gap-8">
			<h1 className="text-4xl font-medium text-primary">Vítejte v&nbsp;aplikaci JISPEN</h1>
			<p className="text-2xl max-w-3xl text-center text-grey">
				Program pro&nbsp;evidenci odpadů v&nbsp;nemocnicích a&nbsp;ve&nbsp;zdravotnických zařízeních
				s&nbsp;možností exportu dat do&nbsp;specializovaného software ENVITA pro&nbsp;následnou automatizovanou
				tvorbu Ročního hlášení o&nbsp;produkci a&nbsp;nakládání s&nbsp;odpady resp. Souhrnných údajů
				z&nbsp;průběžné evidence&nbsp;dle platné vyhlášky zákona o&nbsp;odpadech 541/2020&nbsp;Sb.
			</p>
		</div>
	);
};

export default withLayout(HomePage);
