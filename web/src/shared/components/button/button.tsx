import { Button as MuiButton, CircularProgress } from "@mui/material";
import clsx from "clsx";
import React, { forwardRef, MouseEventHandler, ReactNode } from "react";

const ButtonType = {
	primary: "primary",
	secondary: "secondary",
	white: "white",
} as const;

export interface ButtonProps {
	children: ReactNode;
	className?: string;
	disabled?: boolean;
	href?: string;
	loading?: boolean;
	onClick?: MouseEventHandler<HTMLButtonElement>;
	type?: "submit" | "button";
	variant?: keyof typeof ButtonType;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
	({ children, className, disabled, href, loading, onClick, type, variant = "primary" }, ref) => {
		// prettier-ignore
		const _className =
			variant === "white"
				? "border border-grey bg-white hover:bg-grey hover:bg-opacity-5 text-grey"
				: variant === "primary"
					? "bg-primary hover:bg-primary-dark text-white"
					: "bg-secondary hover:bg-secondary-dark text-white";

		return (
			<MuiButton
				className={clsx("relative rounded-lg py-3 px-6 text-lg font-medium tracking-wider", _className, className)}
				component={href ? "a" : "button"}
				disabled={disabled || loading}
				href={href}
				onClick={onClick}
				ref={ref}
				type={type}
				variant="contained"
			>
				<div className={clsx(loading && "text-transparent")}>{children}</div>
				<div className={clsx(loading ? "absolute inset-0 flex items-center justify-center" : "hidden")}>
					<CircularProgress className="text-white" size={28} />
				</div>
			</MuiButton>
		);
	}
);

Button.displayName = "Button";
