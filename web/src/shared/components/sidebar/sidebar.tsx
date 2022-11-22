import { Icons } from "@icons/icons.config";
import { IconButton } from "@mui/material";
import { SidebarMenuItem } from "@shared/components/sidebar/sidebar-menu-item";
import { LogoutModal } from "@zones/authorization/components/logout-modal";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import clsx from "clsx";
import { useRouter } from "next/router";
import packageJson from "package.json";
import React, { memo, MouseEventHandler, useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface SideBarProps {
	onClick: () => void;
	open: boolean;
}

export const Sidebar = memo<SideBarProps>(({ onClick, open }) => {
	const [user, setUser] = useAuth();
	const [isLogoutPopupOpen, setLogoutPopupOpen] = useState(false);
	const router = useRouter();

	const onLogoutClick = useCallback(() => {
		setUser(null);
		setLogoutPopupOpen(false);
		router.push("/login").then(() => toast.success("Odhlášení proběhlo úspěšně"));
	}, [router, setUser]);

	const handleModalOpen = useCallback<MouseEventHandler<HTMLAnchorElement>>(event => {
		event.preventDefault();
		setLogoutPopupOpen(true);
	}, []);

	const handleModalClose = useCallback(() => setLogoutPopupOpen(false), []);

	return (
		<div
			className={clsx(
				"fixed top-0 bottom-0 left-0 z-10 min-h-full bg-primary-dark transition-[width] duration-300 ease-in-out",
				open ? "w-72 px-3" : "w-20"
			)}
		>
			<div className="sticky top-0 left-0 flex flex-col overflow-hidden text-white">
				<div className="flex items-center justify-start">
					<IconButton className={clsx("w-fit py-6 text-white", !open && "px-6")} disableTouchRipple onClick={onClick}>
						{open ? Icons.chevronLeft : Icons.menu}
					</IconButton>
					{user && open && (
						<p className="truncate whitespace-nowrap px-6 text-sm text-white">
							Jste přihlášen/a jako:
							<br />
							{user.email}
						</p>
					)}
				</div>
				<div className={clsx("flex flex-col border-t border-white border-opacity-20", open && "space-y-8 pt-4")}>
					{user && (
						<>
							<SidebarMenuItem href="/templates" iconName="template" isOpen={open} label="Šablony" />
							<SidebarMenuItem href="/records" iconName="record" isOpen={open} label="Evidence" />
							<SidebarMenuItem href="/export" iconName="export" isOpen={open} label="Export" />
						</>
					)}
					<SidebarMenuItem
						href="/login"
						iconName="login"
						isOpen={open}
						label={!user ? "Přihlášení" : "Odhlášení"}
						onClick={user ? handleModalOpen : undefined}
					/>
					<SidebarMenuItem
						href="/static/files/Uživatelská dokumentace JISPEN.pdf"
						iconName="info"
						isOpen={open}
						label="Nápověda"
						target="_blank"
					/>
				</div>
			</div>
			{open && (
				<div className="absolute bottom-2 left-0 mt-2 flex flex-col px-6">
					<span className="whitespace-nowrap text-xs text-white">API: {packageJson.versions.api}</span>
					<span className="whitespace-nowrap text-xs text-white">DB: {packageJson.versions.db}</span>
					<span className="whitespace-nowrap text-xs text-white">WEB: {packageJson.versions.web}</span>
				</div>
			)}
			{isLogoutPopupOpen && <LogoutModal isOpen={isLogoutPopupOpen} onClose={handleModalClose} onLogout={onLogoutClick} />}
		</div>
	);
});

Sidebar.displayName = "Sidebar";
