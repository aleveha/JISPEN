import { Template } from "@api/templates/types";

export interface TemplatesTableProps {
	data: Template[];
	onDataChange: (data: Template[]) => void;
}
