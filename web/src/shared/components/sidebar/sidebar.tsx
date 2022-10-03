import ClearIcon from "@mui/icons-material/Clear";
import { Drawer, IconButton } from "@mui/material";
import packageJson from "package.json";
import React, { memo } from "react";
import { SidebarContent } from "./sidebar-content";

interface SideBarProps {
	onClose: () => void;
	open: boolean;
}

export const Sidebar = memo<SideBarProps>(({ onClose, open }) => {
	const container = typeof window !== undefined ? () => window.document.body : undefined;
	const className = "bg-primary-dark text-white w-72";

	return (
		<>
			<Drawer
				ModalProps={{ keepMounted: true }}
				PaperProps={{ className }}
				anchor="left"
				className="relative block md:hidden"
				container={container}
				onClose={onClose}
				open={open}
				variant="temporary"
			>
				<IconButton className="absolute top-1 right-1" onClick={onClose}>
					<ClearIcon className="text-white" fontSize="large" />
				</IconButton>
				<SidebarContent />
			</Drawer>
			<Drawer PaperProps={{ className }} className="hidden w-72 shrink-0 md:block" open variant="permanent">
				<span className="mt-2 px-6 text-sm">Verze: {packageJson.version}</span>
				<SidebarContent />
			</Drawer>
		</>
	);
});

Sidebar.displayName = "Sidebar";
