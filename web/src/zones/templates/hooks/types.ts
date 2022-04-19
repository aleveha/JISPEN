import { LoadingCode, TerritorialUnit, Waste, Zipcode } from "@api/templates/types";

export interface UseCatalogueReturnType {
	loadingCodes: LoadingCode[];
	territorialUnits: TerritorialUnit[];
	wastes: Waste[];
	zipcodes: Zipcode[];
}
