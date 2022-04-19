import React, { FC } from "react";
import { TableBodyRowProps } from "./types";

export const TableBodyRow: FC<TableBodyRowProps> = ({ children, index }) => {
	return <tr className={index % 2 === 0 ? undefined : "bg-gray-50"}>{children}</tr>;
};
