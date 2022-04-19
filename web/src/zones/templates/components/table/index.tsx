import React, { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { Template } from "@api/templates/types";
import { deleteTemplate } from "@api/templates";
import { Badge } from "@ui/badge";
import {
	Table,
	TableBody,
	TableBodyCell,
	TableBodyRow,
	TableHeader,
	TableHeaderCell,
} from "@zones/shared/components/table";
import { DeleteIcon } from "@zones/shared/icons/deleteButton";
import { RemoveTemplateModal } from "@zones/templates/components/modal";
import { TemplatesTableProps } from "./types";

export const TemplatesTable: FC<TemplatesTableProps> = ({ data, onDataChange }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [templateToDelete, setTemplateToDelete] = useState<Template | null>(null);

	const onModalOpen = useCallback(
		(template: Template) => () => {
			setTemplateToDelete(template);
			setIsModalOpen(true);
		},
		[]
	);

	const onModalClose = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const onDelete = useCallback(
		(templateId: number) => () => {
			deleteTemplate(templateId)
				.then(res => {
					if (res.error) {
						toast.error("Vyskytla se\xa0chyba během mazání šablony");
						setIsModalOpen(false);
						return;
					}

					if (res.data && res.data.id === templateId) {
						onDataChange(data.filter(template => template.id !== templateId));
						setIsModalOpen(false);
					}
				})
				.catch(() => {
					toast.error("Vyskytla se\xa0chyba během mazání šablony");
					setIsModalOpen(false);
				});
		},
		[]
	);

	return (
		<>
			<Table>
				<TableHeader>
					<TableHeaderCell>NÁZEV ŠABLONY</TableHeaderCell>
					<TableHeaderCell>IČO</TableHeaderCell>
					<TableHeaderCell>IČZ/IČS/IČP</TableHeaderCell>
					<TableHeaderCell>NÁZEV PROVOZOVNY</TableHeaderCell>
					<TableHeaderCell>STATUS</TableHeaderCell>
					<TableHeaderCell>AKCE</TableHeaderCell>
				</TableHeader>
				<TableBody>
					{data.map((template, index) => (
						<TableBodyRow key={template.title} index={index}>
							<TableBodyCell>{template.title}</TableBodyCell>
							<TableBodyCell>{template.medicalCompany.uid}</TableBodyCell>
							<TableBodyCell>{template.medicalCompany.companyId}</TableBodyCell>
							<TableBodyCell>{template.medicalCompany.name}</TableBodyCell>
							<TableBodyCell>
								<Badge
									label={!template.expiredAt ? "Aktivní" : "Neaktivní"}
									variant={!template.expiredAt ? "active" : "disabled"}
								/>
							</TableBodyCell>
							<TableBodyCell className="flex justify-between items-center">
								{/*<EditIcon />*/}
								<DeleteIcon onClick={onModalOpen(template)} />
							</TableBodyCell>
						</TableBodyRow>
					))}
				</TableBody>
			</Table>
			{templateToDelete && (
				<RemoveTemplateModal
					isOpen={isModalOpen}
					onClose={onModalClose}
					onDelete={onDelete(templateToDelete.id)}
					templateTitle={templateToDelete.title}
				/>
			)}
		</>
	);
};
