import React, { FC, useCallback } from "react";
import { Field } from "formik";
import { TerritorialUnit, WasteCompany, Zipcode } from "@api/templates/types";
import { Input } from "@ui/input";
import { Button } from "@ui/button";
import { ButtonType } from "@ui/button/types";
import { ExitIcon } from "@zones/shared/icons/exitIcon";
import { IconVariants } from "@zones/shared/icons/types";
import { WasteCompaniesArrayProps } from "@zones/templates/forms/sections/wasteCompaniesSection/types";
import { Autocomplete } from "@ui/autocomlete";

export const WasteCompaniesArray: FC<WasteCompaniesArrayProps> = ({ arrayHelper, territorialUnits, zipcodes }) => {
	// prettier-ignore
	const { form: { values } } = arrayHelper;

	const handleAddButton = useCallback(
		() =>
			arrayHelper.push({
				name: "",
				uid: "",
				companyId: "",
				territorialUnit: {
					id: 0,
					uid: 0,
					name: "",
				},
				address: {
					street: "",
					buildingNumber: "",
					registryNumber: "",
					city: "",
					zipcode: {
						id: 0,
						uid: 0,
						name: "",
					},
				},
				type: "",
			}),
		[arrayHelper, zipcodes, territorialUnits]
	);

	const handleRemoveButton = useCallback((index: number) => () => arrayHelper.remove(index), [arrayHelper]);

	return (
		<div className="pt-6 flex flex-col gap-8">
			{values.wasteCompanies.map((company: WasteCompany, index: number) => (
				<div
					className="relative flex flex-wrap gap-x-6 gap-y-2 shadow ring-1 ring-black ring-opacity-5 rounded-lg pt-8 px-6"
					key={index}
				>
					<ExitIcon
						className="absolute top-2 right-2"
						onClick={handleRemoveButton(index)}
						variant={IconVariants.secondary}
					/>
					<Field
						className="w-1/3"
						component={Input}
						name={`wasteCompanies[${index}].name`}
						placeholder="Název oprávněné osoby"
					/>
					<Field component={Input} name={`wasteCompanies[${index}].uid`} placeholder="IČO" />
					<Field component={Input} name={`wasteCompanies[${index}].companyId`} placeholder="IČZ/IČS/IČP" />
					<Autocomplete<TerritorialUnit>
						data={territorialUnits}
						displayValueKey="uid"
						filterBy="uid"
						errorMessage="Žádný ZÚJ nebyl nalezen"
						selectDisplayValueKey={["uid", "name"]}
						name={`wasteCompanies[${index}].territorialUnit`}
						placeholder="ZÚJ"
						autoComplete="off"
					/>
					<Field
						className="w-32"
						component={Input}
						name={`wasteCompanies[${index}].type`}
						placeholder="Typ"
					/>
					<Field
						className="w-1/3"
						component={Input}
						name={`wasteCompanies[${index}].address.street`}
						placeholder="Ulice"
					/>
					<Field
						className="w-1/12"
						component={Input}
						name={`wasteCompanies[${index}].address.registryNumber`}
						placeholder="Č.P."
					/>
					<Field
						className="w-1/12"
						component={Input}
						name={`wasteCompanies[${index}].address.buildingNumber`}
						placeholder="Č.0."
					/>
					<Field
						className="w-1/4"
						component={Input}
						name={`wasteCompanies[${index}].address.city`}
						placeholder="Město"
					/>
					<Autocomplete<Zipcode>
						data={zipcodes}
						displayValueKey="uid"
						filterBy="uid"
						errorMessage="Žádný PSČ nebyl nalezen"
						selectDisplayValueKey={["uid", "name"]}
						name={`wasteCompanies[${index}].address.zipcode`}
						placeholder="PSČ"
						autoComplete="off"
					/>
				</div>
			))}
			<div className="w-full flex justify-center items-center">
				<Button onClick={handleAddButton} variant={ButtonType.secondary}>
					Přidat oprávněnou osobu
				</Button>
			</div>
		</div>
	);
};
