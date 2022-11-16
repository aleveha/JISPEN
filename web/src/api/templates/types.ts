export interface Zipcode {
	id: number;
	uid: number;
	name: string;
}

export interface Address {
	id: number;
	city: string;
	street: string | null;
	registryNumber: string | null;
	buildingNumber: string | null;
	zipcodeId: number | null;
	zipcode: Zipcode | null;
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
	contactFirstName: string | null;
	contactLastName: string | null;
	contactPhone: string | null;
	contactEmail: string | null;
	userId: number;
	address: Address;
	territorialUnit: TerritorialUnit;
}

export interface Template {
	id: number;
	title: string;
	medicalCompanyId: number;
	userId: number;
	expiredAt: Date | null;
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
}

export interface WasteCompanyType {
	id: number;
	uid: number;
	name: string;
}

export interface LoadingCode {
	id: number;
	uid: string;
	name: string;
	requireWasteCompany: boolean;
}

export interface WasteCompany {
	id: number;
	uid: number | null;
	companyId: string | null;
	name: string | null;
	territorialUnitId: number;
	addressId: number | null;
	templateId: number;
	address: Address | null;
	territorialUnit: TerritorialUnit;
	typeId: number;
	type: WasteCompanyType;
	expiredAt: Date | null;
}
