import { InferType } from "yup";
import { TerritorialUnit, Zipcode } from "@api/templates/types";
import { newTemplateFormSchema } from "@zones/templates/forms/validationConfig";

export type NewTemplateFormValues = InferType<typeof newTemplateFormSchema>;

export interface AddressCatalogue {
	territorialUnits: TerritorialUnit[];
	zipcodes: Zipcode[];
}
