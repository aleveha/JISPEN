import { LoadingCode, Waste } from "@api/templates/types";

export interface TemplateDTO {
	title: string;
	userId: number;
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
	userId: number;
	address: AddressDTO;
	territorialUnitId: number;
}

export interface WasteCompanyDTO {
	uid: number;
	companyId: string;
	name: string;
	address: AddressDTO;
	territorialUnitId: number;
	type: number;
	expiredAt?: Date;
}

export interface AddressDTO {
	city: string;
	street: string;
	registryNumber: string;
	buildingNumber?: string;
	zipcodeId: number;
}
