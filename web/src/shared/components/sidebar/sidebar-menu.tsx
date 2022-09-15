import { Button } from "@mui/material";
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
				<Button
					className="w-full justify-start px-4 py-2 text-left text-lg text-white hover:bg-white hover:bg-opacity-10"
					href="/static/files/user_documentation.pdf"
					target="_blank"
					component="a"
				>
					Nápověda
				</Button>
			</div>
		</div>
	);
});

SidebarMenu.displayName = "SidebarMenu";
