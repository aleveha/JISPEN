import React, { FC, useCallback, useEffect, useState } from "react";
import { LoadingCode, Template, Waste, WasteCompany } from "@api/templates/types";
import { Field, Form, Formik, FormikConfig, FormikProps } from "formik";
import { CreateRecordValidationSchema, CreateRecordValues } from "@zones/records/forms/validationConfig";
import { Autocomplete } from "@ui/autocomlete";
import { useRecoilState } from "recoil";
import { userState } from "@state/user";
import { getUserTemplates } from "@api/templates";
import { useRouter } from "next/router";
import { Button } from "@ui/button";
import { ButtonType } from "@ui/button/types";
import { Input } from "@ui/input";
import { createRecord } from "@api/records";
import { toast } from "react-hot-toast";

const CreateFormSection: FC<FormikProps<CreateRecordValues>> = props => {
	const [templates, setTemplates] = useState<Template[]>([]);
	const [user] = useRecoilState(userState);
	const router = useRouter();

	const [template, setTemplate] = useState<Template | null>(null);

	useEffect(() => {
		if (!user) {
			router.push("/login");
			return;
		}

		getUserTemplates(user.id).then(res => {
			if (res.data) {
				setTemplates(res.data);
			}
		});
	}, [user]);

	useEffect(() => {
		if (props.values.template) {
			setTemplate(props.values.template);
		}
	}, [props.values.template]);

	return (
		<div className="space-y-10">
			<Autocomplete<Template>
				name="template"
				placeholder="Vyberte šablonu"
				data={templates}
				displayValueKey="title"
				errorMessage="Žadná šablona nebyla nalezena"
				filterBy="title"
				selectDisplayValueKey={["title"]}
			/>
			<div className="grid grid-cols-2 grid-rows-3">
				<Autocomplete<Waste>
					name="waste"
					placeholder="Vyberte odpad"
					data={template?.wastes ?? []}
					displayValueKey="uid"
					errorMessage="Žadný odpad nebyl nalezen"
					filterBy="uid"
					selectDisplayValueKey={["uid"]}
					disabled={!template}
				/>
				<Field
					name="amount"
					type="number"
					component={Input}
					placeholder="Zadejte množství (tuny)"
					disabled={!template}
				/>
				<Autocomplete<LoadingCode>
					name="loadingCode"
					placeholder="Vyberte způsob nakladání"
					data={template?.loadingCodes ?? []}
					displayValueKey="uid"
					errorMessage="Žadný způsob nakladání nebyl nalezen"
					filterBy="uid"
					selectDisplayValueKey={["uid"]}
					disabled={!template}
				/>
				<Field name="date" type="date" component={Input} disabled={!template} />
				<Autocomplete<WasteCompany>
					name="wasteCompany"
					placeholder="Vyberte oprávněnou osobu"
					data={template?.wasteCompanies ?? []}
					displayValueKey="name"
					errorMessage="Žadná oprávněná osoba nebyla nalezena"
					filterBy="name"
					selectDisplayValueKey={["name"]}
					disabled={!template}
				/>
			</div>
		</div>
	);
};

export const CreateRecordForm: FC = () => {
	const router = useRouter();

	const onSubmit = useCallback<FormikConfig<CreateRecordValues>["onSubmit"]>(values => {
		createRecord({
			amount: values.amount ?? 0,
			date: values.date ?? new Date(),
			loadingCodeId: values.loadingCode?.id ?? 0,
			templateId: values.template?.id ?? 0,
			wasteId: values.waste?.id ?? 0,
			wasteCompanyId: values.wasteCompany?.id ?? 0,
		}).then(res => {
			if (res.data) {
				router.push("/records").then(() => toast.success("Záznam byl úspěšně vytvořen"));
				return;
			}
			toast.error("Nepodařilo se vytvořit záznam");
		});
	}, []);

	const onBack = useCallback(() => router.back(), [router]);

	return (
		<Formik<CreateRecordValues>
			initialValues={{}}
			onSubmit={onSubmit}
			validationSchema={CreateRecordValidationSchema}
		>
			{props => (
				<Form className="space-y-6 divide-y divide-gray-200">
					<CreateFormSection {...props} />
					<div className="w-full flex justify-end gap-x-8 py-8">
						<Button variant={ButtonType.white} onClick={onBack}>
							Zpět
						</Button>
						<Button type="submit">Vytvořit záznam</Button>
					</div>
				</Form>
			)}
		</Formik>
	);
};
