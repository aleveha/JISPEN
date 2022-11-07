import { Checkbox } from "@mui/material";
import React from "react";
import { useController, UseControllerProps } from "react-hook-form";

type CheckboxInputProps<FormData extends Record<string, any>> = UseControllerProps<FormData> & {
	disabled?: boolean;
	required?: boolean;
};

export const CheckboxInput = <FormData extends Record<string, any>>({ control, disabled, name, required }: CheckboxInputProps<FormData>) => {
	const {
		field: { value, onChange },
	} = useController<FormData>({ control, name, rules: { required: required ? "Povinný údaj" : undefined } });

	return <Checkbox checked={value} disabled={disabled} onChange={onChange} required={required} />;
};
