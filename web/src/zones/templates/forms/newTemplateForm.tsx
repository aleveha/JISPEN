import { useRouter } from "next/router";
import React, { FC, useCallback } from "react";
import { Form, Formik, FormikConfig } from "formik";
import { Button } from "@ui/button";
import { ButtonType } from "@ui/button/types";
import { newTemplateFormSchema, newTemplateFromInitialValues } from "@zones/templates/forms/validationConfig";
import { NewTemplateFormValues } from "@zones/templates/forms/types";
import { useCatalogue } from "@zones/templates/hooks/useCatalogue";
import { LoadingCodesSection } from "./sections/loadingCodesSection";
import { MedicalCompanySection } from "./sections/medicalCompanySection";
import { TemplateTitleSection } from "./sections/templateTitleSection";
import { WasteCompaniesSection } from "./sections/wasteCompaniesSection";
import { WasteSection } from "./sections/wasteSection";
import { TemplateDTO } from "@api/templates/dto";
import { useRecoilState } from "recoil";
import { userState } from "@state/user";
import { toast } from "react-hot-toast";
import { createTemplate } from "@api/templates";

export const NewTemplateForm: FC = () => {
	const router = useRouter();
	const [user] = useRecoilState(userState);

	const { loadingCodes, territorialUnits, wastes, zipcodes } = useCatalogue();

	const onSubmit = useCallback<FormikConfig<NewTemplateFormValues>["onSubmit"]>(values => {
		if (!user) {
			router.push("/login").then(() => {
				toast.error("You must be logged in to create a template");
			});
			return;
		}
		const requestObject: TemplateDTO = {
			// @ts-ignore
			loadingCodes: values.loadingCodes.filter(value => !!value),
			medicalCompany: {
				address: {
					buildingNumber: values.medicalCompany.address.buildingNumber,
					city: values.medicalCompany.address.city,
					registryNumber: values.medicalCompany.address.registryNumber,
					street: values.medicalCompany.address.street,
					zipcodeId: values.medicalCompany.address.zipcode.id,
				},
				companyId: values.medicalCompany.companyId,
				name: values.medicalCompany.name,
				territorialUnitId: values.medicalCompany.territorialUnit.id,
				uid: Number(values.medicalCompany.uid),
				userId: user.id,
			},
			title: values.title,
			userId: user.id,
			// @ts-ignore
			wastes: values.wastes.filter(value => !!value),
			wasteCompanies: values.wasteCompanies?.map(value => ({
				...value,
				uid: Number(value.uid),
				territorialUnitId: value.territorialUnit.id,
				userId: user.id,
				type: Number(value.type),
				address: {
					...value.address,
					zipcodeId: value.address.zipcode.id,
				},
			})),
		};

		console.log(JSON.stringify(requestObject, null, 2));

		createTemplate(requestObject).then(() => {
			router.push("/templates");
		});
	}, []);

	const onExit = useCallback(() => {
		router.back();
	}, []);

	return (
		<Formik<NewTemplateFormValues>
			initialValues={newTemplateFromInitialValues}
			onSubmit={onSubmit}
			validationSchema={newTemplateFormSchema}
		>
			<Form className="space-y-6 divide-y divide-gray-200">
				<div className="space-y-6 divide-y divide-gray-200">
					<TemplateTitleSection />
					<MedicalCompanySection
						territorialUnits={territorialUnits.slice(0, 100)}
						zipcodes={zipcodes.slice(0, 100)}
					/>
					<WasteSection wastes={wastes} />
					<LoadingCodesSection loadingCodes={loadingCodes} />
					<WasteCompaniesSection
						territorialUnits={territorialUnits.slice(0, 100)}
						zipcodes={zipcodes.slice(0, 100)}
					/>
				</div>
				<div className="py-8">
					<div className="flex justify-end gap-6">
						<Button onClick={onExit} variant={ButtonType.white}>
							Zpět
						</Button>
						<Button type="submit" variant={ButtonType.primary}>
							Uložit šablonu
						</Button>
					</div>
				</div>
			</Form>
		</Formik>
	);
};
