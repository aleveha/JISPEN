import React, { FC, memo, useCallback } from "react";
import { Field, Form, Formik, FormikConfig } from "formik";
import { toast } from "react-hot-toast";
import { InferType, object, ref, string } from "yup";
import { registerUser } from "@api/authorization";
import { ApiError } from "@api/config/types";
import { Button } from "@ui/button";
import { ButtonType } from "@ui/button/types";
import { Input } from "@ui/input";

interface RegistrationFormProps {
	onSuccess: () => void;
}

const registrationSchema = object({
	email: string().email("Špatný format e-mailu").required("Povinný údaj"),
	password: string().min(8, "Heslo musí obsahovat minimalně 8 znaků").required("Povinní údaj"),
	repeatedPassword: string()
		.oneOf([ref("password")], "Hesla musí být stejná")
		.required("Povinní údaj"),
});

export type RegistrationFormValues = InferType<typeof registrationSchema>;

async function errorHelper(error: ApiError): Promise<string> {
	switch (error.statusCode) {
		case 400:
			return "Uživatel se stejným e-mailem již existuje";
		default:
			return "Neznámá chyba";
	}
}

const RegistrationFormComponent: FC<RegistrationFormProps> = ({ onSuccess }) => {
	const initialValues: RegistrationFormValues = {
		email: "",
		password: "",
		repeatedPassword: "",
	};

	const onSubmit = useCallback<FormikConfig<RegistrationFormValues>["onSubmit"]>(
		async (values, { resetForm }) => {
			const loadingToastId = toast.loading("Probíhá registrace...");
			const { data: user, error } = await registerUser(values);

			if (error || !user) {
				toast.error(await errorHelper(error ?? { statusCode: 500 }), { id: loadingToastId });
				return;
			}

			toast.success("Registrace proběhla uspěšně", { id: loadingToastId });
			onSuccess();

			resetForm();
		},
		[onSuccess]
	);

	return (
		<div className="bg-white p-8 rounded-lg">
			<Formik<RegistrationFormValues>
				initialValues={initialValues}
				onSubmit={onSubmit}
				validateOnChange={false}
				validationSchema={registrationSchema}
			>
				<Form className="flex flex-col items-center justify-center text-xl w-96">
					<Field
						className="w-full"
						component={Input}
						id="email"
						name="email"
						placeholder="Uživatelské jmeno (e-mail)"
						type="email"
					/>
					<Field
						className="w-full"
						component={Input}
						id="password"
						name="password"
						placeholder="Heslo"
						type="password"
					/>
					<Field
						className="w-full"
						component={Input}
						id="repeatedPassword"
						name="repeatedPassword"
						placeholder="Zopakujte heslo"
						type="password"
					/>
					<Button className="w-full" type="submit" variant={ButtonType.secondary}>
						Vytvořit účet
					</Button>
				</Form>
			</Formik>
		</div>
	);
};

export const RegistrationForm = memo(RegistrationFormComponent);
