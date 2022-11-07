import { Icons, IconsType } from "@icons/icons.config";
import { Button } from "@mui/material";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { HTMLAttributeAnchorTarget, memo, MouseEventHandler, useEffect, useState } from "react";

interface Props {
	href: string;
	iconName?: IconsType;
	isOpen: boolean;
	label: string;
	onClick?: MouseEventHandler<HTMLAnchorElement>;
	target?: HTMLAttributeAnchorTarget;
}

export const SidebarMenuItem = memo<Props>(({ href, iconName, isOpen, label, onClick, target }) => {
	const { pathname } = useRouter();
	const [disableFocus, setDisableFocus] = useState(false);

	useEffect(() => {
		setDisableFocus(new RegExp("/?(templates|records|export).*").test(pathname));
	}, [pathname]);

	return (
		<Link href={href} passHref>
			<Button
				className={clsx(
					"transition duration-300 hover:bg-white hover:bg-opacity-20",
					pathname.includes(href) && "bg-white bg-opacity-10",
					isOpen ? "w-full py-3 px-4" : "w-fit rounded-none py-7 px-7"
				)}
				component="a"
				disableFocusRipple={disableFocus}
				onClick={onClick}
				tabIndex={disableFocus ? -1 : 0}
				target={target}
			>
				<div className={clsx("w-full items-center text-white", isOpen ? "grid grid-cols-6" : "relative flex w-fit justify-start")}>
					{iconName && Icons[iconName]}
					<span className={clsx("col-span-5 col-start-2 -mt-[2px] h-6 text-start text-lg", isOpen ? "ml-3 inline-block" : "hidden")}>
						{label}
					</span>
				</div>
			</Button>
		</Link>
	);
});

SidebarMenuItem.displayName = "SidebarMenuItem";
