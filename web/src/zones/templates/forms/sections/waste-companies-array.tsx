import { TerritorialUnit, WasteCompanyType, Zipcode } from "@api/templates/types";
import { Icons } from "@icons/icons.config";
import { IconButton } from "@mui/material";
import { Button } from "@shared/components/button/button";
import { Autocomplete } from "@shared/components/inputs/autocomplete";
import { Input } from "@shared/components/inputs/text-input";
import { Validator } from "@shared/utils/validator/validator";
import { newTemplateFormDefaultValues, NewTemplateFormValues } from "@zones/templates/forms/types";
import React, { FC, useCallback, useEffect } from "react";
import { FieldArrayWithId, useFieldArray, UseFieldArrayProps, useWatch } from "react-hook-form";
import { toast } from "react-hot-toast";

interface WasteCompanyFormProps extends Omit<Props, "name" | "requireWasteCompany" | "wasteCompanyDefaultValue"> {
	field: FieldArrayWithId<NewTemplateFormValues["wasteCompanies"][number]>;
	handleRemoveButton: (index: number) => () => void;
	index: number;
	showDeleteButton?: boolean;
}

const WasteCompanyForm: FC<WasteCompanyFormProps> = ({
	control,
	field,
	handleRemoveButton,
	index,
	showDeleteButton,
	territorialUnits,
	wasteCompanyTypes,
	zipcodes,
}) => {
	const type = useWatch({
		name: `wasteCompanies.${index}.type`,
		control,
	});

	const isRequired = type ? parseInt(type.uid) !== 3 : false;

	return (
		<div
			className="relative grid grid-cols-1 gap-x-6 gap-y-2 rounded-lg px-6 py-8 shadow ring-1 ring-black ring-opacity-5 md:grid-cols-2 lg:grid-cols-3"
			key={field.id}
		>
			{showDeleteButton && (
				<IconButton className="absolute top-0 right-0 hover:text-red" onClick={handleRemoveButton(index)}>
					{Icons.cross}
				</IconButton>
			)}
			<Autocomplete
				autocompleteProps={{
					getOptionLabel: (option: TerritorialUnit) => (option.uid === 0 ? "" : `${option.uid} \u2013 ${option.name}`),
					noOptionsText: "Žádný typ nebyl nalezen",
				}}
				control={control}
				label="Typ"
				name={`wasteCompanies.${index}.type`}
				options={wasteCompanyTypes ?? []}
				required
			/>
			<Input
				className="row-start-2"
				control={control}
				disabled={!isRequired}
				label="Název oprávněné osoby"
				name={`wasteCompanies.${index}.name`}
				required={isRequired}
				rules={{ minLength: { value: 3, message: "Název musí obsahovat alespoň 3 znaky" } }}
			/>
			<Input
				className="row-start-3 md:row-start-2"
				control={control}
				disabled={!isRequired}
				inputMode="numeric"
				label="IČO"
				name={`wasteCompanies.${index}.uid`}
				required={isRequired}
				rules={{
					pattern: { value: Validator.NUMBER_REGEXP, message: "Pouze čislo" },
					validate: value => Validator.onlyPositiveNumber(value as string),
				}}
			/>
			<Input
				className="row-start-4 md:row-start-3 lg:row-start-2"
				control={control}
				disabled={!isRequired}
				label="IČZ/IČS/IČP"
				name={`wasteCompanies.${index}.companyId`}
				required={isRequired}
			/>
			<Input
				className="row-start-5 md:row-start-3"
				control={control}
				disabled={!isRequired}
				label="Město"
				name={`wasteCompanies.${index}.address.city`}
				required={isRequired}
			/>
			<Input
				className="row-start-6 md:row-start-4 lg:row-start-3"
				control={control}
				disabled={!isRequired}
				label="Ulice"
				name={`wasteCompanies.${index}.address.street`}
				required={isRequired}
			/>
			<div className="row-start-7 flex space-x-6 md:row-start-4 lg:row-start-3">
				<Input control={control} disabled={!isRequired} label="Č.P." name={`wasteCompanies.${index}.address.registryNumber`} />
				<Input control={control} disabled={!isRequired} label="Č.0." name={`wasteCompanies.${index}.address.buildingNumber`} />
			</div>
			<Autocomplete
				autocompleteProps={{
					className: "row-start-8 md:row-start-5 lg:row-span-4",
					getOptionLabel: (option: TerritorialUnit) => (option.uid === 0 ? "" : `${option.uid} \u2013 ${option.name}`),
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
					className: "md:row-start-5 lg:row-span-4",
					disabled: !isRequired,
					getOptionLabel: (option: Zipcode) => (option.uid === 0 ? "" : `${option.uid} \u2013 ${option.name}`),
					noOptionsText: "Žádný PSČ nebyl nalezen",
				}}
				control={control}
				label="PSČ"
				name={`wasteCompanies.${index}.address.zipcode`}
				options={zipcodes ?? []}
				required={isRequired}
			/>
		</div>
	);
};

interface Props extends UseFieldArrayProps<NewTemplateFormValues> {
	requireWasteCompany: boolean;
	territorialUnits: TerritorialUnit[];
	wasteCompanyDefaultValue: typeof newTemplateFormDefaultValues["wasteCompanies"][0];
	wasteCompanyTypes: WasteCompanyType[];
	zipcodes: Zipcode[];
}

export const WasteCompaniesArray: FC<Props> = ({
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
				<WasteCompanyForm
					control={control}
					field={field}
					handleRemoveButton={handleRemoveButton}
					index={index}
					key={field.id}
					showDeleteButton={fields.length > 1}
					territorialUnits={territorialUnits}
					wasteCompanyTypes={wasteCompanyTypes}
					zipcodes={zipcodes}
				/>
			))}
			<div className="flex w-full items-center justify-center">
				<Button onClick={handleAddButton} variant="white">
					Přidat oprávněnou osobu
				</Button>
			</div>
		</div>
	);
};
