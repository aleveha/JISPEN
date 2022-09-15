import { User } from "@api/authorization/types";

export interface Zipcode {
	id: number;
	uid: number;
	name: string;
}

export interface Address {
	id: number;
	city: string;
	street: string;
	registryNumber: string;
	buildingNumber: string;
	zipcodeId: number;
	zipcode: Zipcode;
}

export interface TerritorialUnit {
	id: number;
	uid: number;
	name: string;
}

export interface MedicalCompany {
	id: number;
	uid: number;
	companyId: string;
	name: string;
	territorialUnitId: number;
	addressId: number;
	contactFirstName: string;
	contactLastName: string;
	contactPhone: number;
	contactEmail: string;
	userId: number;
	address: Address;
	territorialUnit: TerritorialUnit;
}

export interface Template {
	id: number;
	title: string;
	medicalCompanyId: number;
	userId: number;
	expiredAt?: Date;
	user: User;
	medicalCompany: MedicalCompany;
	loadingCodes: LoadingCode[];
	wastes: Waste[];
	wasteCompanies: WasteCompany[];
}

export interface Waste {
	id: number;
	uid: number;
	name: string;
	category: string;
	certificate?: string;
}

export interface LoadingCode {
	id: number;
	uid: string;
	name: string;
}

export interface WasteCompany {
	id: number;
	uid: number;
	companyId: string;
	name: string;
	territorialUnitId: number;
	addressId: number;
	templateId: number;
	address: Address;
	territorialUnit: TerritorialUnit;
	type: number;
	expiredAt?: Date;
}
