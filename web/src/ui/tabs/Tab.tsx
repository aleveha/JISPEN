import React, { FC } from "react";
import { TabProps } from "./types";

export const Tab: FC<TabProps> = ({ isActive, onTabClick, tab }) => {
	return (
		<div
			className={"flex justify-center cursor-pointer w-full" + ` ${isActive && "border-b-2"}`}
			onClick={() => onTabClick(tab)}
		>
			<p className={`text-xl mx-4 mb-1 ${isActive ? "font-medium opacity-100" : "opacity-80"}`}>{tab.title}</p>
		</div>
	);
};
