export interface CreateRecordDto {
	amount: number;
	date: Date;
	loadingCodeId: number;
	templateId: number;
	wasteCompanyId: number | null;
	wasteId: number;
}
