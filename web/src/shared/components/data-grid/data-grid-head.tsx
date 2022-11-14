import { TableCell, TableHead as MuiTableHead, TableRow, TableSortLabel } from "@mui/material";
import { THEME } from "@styles/theme";
import React from "react";
import { HeadCell, Order, SortAs } from "../shared/comparator-util.types";

interface EnhancedTableHeadProps<T> {
	headCells: HeadCell<T>[];
	onSortClick: (property: keyof T, sortAs?: SortAs) => () => void;
	order: Order;
	orderBy: keyof T;
}

export const DataGridHead = <T extends Record<string, any>>({ headCells, order, orderBy, onSortClick }: EnhancedTableHeadProps<T>) => {
	return (
		<MuiTableHead>
			<TableRow>
				{headCells.map(({ id, label, width, sortAs }) => (
					<TableCell
						key={id.toString()}
						sortDirection={orderBy === id ? order : false}
						sx={{
							backgroundColor: THEME.palette.primary.main,
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
							onClick={onSortClick(id, sortAs)}
							tabIndex={-1}
						>
							<span className="font-medium uppercase">{label}</span>
							{orderBy === id ? <span className="sr-only">{order === "desc" ? "sorted descending" : "sorted ascending"}</span> : null}
						</TableSortLabel>
					</TableCell>
				))}
				<TableCell
					sx={{
						backgroundColor: THEME.palette.primary.main,
						border: "none",
						color: THEME.palette.primary.contrastText,
					}}
				>
					<span className="font-medium uppercase">AKCE</span>
				</TableCell>
			</TableRow>
		</MuiTableHead>
	);
};
