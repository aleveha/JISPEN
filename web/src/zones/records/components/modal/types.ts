import { Record } from "@api/records/types";

export interface RemoveRecordModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
	record: Record;
}
