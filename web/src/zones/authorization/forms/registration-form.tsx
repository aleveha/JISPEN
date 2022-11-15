import { apiClient } from "@api/config";
import { ApiError } from "@api/config/types";
import { fetcher } from "@api/index";
import { AccessTokenResponse } from "@api/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "@shared/components/button/button";
import { Input } from "@shared/components/inputs/text-input";
import { useReCaptcha } from "@shared/hooks/useReCaptcha";
import React, { memo, useCallback, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { object, ref, string } from "yup";

interface RegistrationFormProps {
	onSuccess: () => void;
}

interface RegistrationFormValues {
	captcha: string;
	email: string;
	password: string;
	repeatedPassword: string;
}

function errorHelper(error: ApiError): string {
	switch (error.statusCode) {
		case 400:
			return "Uživatel se stejným e-mailem již existuje";
		default:
			return "Neznámá chyba";
	}
}

const registrationSchema = object({
	email: string().required("Povinný údaj").email("Špatný format e-mailu"),
	password: string().required("Povinní údaj").min(8, "Heslo musí obsahovat minimalně 8 znaků"),
	repeatedPassword: string()
		.required("Povinní údaj")
		.oneOf([ref("password")], "Hesla musí být stejná"),
});

export const RegistrationForm = memo<RegistrationFormProps>(({ onSuccess }) => {
	const { control, handleSubmit, reset } = useForm<RegistrationFormValues>({
		defaultValues: {
			email: "",
			password: "",
			repeatedPassword: "",
		},
		mode: "onChange",
		resolver: yupResolver(registrationSchema),
	});

	const [isLoading, setIsLoading] = useState(false);
	const [catpchaToken, captchaRef, handleRecaptcha] = useReCaptcha();

	const onSubmit = useCallback<SubmitHandler<RegistrationFormValues>>(
		async values => {
			if (!catpchaToken) {
				toast.error("Nejprve musíte potvrdit, že nejste robot");
				return;
			}

			const loadingToastId = toast.loading("Probíhá registrace...");
			setIsLoading(true);
			const { error } = await fetcher<AccessTokenResponse, RegistrationFormValues>({
				axiosInstance: apiClient,
				method: "post",
				url: "/auth/register",
				data: { ...values, captcha: catpchaToken },
			});
			setIsLoading(false);
			captchaRef.current?.reset();

			if (error) {
				if (error.statusCode === 422) {
					toast.error("Neplatná capcha, zkuste prosím znovu", { id: loadingToastId });
					return;
				}

				toast.error(errorHelper(error), { id: loadingToastId });
				return;
			}

			toast.success("Registrace proběhla uspěšně", { id: loadingToastId });
			onSuccess();
			reset();
		},
		[captchaRef, catpchaToken, onSuccess, reset]
	);

	return (
		<form
			className="mt-8 flex w-full flex-col items-start justify-center space-y-3 text-xl sm:w-96 md:space-y-6"
			noValidate
			onSubmit={handleSubmit(onSubmit)}
		>
			<Input control={control} fullWidth label="Uživatelské jméno (e-mail)" name="email" required type="email" />
			<Input control={control} fullWidth name="password" label="Heslo" required type="password" />
			<Input control={control} fullWidth name="repeatedPassword" label="Zopakujte heslo" required type="password" />
			<ReCAPTCHA onChange={handleRecaptcha} ref={captchaRef} sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY as string} />
			<Button className="w-full" loading={isLoading} type="submit">
				Vytvořit účet
			</Button>
		</form>
	);
});

RegistrationForm.displayName = "RegistrationForm";
