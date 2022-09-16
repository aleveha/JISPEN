import { LoadingCode, Template, Waste, WasteCompany } from "@api/templates/types";

export interface Record {
	amount: number;
	date: Date;
	id: number;
	loadingCode: LoadingCode;
	loadingCodeId: number;
	template: Template;
	templateId: number;
	waste: Waste;
	wasteId: number;
	wasteCompany?: WasteCompany;
	wasteCompanyId?: number;
}

export interface CreateRecordDto {
	amount: number;
	date: Date;
	loadingCodeId: number;
	templateId: number;
	wasteId: number;
	wasteCompanyId: number | null;
}
