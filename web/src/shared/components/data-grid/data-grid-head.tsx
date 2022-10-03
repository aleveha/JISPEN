import { TableCell, TableHead as MuiTableHead, TableRow, TableSortLabel } from "@mui/material";
import { THEME } from "@styles/theme";
import React from "react";
import { HeadCell, Order } from "./types";

interface EnhancedTableHeadProps<T> {
	headCells: HeadCell<T>[];
	onSortClick: (property: keyof T) => () => void;
	order: Order;
	orderBy: keyof T;
}

export const DataGridHead = <T extends Record<string, any>>({
	headCells,
	order,
	orderBy,
	onSortClick,
}: EnhancedTableHeadProps<T>) => {
	return (
		<MuiTableHead>
			<TableRow sx={{ backgroundColor: THEME.palette.primary.main }}>
				{headCells.map(({ id, label, width }) => (
					<TableCell
						key={id.toString()}
						sortDirection={orderBy === id ? order : false}
						sx={{
							border: "none",
							minWidth: width,
							".MuiTableSortLabel-root, .MuiTableSortLabel-icon": {
								color: THEME.palette.primary.contrastText + " !important",
							},
						}}
					>
						<TableSortLabel
							active={orderBy === id}
							direction={orderBy === id ? order : "asc"}
							onClick={onSortClick(id)}
							tabIndex={-1}
						>
							<span className="font-medium uppercase">{label}</span>
							{orderBy === id ? (
								<span className="sr-only">
									{order === "desc" ? "sorted descending" : "sorted ascending"}
								</span>
							) : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell sx={{ border: "none", color: THEME.palette.primary.contrastText }}>
					<span className="font-medium uppercase">AKCE</span>
				</TableCell>
			</TableRow>
		</MuiTableHead>
	);
};
