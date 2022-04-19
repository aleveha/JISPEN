export interface ITab {
	id: string;
	title: string;
}

export interface TabProps {
	isActive: boolean;
	onTabClick: (tab: ITab) => void;
	tab: ITab;
}

export interface TabsProps {
	activeTab: ITab;
	onTabClick: (tab: ITab) => void;
	tabs: ITab[];
}
