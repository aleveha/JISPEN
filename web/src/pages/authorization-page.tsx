import { Tab, Tabs } from "@mui/material";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { LoginForm } from "@zones/authorization/forms/login-form";
import { RegistrationForm } from "@zones/authorization/forms/registration-form";
import { NextPage } from "next";
import React, { SyntheticEvent, useCallback, useState } from "react";

const AuthorizationPageComponent: NextPage = () => {
	const [activeTab, setActiveTab] = useState<number>(0);

	const onRegistrationSuccess = useCallback(() => setActiveTab(0), []);
	const handleTabChange = useCallback((e: SyntheticEvent, value: number) => setActiveTab(value), []);

	const tabClassName = "px-4 sm:px-8 text-lg sm:text-xl";

	return (
		<div className="flex h-full flex-col sm:grid sm:grid-rows-5">
			<div className="row-span-2 flex flex-col items-center justify-end space-y-12">
				<h1 className="text-5xl font-medium text-primary">JISPEN</h1>
				<Tabs value={activeTab} onChange={handleTabChange} aria-label="basic tabs example">
					<Tab className={tabClassName} label="Přihlášení" disableRipple />
					<Tab className={tabClassName} label="Registrace" disableRipple />
				</Tabs>
			</div>
			<div className="row-span-3 flex items-start justify-center">
				{activeTab === 0 ? <LoginForm /> : <RegistrationForm onSuccess={onRegistrationSuccess} />}
			</div>
		</div>
	);
};

export const AuthorizationPage = withDashboardLayout(AuthorizationPageComponent);
