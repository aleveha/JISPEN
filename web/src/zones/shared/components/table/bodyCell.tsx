import React, { FC, HTMLAttributes } from "react";
import clsx from "clsx";

export const TableBodyCell: FC<HTMLAttributes<HTMLTableCellElement>> = ({ children, className }) => {
	return <td className={clsx("whitespace-nowrap px-5 py-4 text-lg text-gray-500", className)}>{children}</td>;
};
