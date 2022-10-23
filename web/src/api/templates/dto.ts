import { LoadingCode, TerritorialUnit, Waste, WasteCompanyType, Zipcode } from "@api/templates/types";

export interface TemplateDTO {
	title: string;
	expiredAt?: Date;
	medicalCompany: MedicalCompanyDTO;
	loadingCodes: LoadingCode[];
	wastes: Waste[];
	wasteCompanies?: WasteCompanyDTO[];
}

export interface MedicalCompanyDTO {
	uid: number;
	companyId: string;
	name: string;
	contactPersonName?: string;
	contactPersonLastName?: string;
	contactPersonPhone?: string;
	contactPersonEmail?: string;
	address: AddressDTO;
	territorialUnitId: number;
}

export interface WasteCompanyDTO {
	uid?: number;
	companyId?: string;
	name?: string;
	address?: AddressDTO;
	territorialUnitId: number;
	typeId: number;
	expiredAt?: Date;
}

export interface AddressDTO {
	city: string;
	street: string;
	registryNumber?: string;
	buildingNumber?: string;
	zipcodeId: number;
}

export interface CataloguesDto {
	loadingCodes: LoadingCode[];
	territorialUnits: TerritorialUnit[];
	wasteCompanyTypes: WasteCompanyType[];
	wastes: Waste[];
	zipcodes: Zipcode[];
}
