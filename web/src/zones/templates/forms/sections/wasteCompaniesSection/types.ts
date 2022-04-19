import { FieldArrayRenderProps } from "formik";
import { AddressCatalogue } from "@zones/templates/forms/types";

export interface WasteCompaniesArrayProps extends AddressCatalogue {
	arrayHelper: FieldArrayRenderProps;
}
