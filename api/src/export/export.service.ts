import { Injectable, NotFoundException } from "@nestjs/common";
import * as fs from "fs";
import * as path from "path";
import * as xmlBuilder from "xmlbuilder2";
import { MedicalCompanyModel } from "../models/medicalCompany.model";
import { RecordModel } from "../models/record.model";
import { WasteCompanyModel } from "../models/wasteCompany.model";
import { RecordsService } from "../records/records.service";
import { XmlInPeriodDto } from "./dto/xmlInPeriodDto";
import { XmlObject, XmlObjectSubject, XmlObjectSubjectWithUid, XmlObjectWaste } from "./export.service.types";
import { WasteCompanyTypeEnum } from "./waste-company-type.enum";

@Injectable()
export class ExportService {
	private readonly dirName: string = "files";

	constructor(private readonly recordsService: RecordsService) {}

	public async generateXMLInPeriod({ medicalCompanyId, dateFrom, dateTo }: XmlInPeriodDto, userEmail: string): Promise<string> {
		const records = await this.recordsService.getRecordsByMedicalCompanyIdInPeriod(medicalCompanyId, userEmail, dateFrom, dateTo);
		if (records.length === 0) {
			throw new NotFoundException("No records found");
		}

		const xmlString = xmlBuilder.create().ele(this.createXmlObject(records, userEmail)).end({ prettyPrint: true });
		const date = new Date();
		const fileName = [date.toISOString(), records[0].template.medicalCompany.companyId].join("_") + ".xml";

		if (!fs.existsSync(this.dirName)) {
			fs.mkdirSync(this.dirName);
		} else {
			for (const file of fs.readdirSync(this.dirName)) {
				fs.unlinkSync(path.join(this.dirName, file));
			}
		}

		fs.writeFileSync(`${this.dirName}/${fileName}`, xmlString, { encoding: "utf8" });

		return `${this.dirName}/${fileName}`;
	}

	private createXmlObject(records: RecordModel[], userEmail: string): XmlObject {
		const date = new Date();
		const medicalCompany: XmlObjectSubjectWithUid = this.createXmlObjectSubjectFromMedicalCompany(records[0].template.medicalCompany);
		const wasteCompanies = records
			.filter(record => record.wasteCompany)
			.map(record => record.wasteCompany)
			.filter((wasteCompany, index, self) => index === self.findIndex(t => t.id === wasteCompany.id))
			.map(wasteCompany => this.createXmlObjectSubjectFromWasteCompany(wasteCompany));

		return {
			IniTransfer: {
				"@xmlns": "ISEnvita/Import",
				"@Version": "1.0.0.0",
				Header: {
					Version: "1.0.0.7",
					NazevZdroje: "JISPEN",
					IdentifikatorExportu: date.toLocaleDateString("ru") + " " + date.toLocaleTimeString("ru"),
					Sign: userEmail,
				},
				DataCZ: {
					Subjekty: {
						Subjekt: [medicalCompany, ...wasteCompanies],
					},
					Odpady: {
						Odpad: records.map(record => this.createXmlObjectWasteFromRecord(record)),
					},
				},
			},
		};
	}

	private createXmlObjectSubjectFromMedicalCompany(company: MedicalCompanyModel | WasteCompanyModel): XmlObjectSubjectWithUid {
		return {
			"@Id": company.uid.toString(),
			SubjektTypCZPO: {
				Identifikator: company.uid,
				SubjektNazev: company.name,
				ProvozovnaKod: company.companyId,
				ProvozovnaNazev: company.name,
				VykazovaciKod: company.companyId,
				CinnostNaUzemi: false,
				Adresy: {
					AdresaSidlo: {
						Ulice: company.address.street,
						CisloPopisne: company.address.registryNumber,
						CisloEvidencni: company.address.buildingNumber,
						Obec: company.address.city,
						PSC: company.address.zipcode.uid,
						ZUJ: company.territorialUnit.uid,
					},
					AdresaProvoz: {
						Ulice: company.address.street,
						CisloPopisne: company.address.registryNumber,
						CisloEvidencni: company.address.buildingNumber,
						Obec: company.address.city,
						PSC: company.address.zipcode.uid,
						ZUJ: company.territorialUnit.uid,
					},
				},
			},
		};
	}

	private createXmlObjectSubjectFromWasteCompany(wasteCompany: WasteCompanyModel): XmlObjectSubject {
		if (wasteCompany.type.uid === WasteCompanyTypeEnum.COMPANY) {
			return this.createXmlObjectSubjectFromMedicalCompany(wasteCompany);
		}

		if (wasteCompany.type.uid === WasteCompanyTypeEnum.CITIZENS_OF_MUNICIPALITY) {
			return {
				"@Id": wasteCompany.uid ? wasteCompany.uid.toString() : `${wasteCompany.templateId}${wasteCompany.id}`,
				SubjektTypCZOO: {
					Adresy: {
						AdresaSidlo: {
							SidloAdresaZUJ: wasteCompany.territorialUnit.uid,
						},
					},
				},
			};
		}

		return {
			"@Id": wasteCompany.uid.toString(),
			SubjektTypCZObec: {
				Identifikator: wasteCompany.uid,
				SubjektNazev: wasteCompany.name,
				ProvozovnaKod: wasteCompany.companyId,
				ProvozovnaNazev: wasteCompany.name,
				VykazovaciKod: wasteCompany.companyId,
				CinnostNaUzemi: false,
				Adresy: {
					AdresaSidlo: {
						ZUJ: wasteCompany.territorialUnit.uid,
					},
					AdresaProvoz: {
						ZUJ: wasteCompany.territorialUnit.uid,
					},
				},
			},
		};
	}

	private createXmlObjectWasteFromRecord(record: RecordModel): XmlObjectWaste {
		return {
			"@Id": record.id.toString(),
			IdSubjektEvident: record.template.medicalCompany.uid.toString(),
			Datum: record.date.toISOString().split("T")[0],
			Mnozstvi: record.amount,
			KatalogKod: record.waste.uid,
			Kategorie: record.waste.category.includes("/") ? record.waste.category.split("/")[1] : record.waste.category,
			KodNakladaniKod: record.loadingCode.uid,
			IdSubjektPartner: record.wasteCompany ? (record.wasteCompany.uid ? record.wasteCompany.uid.toString() : `${record.wasteCompany.templateId}${record.wasteCompany.id}`) : undefined,
		};
	}
}
