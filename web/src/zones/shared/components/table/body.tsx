import React, { FC } from "react";

export { TableBodyRow } from "./bodyRow";
export { TableBodyCell } from "./bodyCell";

export const TableBody: FC = ({ children }) => {
	return <tbody className="bg-white">{children}</tbody>;
};
