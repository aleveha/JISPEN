import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { Record } from "@api/records/types";
import { DataGrid } from "@shared/components/data-grid/data-grid";
import { HeadCell } from "@shared/components/shared/comparator-util.types";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { RemoveRecordModal } from "@zones/records/components/remove-record-modal";
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

interface RecordsTable {
	amount: string;
	date: string;
	id: Record["id"];
	loadingCodeUid: Record["loadingCode"]["uid"];
	medicalCompanyName: Record["template"]["medicalCompany"]["name"];
	templateName: Record["template"]["title"];
	wasteCompanyName?: string;
	wasteUid: Record["waste"]["uid"];
}

const HEADER_CELLS: HeadCell<RecordsTable>[] = [
	{ id: "date", label: "Datum", sortAs: "date" },
	{ id: "templateName", label: "Šablona" },
	{ id: "wasteUid", label: "Odpad", sortAs: "string" },
	{ id: "amount", label: "Množství" },
	{ id: "loadingCodeUid", label: "Nakládání" },
	{
		id: "medicalCompanyName",
		label: "Provozovna",
	},
	{ id: "wasteCompanyName", label: "Oprávněná osoba", width: 240 },
];

function formatDate(date: Date): string {
	return new Date(date).toLocaleDateString("ru");
}

interface Props {
	records: Record[];
}

export const RecordsTable: FC<Props> = ({ records }) => {
	const { mutate } = useSWRConfig();
	const router = useRouter();
	const [accessToken] = useAuth();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState<RecordsTable | null>();

	const deleteErrorToast = useCallback(() => toast.error("Vyskytla se\xa0chyba během mazání šablony"), []);
	const deleteSuccessToast = useCallback(() => toast.success("Šablona byla úspěšně smazána"), []);

	const duplicateErrorToast = useCallback(() => toast.error("Vyskytla se\xa0chyba během duplikovaní šablony"), []);
	const duplicateSuccessToast = useCallback(() => toast.success("Kopie záznamu byla vytvořena"), []);

	const handleModalClose = useCallback(() => setIsDeleteModalOpen(false), []);

	const rows: RecordsTable[] = useMemo(
		() =>
			records.map(record => ({
				amount: `${record.amount} t`,
				date: formatDate(record.date),
				id: record.id,
				loadingCodeUid: record.loadingCode.uid,
				medicalCompanyName: record.template.medicalCompany.name,
				templateName: record.template.title,
				wasteCompanyName:
					record.wasteCompany?.name ??
					(record.wasteCompany?.type.uid === 3 ? `Občané obce ${record.wasteCompany.territorialUnit.name}` : "—"),
				wasteUid: record.waste.uid,
			})),
		[records]
	);

	const handleCopyButtonClick = useCallback(
		async (record: RecordsTable) => {
			if (!accessToken) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			const { error } = await fetcher<Record>({
				axiosInstance: apiClient,
				method: "get",
				url: `/records/duplicate?id=${record.id}`,
				accessToken,
			});

			if (error) {
				duplicateErrorToast();
				return;
			}

			mutate("/records/all").then(duplicateSuccessToast).catch(duplicateErrorToast);
		},
		[accessToken, router, mutate, duplicateSuccessToast, duplicateErrorToast]
	);

	const handleDeleteButtonClick = useCallback((record: RecordsTable) => {
		setSelectedRecord(record);
		setIsDeleteModalOpen(true);
	}, []);

	const handleEditButtonClick = useCallback(async (record: RecordsTable) => await router.push(`/records/edit?id=${record.id}`), [router]);

	const onDelete = useCallback(async () => {
		if (!selectedRecord || !accessToken) {
			return;
		}

		const { error } = await fetcher<Record>({
			axiosInstance: apiClient,
			method: "delete",
			url: "/records/delete",
			accessToken,
			config: { params: { id: selectedRecord.id } },
		});

		if (error) {
			deleteErrorToast();
			setIsDeleteModalOpen(false);
			return;
		}

		mutate("/records/all").then(deleteSuccessToast).catch(deleteErrorToast);
		setIsDeleteModalOpen(false);
	}, [accessToken, deleteErrorToast, mutate, selectedRecord, deleteSuccessToast]);

	return (
		<>
			<DataGrid
				headCells={HEADER_CELLS}
				handleCopyButtonClick={handleCopyButtonClick}
				handleDeleteButtonClick={handleDeleteButtonClick}
				handleEditButtonClick={handleEditButtonClick}
				orderedBy="date"
				rows={rows}
			/>
			{selectedRecord && (
				<RemoveRecordModal
					amount={selectedRecord.amount}
					date={selectedRecord.date}
					isOpen={isDeleteModalOpen}
					onClose={handleModalClose}
					onDelete={onDelete}
					wasteUid={selectedRecord.wasteUid}
				/>
			)}
		</>
	);
};
