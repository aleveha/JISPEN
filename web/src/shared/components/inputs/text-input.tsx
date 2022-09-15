import { TextField, TextFieldProps } from "@mui/material";
import { Validator } from "@shared/utils/validator/validator";
import React, { HTMLInputTypeAttribute } from "react";
import { useController, UseControllerProps, ValidationRule } from "react-hook-form";

type TextInputProps<FormData extends Record<string, any>> = UseControllerProps<FormData> &
	TextFieldProps & {
		requireMessage?: string;
	};

function getPatterns(type?: HTMLInputTypeAttribute): ValidationRule<RegExp> | undefined {
	switch (type) {
		case "email":
			return {
				value: Validator.EMAIL_REGEXP,
				message: "Špatný formát e-mailu",
			};
		case "number":
			return {
				value: Validator.NUMBER_REGEXP,
				message: "Pouze čislo",
			};
		case "tel":
			return {
				value: Validator.PHONE_REGEXP,
				message: "Špatný formát (+420...)",
			};
		default:
			return undefined;
	}
}

export const Input = <FormData extends Record<string, any>>({
	control,
	name,
	requireMessage,
	...rest
}: TextInputProps<FormData>) => {
	const {
		field,
		fieldState: { error },
	} = useController<FormData>({
		control,
		name,
		rules: {
			pattern: getPatterns(rest.type),
			required: rest.required ? requireMessage ?? "Povinný údaj" : undefined,
			validate: v => (Validator.isOnlySpaces(v) ? "Vyplňte platnou hodnotu" : undefined),
			...rest.rules,
		},
	});
	return <TextField {...field} {...rest} error={!!error} helperText={error?.message ?? " "} variant="outlined" />;
};
