import React, { FC } from "react";

export const TableHeaderCell: FC = ({ children }) => {
	return (
		<th className="whitespace-nowrap px-5 py-4 text-left text-lg font-normal text-white" scope="col">
			{children}
		</th>
	);
};
