import { Divider } from "@mui/material";
import React, { memo } from "react";
import { SidebarMenu } from "./sidebar-menu";

export const SidebarContent = memo(() => {
	return (
		<div className="mt-10 flex flex-col space-y-10 px-6">
			<p className="text-5xl font-medium text-white">JISPEN</p>
			<Divider className="bg-white bg-opacity-20" />
			<SidebarMenu />
		</div>
	);
});

SidebarContent.displayName = "SidebarContent";
