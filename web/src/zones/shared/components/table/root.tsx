import React, { FC, HTMLAttributes } from "react";
import clsx from "clsx";

export const TableRoot: FC<HTMLAttributes<HTMLDivElement>> = ({ children, className, ...rest }) => {
	return (
		<div
			className={clsx("overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg", className)}
			{...rest}
		>
			<table className="min-w-full divide-y divide-gray-300">{children}</table>
		</div>
	);
};
