import { WasteCompanyTypeEnum } from "@export/waste-company-type.enum";
import { MedicalCompanyModel } from "@models/medicalCompany.model";
import { RecordModel } from "@models/record.model";
import { WasteCompanyModel } from "@models/wasteCompany.model";
import { Injectable } from "@nestjs/common";
import * as xmlBuilder from "xmlbuilder2";
import { XmlObject, XmlObjectSubject, XmlObjectSubjectWithUid, XmlObjectWaste } from "./xml-builder.service.types";

@Injectable()
export class XmlBuilderService {
	public generateXml(records: RecordModel[], userEmail: string): string {
		return xmlBuilder.create().ele(this.createXmlObject(records, userEmail)).end({ prettyPrint: true });
	}

	private createXmlObject(records: RecordModel[], userEmail: string): XmlObject {
		const date = new Date();

		const medicalCompanies = records
			.map(record => record.template.medicalCompany)
			.filter((medicalCompany, index, self) => index === self.findIndex(t => t.id === medicalCompany.id))
			.map(medicalCompany => this.createXmlObjectSubjectFromMedicalCompany(medicalCompany));

		const wasteCompanies = records
			.filter(record => record.wasteCompany)
			.map(record => record.wasteCompany)
			.filter((wasteCompany, index, self) => index === self.findIndex(t => t.companyId === wasteCompany.companyId && t.uid === wasteCompany.uid))
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
						Subjekt: [...medicalCompanies, ...wasteCompanies],
					},
					Odpady: {
						Odpad: records.map(record => this.createXmlObjectWasteFromRecord(record)),
					},
				},
			},
		};
	}

	private createXmlObjectSubjectFromMedicalCompany(company: MedicalCompanyModel | WasteCompanyModel, isWasteCompany = false): XmlObjectSubjectWithUid {
		return {
			"@Id": `${isWasteCompany ? "WC" : "MC"}_` + company.uid + "_" + company.companyId,
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
						PSC: company.address.zipcode?.uid,
						ZUJ: company.territorialUnit.uid,
					},
					AdresaProvoz: {
						Ulice: company.address.street,
						CisloPopisne: company.address.registryNumber,
						CisloEvidencni: company.address.buildingNumber,
						Obec: company.address.city,
						PSC: company.address.zipcode?.uid,
						ZUJ: company.territorialUnit.uid,
					},
				},
			},
		};
	}

	private createXmlObjectSubjectFromWasteCompany(wasteCompany: WasteCompanyModel): XmlObjectSubject {
		if (wasteCompany.type.uid === WasteCompanyTypeEnum.CITIZENS_OF_MUNICIPALITY) {
			return {
				"@Id": wasteCompany.uid ? "WC_" + wasteCompany.uid + "_" + wasteCompany.companyId : `WC_${wasteCompany.templateId}${wasteCompany.id}`,
				SubjektTypCZOO: {
					Adresy: {
						AdresaSidlo: {
							SidloAdresaZUJ: wasteCompany.territorialUnit.uid,
						},
					},
				},
			};
		}

		const companyXML = this.createXmlObjectSubjectFromMedicalCompany(wasteCompany, true);

		if (wasteCompany.type.uid === WasteCompanyTypeEnum.COMPANY) {
			return companyXML;
		}

		return {
			"@Id": companyXML["@Id"],
			SubjektTypCZObec: {
				...companyXML.SubjektTypCZPO,
			},
		};
	}

	private createXmlObjectWasteFromRecord(record: RecordModel): XmlObjectWaste {
		return {
			"@Id": record.id.toString(),
			IdSubjektEvident: "MC_" + record.template.medicalCompany.uid + "_" + record.template.medicalCompany.companyId,
			Datum: record.date.toISOString().split("T")[0],
			Mnozstvi: record.amount,
			KatalogKod: record.waste.uid,
			Kategorie: record.waste.category.includes("/") ? record.waste.category.split("/")[1] : record.waste.category,
			KodNakladaniKod: record.loadingCode.uid,
			IdSubjektPartner: record.wasteCompany ? (record.wasteCompany.uid ? "WC_" + record.wasteCompany.uid + "_" + record.wasteCompany.companyId : `WC_${record.wasteCompany.templateId}${record.wasteCompany.id}`) : undefined,
			Vydaje: record.expense,
		};
	}
}
