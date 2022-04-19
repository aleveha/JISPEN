import React, { FC } from "react";

export { TableHeaderCell } from "./headerCell";

export const TableHeader: FC = ({ children }) => {
	return (
		<thead className="bg-primary sticky top-0">
			<tr>{children}</tr>
		</thead>
	);
};
