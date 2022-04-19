import React, { FC, useCallback } from "react";
import clsx from "clsx";
import { Field, FieldArrayRenderProps } from "formik";
import { Waste } from "@api/templates/types";
import { Checkbox } from "@ui/checkbox";
import { TableBody, TableBodyCell, TableBodyRow } from "@zones/shared/components/table";
import { WasteSectionProps } from "./types";

export const WasteSectionTableBody: FC<FieldArrayRenderProps & WasteSectionProps> = ({
	form: { errors, setFieldValue, touched, validateForm, values },
	wastes,
}) => {
	const isError = !!errors.wastes && !!touched.wastes;

	const handleChange = useCallback(
		(index: number, waste: Waste) => async () => {
			await setFieldValue(`wastes[${index}]`, !values.wastes[index] ? waste : undefined);
			await validateForm();
		},
		[values, setFieldValue]
	);

	return (
		<TableBody>
			{wastes.map((waste, index) => (
				<TableBodyRow key={waste.id} index={waste.id}>
					<TableBodyCell className="w-16">
						<Field
							name={`wastes[${index}]`}
							type="checkbox"
							component={Checkbox}
							onChange={handleChange(index, waste)}
							className={clsx(isError && "border-2 border-red")}
						/>
					</TableBodyCell>
					<TableBodyCell className="w-24">{waste.uid}</TableBodyCell>
					<TableBodyCell className="w-20">{waste.category}</TableBodyCell>
					<TableBodyCell className="max-w-lg overflow-hidden overflow-ellipsis">{waste.name}</TableBodyCell>
					<TableBodyCell>{waste.certificate}</TableBodyCell>
				</TableBodyRow>
			))}
		</TableBody>
	);
};
