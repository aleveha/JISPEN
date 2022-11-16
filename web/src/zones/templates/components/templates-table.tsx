import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { Record } from "@api/records/types";
import { Template } from "@api/templates/types";
import { DataGrid } from "@shared/components/data-grid/data-grid";
import { useTableSorting } from "@shared/hooks/useTableSorting";
import { HeadCell } from "@shared/utils/comparator/types";
import { Sorting } from "@state/table-sorting/types";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { RemoveTemplateModal } from "@zones/templates/components/remove-template-modal";
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { mutate } from "swr";

export interface TemplatesTableColumns {
	id: Template["id"];
	title: Template["title"];
	medicalCompanyUid: Template["medicalCompany"]["uid"];
	medicalCompanyCompanyId: Template["medicalCompany"]["companyId"];
	medicalCompanyName: Template["medicalCompany"]["name"];
}

const HEADER_CELLS: HeadCell<TemplatesTableColumns>[] = [
	{ id: "title", label: "Název šablony", width: 200 },
	{ id: "medicalCompanyUid", label: "IČO" },
	{ id: "medicalCompanyCompanyId", label: "IČZ/IČS/IČP" },
	{ id: "medicalCompanyName", label: "Název provozovny", width: 250 },
];

interface Props {
	templates: Template[];
}

export const TemplatesTable: FC<Props> = ({ templates }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedTemplate, setSelectedTemplate] = useState<TemplatesTableColumns | null>();
	const [recordsCount, setRecordsCount] = useState<number | undefined>(undefined);
	const [user] = useAuth();
	const router = useRouter();
	const [tableSorting, setTableSorting] = useTableSorting();

	const handleModalClose = useCallback(() => setIsModalOpen(false), []);

	const rows: TemplatesTableColumns[] = useMemo(
		() =>
			templates.map(template => ({
				id: template.id,
				title: template.title,
				medicalCompanyUid: template.medicalCompany.uid,
				medicalCompanyCompanyId: template.medicalCompany.companyId,
				medicalCompanyName: template.medicalCompany.name,
			})),
		[templates]
	);

	const handleSelectedChange = useCallback(
		async (template: TemplatesTableColumns) => {
			setSelectedTemplate(template);
			setIsModalOpen(true);

			if (!user?.accessToken) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			const { data: records } = await fetcher<Record[]>({
				axiosInstance: apiClient,
				method: "get",
				url: "/records/all",
				accessToken: user.accessToken,
			});

			if (!records) {
				toast.error("Nepodařilo se načíst počet evidence");
				return;
			}
			setRecordsCount(records.filter(record => record.templateId === template.id).length);
		},
		[user?.accessToken, router]
	);

	const handleOrderChanged = useCallback((value: Sorting<TemplatesTableColumns>) => setTableSorting("templates", value), [setTableSorting]);

	const errorToast = useCallback(() => toast.error("Vyskytla se\xa0chyba během mazání šablony"), []);
	const successToast = useCallback(() => toast.success("Šablona byla úspěšně smazána"), []);

	const onDelete = useCallback(() => {
		if (!selectedTemplate) {
			return;
		}

		if (!user?.accessToken) {
			router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
			return;
		}

		fetcher<Template>({
			axiosInstance: apiClient,
			method: "delete",
			url: "/templates/delete",
			accessToken: user.accessToken,
			config: { params: { id: selectedTemplate.id } },
		})
			.then(res => {
				if (res.data && res.data.id === selectedTemplate.id) {
					mutate("/templates/all").then(successToast).catch(errorToast);
				} else if (res.error) {
					errorToast();
				}
				setIsModalOpen(false);
			})
			.catch(() => {
				errorToast();
				setIsModalOpen(false);
			});
	}, [selectedTemplate, user?.accessToken, router, successToast, errorToast]);

	return (
		<>
			<DataGrid
				handleDeleteButtonClick={handleSelectedChange}
				handleOrderChange={handleOrderChanged}
				headCells={HEADER_CELLS}
				order={tableSorting?.templates ?? { column: "title", direction: "asc" }}
				rows={rows}
			/>
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
