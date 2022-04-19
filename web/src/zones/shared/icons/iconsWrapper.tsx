import React, { FC, HTMLAttributes } from "react";
import clsx from "clsx";
import { IconProps, IconVariants } from "@zones/shared/icons/types";

export const IconsWrapper: FC<HTMLAttributes<HTMLDivElement> & IconProps> = ({
	children,
	className,
	variant = IconVariants.primary,
	...rest
}) => {
	return (
		<div
			className={clsx(
				"flex justify-center items-center rounded-full text-grey hover:bg-neutral-300 hover:bg-opacity-40 w-10 h-10 cursor-pointer",
				variant,
				className
			)}
			{...rest}
		>
			{children}
		</div>
	);
};
