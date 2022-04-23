import React, { FC } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@ui/button";
import { ButtonType } from "@ui/button/types";
import { RemoveRecordModalProps } from "@zones/records/components/modal/types";

export const RemoveRecordModal: FC<RemoveRecordModalProps> = ({ isOpen, onClose, onDelete, record }) => {
	return (
		<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose} open={isOpen}>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
				<div className="relative bg-white rounded max-w-xl mx-auto p-8 rounded-lg text-lg">
					<Dialog.Title as="h1" className="text-2xl text-primary font-medium mb-4">
						Opravdu chcete smazat tuto evidenci?
					</Dialog.Title>
					<Dialog.Description as="div" className="text-grey mb-4">
						<p className="font-bold text-xl mb-2">Tato akce je&nbsp;nevratná!</p>
						<p>
							Pokud tuto evidenci od{" "}
							<span className="font-bold">{new Date(record.date).toLocaleDateString("cs-CZ")}</span> s
							odpadem{" "}
							<span className="font-bold">
								č.&nbsp;{record.waste.uid}&nbsp;—&nbsp;{Number(record.amount).toFixed(2)} tůny
							</span>{" "}
							opravdu chcete smazat, klikněte na&nbsp;tlačítko <span className="font-bold">"Smazat"</span>
							.
						</p>
					</Dialog.Description>
					<div className="grid grid-rows-1 grid-cols-3 ml-1 gap-8">
						<Button className="col-start-2" onClick={onClose} variant={ButtonType.white}>
							Zpět
						</Button>
						<Button onClick={onDelete} variant={ButtonType.primary}>
							Smazat
						</Button>
					</div>
				</div>
			</div>
		</Dialog>
	);
};
