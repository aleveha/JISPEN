import { ChevronLeft, CrossIcon, DeleteIcon, ExportIcon, InfoIcon, LoginIcon, MenuIcon, RecordIcon, TemplateIcon } from "./icons";

export const Icons = {
	chevronLeft: <ChevronLeft />,
	cross: <CrossIcon />,
	delete: <DeleteIcon />,
	export: <ExportIcon />,
	info: <InfoIcon />,
	login: <LoginIcon />,
	menu: <MenuIcon />,
	record: <RecordIcon />,
	template: <TemplateIcon />,
};

export type IconsType = keyof typeof Icons;
