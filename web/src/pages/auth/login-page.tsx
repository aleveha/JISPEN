import { withDashboardLayout } from "@shared/components/layout/layout";
import { LoginForm } from "@zones/authorization/forms/login-form";
import { NextPage } from "next";
import Link from "next/link";
import React, { FC, ReactNode } from "react";

interface NewPasswordRequestLinkProps {
	children: ReactNode;
}

const NewPasswordRequestLink: FC<NewPasswordRequestLinkProps> = ({ children }) => (
	<Link className="w-fit cursor-pointer text-primary underline hover:text-primary-dark" href="/new-password-request" passHref>
		{children}
	</Link>
);

const AuthorizationPageComponent: NextPage = () => {
	return (
		<div className="flex h-full flex-col sm:grid sm:grid-rows-6">
			<div className="row-span-2 flex flex-col items-center justify-end space-y-12">
				<h1 className="text-5xl font-medium text-primary">JISPEN</h1>
			</div>
			<div className="row-span-4 flex flex-col items-center justify-start space-y-6">
				<LoginForm />
				<div className="flex w-full flex-col justify-between space-y-2 sm:w-96">
					<NewPasswordRequestLink>Chcete založit nový účet?</NewPasswordRequestLink>
					<NewPasswordRequestLink>Zapomněli jste heslo?</NewPasswordRequestLink>
				</div>
			</div>
		</div>
	);
};

export const Page = withDashboardLayout(AuthorizationPageComponent);
