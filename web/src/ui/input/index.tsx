import React, { FC, memo } from "react";
import clsx from "clsx";
import { FieldProps, getIn } from "formik";
import { InputProps } from "@ui/input/types";

const InputComponent: FC<InputProps & FieldProps> = props => {
	//prettier-ignore
	const { className, field, form: { touched, errors }, type = "text", ...rest } = props;
	const error = getIn(errors, field.name);
	const isError = getIn(touched, field.name) && !!error;

	return (
		<div className={className}>
			<input
				className={clsx(
					"p-4 rounded-lg max-w-md w-full tracking-wider border border-grey outline-none",
					isError ? "outline outline-red border-transparent mb-1" : "mb-10"
				)}
				type={type}
				{...field}
				{...rest}
			/>
			{isError && <div className="mt-1 mb-2 text-base text-red">{error}</div>}
		</div>
	);
};

export const Input = memo(InputComponent);
