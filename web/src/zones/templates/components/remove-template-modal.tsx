import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "@shared/components/button/button";
import React, { FC } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
	templateTitle: string;
}

export const RemoveTemplateModal: FC<Props> = ({ isOpen, onClose, onDelete, templateTitle }) => (
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
