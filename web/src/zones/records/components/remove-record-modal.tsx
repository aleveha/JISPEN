import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Button } from "@shared/components/button/button";
import React, { FC } from "react";

interface Props {
	amount: string;
	date: string;
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
	wasteUid: number;
}

export const RemoveRecordModal: FC<Props> = ({ amount, date, isOpen, onClose, onDelete, wasteUid }) => (
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
		<DialogTitle className="text-2xl font-medium text-primary">Opravdu chcete smazat tuto evidenci?</DialogTitle>
		<DialogContent>
			<p className="mb-2 text-xl font-bold text-red">Tato akce je&nbsp;nevratná!</p>
			<p className="text-gray-800">
				Pokud tuto evidenci od <span className="font-bold">{date}</span> s odpadem{" "}
				<span className="font-bold">
					č.&nbsp;{wasteUid}&nbsp;&ndash;&nbsp;{amount}
				</span>{" "}
				opravdu chcete smazat, klikněte na&nbsp;tlačítko <span className="font-bold">&quot;Smazat&quot;</span>.
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
