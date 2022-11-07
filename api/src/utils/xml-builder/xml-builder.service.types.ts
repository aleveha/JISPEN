export interface XmlObjectSubjectWithUid {
	"@Id": string;
	SubjektTypCZPO: {
		Identifikator: number;
		SubjektNazev: string;
		ProvozovnaKod: string;
		ProvozovnaNazev: string;
		VykazovaciKod: string;
		CinnostNaUzemi: boolean;
		Adresy: {
			AdresaSidlo: {
				Ulice: string;
				CisloPopisne: string;
				CisloEvidencni: string;
				Obec: string;
				PSC: number;
				ZUJ: number;
			};
			AdresaProvoz: {
				Ulice: string;
				CisloPopisne: string;
				CisloEvidencni: string;
				Obec: string;
				PSC: number;
				ZUJ: number;
			};
			Telefon?: {
				Predvolba: string;
				Cislo: string;
			};
			Email?: string;
		};
	};
}

export interface XmlObjectSubjectMunicipality {
	"@Id": string;
	SubjektTypCZObec: {
		Identifikator: number;
		SubjektNazev: string;
		ProvozovnaKod: string;
		ProvozovnaNazev: string;
		VykazovaciKod: string;
		CinnostNaUzemi: boolean;
		Adresy: {
			AdresaSidlo: {
				ZUJ: number;
			};
			AdresaProvoz: {
				ZUJ: number;
			};
		};
	};
}

export interface XmlObjectSubjectCitizensOfMunicipality {
	"@Id": string;
	SubjektTypCZOO: {
		Adresy: {
			AdresaSidlo: {
				SidloAdresaZUJ: number;
			};
		};
	};
}

export type XmlObjectSubject = XmlObjectSubjectWithUid | XmlObjectSubjectMunicipality | XmlObjectSubjectCitizensOfMunicipality;

export interface XmlObjectWaste {
	"@Id": string;
	IdSubjektEvident: string;
	Datum: string;
	Mnozstvi: number;
	KatalogKod: number;
	Kategorie: string;
	KodNakladaniKod: string;
	IdSubjektPartner?: string;
}

export interface XmlObject {
	IniTransfer: {
		"@xmlns": string;
		"@Version": string;
		Header: {
			Version: string;
			NazevZdroje: string;
			IdentifikatorExportu: string;
			Sign: string;
		};
		DataCZ: {
			Subjekty: { Subjekt: XmlObjectSubject[] };
			Odpady: { Odpad: XmlObjectWaste[] };
		};
	};
}
