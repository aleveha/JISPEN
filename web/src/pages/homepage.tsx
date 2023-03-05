import { Icons } from "@icons/icons.config";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { NextPage } from "next";
import Image from "next/image";
import React from "react";
import logoINISOFT from "../../public/static/images/logo_inisoft.png";
import logoTACR from "../../public/static/images/logo_tacr.png";
import logoTUL from "../../public/static/images/logo_tul.png";

const HomePageComponent: NextPage = () => {
	return (
		<div className="flex h-full flex-col justify-between space-y-8">
			<div className="space-y-8">
				<h1 className="text-3xl font-medium text-primary md:text-4xl">Vítejte v&nbsp;aplikaci JISPEN</h1>
				<div className="max-w-3xl space-y-4 text-grey">
					<p>
						Systém JISPEN (Jednoduchý informační systém pro evidenci odpadů v&nbsp;nemocnicích) je určen pro jednoduché vytváření podkladů
						do&nbsp;průběžné evidence odpadů v&nbsp;nemocnicích i&nbsp;v dalších typech zdravotnických zařízeních s&nbsp;možností exportu
						dat do&nbsp;specializovaného software ENVITA pro následnou automatizovanou tvorbu předepsané průběžné evidence a&nbsp;Ročního
						hlášení o&nbsp;produkci a&nbsp;nakládání s&nbsp;odpady resp. Souhrnných údajů z&nbsp;průběžné evidence dle platné vyhlášky
						273/2021 Sb. k&nbsp;zákonu o&nbsp;odpadech 541/2020 Sb. Alternativně je možné podklady přenést do&nbsp;tabulkového editoru MS
						Excel.
					</p>
					<p>
						Systém umožňuje vytváření podkladů na&nbsp;základě předem připravených šablon bez nutnosti odborné znalosti rozsahu zákonné
						průběžné evidence odpadů. JISPEN obsahuje všechny potřebné číselníky, druhy odpadů ze&nbsp;zdravotnictví i&nbsp;kódy
						přípustných způsobů nakládání.
					</p>
					<div className="space-y-6">
						<div className="space-y-4 sm:flex sm:space-x-8 sm:space-y-0">
							<Image className="h-24 w-24" src={logoTACR} alt="TACR" />
							<Image className="h-24 w-44" src={logoTUL} alt="TUL" />
						</div>
						<Image className="w-80" src={logoINISOFT} alt="Inisoft" />
					</div>
					<p>
						Tento software je financován se&nbsp;státní podporou Technologické agentury ČR a&nbsp;Ministerstva životního prostředí
						v&nbsp;rámci Programu Prostředí pro život.
					</p>
				</div>
			</div>
			<div className="flex flex-col space-y-2 text-grey md:flex-row md:space-x-2 md:space-y-0">
				{Icons.copyright}
				<p>Copyright INISOFT Consulting s.r.o., INISOFT s.r.o., Technická univerzita v&nbsp;Liberci</p>
			</div>
		</div>
	);
};

export const Page = withDashboardLayout(HomePageComponent);
