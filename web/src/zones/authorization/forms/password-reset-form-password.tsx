import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { AccessTokenResponse } from "@api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@shared/components/button/button";
import { Input } from "@shared/components/inputs/text-input";
import { useReCaptcha } from "@shared/hooks/useReCaptcha";
import { useRouter } from "next/router";
import React, { memo, useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { object, ref, string } from "yup";

interface RegistrationFormProps {
	accessToken: string;
}

interface RegistrationFormValues {
	captcha: string;
	password: string;
	repeatedPassword: string;
}

const registrationSchema = object({
	password: string().required("Povinní údaj").min(8, "Heslo musí obsahovat minimalně 8 znaků"),
	repeatedPassword: string()
		.required("Povinní údaj")
		.oneOf([ref("password")], "Hesla musí být stejná"),
});

export const PasswordResetFormPassword = memo<RegistrationFormProps>(({ accessToken }) => {
	const { control, handleSubmit, reset } = useForm<RegistrationFormValues>({
		defaultValues: {
			password: "",
			repeatedPassword: "",
		},
		mode: "onChange",
		resolver: yupResolver(registrationSchema),
	});

	const [isLoading, setIsLoading] = useState(false);
	const router = useRouter();
	const [catpchaToken, captchaRef, handleRecaptcha] = useReCaptcha();

	const onSubmit = useCallback<SubmitHandler<RegistrationFormValues>>(
		async values => {
			if (!catpchaToken) {
				toast.error("Nejprve musíte potvrdit, že nejste robot");
				return;
			}

			const loadingToastId = toast.loading("Probíhá nastavení nového hesla...");
			setIsLoading(true);
			const { error } = await fetcher<AccessTokenResponse, RegistrationFormValues>({
				axiosInstance: apiClient,
				method: "post",
				url: "/auth/register",
				data: { ...values, captcha: catpchaToken },
				accessToken,
			});
			setIsLoading(false);
			captchaRef.current?.reset();

			if (error) {
				if (error.statusCode === 422) {
					toast.error("Neplatná capcha, zkuste prosím znovu", { id: loadingToastId });
					return;
				}

				toast.error("Během nastavení nového hesla se něco nepovedlo", { id: loadingToastId });
				return;
			}

			router.push("/login").then(() => toast.success("Nastavení nového hesla proběhla uspěšně", { id: loadingToastId }));
			reset();
		},
		[accessToken, captchaRef, catpchaToken, reset, router]
	);

	return (
		<form
			className="mt-8 flex w-full flex-col items-start justify-center space-y-3 text-xl sm:w-96 md:space-y-6"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input control={control} fullWidth name="password" label="Heslo" required type="password" />
			<Input control={control} fullWidth name="repeatedPassword" label="Zopakujte heslo" required type="password" />
			<ReCAPTCHA onChange={handleRecaptcha} ref={captchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} />
			<Button className="w-full" loading={isLoading} type="submit">
				Odeslat
			</Button>
		</form>
	);
});

PasswordResetFormPassword.displayName = "RegistrationForm";
