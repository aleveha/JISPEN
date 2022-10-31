import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { AccessTokenResponse } from "@api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "@shared/components/button/button";
import { Input } from "@shared/components/inputs/text-input";
import { useRouter } from "next/router";
import React, { memo, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { object, string } from "yup";

interface RegistrationFormValues {
	email: string;
}

const registrationSchema = object({
	email: string().required("Povinný údaj").email("Špatný format e-mailu"),
});

interface Props {
	isOpen: boolean;
	onClose: () => void;
}

export const PasswordResetModal = memo<Props>(({ isOpen, onClose }) => {
	const { control, handleSubmit, reset } = useForm<RegistrationFormValues>({
		defaultValues: { email: "" },
		mode: "onChange",
		resolver: yupResolver(registrationSchema),
	});

	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const onSubmit = useCallback<SubmitHandler<RegistrationFormValues>>(
		values => {
			const loadingToastId = toast.loading("Odesílám e-mail....");
			setIsLoading(true);
			fetcher<AccessTokenResponse, RegistrationFormValues>({
				axiosInstance: apiClient,
				method: "post",
				url: "/auth/password-reset",
				data: values,
			})
				.then(({ data: _, error }) => {
					setIsLoading(false);

					if (error) {
						toast.error("Během odesílání e-mailu se něco nepovedlo", { id: loadingToastId });
						return;
					}

					router.push("/").then(() => toast.success("Pokračujte na odkazu, který jsme vám zaslali e-mailem", { id: loadingToastId }));
					reset();
				})
				.catch(() => toast.error("Neznámá chyba", { id: loadingToastId }));
		},
		[reset, router]
	);

	return (
		<Dialog
			onClose={onClose}
			open={isOpen}
			PaperProps={{
				sx: {
					borderRadius: "1rem",
					padding: "1rem",
				},
			}}
		>
			<DialogTitle className="text-2xl font-medium text-primary">Zadejte prosím e-mail</DialogTitle>
			<DialogContent>
				<p>Potřebujeme vaši e-mailovou adresu, abychom vám mohli zaslat informace o registraci/obnovení hesla.</p>
				<form
					className="mt-8 flex w-full flex-col items-center justify-center space-y-3 text-xl md:space-y-6"
					noValidate
					onSubmit={handleSubmit(onSubmit)}
				>
					<Input control={control} fullWidth label="Uživatelské jméno (e-mail)" name="email" required type="email" />
					<div className="flex w-full justify-end space-x-4">
						<Button onClick={onClose} variant="white">
							Zpět
						</Button>
						<Button loading={isLoading} type="submit">
							Odeslat
						</Button>
					</div>
				</form>
			</DialogContent>
		</Dialog>
	);
});

PasswordResetModal.displayName = "PasswordResetFormWrapper";
