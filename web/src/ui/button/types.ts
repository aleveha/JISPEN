import { ButtonHTMLAttributes } from "react";

export enum ButtonType {
	primary = "bg-primary",
	secondary = "bg-secondary",
	white = "bg-white",
}

export interface ButtonProps {
	variant?: ButtonType;
}

export type ButtonComponentProps = ButtonProps & ButtonHTMLAttributes<HTMLButtonElement>;
