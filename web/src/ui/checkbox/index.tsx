import React, { FC, InputHTMLAttributes } from "react";
import clsx from "clsx";
import { FieldProps } from "formik";
import { CheckBoxProps, CheckBoxVariant } from "@ui/checkbox/types";

export const Checkbox: FC<FieldProps & CheckBoxProps & InputHTMLAttributes<HTMLInputElement>> = ({
	className,
	field,
	variant = CheckBoxVariant.secondary,
	...rest
}) => {
	return (
		<div className="flex justify-start items-center h-6">
			<input type="checkbox" className={clsx("h-5 w-5 rounded", variant, className)} {...field} {...rest} />
		</div>
	);
};
