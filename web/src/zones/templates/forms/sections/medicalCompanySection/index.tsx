import React, { FC } from "react";
import { Field } from "formik";
import { TerritorialUnit, Zipcode } from "@api/templates/types";
import { Autocomplete } from "@ui/autocomlete";
import { Input } from "@ui/input";
import { NewTemplateFormSection } from "@zones/templates/forms/newTemplateFormSection";
import { AddressCatalogue } from "../../types";

export const MedicalCompanySection: FC<AddressCatalogue> = ({ territorialUnits, zipcodes }) => {
	return (
		<NewTemplateFormSection
			description="Zadejte prosím údaje o&nbsp;provozovně, za&nbsp;kterou bude vedena evidence včetně kontaktní osoby"
			title="Provozovna"
		>
			<div className="pt-6 flex flex-wrap gap-x-6 gap-y-2">
				<Field className="w-1/3" component={Input} name="medicalCompany.name" placeholder="Název provozovny" />
				<Field component={Input} name="medicalCompany.uid" placeholder="IČO" />
				<Field component={Input} name="medicalCompany.companyId" placeholder="IČZ/IČS/IČP" />
				<Autocomplete<TerritorialUnit>
					data={territorialUnits}
					displayValueKey="uid"
					filterBy="uid"
					errorMessage="Žádný ZÚJ nebyl nalezen"
					selectDisplayValueKey={["uid", "name"]}
					name="medicalCompany.territorialUnit"
					placeholder="ZÚJ"
					autoComplete="off"
				/>
				<Field className="w-1/3" component={Input} name="medicalCompany.address.street" placeholder="Ulice" />
				<Field
					className="w-1/12"
					component={Input}
					name="medicalCompany.address.registryNumber"
					placeholder="Č.P."
				/>
				<Field
					className="w-1/12"
					component={Input}
					name="medicalCompany.address.buildingNumber"
					placeholder="Č.0."
				/>
				<Field className="w-1/4" component={Input} name="medicalCompany.address.city" placeholder="Město" />
				<Autocomplete<Zipcode>
					data={zipcodes}
					displayValueKey="uid"
					filterBy="uid"
					errorMessage="Žádný PSČ nebyl nalezen"
					selectDisplayValueKey={["uid", "name"]}
					name="medicalCompany.address.zipcode"
					placeholder="PSČ"
					autoComplete="off"
				/>
				<Field
					className="w-1/4"
					component={Input}
					name="medicalCompany.contactPersonName"
					placeholder="Jméno"
				/>
				<Field
					className="w-1/4"
					component={Input}
					name="medicalCompany.contactPersonLastName"
					placeholder="Příjmení"
				/>
				<Field
					className="w-1/4"
					component={Input}
					name="medicalCompany.contactPersonPhone"
					placeholder="Telefon"
				/>
				<Field
					className="w-1/4"
					component={Input}
					name="medicalCompany.contactPersonEmail"
					placeholder="E-mail"
				/>
			</div>
		</NewTemplateFormSection>
	);
};
