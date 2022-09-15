export interface SidebarItem {
	href: string;
	label: string;
}

export const SidebarItems: SidebarItem[] = [
	{ href: "/templates", label: "Šablony" },
	{ href: "/records", label: "Evidence" },
	{ href: "/404", label: "Export" },
];
