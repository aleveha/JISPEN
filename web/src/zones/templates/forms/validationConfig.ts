import { array, number, object, string } from "yup";
import { NewTemplateFormValues } from "@zones/templates/forms/types";

const territorialUnitObject = object({
	id: number().min(1, "Povinný údaj").required("Povinný údaj"),
	uid: number().required("Povinný údaj"),
	name: string().required("Povinný údaj"),
});

const zipcodeObject = object({
	id: number().min(1, "Povinný údaj").required("Povinný údaj"),
	uid: number().required("Povinný údaj"),
	name: string().required("Povinný údaj"),
});

const addressObject = object({
	street: string().required("Povinný údaj"),
	buildingNumber: string(),
	registryNumber: string().required("Povinný údaj"),
	city: string().required("Povinný údaj"),
	zipcode: zipcodeObject,
});

export const newTemplateFormSchema = object({
	title: string().min(3, "Název musí obsahovat alespoň 3 znaky").required("Povinný údaj"),
	medicalCompany: object({
		name: string().min(3, "Název musí obsahovat alespoň 3 znaky").required("Povinný údaj"),
		uid: string().matches(/^\d*$/, "Pouze čislo").required("Povinný údaj"),
		companyId: string().required("Povinný údaj"),
		territorialUnit: territorialUnitObject,
		address: addressObject,
		contactPersonName: string(),
		contactPersonLastName: string(),
		contactPersonPhone: string().matches(/^\+\d*$/, "Špatný format (+420...)"),
		contactPersonEmail: string().email("Špatný format e-mailu"),
	}),
	wastes: array()
		.of(
			object({
				id: number(),
				uid: number(),
				name: string(),
				category: string(),
				certificate: string().nullable(),
			})
		)
		.min(1, "Povinný údaj")
		.required("Povinný údaj"),
	loadingCodes: array()
		.of(
			object({
				id: number(),
				uid: string(),
				name: string(),
			})
		)
		.min(1, "Povinný údaj")
		.required("Povinný údaj"),
	wasteCompanies: array().of(
		object({
			name: string().min(3, "Název musí obsahovat alespoň 3 znaky").required("Povinný údaj"),
			uid: string().matches(/^\d*$/, "Pouze čislo").required("Povinný údaj"),
			companyId: string().required("Povinný údaj"),
			territorialUnit: territorialUnitObject,
			type: string().matches(/^\d*$/, "Pouze čislo").required("Povinný údaj"),
			address: addressObject,
		})
	),
});

export const newTemplateFromInitialValues: NewTemplateFormValues = {
	title: "",
	medicalCompany: {
		name: "",
		uid: "",
		companyId: "",
		territorialUnit: {
			id: 0,
			uid: 0,
			name: "",
		},
		address: {
			street: "",
			buildingNumber: "",
			registryNumber: "",
			city: "",
			zipcode: {
				id: 0,
				uid: 0,
				name: "",
			},
		},
		contactPersonName: "",
		contactPersonLastName: "",
		contactPersonPhone: "",
		contactPersonEmail: "",
	},
	wastes: [],
	loadingCodes: [],
	wasteCompanies: [
		{
			name: "",
			uid: "",
			companyId: "",
			territorialUnit: {
				id: 0,
				uid: 0,
				name: "",
			},
			address: {
				street: "",
				buildingNumber: "",
				registryNumber: "",
				city: "",
				zipcode: {
					id: 0,
					uid: 0,
					name: "",
				},
			},
			type: "",
		},
	],
};
