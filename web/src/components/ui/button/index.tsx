import React, { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps {
	variant: "primary" | "secondary";
}

export const Button: FC<ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>> = props => {
	const { variant, className, ...rest } = props;
	return (
		<button
			{...rest}
			className={
				"py-4 px-8 rounded-lg w-full text-white tracking-wider hover:shadow-xl transition ease-in-out hover:-translate-y-1 hover:scale-105 duration-300" +
				` ${variant === "secondary" ? "bg-secondary" : "bg-primary"} ${className ?? ""}`
			}
		>
			{props.children}
		</button>
	);
};
