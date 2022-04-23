import { date, number, object } from "yup";
import { LoadingCode, Template, Waste, WasteCompany } from "@api/templates/types";

export const CreateRecordValidationSchema = object({
	template: object().required("Povinný údaj"),
	amount: number().required("Povinný údaj").min(1),
	date: date().required("Povinný údaj"),
	wasteCompany: object().required("Povinný údaj"),
	waste: object().required("Povinný údaj"),
	loadingCode: object().required("Povinný údaj"),
});

export interface CreateRecordValues {
	template?: Template;
	amount?: number;
	date?: Date;
	wasteCompany?: WasteCompany;
	waste?: Waste;
	loadingCode?: LoadingCode;
}
