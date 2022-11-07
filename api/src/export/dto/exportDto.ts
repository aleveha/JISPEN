export interface ExportDto {
	date?: {
		from: Date;
		to: Date;
	};
	exportType: "download" | "email";
	fileType: "xml" | "xlsx";
	medicalCompanyId?: number;
	recipientEmail?: string;
	eightDigitCodesAllowed: boolean;
}
