export interface AddressDto {
	city: string;
	street: string;
	registryNumber: string;
	buildingNumber: string;
	zipcodeId: number;
}

export interface MedicalCompanyDto {
	uid: number;
	companyId: string;
	name: string;
	territorialUnitId: number;
	contactFirstName: string;
	contactLastName: string;
	contactPhone: number;
	contactEmail: string;
	userId: number;
	addressId?: number;
	address: AddressDto;
}

export interface TemplateDto {
	title: string;
	userId: number;
	medicalCompanyId?: number;
	medicalCompany: MedicalCompanyDto;
	expireAt?: Date;
}
