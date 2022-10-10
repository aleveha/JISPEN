import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "@shared/components/button/button";
import React, { FC } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onLeave: () => void;
}

export const LeaveEditorModal: FC<Props> = ({ isOpen, onClose, onLeave }) => (
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
		<DialogTitle className="text-2xl font-medium text-primary">Opravdu chcete opustit tuto stránku?</DialogTitle>
		<DialogContent>
			<p className="text-gray-800">Pokud opustíte tuto stránku, neuložené změny budou ztraceny.</p>
		</DialogContent>
		<DialogActions className="space-x-4">
			<Button onClick={onClose} variant="white">
				Ne
			</Button>
			<Button onClick={onLeave} variant="secondary">
				Ano
			</Button>
		</DialogActions>
	</Dialog>
);
