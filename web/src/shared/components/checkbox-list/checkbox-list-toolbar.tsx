import { Icons } from "@icons/icons.config";
import { IconButton, Toolbar as MuiToolbar, Tooltip } from "@mui/material";
import clsx from "clsx";
import React, { memo } from "react";

interface Props {
	isError?: boolean;
	numSelected: number;
	onDeleteClick?: () => void;
	title: string;
}

function getEnhancedTableToolbarTitlePlural(numSelected: number): string {
	let value = numSelected;
	if (value > 100 && value % 100 !== 0) {
		value = parseInt(numSelected.toString().slice(-1), 10);
	}

	if (value === 1) {
		return `Vybrana ${numSelected} položka`;
	}

	if (value > 1 && value < 5) {
		return `Vybráno ${numSelected} položky`;
	}

	if (value >= 5) {
		return `Vybráno ${numSelected} položek`;
	}

	return "";
}

export const CheckboxListToolbar = memo<Props>(({ isError, numSelected, onDeleteClick, title }) => (
	<MuiToolbar className={clsx("flex justify-between bg-opacity-10", numSelected > 0 && "bg-secondary", isError && "bg-red")}>
		<div className="py-2 font-medium md:text-lg">
			{isError ? (
				<p className="text-red">Musite vybrat alespon jednu polozku</p>
			) : numSelected > 0 ? (
				<p className="text-secondary-dark">{getEnhancedTableToolbarTitlePlural(numSelected)}</p>
			) : (
				<p>{title}</p>
			)}
		</div>
		{numSelected > 0 && (
			<Tooltip title="Smazat vsechny">
				<IconButton className="text-red text-opacity-90" onClick={onDeleteClick}>
					{Icons.delete}
				</IconButton>
			</Tooltip>
		)}
	</MuiToolbar>
));

CheckboxListToolbar.displayName = "Toolbar";
