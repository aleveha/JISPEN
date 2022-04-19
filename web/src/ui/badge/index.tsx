import React, { FC } from "react";
import clsx from "clsx";
import { BadgeProps } from "@ui/badge/types";

export const Badge: FC<BadgeProps> = ({ label, variant }) => {
	return (
		<span
			className={clsx(
				"inline-flex items-center px-3 py-0.5 rounded-full text-sm font-medium text-white",
				variant === "active" ? "bg-secondary" : "bg-red"
			)}
		>
			{label}
		</span>
	);
};
