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
	className,
	control,
	disabled,
	fullWidth,
	inputMode,
	label,
	name,
	requireMessage,
	required,
	rules,
	type,
}: TextInputProps<FormData>) => {
	const {
		field: { onChange, value, ref },
		fieldState: { error },
	} = useController<FormData>({
		control,
		name,
		rules: {
			pattern: getPatterns(type),
			required: required ? requireMessage ?? "Povinný údaj" : undefined,
			validate: v => (Validator.isOnlySpaces(v) ? "Vyplňte platnou hodnotu" : undefined),
			...rules,
		},
	});

	return (
		<TextField
			className={className}
			disabled={disabled}
			error={!!error}
			fullWidth={fullWidth}
			helperText={error?.message ?? " "}
			inputMode={inputMode}
			inputRef={ref}
			label={label}
			name={name}
			onChange={onChange}
			type={type}
			value={value}
			variant="outlined"
		/>
	);
};
