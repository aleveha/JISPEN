import { Autocomplete as MuiAutocomplete, AutocompleteProps, TextField, TextFieldProps } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { useEffect } from "react";
import { Control, Path, useController } from "react-hook-form";
import { FieldValues } from "react-hook-form/dist/types/fields";

export type AutocompleteElementProps<
	F extends FieldValues,
	T,
	M extends boolean | undefined,
	D extends boolean | undefined
> = {
	autocompleteProps?: Omit<AutocompleteProps<T, M, D, any>, "name" | "options" | "loading" | "renderInput">;
	control?: Control<F>;
	label?: TextFieldProps["label"];
	loading?: boolean;
	multiple?: M;
	name: Path<F>;
	options: T[];
	required?: boolean;
	requiredMessage?: string;
	textFieldProps?: Omit<TextFieldProps, "name" | "required" | "label">;
};

type AutoDefault = {
	id: string | number;
	label: string;
};

export const Autocomplete = <FormData extends FieldValues>({
	autocompleteProps,
	control,
	label,
	loading,
	multiple,
	name,
	options,
	required,
	requiredMessage,
	textFieldProps,
}: AutocompleteElementProps<FormData, AutoDefault | string | any, boolean | undefined, boolean | undefined>) => {
	const {
		field,
		fieldState: { error },
	} = useController<FormData>({
		control,
		name,
		rules: { required: required ? requiredMessage ?? "Povinný údaj" : undefined },
	});

	useEffect(() => {
		if (options.length === 1 && field.value === null && required) {
			field.onChange(options[0]);
		}
	}, [field, options, required]);

	return (
		<MuiAutocomplete
			{...autocompleteProps}
			{...field}
			getOptionLabel={
				autocompleteProps?.getOptionLabel
					? autocompleteProps.getOptionLabel
					: option => `${option?.label || option}`
			}
			isOptionEqualToValue={
				autocompleteProps?.isOptionEqualToValue
					? autocompleteProps.isOptionEqualToValue
					: (option, value) => (value ? option.id === value.id : false)
			}
			loading={loading}
			multiple={multiple}
			onChange={(_, value) => field.onChange(value)}
			options={options}
			renderInput={params => (
				<TextField
					{...textFieldProps}
					{...params}
					name={name}
					required={required}
					label={label}
					error={!!error}
					InputProps={{
						...params.InputProps,
						endAdornment: (
							<>
								{loading ? <CircularProgress color="inherit" size={20} /> : null}
								{params.InputProps.endAdornment}
							</>
						),
					}}
					helperText={error?.message ?? " "}
					variant="outlined"
				/>
			)}
		/>
	);
};
