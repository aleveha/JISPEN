import { loginUser } from "@api/authorization";
import { ApiError } from "@api/config/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@shared/components/button/button";
import { Input } from "@shared/components/inputs/text-input";
import { userState } from "@state/user/user-state";
import { useAtom } from "jotai";
import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect, useState } from "react";
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
			return "Neznámá chyba";
	}
}

export const LoginForm = memo(() => {
	const [user, setUser] = useAtom(userState);
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
			const { data: user, error } = await loginUser(values);
			setIsLoading(false);

			if (error) {
				toast.error(errorHelper(error ?? { statusCode: 500 }), { id: loadingToastId });
				return;
			}

			router.push("/").then(() => {
				setUser(user);
				toast.success("Vítejte v aplikaci JISPEN", { id: loadingToastId });
			});
		},
		[router, setUser]
	);

	useEffect(() => {
		if (user) {
			router.push("/").then(() => {
				setUser(null);
				toast.success("Byli jste úspěšně odhlášeni");
			});
		}
	}, [router, setUser, user]);

	return (
		<form
			className="mt-8 flex w-full flex-col items-center justify-center space-y-3 text-xl sm:w-96 md:space-y-6"
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
