import { Button } from "@mui/material";
import { SidebarItem } from "@shared/components/sidebar/sidebar.config";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useEffect, useState } from "react";

export const SidebarMenuItem = memo<SidebarItem>(({ href, label, target }) => {
	const { pathname } = useRouter();
	const [disableFocus, setDisableFocus] = useState(false);

	useEffect(() => {
		if (new RegExp("/(templates|records)/.+").test(pathname)) {
			setDisableFocus(true);
		}
	}, [pathname]);

	return (
		<Link href={href} passHref>
			<Button
				className={clsx(
					"w-full justify-start py-2 px-4 text-left text-lg text-white hover:bg-white hover:bg-opacity-10",
					pathname === href && "bg-white bg-opacity-10"
				)}
				component="a"
				disableFocusRipple={disableFocus}
				tabIndex={disableFocus ? -1 : 0}
				target={target}
			>
				{label}
			</Button>
		</Link>
	);
});

SidebarMenuItem.displayName = "SidebarMenuItem";
