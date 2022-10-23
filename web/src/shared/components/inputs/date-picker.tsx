import { TextField } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import csLocale from "dayjs/locale/cs";
import React, { useCallback } from "react";
import { useController, UseControllerProps } from "react-hook-form";
import { isValidDate } from "rxjs/internal/util/isDate";

type DatePickerInputProps<FormData extends Record<string, any>> = UseControllerProps<FormData> & {
	disabled?: boolean;
	label?: string;
	required?: boolean;
};

export const DatePickerInput = <FormData extends Record<string, any>>({
	control,
	disabled,
	label,
	name,
	required,
}: DatePickerInputProps<FormData>) => {
	const {
		field: { value, onChange },
		fieldState: { error },
	} = useController<FormData>({
		control,
		name,
		rules: { required: required ? "Povinný údaj" : undefined, validate: v => (isValidDate(v) ? undefined : "Vyplňte platnou hodnotu") },
	});

	const handleChange = useCallback((value: Dayjs | null) => onChange(value?.toDate()), [onChange]);

	return (
		<LocalizationProvider adapterLocale={csLocale} dateAdapter={AdapterDayjs}>
			<DatePicker
				disabled={disabled}
				inputFormat="DD.MM.YYYY"
				label={label}
				onChange={handleChange}
				renderInput={params => (
					<TextField helperText={error?.message ?? " "} inputProps={{ placeholder: "dd.mm.rrrr" }} {...params} error={!!error} />
				)}
				value={value}
			/>
		</LocalizationProvider>
	);
};
