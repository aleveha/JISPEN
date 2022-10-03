import { Icons } from "@icons/icons.config";
import { IconButton, Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip } from "@mui/material";
import { DataGridHead } from "@shared/components/data-grid/data-grid-head";
import clsx from "clsx";
import React, { ChangeEventHandler, MouseEvent, useCallback, useEffect, useMemo, useState } from "react";
import { HeadCell, Order } from "./types";

interface DataGridDefaultType extends Record<string, any> {
	id: number;
}

interface EnhancedDataGridProps<T extends DataGridDefaultType> {
	className?: string;
	headCells: HeadCell<T>[];
	handleSelectedChange?: (value: T) => void;
	orderedBy: keyof T;
	rows: T[];
}

function descendingComparator<T>(a: T, b: T, orderBy: keyof T): number {
	if (b[orderBy] < a[orderBy]) {
		return -1;
	}
	if (b[orderBy] > a[orderBy]) {
		return 1;
	}
	return 0;
}

function getComparator<Key extends keyof any>(
	order: Order,
	orderBy: Key
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
	return order === "desc" ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

export const DataGrid = <T extends DataGridDefaultType>({
	className,
	headCells,
	handleSelectedChange,
	orderedBy,
	rows,
}: EnhancedDataGridProps<T>) => {
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<keyof T>(orderedBy);
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(rows.length > 10 ? 10 : rows.length);

	const handleRequestSort = useCallback(
		(property: keyof T) => () => {
			setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
			setOrderBy(property);
		},
		[order, orderBy]
	);

	const handleChangePage = useCallback((event: MouseEvent<HTMLButtonElement> | null, page: number) => {
		setPage(page);
	}, []);

	const handleChangeRowsPerPage = useCallback<ChangeEventHandler<HTMLInputElement>>(
		({ target }) => {
			const value = parseInt(target.value, 10);
			setRowsPerPage(value > rows.length ? rows.length : value);
			setPage(0);
		},
		[rows]
	);

	const handleDelete = useCallback((value: T) => () => handleSelectedChange && handleSelectedChange(value), [handleSelectedChange]);

	const emptyRows = useMemo(() => rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage), [page, rows, rowsPerPage]);

	useEffect(() => {
		setRowsPerPage(rows.length > 10 ? 10 : rows.length);
	}, [rows]);

	return (
		<Paper className={clsx("overflow-hidden rounded-lg", className)} variant="outlined">
			<TableContainer className="max-h-[50vh]">
				<MuiTable>
					<DataGridHead headCells={headCells} onSortClick={handleRequestSort} order={order} orderBy={orderBy} />
					<TableBody>
						{rows
							.slice()
							.sort(getComparator(order, orderBy))
							.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
							.map(row => (
								<TableRow key={row.id} role="checkbox" tabIndex={-1}>
									{headCells.map((headCell, index) => (
										<TableCell key={index}>
											<Tooltip arrow title={headCell.width ? row[headCell.id] : ""}>
												<p
													className="w-fit truncate"
													style={{
														maxWidth: headCell.width ? headCell.width - 53 : undefined,
													}}
												>
													{row[headCell.id]}
												</p>
											</Tooltip>
										</TableCell>
									))}
									<TableCell>
										<IconButton className="-ml-2 hover:text-primary-dark" onClick={handleDelete(row)}>
											{Icons.delete}
										</IconButton>
									</TableCell>
								</TableRow>
							))}
						{emptyRows > 0 && (
							<TableRow style={{ height: 53 * emptyRows }}>
								<TableCell colSpan={headCells.length + 1} />
							</TableRow>
						)}
					</TableBody>
				</MuiTable>
			</TableContainer>
			<TablePagination
				labelDisplayedRows={({ from, to, count }) => `${from}-${to} z ${count}`}
				rowsPerPageOptions={[]}
				component="div"
				count={rows.length}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={handleChangePage}
				onRowsPerPageChange={handleChangeRowsPerPage}
			/>
		</Paper>
	);
};
