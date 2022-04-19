import { NextPage } from "next";
import React, { useCallback, useState } from "react";
import { ITab, Tabs } from "@ui/tabs";
import { LoginForm } from "../forms/loginForm";
import { RegistrationForm } from "../forms/registrationForm";

const AuthorizationPage: NextPage = () => {
	const tabs: ITab[] = [
		{ id: "login", title: "Přihlášení" },
		{ id: "registration", title: "Registrace" },
	];
	const [activeTab, setActiveTab] = useState<ITab>(tabs[0]);

	const onRegistrationSuccess = useCallback(() => setActiveTab(tabs[0]), [tabs]);

	return (
		<div className="grid grid-rows-2 h-screen bg-primary">
			<div className="flex flex-col justify-end items-center">
				<h1 className="text-4xl font-medium text-white mb-8 mt-">JISPEN</h1>
				<Tabs activeTab={activeTab} onTabClick={setActiveTab} tabs={tabs} />
			</div>
			<div className="flex justify-center items-start">
				{activeTab.id === "login" ? <LoginForm /> : <RegistrationForm onSuccess={onRegistrationSuccess} />}
			</div>
		</div>
	);
};

export default AuthorizationPage;
