import { Field, Form, Formik, FormikConfig } from "formik";
import { useRouter } from "next/router";
import React, { FC, memo, useCallback } from "react";
import { toast } from "react-hot-toast";
import { useRecoilState } from "recoil";
import { InferType, object, string } from "yup";
import { loginUser } from "@api/authorization";
import { ApiError } from "@api/config/types";
import { userState } from "@state/user";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

const loginSchema = object({
	email: string().email("Špatný format e-mailu").required("Povinný údaj"),
	password: string().min(8, "Heslo musí obsahovat minimalně 8 znaků").required("Povinní údaj"),
});

export type LoginFormValues = InferType<typeof loginSchema>;

async function errorHelper(error: ApiError): Promise<string> {
	switch (error.statusCode) {
		case 400:
			return "Zadali jste něco špatně";
		case 401:
			return "Špatné přihlašovací údaje";
		default:
			return "Neznámá chyba";
	}
}

const LoginFormComponent: FC = () => {
	const [, setUser] = useRecoilState(userState);
	const router = useRouter();
	const initialValues: LoginFormValues = {
		email: "",
		password: "",
	};

	const onSubmit = useCallback<FormikConfig<LoginFormValues>["onSubmit"]>(async (values, { resetForm }) => {
		const loadingToastId = toast.loading("Probíhá přihlášení...");
		const { data: user, error } = await loginUser(values);

		if (error || !user) {
			toast.error(await errorHelper(error ?? { statusCode: 500 }), { id: loadingToastId });
			return;
		}

		setUser(user);
		router.push("/templates").then(() => toast.success("Vítejte v aplikaci JISPEN", { id: loadingToastId }));

		resetForm();
	}, []);

	return (
		<Formik<LoginFormValues>
			initialValues={initialValues}
			onSubmit={onSubmit}
			validationSchema={loginSchema}
			validateOnChange={false}
		>
			<Form className="flex flex-col items-center justify-center text-xl w-96" noValidate>
				<Field
					id="email"
					name="email"
					placeholder="Uživatelské jmeno (e-mail)"
					type="email"
					component={Input}
				/>
				<Field id="password" name="password" placeholder="Heslo" type="password" component={Input} />
				<Button type="submit" variant="secondary">
					Přihlásit
				</Button>
			</Form>
		</Formik>
	);
};

export const LoginForm = memo(LoginFormComponent);
