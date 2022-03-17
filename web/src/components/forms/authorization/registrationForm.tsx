import { Field, Form, Formik, FormikConfig } from "formik";
import React, { FC, memo, useCallback } from "react";
import { toast } from "react-hot-toast";
import { InferType, object, ref, string } from "yup";
import { registerUser } from "@api/authorization";
import { ApiError } from "@api/config/types";
import { Button } from "@ui/button";
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
		<Formik<RegistrationFormValues>
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={registrationSchema}
			validateOnChange={false}
		>
			<Form className="flex flex-col items-center justify-center text-xl w-96">
				<Field
					id="email"
					name="email"
					placeholder="Uživatelské jmeno (e-mail)"
					type="email"
					component={Input}
				/>
				<Field id="password" name="password" placeholder="Heslo" type="password" component={Input} />
				<Field
					id="repeatedPassword"
					name="repeatedPassword"
					placeholder="Zopakujte heslo"
					type="password"
					component={Input}
				/>
				<Button type="submit" variant="secondary">
					Vytvořit účet
				</Button>
			</Form>
		</Formik>
	);
};

export const RegistrationForm = memo(RegistrationFormComponent);
