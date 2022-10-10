import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "@shared/components/button/button";
import React, { FC } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
	recordsCount?: number;
	templateTitle: string;
}

function formatRecordsCount(count: number) {
	if (count === 1) {
		return "1\xa0záznam";
	} else if (count > 1 && count < 5) {
		return `${count}\xa0záznamy`;
	} else {
		return `${count}\xa0záznamů`;
	}
}

export const RemoveTemplateModal: FC<Props> = ({ isOpen, onClose, onDelete, recordsCount, templateTitle }) => (
	<Dialog
		onClose={onClose}
		open={isOpen}
		PaperProps={{
			sx: {
				borderRadius: "1rem",
				padding: "1rem",
			},
		}}
	>
		<DialogTitle className="text-2xl font-medium text-primary">Opravdu chcete smazat tuto šablonu?</DialogTitle>
		<DialogContent>
			<p className="mb-2 text-xl font-bold text-red">Tato akce je&nbsp;nevratná!</p>
			{!!recordsCount && recordsCount > 0 && (
				<p className="mb-2 text-gray-800">
					Opravdu si přejete smazat šablonu i&nbsp;přesto, že se&nbsp;tím vymaže{" "}
					<span className="font-bold">{formatRecordsCount(recordsCount)}</span> v&nbsp;evidenci odpadů?
				</p>
			)}
			<p className="text-gray-800">
				Pokud šablonu &quot;<span className="font-bold">{templateTitle}</span>&quot; opravdu chcete smazat, klikněte na&nbsp;tlačítko
				&quot;Smazat&quot;.
			</p>
		</DialogContent>
		<DialogActions className="space-x-4">
			<Button onClick={onClose} variant="white">
				Zpět
			</Button>
			<Button onClick={onDelete} variant="secondary">
				Smazat
			</Button>
		</DialogActions>
	</Dialog>
);
