import { apiClient } from "@api/config";
import { ApiError } from "@api/config/types";
import { fetcher } from "@api/index";
import { AccessTokenResponse } from "@api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@shared/components/button/button";
import { Input } from "@shared/components/inputs/text-input";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { useRouter } from "next/router";
import React, { memo, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { object, string } from "yup";

export interface LoginFormValues {
	email: string;
	password: string;
}

const loginSchema = object({
	email: string().required("Povinní údaj").email("Špatný format e-mailu"),
	password: string().required("Povinní údaj").min(8, "Heslo musí obsahovat minimalně 8 znaků"),
});

function errorHelper(error: ApiError): string {
	switch (error.statusCode) {
		case 400:
			return "Zadali jste něco špatně";
		case 401:
			return "Špatné přihlašovací údaje";
		default:
			return "Vyskytla se chyba během přihlašování";
	}
}

export const LoginForm = memo(() => {
	const [, setUser] = useAuth();
	const router = useRouter();

	const { control, handleSubmit } = useForm<LoginFormValues>({
		defaultValues: { email: "", password: "" },
		mode: "onChange",
		resolver: yupResolver(loginSchema),
	});

	const [isLoading, setIsLoading] = useState(false);

	const onSubmit = useCallback<SubmitHandler<LoginFormValues>>(
		async values => {
			setIsLoading(true);
			const loadingToastId = toast.loading("Probíhá přihlášení...");
			const { data, error } = await fetcher<AccessTokenResponse, LoginFormValues>({
				axiosInstance: apiClient,
				method: "post",
				url: "/auth/login",
				data: values,
			});

			if (error) {
				setIsLoading(false);
				toast.error(errorHelper(error), { id: loadingToastId });
				return;
			}

			setUser(data);
			setIsLoading(false);
			await router.push("/");
			toast.success("Vítejte v aplikaci JISPEN", { id: loadingToastId });
		},
		[router, setUser]
	);

	return (
		<form
			className="mt-8 flex w-full flex-col items-center justify-center space-y-4 text-xl sm:w-96"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input control={control} fullWidth label="Uživatelské jméno (e-mail)" name="email" required type="email" />
			<Input control={control} fullWidth name="password" label="Heslo" required type="password" />
			<Button className="w-full" loading={isLoading} type="submit">
				Přihlásit
			</Button>
		</form>
	);
});

LoginForm.displayName = "LoginForm";
