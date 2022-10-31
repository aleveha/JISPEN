import {
	ChevronLeft,
	CopyIcon,
	CopyrightIcon,
	CrossIcon,
	DeleteIcon,
	EditIcon,
	ExportIcon,
	InfoIcon,
	LoginIcon,
	MenuIcon,
	RecordIcon,
	TemplateIcon,
} from "./icons";

export const Icons = {
	chevronLeft: <ChevronLeft />,
	copy: <CopyIcon />,
	copyright: <CopyrightIcon />,
	cross: <CrossIcon />,
	delete: <DeleteIcon />,
	edit: <EditIcon />,
	export: <ExportIcon />,
	info: <InfoIcon />,
	login: <LoginIcon />,
	menu: <MenuIcon />,
	record: <RecordIcon />,
	template: <TemplateIcon />,
};

export type IconsType = keyof typeof Icons;
