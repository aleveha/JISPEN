import React, { FC, useCallback } from "react";
import clsx from "clsx";
import { Field, FieldArrayRenderProps } from "formik";
import { LoadingCode } from "@api/templates/types";
import { Checkbox } from "@ui/checkbox";
import { TableBody, TableBodyCell, TableBodyRow } from "@zones/shared/components/table";
import { LoadingCodesSectionProps } from "./types";

export const LoadingCodesSectionTableBody: FC<FieldArrayRenderProps & LoadingCodesSectionProps> = ({
	form: { errors, setFieldValue, touched, validateForm, values },
	loadingCodes,
}) => {
	const isError = !!errors.loadingCodes && !!touched.loadingCodes;

	const handleChange = useCallback(
		(index: number, loadingCode: LoadingCode) => async () => {
			await setFieldValue(`loadingCodes[${index}]`, !values.loadingCodes[index] ? loadingCode : undefined);
			await validateForm();
		},
		[values, setFieldValue]
	);

	return (
		<TableBody>
			{loadingCodes.map((loadingCode, index) => (
				<TableBodyRow key={loadingCode.id} index={loadingCode.id}>
					<TableBodyCell className="w-16">
						<Field
							name={`loadingCodes[${index}]`}
							type="checkbox"
							component={Checkbox}
							onChange={handleChange(index, loadingCode)}
							className={clsx(isError && "border-2 border-red")}
						/>
					</TableBodyCell>
					<TableBodyCell className="w-24">{loadingCode.uid}</TableBodyCell>
					<TableBodyCell className="max-w-lg overflow-hidden overflow-ellipsis">
						{loadingCode.name}
					</TableBodyCell>
				</TableBodyRow>
			))}
		</TableBody>
	);
};
