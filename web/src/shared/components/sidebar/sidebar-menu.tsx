import { SidebarItems } from "@shared/components/sidebar/sidebar.config";
import { userState } from "@state/user/user-state";
import { useAtom } from "jotai";
import React, { memo } from "react";
import { SidebarMenuItem } from "./sidebar-menu-item";

export const SidebarMenu = memo(() => {
	const [user] = useAtom(userState);

	return (
		<div className="flex h-full flex-col">
			<div className="flex flex-col space-y-6">
				{user && SidebarItems.map(props => <SidebarMenuItem key={props.label} {...props} />)}
				<SidebarMenuItem href="/login" label={!user ? "Přihlášení" : "Odhlášení"} />
				<SidebarMenuItem href="/static/files/user_documentation.pdf" label="Nápověda" target="_blank" />
			</div>
		</div>
	);
});

SidebarMenu.displayName = "SidebarMenu";
