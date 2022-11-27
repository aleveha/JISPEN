import { CaptchaDto } from "@api/auth/dto";
import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { AccessTokenResponse } from "@api/types";
import { Button } from "@shared/components/button/button";
import { Input } from "@shared/components/inputs/text-input";
import { useRouter } from "next/router";
import React, { memo, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import useSWR, { Fetcher, mutate } from "swr";

interface RegistrationFormValues {
	captcha: string;
	email: string;
}

export const PasswordResetFormEmail = memo(() => {
	const { control, handleSubmit, reset } = useForm<RegistrationFormValues>({
		defaultValues: { email: "" },
		mode: "onChange",
	});

	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();

	const captchaFetcher = useCallback<Fetcher<CaptchaDto, string>>((url: string) => apiClient.get<CaptchaDto>(url).then(res => res.data), []);

	const { data: captchaResponse } = useSWR<CaptchaDto>("/captcha/generate", captchaFetcher);

	const onSubmit = useCallback<SubmitHandler<RegistrationFormValues>>(
		async values => {
			const loadingToastId = toast.loading("Odesílám e-mail..");
			setIsLoading(true);
			const { error } = await fetcher<AccessTokenResponse, RegistrationFormValues>({
				axiosInstance: apiClient,
				method: "post",
				url: "/auth/password-reset",
				data: values,
			});
			setIsLoading(false);

			if (error) {
				if (error.statusCode === 422) {
					await mutate("/captcha/generate");
					toast.error("Neplatná capcha, zkuste prosím znovu", { id: loadingToastId });
					return;
				}

				toast.error("Během odesílání e-mailu se něco nepovedlo", { id: loadingToastId });
				return;
			}

			router.push("/").then(() => toast.success("Pokračujte na odkazu, který jsme vám zaslali e-mailem", { id: loadingToastId }));
			reset();
		},
		[reset, router]
	);

	if (!captchaResponse) {
		router.push("/").then(() => toast.error("Během načítání stránky se něco nepovedlo"));
		return null;
	}

	return (
		<form
			className="mt-8 flex w-full flex-col items-start justify-center space-y-3 text-xl sm:w-96 md:space-y-6"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input control={control} fullWidth label="Uživatelské jméno (e-mail)" name="email" required type="email" />
			<span className="w-full select-none rounded-xl bg-gray-400 py-2 px-4 text-center text-2xl text-white">{captchaResponse.captcha}</span>
			<Input
				control={control}
				fullWidth
				label="Zadejte kód z obrázku"
				name="captcha"
				required
				rules={{ required: "Nejprve musíte potvrdit, že nejste robot" }}
			/>
			<Button className="w-full" loading={isLoading} type="submit">
				Odeslat
			</Button>
		</form>
	);
});

PasswordResetFormEmail.displayName = "PasswordResetFormEmail";
