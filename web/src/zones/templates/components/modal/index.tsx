import React, { FC, memo } from "react";
import { Dialog } from "@headlessui/react";
import { Button } from "@ui/button";
import { ButtonType } from "@ui/button/types";
import { RemoveTemplateModalProps } from "@zones/templates/components/modal/types";

const RemoveTemplateModalComponent: FC<RemoveTemplateModalProps> = ({ isOpen, onClose, onDelete, templateTitle }) => {
	return (
		<Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={onClose} open={isOpen}>
			<div className="flex items-center justify-center min-h-screen">
				<Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
				<div className="relative bg-white rounded max-w-xl mx-auto p-8 rounded-lg text-lg">
					<Dialog.Title as="h1" className="text-2xl text-primary font-medium mb-4">
						Opravdu chcete smazat tuto šablonu?
					</Dialog.Title>
					<Dialog.Description as="div" className="text-grey mb-4">
						<p className="font-bold text-xl mb-2">Tato akce je&nbsp;nevratná!</p>
						<p>
							Pokud šablonu "<span className="font-bold">{templateTitle}</span>" opravdu chcete smazat,
							klikněte na&nbsp;tlačítko "Smazat".
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

export const RemoveTemplateModal = memo(RemoveTemplateModalComponent);
