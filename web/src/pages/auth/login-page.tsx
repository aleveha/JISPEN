import { withDashboardLayout } from "@shared/components/layout/layout";
import { PasswordResetModal } from "@zones/authorization/components/password-reset-modal";
import { LoginForm } from "@zones/authorization/forms/login-form";
import { NextPage } from "next";
import React, { useCallback, useState } from "react";

const AuthorizationPageComponent: NextPage = () => {
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleCloseModal = useCallback(() => setIsModalOpen(false), []);
	const handleOpenModal = useCallback(() => setIsModalOpen(true), []);

	return (
		<div className="flex h-full flex-col sm:grid sm:grid-rows-6">
			<div className="row-span-2 flex flex-col items-center justify-end space-y-12">
				<h1 className="text-5xl font-medium text-primary">JISPEN</h1>
			</div>
			<div className="row-span-4 flex flex-col items-center justify-start space-y-6">
				<LoginForm />
				<div className="flex w-full flex-col justify-between space-y-2 sm:w-96">
					<a className="w-fit cursor-pointer text-primary underline hover:text-primary-dark" onClick={handleOpenModal}>
						Chcete založit nový účet?
					</a>
					<a className="w-fit cursor-pointer text-primary underline hover:text-primary-dark" onClick={handleOpenModal}>
						Zapomněli jste heslo?
					</a>
				</div>
				<PasswordResetModal isOpen={isModalOpen} onClose={handleCloseModal} />
			</div>
		</div>
	);
};

export const Page = withDashboardLayout(AuthorizationPageComponent);
