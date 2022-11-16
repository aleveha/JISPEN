import { LoadingCodeModel } from "../../models/loadingCode.model";
import { TerritorialUnitModel } from "../../models/territorialUnit.model";
import { WasteModel } from "../../models/waste.model";
import { WasteCompanyModel } from "../../models/wasteCompany.model";
import { WasteCompanyTypeModel } from "../../models/wasteCompanyType.model";
import { ZipcodeModel } from "../../models/zipcode.model";

export interface AddressDto {
	city: string;
	street?: string;
	registryNumber?: string;
	buildingNumber?: string;
	zipcodeId?: number;
}

export interface MedicalCompanyDto {
	uid: number;
	companyId: string;
	name: string;
	territorialUnitId: number;
	contactFirstName?: string;
	contactLastName?: string;
	contactPhone?: string;
	contactEmail?: string;
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
	loadingCodes: LoadingCodeModel[];
	wastes: WasteModel[];
	wasteCompanies?: WasteCompanyModel[];
}

export interface CataloguesDto {
	loadingCodes: LoadingCodeModel[];
	territorialUnits: TerritorialUnitModel[];
	wasteCompanyTypes: WasteCompanyTypeModel[];
	wastes: WasteModel[];
	zipcodes: ZipcodeModel[];
}
