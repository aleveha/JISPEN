import {
	Checkbox,
	Paper,
	Table as MuiTable,
	TableBody,
	TableCell,
	TableContainer,
	TableRow,
	Tooltip,
} from "@mui/material";
import clsx from "clsx";
import React, { ChangeEventHandler, useCallback, useState } from "react";
import { CheckboxHead } from "./checkbox-list-head";
import { CheckboxListToolbar } from "./checkbox-list-toolbar";
import { HeadCell, Order } from "./types";

interface TableDefaultType extends Record<string, any> {
	id: number;
}

interface EnhancedTableProps<T extends TableDefaultType> {
	className?: string;
	headCells: HeadCell<T>[];
	isError?: boolean;
	onDelete?: (ids: number[]) => void;
	onSelectedValueChanged?: (newValue: T[]) => void;
	orderedBy: keyof T;
	rows: T[];
	title: string;
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
	return order === "desc"
		? (a, b) => descendingComparator(a, b, orderBy)
		: (a, b) => -descendingComparator(a, b, orderBy);
}

export const CheckboxList = <T extends TableDefaultType>({
	className,
	headCells,
	isError,
	onDelete,
	onSelectedValueChanged,
	orderedBy,
	rows,
	title,
}: EnhancedTableProps<T>) => {
	const [order, setOrder] = useState<Order>("asc");
	const [orderBy, setOrderBy] = useState<keyof T>(orderedBy);
	const [selected, setSelected] = useState<T[]>([]);

	const handleRequestSort = useCallback(
		(property: keyof T) => () => {
			setOrder(orderBy === property && order === "asc" ? "desc" : "asc");
			setOrderBy(property);
		},
		[order, orderBy]
	);

	const handleSelectAllClick = useCallback<ChangeEventHandler<HTMLInputElement>>(
		({ target: { checked } }) => {
			setSelected(checked ? rows : []);
			onSelectedValueChanged && onSelectedValueChanged(checked ? rows : []);
		},
		[onSelectedValueChanged, rows]
	);

	const handleClick = useCallback(
		(value: T) => () => {
			const selectedIndex = selected.indexOf(value);
			let newSelected: T[] = [];

			if (selectedIndex === -1) {
				newSelected = newSelected.concat(selected, value);
			} else if (selectedIndex === 0) {
				newSelected = newSelected.concat(selected.slice(1));
			} else if (selectedIndex === selected.length - 1) {
				newSelected = newSelected.concat(selected.slice(0, -1));
			} else if (selectedIndex > 0) {
				newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
			}

			setSelected(newSelected);
			onSelectedValueChanged && onSelectedValueChanged(newSelected);
		},
		[onSelectedValueChanged, selected]
	);

	const handleDeleteAll = useCallback(() => {
		if (onDelete) {
			onDelete(selected.map(value => value.id));
			return;
		}
		setSelected([]);
		onSelectedValueChanged && onSelectedValueChanged([]);
	}, [onDelete, onSelectedValueChanged, selected]);

	const isSelected = useCallback((value: T) => selected.indexOf(value) !== -1, [selected]);

	return (
		<Paper className={className} variant="outlined">
			<CheckboxListToolbar
				isError={isError}
				numSelected={selected.length}
				onDeleteClick={handleDeleteAll}
				title={title}
			/>
			<TableContainer className="max-h-[50vh]">
				<MuiTable stickyHeader>
					<CheckboxHead
						headCells={headCells}
						isError={isError}
						numSelected={selected.length}
						onSortClick={handleRequestSort}
						onSelectAllClick={handleSelectAllClick}
						order={order}
						orderBy={orderBy}
						rowCount={rows.length}
					/>
					<TableBody>
						{rows
							.slice()
							.sort(getComparator(order, orderBy))
							.map(row => (
								<TableRow
									hover
									key={row.id}
									onClick={handleClick(row)}
									role="checkbox"
									selected={isSelected(row)}
									tabIndex={-1}
								>
									<TableCell sx={{ border: "none" }} padding="checkbox">
										<Checkbox checked={isSelected(row)} className={clsx(isError && "text-red")} />
									</TableCell>
									{headCells.map((headCell, index) => (
										<TableCell key={index} sx={{ border: "none" }}>
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
								</TableRow>
							))}
					</TableBody>
				</MuiTable>
			</TableContainer>
		</Paper>
	);
};
