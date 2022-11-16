import { Waste } from "@api/templates/types";
import { CheckboxList } from "@shared/components/checkbox-list/checkbox-list";
import { HeadCell } from "@shared/utils/comparator/types";
import { NewTemplateFormValues } from "@zones/templates/forms/types";
import React, { FC, useCallback } from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface WasteSectionTableProps extends UseControllerProps<NewTemplateFormValues> {
	wastes: Waste[];
}

const HEADER_CELLS: HeadCell<Waste>[] = [
	{ id: "uid", label: "Odpad", sortAs: "string" },
	{ id: "name", label: "Název odpadu", width: 400 },
	{ id: "category", label: "Druh" },
];

export const WasteSectionTable: FC<WasteSectionTableProps> = ({ control, name, wastes }) => {
	const {
		field,
		fieldState: { error },
	} = useController({ control, name, rules: { required: true } });

	const handleValueChanged = useCallback(
		(value: Waste[]) => {
			field.onChange(value);
		},
		[field]
	);

	return (
		<CheckboxList
			headCells={HEADER_CELLS}
			isError={!!error}
			onSelectedValueChanged={handleValueChanged}
			orderedBy="uid"
			rows={wastes}
			title="Povolené odpady"
		/>
	);
};
