import React, { FC, HTMLAttributes } from "react";
import { IconsWrapper } from "@zones/shared/icons/iconsWrapper";
import { IconProps } from "@zones/shared/icons/types";

export const ExitIcon: FC<HTMLAttributes<HTMLDivElement> & IconProps> = props => {
	return (
		<IconsWrapper {...props}>
			<svg
				className="h-6 w-6"
				fill="none"
				stroke="currentColor"
				strokeWidth={2}
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
			</svg>
		</IconsWrapper>
	);
};
