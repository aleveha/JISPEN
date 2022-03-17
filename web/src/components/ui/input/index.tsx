import React, { FC } from "react";
import { FieldProps } from "formik";

interface InputProps {
	type?: string;
	styles?: string;
}

export const Input: FC<FieldProps & InputProps> = props => {
	//prettier-ignore
	const { field, form: { errors, touched }, type, styles, ...rest } = props;
	const isError = touched[field.name] && errors[field.name];
	return (
		<div className="w-full">
			<input
				type={type ?? "test"}
				className={
					"p-4 rounded-lg max-w-lg w-full tracking-wider" +
					` ${isError ? "outline outline-yellow" : "mb-9"} ${styles}`
				}
				autoComplete="off"
				{...field}
				{...rest}
			/>
			{isError && <p className="mt-1 mb-2 text-base text-yellow">{errors[field.name]}</p>}
		</div>
	);
};
