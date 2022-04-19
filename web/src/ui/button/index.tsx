import React, { forwardRef, memo } from "react";
import clsx from "clsx";
import { ButtonComponentProps, ButtonType } from "@ui/button/types";

const ButtonComponent = forwardRef<HTMLButtonElement, ButtonComponentProps>((props, ref) => {
	const { variant = ButtonType.primary, className, type, ...rest } = props;
	return (
		<button
			className={clsx(
				"py-4 px-8 rounded-lg text-white text-lg font-medium tracking-wider hover:shadow-xl transition ease-in-out hover:-translate-y-1 hover:scale-103 duration-300",
				variant,
				variant === ButtonType.white && "border border-grey bg-white text-grey",
				className
			)}
			ref={ref}
			type={type ?? "button"}
			{...rest}
		>
			{props.children}
		</button>
	);
});

export const Button = memo(ButtonComponent);
