import { deleteRecord } from "@api/records";
import { Record } from "@api/records/types";
import { HeadCell } from "@shared/components/checkbox-list/types";
import { DataGrid } from "@shared/components/data-grid/data-grid";
import { RemoveRecordModal } from "@zones/records/components/remove-record-modal";
import React, { FC, useCallback, useMemo, useState } from "react";
import { toast } from "react-hot-toast";

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
	{ id: "date", label: "Datum" },
	{ id: "templateName", label: "Šablona" },
	{ id: "wasteUid", label: "Odpad" },
	{ id: "amount", label: "Množství" },
	{ id: "loadingCodeUid", label: "Nakládání" },
	{
		id: "medicalCompanyName",
		label: "Provozovna",
	},
	{ id: "wasteCompanyName", label: "Oprávněná osoba", width: 200 },
];

function formatDate(date: Date): string {
	return new Date(date).toLocaleDateString("ru");
}

interface Props {
	data: Record[];
	onDataChange: (data: Record[]) => void;
}

export const RecordsTable: FC<Props> = ({ data, onDataChange }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedRecord, setSelectedRecord] = useState<RecordsTable | null>();

	const handleModalClose = useCallback(() => setIsModalOpen(false), []);

	const rows: RecordsTable[] = useMemo(
		() =>
			data.map(record => ({
				amount: `${record.amount} t`,
				date: formatDate(record.date),
				id: record.id,
				loadingCodeUid: record.loadingCode.uid,
				medicalCompanyName: record.template.medicalCompany.name,
				templateName: record.template.title,
				wasteCompanyName: record.wasteCompany?.name ?? "—",
				wasteUid: record.waste.uid,
			})),
		[data]
	);

	const handleSelectedChange = useCallback((template: RecordsTable) => {
		setSelectedRecord(template);
		setIsModalOpen(true);
	}, []);

	const onDelete = useCallback(() => {
		if (!selectedRecord) {
			return;
		}
		deleteRecord(selectedRecord.id)
			.then(res => {
				if (res.data && res.data.id === selectedRecord.id) {
					onDataChange(data.filter(template => template.id !== selectedRecord.id));
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
	}, [data, onDataChange, selectedRecord]);

	return (
		<>
			<DataGrid headCells={HEADER_CELLS} handleSelectedChange={handleSelectedChange} orderedBy="id" rows={rows} />
			{selectedRecord && (
				<RemoveRecordModal
					amount={selectedRecord.amount}
					date={selectedRecord.date}
					isOpen={isModalOpen}
					onClose={handleModalClose}
					onDelete={onDelete}
					wasteUid={selectedRecord.wasteUid}
				/>
			)}
		</>
	);
};
