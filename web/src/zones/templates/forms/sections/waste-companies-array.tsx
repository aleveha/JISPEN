import { TerritorialUnit, WasteCompanyType, Zipcode } from "@api/templates/types";
import ClearIcon from "@mui/icons-material/Clear";
import { IconButton } from "@mui/material";
import { Button } from "@shared/components/button/button";
import { Autocomplete } from "@shared/components/inputs/autocomplete";
import { Input } from "@shared/components/inputs/text-input";
import { newTemplateFormDefaultValues, NewTemplateFormValues } from "@zones/templates/forms/types";
import React, { FC, useCallback, useEffect } from "react";
import { useFieldArray, UseFieldArrayProps } from "react-hook-form";
import { toast } from "react-hot-toast";

export interface WasteCompaniesArrayProps extends UseFieldArrayProps<NewTemplateFormValues> {
	requireWasteCompany: boolean;
	territorialUnits: TerritorialUnit[];
	wasteCompanyDefaultValue: typeof newTemplateFormDefaultValues["wasteCompanies"][0];
	wasteCompanyTypes: WasteCompanyType[];
	zipcodes: Zipcode[];
}

export const WasteCompaniesArray: FC<WasteCompaniesArrayProps> = ({
	control,
	name,
	requireWasteCompany,
	territorialUnits,
	wasteCompanyDefaultValue,
	wasteCompanyTypes,
	zipcodes,
}) => {
	const { fields, append, remove } = useFieldArray({ control, name });

	const handleAddButton = useCallback(() => append(wasteCompanyDefaultValue), [append, wasteCompanyDefaultValue]);

	const handleRemoveButton = useCallback(
		(index: number) => () => {
			if (fields.length > 1) {
				remove(index);
				return;
			}
			toast.error("Je potřeba mít alespoň jednu oprávněnu osobu");
		},
		[fields, remove]
	);

	useEffect(() => {
		if (requireWasteCompany) {
			append(wasteCompanyDefaultValue);
		} else {
			remove();
		}
	}, [append, remove, requireWasteCompany, wasteCompanyDefaultValue]);

	return (
		<div className="flex flex-col gap-8 pt-6">
			{fields.map((field, index) => (
				<div
					className="relative grid grid-cols-1 gap-x-6 gap-y-2 rounded-lg px-6 py-8 shadow ring-1 ring-black ring-opacity-5 md:grid-cols-2 lg:grid-cols-3"
					key={field.id}
				>
					{fields.length > 1 && (
						<IconButton className="absolute top-0 right-0" onClick={handleRemoveButton(index)}>
							<ClearIcon color="error" fontSize="small" />
						</IconButton>
					)}
					<Input
						control={control}
						label="Název oprávněné osoby"
						name={`wasteCompanies.${index}.name`}
						required
						rules={{ minLength: { value: 3, message: "Název musí obsahovat alespoň 3 znaky" } }}
					/>
					<Input control={control} label="IČO" name={`wasteCompanies.${index}.uid`} required type="number" />
					<Input control={control} label="IČZ/IČS/IČP" name={`wasteCompanies.${index}.companyId`} required />
					<Autocomplete
						autocompleteProps={{
							getOptionLabel: (option: TerritorialUnit) =>
								option.uid === 0 ? "" : option.uid.toString(),
							noOptionsText: "Žádný ZÚJ nebyl nalezen",
						}}
						control={control}
						label="ZÚJ"
						name={`wasteCompanies.${index}.territorialUnit`}
						options={territorialUnits ?? []}
						required
					/>
					<Autocomplete
						autocompleteProps={{
							getOptionLabel: (option: TerritorialUnit) =>
								option.uid === 0 ? "" : `${option.uid} \u2013 ${option.name}`,
							noOptionsText: "Žádný typ nebyl nalezen",
						}}
						control={control}
						label="Typ"
						name={`wasteCompanies.${index}.type`}
						options={wasteCompanyTypes ?? []}
						required
					/>
					<Input control={control} label="Ulice" name={`wasteCompanies.${index}.address.street`} required />
					<Input
						control={control}
						label="Č.P."
						name={`wasteCompanies.${index}.address.registryNumber`}
						required
					/>
					<Input control={control} label="Č.0." name={`wasteCompanies.${index}.address.buildingNumber`} />
					<Input control={control} label="Město" name={`wasteCompanies.${index}.address.city`} required />
					<Autocomplete
						autocompleteProps={{
							getOptionLabel: (option: Zipcode) =>
								option.uid === 0 ? "" : `${option.uid} \u2013 ${option.name}`,
							noOptionsText: "Žádný PSČ nebyl nalezen",
						}}
						control={control}
						label="PSČ"
						name={`wasteCompanies.${index}.address.zipcode`}
						options={zipcodes ?? []}
						required
					/>
				</div>
			))}
			<div className="flex w-full items-center justify-center">
				<Button onClick={handleAddButton} variant="white">
					Přidat oprávněnou osobu
				</Button>
			</div>
		</div>
	);
};
