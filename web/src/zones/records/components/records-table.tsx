import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { Record } from "@api/records/types";
import { DataGrid } from "@shared/components/data-grid/data-grid";
import { useUserSorting } from "@shared/hooks/useUserSorting";
import { HeadCell } from "@shared/utils/comparator/types";
import { Sorting } from "@state/sorting/types";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { RemoveRecordModal } from "@zones/records/components/remove-record-modal";
import { useRouter } from "next/router";
import React, { FC, useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";
import { useSWRConfig } from "swr";

export interface RecordsTableColumns {
	amount: string;
	date: string;
	id: Record["id"];
	loadingCodeUid: Record["loadingCode"]["uid"];
	medicalCompanyName: Record["template"]["medicalCompany"]["name"];
	templateName: Record["template"]["title"];
	wasteCompanyName?: string;
	wasteUid: Record["waste"]["uid"];
}

const HEADER_CELLS: HeadCell<RecordsTableColumns>[] = [
	{ id: "date", label: "Datum", sortAs: "date" },
	{ id: "templateName", label: "Šablona" },
	{ id: "wasteUid", label: "Odpad", sortAs: "string" },
	{ id: "amount", label: "Množství" },
	{ id: "loadingCodeUid", label: "Nakládání" },
	{ id: "medicalCompanyName", label: "Provozovna" },
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
	const [user] = useAuth();
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState<RecordsTableColumns | null>();
	const [userSorting, setUserSorting] = useUserSorting();

	const deleteErrorToast = useCallback(() => toast.error("Vyskytla se\xa0chyba během mazání šablony"), []);
	const deleteSuccessToast = useCallback(() => toast.success("Šablona byla úspěšně smazána"), []);

	const duplicateErrorToast = useCallback(() => toast.error("Vyskytla se\xa0chyba během duplikovaní šablony"), []);
	const duplicateSuccessToast = useCallback(() => toast.success("Kopie záznamu byla vytvořena"), []);

	const handleModalClose = useCallback(() => setIsDeleteModalOpen(false), []);

	const rows: RecordsTableColumns[] = useMemo(
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
		async (record: RecordsTableColumns) => {
			if (!user?.accessToken) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			const { error } = await fetcher<Record>({
				axiosInstance: apiClient,
				method: "get",
				url: `/records/duplicate?id=${record.id}`,
				accessToken: user.accessToken,
			});

			if (error) {
				duplicateErrorToast();
				return;
			}

			mutate("/records/all").then(duplicateSuccessToast).catch(duplicateErrorToast);
		},
		[user?.accessToken, mutate, duplicateSuccessToast, duplicateErrorToast, router]
	);

	const handleDeleteButtonClick = useCallback((record: RecordsTableColumns) => {
		setSelectedRecord(record);
		setIsDeleteModalOpen(true);
	}, []);

	const handleEditButtonClick = useCallback(async (record: RecordsTableColumns) => await router.push(`/records/edit?id=${record.id}`), [router]);

	const onDelete = useCallback(async () => {
		if (!selectedRecord || !user?.accessToken) {
			return;
		}

		const { error } = await fetcher<Record>({
			axiosInstance: apiClient,
			method: "delete",
			url: "/records/delete",
			accessToken: user.accessToken,
			config: { params: { id: selectedRecord.id } },
		});

		if (error) {
			deleteErrorToast();
			setIsDeleteModalOpen(false);
			return;
		}

		mutate("/records/all").then(deleteSuccessToast).catch(deleteErrorToast);
		setIsDeleteModalOpen(false);
	}, [user?.accessToken, deleteErrorToast, mutate, selectedRecord, deleteSuccessToast]);

	const handleOrderChanged = useCallback((value: Sorting<RecordsTableColumns>) => setUserSorting("records", value), [setUserSorting]);

	return (
		<>
			<DataGrid
				handleCopyButtonClick={handleCopyButtonClick}
				handleDeleteButtonClick={handleDeleteButtonClick}
				handleEditButtonClick={handleEditButtonClick}
				handleOrderChange={handleOrderChanged}
				headCells={HEADER_CELLS}
				order={userSorting?.records ?? { column: "date", direction: "asc" }}
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
