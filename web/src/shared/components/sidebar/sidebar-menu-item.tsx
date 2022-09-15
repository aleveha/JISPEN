import { Button } from "@mui/material";
import { SidebarItem } from "@shared/components/sidebar/sidebar.config";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo } from "react";

export const SidebarMenuItem = memo<SidebarItem>(({ href, label }) => {
	const router = useRouter();
	const active = href ? router.pathname === href : false;

	return (
		<Link href={href} passHref>
			<Button
				className={clsx(
					"w-full justify-start py-2 px-4 text-left text-lg text-white hover:bg-white hover:bg-opacity-10",
					active && "bg-white bg-opacity-10"
				)}
				component="a"
			>
				{label}
			</Button>
		</Link>
	);
});

SidebarMenuItem.displayName = "SidebarMenuItem";
