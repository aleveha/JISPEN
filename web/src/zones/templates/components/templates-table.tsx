import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { Record } from "@api/records/types";
import { Template } from "@api/templates/types";
import { HeadCell } from "@shared/components/checkbox-list/types";
import { DataGrid } from "@shared/components/data-grid/data-grid";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { RemoveTemplateModal } from "@zones/templates/components/remove-template-modal";
import { useRouter } from "next/router";
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
	const [recordsCount, setRecordsCount] = useState<number | undefined>(undefined);
	const [accessToken] = useAuth();
	const router = useRouter();

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

	const handleSelectedChange = useCallback(
		async (template: TemplatesTable) => {
			setSelectedTemplate(template);
			setIsModalOpen(true);

			if (!accessToken) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			const { data: records } = await fetcher<Record[]>({
				axiosInstance: apiClient,
				method: "get",
				url: "/records/all",
				accessToken,
			});

			if (!records) {
				toast.error("Nepodařilo se načíst počet evidence");
				return;
			}
			setRecordsCount(records.filter(record => record.templateId === template.id).length);
		},
		[accessToken, router]
	);

	const onDelete = useCallback(() => {
		if (!selectedTemplate) {
			return;
		}

		if (!accessToken) {
			router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
			return;
		}

		fetcher<Template>({
			axiosInstance: apiClient,
			method: "delete",
			url: "/template/delete",
			accessToken,
			config: { params: { id: selectedTemplate.id } },
		})
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
	}, [accessToken, data, onDataChange, router, selectedTemplate]);

	return (
		<>
			<DataGrid headCells={HEADER_CELLS} handleSelectedChange={handleSelectedChange} orderedBy="title" rows={rows} />
			{selectedTemplate && (
				<RemoveTemplateModal
					isOpen={isModalOpen}
					onClose={handleModalClose}
					onDelete={onDelete}
					recordsCount={recordsCount}
					templateTitle={selectedTemplate.title}
				/>
			)}
		</>
	);
};
