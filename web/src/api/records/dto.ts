export interface InsertRecordDto {
	amount: number;
	date: Date;
	id: number | null;
	loadingCodeId: number;
	templateId: number;
	wasteCompanyId: number | null;
	wasteId: number;
}
