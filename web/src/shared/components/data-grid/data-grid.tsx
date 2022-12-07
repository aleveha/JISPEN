import { Icons } from "@icons/icons.config";
import { IconButton, Paper, Table as MuiTable, TableBody, TableCell, TableContainer, TablePagination, TableRow, Tooltip } from "@mui/material";
import { DataGridHead } from "@shared/components/data-grid/data-grid-head";
import { getComparator } from "@shared/utils/comparator/comparator";
import { HeadCell, SortAs } from "@shared/utils/comparator/types";
import { Sorting } from "@state/sorting/types";
import clsx from "clsx";
import React, { ChangeEventHandler, MouseEvent, useCallback, useEffect, useState } from "react";

interface DataGridDefaultType extends Record<string, any> {
	id: number;
}

interface EnhancedDataGridProps<T extends DataGridDefaultType> {
	className?: string;
	handleCopyButtonClick?: (value: T) => void;
	handleDeleteButtonClick?: (value: T) => void;
	handleEditButtonClick?: (value: T) => void;
	handleOrderChange: (order: Sorting<T>) => void;
	headCells: HeadCell<T>[];
	order: Sorting<T>;
	rows: T[];
}

export const DataGrid = <T extends DataGridDefaultType>({
	className,
	handleCopyButtonClick,
	handleDeleteButtonClick,
	handleEditButtonClick,
	handleOrderChange,
	headCells,
	order,
	rows,
}: EnhancedDataGridProps<T>) => {
	const [sortAs, setSortAs] = useState<SortAs | undefined>();
	const [page, setPage] = useState(0);
	const [rowsPerPage, setRowsPerPage] = useState<number>(rows.length > 10 ? 10 : rows.length);

	const handleRequestSort = useCallback(
		(property: keyof T, sortAs?: SortAs) => () => {
			handleOrderChange({ column: property, direction: order.column === property && order.direction === "asc" ? "desc" : "asc" });
			setSortAs(sortAs);
		},
		[handleOrderChange, order]
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

	const handleCopy = useCallback((value: T) => () => handleCopyButtonClick && handleCopyButtonClick(value), [handleCopyButtonClick]);
	const handleDelete = useCallback((value: T) => () => handleDeleteButtonClick && handleDeleteButtonClick(value), [handleDeleteButtonClick]);
	const handleEdit = useCallback((value: T) => () => handleEditButtonClick && handleEditButtonClick(value), [handleEditButtonClick]);

	useEffect(() => {
		setRowsPerPage(rows.length > 10 ? 10 : rows.length);
	}, [rows]);

	useEffect(() => {
		setSortAs(headCells.find(cell => cell.id === order.column)?.sortAs);
	}, [headCells, order]);

	return (
		<Paper className={clsx("overflow-hidden rounded-lg", className)} variant="outlined">
			<TableContainer className="max-h-[60vh]">
				<MuiTable stickyHeader>
					<DataGridHead headCells={headCells} onSortClick={handleRequestSort} order={order.direction} orderBy={order.column} />
					<TableBody>
						{rows
							.slice()
							.sort(getComparator(order.direction, order.column, sortAs))
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
									<TableCell className="flex space-x-1">
										{handleEditButtonClick && (
											<Tooltip arrow title="Upravit">
												<IconButton className="-ml-2 hover:text-primary-dark" onClick={handleEdit(row)}>
													{Icons.edit}
												</IconButton>
											</Tooltip>
										)}
										{handleCopyButtonClick && (
											<Tooltip arrow title="Duplikovat">
												<IconButton className="-ml-2 hover:text-primary-dark" onClick={handleCopy(row)}>
													{Icons.copy}
												</IconButton>
											</Tooltip>
										)}
										{handleDeleteButtonClick && (
											<Tooltip arrow title="Smazat">
												<IconButton className="-ml-2 hover:text-primary-dark" onClick={handleDelete(row)}>
													{Icons.delete}
												</IconButton>
											</Tooltip>
										)}
									</TableCell>
								</TableRow>
							))}
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
