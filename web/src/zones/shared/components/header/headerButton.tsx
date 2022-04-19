import Link from "next/link";
import { useRouter } from "next/router";
import React, { FC } from "react";
import clsx from "clsx";
import { HeaderTab } from "./types";

export const HeaderButton: FC<HeaderTab> = ({ href, label }) => {
	const router = useRouter();
	const isActive = href === router.route;

	return (
		<Link href={href}>
			<a
				className={clsx(
					"h-full text-center leading-[4] text-white text-xl font-medium px-8 hover:bg-secondary",
					isActive ? "bg-secondary" : ""
				)}
			>
				{label.toUpperCase()}
			</a>
		</Link>
	);
};
