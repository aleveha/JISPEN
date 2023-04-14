import { LoadingCode } from "@api/templates/types";
import { CheckboxList } from "@shared/components/checkbox-list/checkbox-list";
import { HeadCell } from "@shared/utils/comparator/types";
import { NewTemplateFormValues } from "@zones/templates/forms/types";
import React, { FC, useCallback } from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface WasteSectionTableProps extends UseControllerProps<NewTemplateFormValues> {
	loadingCodes: LoadingCode[];
}

const HEADER_CELLS: HeadCell<LoadingCode>[] = [
	{ id: "name", label: "Název kódu nakládání" },
	{ id: "uid", label: "Kód" },
];

export const LoadingCodesSectionTable: FC<WasteSectionTableProps> = ({ control, name, loadingCodes }) => {
	const {
		field,
		fieldState: { error },
	} = useController({ control, name, rules: { required: true } });

	const handleValueChanged = useCallback(
		(value: LoadingCode[]) => {
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
			rows={loadingCodes}
			title="Kódy nakládání"
			value={field.value as LoadingCode[]}
		/>
	);
};
