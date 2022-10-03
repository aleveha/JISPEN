import { deleteTemplate } from "@api/templates";
import { Template } from "@api/templates/types";
import { HeadCell } from "@shared/components/checkbox-list/types";
import { DataGrid } from "@shared/components/data-grid/data-grid";
import { RemoveTemplateModal } from "@zones/templates/components/remove-template-modal";
import React, { FC, useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

interface TemplatesTable {
	id: Template["id"];
	title: Template["title"];
	medicalCompanyUid: Template["medicalCompany"]["uid"];
	medicalCompanyCompanyId: Template["medicalCompany"]["companyId"];
	medicalCompanyName: Template["medicalCompany"]["name"];
}

const HEADER_CELLS: HeadCell<TemplatesTable>[] = [
	{
		id: "title",
		label: "Název šablony",
		width: 200,
	},
	{ id: "medicalCompanyUid", label: "IČO" },
	{ id: "medicalCompanyCompanyId", label: "IČZ/IČS/IČP" },
	{ id: "medicalCompanyName", label: "Název provozovny", width: 250 },
];

interface Props {
	data: Template[];
	onDataChange: (data: Template[]) => void;
}

export const TemplatesTable: FC<Props> = ({ data, onDataChange }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTemplate, setSelectedTemplate] = useState<TemplatesTable | null>();

	const handleModalClose = useCallback(() => setIsModalOpen(false), []);

	const rows: TemplatesTable[] = useMemo(
		() =>
			data.map(template => ({
				id: template.id,
				title: template.title,
				medicalCompanyUid: template.medicalCompany.uid,
				medicalCompanyCompanyId: template.medicalCompany.companyId,
				medicalCompanyName: template.medicalCompany.name,
			})),
		[data]
	);

	const handleSelectedChange = useCallback((template: TemplatesTable) => {
		setSelectedTemplate(template);
		setIsModalOpen(true);
	}, []);

	const onDelete = useCallback(() => {
		if (!selectedTemplate) {
			return;
		}
		deleteTemplate(selectedTemplate.id)
			.then(res => {
				if (res.data && res.data.id === selectedTemplate.id) {
					onDataChange(data.filter(template => template.id !== selectedTemplate.id));
					toast.success("Šablona byla úspěšně smazána");
				} else if (res.error) {
					toast.error("Vyskytla se\xa0chyba během mazání šablony");
				}
				setIsModalOpen(false);
			})
			.catch(() => {
				toast.error("Vyskytla se\xa0chyba během mazání šablony");
				setIsModalOpen(false);
			});
	}, [data, onDataChange, selectedTemplate]);

	return (
		<>
			<DataGrid headCells={HEADER_CELLS} handleSelectedChange={handleSelectedChange} orderedBy="title" rows={rows} />
			{selectedTemplate && (
				<RemoveTemplateModal isOpen={isModalOpen} onClose={handleModalClose} onDelete={onDelete} templateTitle={selectedTemplate.title} />
			)}
		</>
	);
};
