import React, { FC, useCallback, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteRecord } from "@api/records";
import { Record } from "@api/records/types";
import { RemoveRecordModal } from "@zones/records/components/modal";
import { RecordTableProps } from "@zones/records/components/table/types";
import {
	Table,
	TableBody,
	TableBodyCell,
	TableBodyRow,
	TableHeader,
	TableHeaderCell,
} from "@zones/shared/components/table";
import { DeleteIcon } from "@zones/shared/icons/deleteButton";

export const RecordsTable: FC<RecordTableProps> = ({ data, onDataChange }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [recordToDelete, setRecordToDelete] = useState<Record | null>(null);

	const onModalOpen = useCallback(
		(record: Record) => () => {
			setRecordToDelete(record);
			setIsModalOpen(true);
		},
		[]
	);

	const onModalClose = useCallback(() => {
		setIsModalOpen(false);
	}, []);

	const onDelete = useCallback(
		(recordId: number) => () => {
			deleteRecord(recordId)
				.then(res => {
					if (res.error) {
						toast.error("Vyskytla se\xa0chyba během mazání evedenci");
						setIsModalOpen(false);
						return;
					}

					if (res.data && res.data.id === recordId) {
						onDataChange(data.filter(record => record.id !== recordId));
						setIsModalOpen(false);
					}
				})
				.catch(() => {
					toast.error("Vyskytla se\xa0chyba během mazání evedenci");
					setIsModalOpen(false);
				});
		},
		[]
	);

	return (
		<>
			<Table>
				<TableHeader>
					<TableHeaderCell>PROVOZOVNA</TableHeaderCell>
					<TableHeaderCell>ODPAD</TableHeaderCell>
					<TableHeaderCell>MNOŽSTVÍ</TableHeaderCell>
					<TableHeaderCell>NAKLÁDÁNÍ</TableHeaderCell>
					<TableHeaderCell>DATUM</TableHeaderCell>
					<TableHeaderCell>OPRÁVNĚNÁ OSOBA</TableHeaderCell>
					<TableHeaderCell>AKCE</TableHeaderCell>
				</TableHeader>
				<TableBody>
					{data.map((record, index) => (
						<TableBodyRow key={record.id} index={index}>
							<TableBodyCell>{record.template.medicalCompany.name}</TableBodyCell>
							<TableBodyCell>{record.waste.uid}</TableBodyCell>
							<TableBodyCell>{record.amount}</TableBodyCell>
							<TableBodyCell>{record.loadingCode.uid}</TableBodyCell>
							<TableBodyCell>{new Date(record.date).toLocaleDateString("cs-CZ")}</TableBodyCell>
							<TableBodyCell>{record.wasteCompany.name}</TableBodyCell>
							<TableBodyCell className="flex justify-between items-center">
								{/*<EditIcon />*/}
								<DeleteIcon onClick={onModalOpen(record)} />
							</TableBodyCell>
						</TableBodyRow>
					))}
				</TableBody>
			</Table>
			{recordToDelete && (
				<RemoveRecordModal
					isOpen={isModalOpen}
					onClose={onModalClose}
					onDelete={onDelete(recordToDelete.id)}
					record={recordToDelete}
				/>
			)}
		</>
	);
};
