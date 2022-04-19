export interface RemoveTemplateModalProps {
	isOpen: boolean;
	onClose: () => void;
	onDelete: () => void;
	templateTitle: string;
}
