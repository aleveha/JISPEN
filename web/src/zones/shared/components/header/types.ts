export interface HeaderTab {
	href: string;
	label: string;
}

export const HeaderTabs: HeaderTab[] = [
	{ href: "/templates", label: "Šablony" },
	{ href: "/records", label: "Evidence" },
	{ href: "/export", label: "Export" },
];
