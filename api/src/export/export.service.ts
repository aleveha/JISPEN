import { Injectable, NotFoundException } from "@nestjs/common";
import { RecordsService } from "../records/records.service";
import { XlsxBuilderService } from "../utils/xlsx-builder/xlsx-builder.service";
import { XmlBuilderService } from "../utils/xml-builder/xml-builder.service";
import { ExportDto } from "./dto/exportDto";

@Injectable()
export class ExportService {
	constructor(private readonly recordsService: RecordsService, private readonly xmlBuilderService: XmlBuilderService, private readonly xlsxBuilderService: XlsxBuilderService) {}

	public async generateExportFile({ date, fileType, medicalCompanyId, eightDigitCodesAllowed }: ExportDto, userEmail: string): Promise<string | Buffer> {
		const records = await this.recordsService.getUserRecords(userEmail, medicalCompanyId, date);
		if (records.length === 0) {
			throw new NotFoundException("No records found");
		}

		const filteredRecords = eightDigitCodesAllowed ? records : records.filter(record => record.waste.uid.toString().length !== 8);
		if (filteredRecords.length === 0) {
			throw new NotFoundException("No records found");
		}

		return fileType === "xml" ? this.xmlBuilderService.generateXml(filteredRecords, userEmail) : this.xlsxBuilderService.generateXlsx(filteredRecords);
	}
}
