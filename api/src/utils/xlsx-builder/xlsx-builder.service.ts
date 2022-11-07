import { Injectable } from "@nestjs/common";
import { get } from "lodash";
import xlsx, { WorkSheet } from "node-xlsx";
import { RecordModel } from "../../models/record.model";

interface WorksheetKey {
	columnWidth?: number;
	key: string;
	label: string;
}

@Injectable()
export class XlsxBuilderService {
	private worksheetKeys: WorksheetKey[] = [
		{ key: "date", label: "Datum", columnWidth: 10 },
		{ key: "amount", label: "Množství", columnWidth: 10 },
		{ key: "waste.uid", label: "Kód odpadu", columnWidth: 15 },
		{ key: "waste.category", label: "Kategorie odpadu", columnWidth: 10 },
		{ key: "waste.name", label: "Název odpadu", columnWidth: 30 },
		{ key: "waste.certificate", label: "Certifikát odpadu", columnWidth: 10 },
		{ key: "loadingCode.uid", label: "Kód nakladání", columnWidth: 10 },
		{ key: "loadingCode.name", label: "Název kódu nakladání", columnWidth: 30 },
		{ key: "template.title", label: "Název šablony", columnWidth: 30 },
		{ key: "template.medicalCompany.name", label: "Název provozovny", columnWidth: 30 },
		{ key: "template.medicalCompany.uid", label: "IČO provozovny", columnWidth: 15 },
		{ key: "template.medicalCompany.companyId", label: "IČP provozovny", columnWidth: 15 },
		{ key: "template.medicalCompany.address.city", label: "Město (provozovna)", columnWidth: 20 },
		{ key: "template.medicalCompany.address.street", label: "Ulice (provozovna)", columnWidth: 30 },
		{ key: "template.medicalCompany.address.registryNumber", label: "Číslo popisné (provozovna)", columnWidth: 10 },
		{ key: "template.medicalCompany.address.buildingNumber", label: "Číslo orientační (provozovna)", columnWidth: 10 },
		{ key: "template.medicalCompany.address.zipcode.uid", label: "PSČ (provozovna)", columnWidth: 10 },
		{ key: "template.medicalCompany.address.zipcode.name", label: "Název PSČ (provozovna)", columnWidth: 25 },
		{ key: "template.medicalCompany.territorialUnit.uid", label: "ZÚJ (provozovna)", columnWidth: 10 },
		{ key: "template.medicalCompany.territorialUnit.name", label: "Název ZÚJ (provozovna)", columnWidth: 25 },
		{ key: "template.medicalCompany.contactFirstName", label: "Jméno kontaktní osoby", columnWidth: 20 },
		{ key: "template.medicalCompany.contactLastName", label: "Příjmení kontaktní osoby", columnWidth: 20 },
		{ key: "template.medicalCompany.contactPhone", label: "Telefonní číslo kontaktní osoby", columnWidth: 20 },
		{ key: "template.medicalCompany.contactEmail", label: "Email kontaktní osoby", columnWidth: 20 },
		{ key: "wasteCompany.name", label: "Název partnera", columnWidth: 30 },
		{ key: "wasteCompany.uid", label: "IČO partnera", columnWidth: 15 },
		{ key: "wasteCompany.companyId", label: "IČP partnera", columnWidth: 15 },
		{ key: "wasteCompany.address.city", label: "Město (partner)", columnWidth: 20 },
		{ key: "wasteCompany.address.street", label: "Ulice (partner)", columnWidth: 30 },
		{ key: "wasteCompany.address.registryNumber", label: "Číslo popisné (partner)", columnWidth: 10 },
		{ key: "wasteCompany.address.buildingNumber", label: "Číslo orientační (partner)", columnWidth: 10 },
		{ key: "wasteCompany.address.zipcode.uid", label: "PSČ (partner)", columnWidth: 10 },
		{ key: "wasteCompany.address.zipcode.name", label: "Název PSČ (partner)", columnWidth: 25 },
		{ key: "wasteCompany.territorialUnit.uid", label: "ZÚJ (partner)", columnWidth: 10 },
		{ key: "wasteCompany.territorialUnit.name", label: "Název ZÚJ (partner)", columnWidth: 25 },
		{ key: "wasteCompany.type.uid", label: "Kód typu partnera", columnWidth: 10 },
		{ key: "wasteCompany.type.name", label: "Název typu partnera", columnWidth: 20 },
	];

	public generateXlsx(records: RecordModel[]): Buffer {
		const worksheet: WorkSheet = {
			name: "Records",
			data: [this.worksheetKeys.map(key => key.label), ...records.map(record => this.worksheetKeys.map(key => get(record, key.key)))],
			options: {
				"!cols": this.worksheetKeys.map(key => ({ wch: key.columnWidth })),
			},
		};

		return xlsx.build([worksheet]);
	}
}
