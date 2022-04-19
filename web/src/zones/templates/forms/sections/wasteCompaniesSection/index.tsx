import React, { FC } from "react";
import { FieldArray } from "formik";
import { NewTemplateFormSection } from "@zones/templates/forms/newTemplateFormSection";
import { WasteCompaniesArray } from "@zones/templates/forms/sections/wasteCompaniesSection/wasteCompaniesArray";
import { AddressCatalogue } from "../../types";

export const WasteCompaniesSection: FC<AddressCatalogue> = ({ territorialUnits, zipcodes }) => {
	return (
		<NewTemplateFormSection
			description="Zadejte, prosím, všechny opravněné osoby, které&nbsp;mohou z&nbsp;provozovny převzít odpad, nebo jej na&nbsp;provozovnu předat"
			title="Oprávněné osoby (partner)"
		>
			<FieldArray name="wasteCompanies">
				{arrayHelper => (
					<WasteCompaniesArray
						arrayHelper={arrayHelper}
						territorialUnits={territorialUnits}
						zipcodes={zipcodes}
					/>
				)}
			</FieldArray>
		</NewTemplateFormSection>
	);
};
