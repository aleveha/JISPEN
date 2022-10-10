import { Dialog, DialogActions, DialogTitle } from "@mui/material";
import { Button } from "@shared/components/button/button";
import React, { FC, MouseEventHandler } from "react";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	onLogout: MouseEventHandler<HTMLButtonElement>;
}

export const LogoutModal: FC<Props> = ({ isOpen, onClose, onLogout }) => (
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
		<DialogTitle className="text-2xl font-medium text-primary">Opravdu si&nbsp;přejete ukončit práci v&nbsp;JISPEN?</DialogTitle>
		<DialogActions className="space-x-4">
			<Button onClick={onClose} variant="white">
				Ne
			</Button>
			<Button onClick={onLogout} variant="secondary">
				Ano
			</Button>
		</DialogActions>
	</Dialog>
);
