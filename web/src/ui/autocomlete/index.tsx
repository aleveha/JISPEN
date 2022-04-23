import React, { useCallback, useMemo, useState } from "react";
import clsx from "clsx";
import { FieldHookConfig, useField } from "formik";
import { Combobox } from "@headlessui/react";
import { AutocompleteOption, AutocompleteProps } from "@ui/autocomlete/types";

export const Autocomplete = <T extends AutocompleteOption>({
	data,
	disabled,
	displayValueKey,
	errorMessage,
	filterBy,
	selectDisplayValueKey,
	...props
}: FieldHookConfig<T> & AutocompleteProps<T>) => {
	//prettier-ignore
	const [field, { error, touched }, { setValue }] = useField<T>(props);
	const isError = touched && !!error;

	const [query, setQuery] = useState("");

	const onValueChange = useCallback(async (value: T) => {
		await setValue(value);
	}, []);

	// prettier-ignore
	const filteredData =
		query === ""
			? data
			: data.filter(item => String(item[filterBy]).toLowerCase().includes(query.toLowerCase()));

	const selectedOption = useMemo(
		() => data.find(option => (field.value ? option.id === field.value.id : null)),
		[data, field.value]
	);

	return (
		<Combobox value={selectedOption} onChange={onValueChange} disabled={disabled}>
			<div className="relative max-w-md">
				<Combobox.Input
					autoComplete={props.autoComplete}
					className={clsx(
						"p-4 rounded-lg w-full tracking-wider border border-grey outline-none",
						isError && "outline outline-red border-transparent"
					)}
					displayValue={(item: T | null) => (item ? String(item[displayValueKey]) : "")}
					type={props.type ?? "text"}
					onChange={event => setQuery(event.target.value)}
					name={field.name}
					onBlur={field.onBlur}
					placeholder={props.placeholder}
				/>
				{isError && (
					<div className="absolute my-2 text-base text-red">
						{typeof error === "string" ? error : String(Object.values(error)[0])}
					</div>
				)}
				<Combobox.Options className="absolute z-50 w-full py-1 mt-1 overflow-auto text-base bg-white rounded-lg border border-grey max-h-72 focus:outline-none">
					{filteredData.length === 0 && query !== "" ? (
						<p className="cursor-default select-none relative py-2 px-4 text-gray-700">{errorMessage}</p>
					) : (
						filteredData.map((item, index) => (
							<Combobox.Option
								key={index}
								className={({ selected, active }) =>
									clsx(
										"cursor-pointer select-none relative px-4 py-1",
										active && !selected && "text-white bg-secondary",
										selected && "text-white bg-primary"
									)
								}
								value={item}
							>
								{({ selected }) => (
									<span className={clsx("block truncate", selected ? "font-medium" : "font-normal")}>
										{selectDisplayValueKey.map(key => item[key]).join(" — ")}
									</span>
								)}
							</Combobox.Option>
						))
					)}
				</Combobox.Options>
			</div>
		</Combobox>
	);
};
