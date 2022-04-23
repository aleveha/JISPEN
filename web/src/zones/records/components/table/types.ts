import { Record } from "@api/records/types";

export interface RecordTableProps {
	data: Record[];
	onDataChange: (data: Record[]) => void;
}
