import React, { FC, HTMLAttributes, memo } from "react";
import { IconsWrapper } from "./iconsWrapper";
import { IconProps } from "@zones/shared/icons/types";

const DeleteButtonComponent: FC<HTMLAttributes<HTMLDivElement> & IconProps> = props => {
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
				<path
					d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
					strokeLinecap="round"
					strokeLinejoin="round"
				/>
			</svg>
		</IconsWrapper>
	);
};

export const DeleteIcon = memo(DeleteButtonComponent);
