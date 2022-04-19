import Link from "next/link";
import React, { FC } from "react";
import { HeaderButton } from "./headerButton";
import { HeaderTabs } from "./types";

export const Header: FC = () => {
	return (
		<header className="w-full h-20 px-20 flex justify-between items-center bg-primary">
			<Link href="/">
				<h1 className="text-white text-4xl font-medium cursor-pointer">JISPEN</h1>
			</Link>
			<div className="h-full flex justify-between items-center">
				{HeaderTabs.map(tab => (
					<HeaderButton href={tab.href} key={tab.label} label={tab.label} />
				))}
			</div>
		</header>
	);
};
