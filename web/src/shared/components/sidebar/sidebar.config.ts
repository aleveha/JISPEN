import { HTMLAttributeAnchorTarget } from "react";

export interface SidebarItem {
	href: string;
	label: string;
	target?: HTMLAttributeAnchorTarget;
}

export const SidebarItems: SidebarItem[] = [
	{ href: "/templates", label: "Šablony" },
	{ href: "/records", label: "Evidence" },
	{ href: "/404", label: "Export" },
];
