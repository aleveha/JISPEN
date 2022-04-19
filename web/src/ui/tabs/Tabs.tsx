import React, { FC, useCallback, useEffect, useState } from "react";
import { Tab } from "./Tab";
import { ITab, TabsProps } from "./types";

export const Tabs: FC<TabsProps> = ({ activeTab, onTabClick, tabs }) => {
	const [active, setActive] = useState<ITab>(activeTab);

	const onClick = useCallback(
		(tab: ITab) => {
			if (onTabClick) {
				onTabClick(tab);
			}
			setActive(tab);
		},
		[onTabClick]
	);

	useEffect(() => {
		setActive(activeTab);
	}, [activeTab]);

	return (
		<div className="flex justify-center items-center mb-8 w-96 text-white">
			{tabs.map(tab => (
				<Tab isActive={active.id === tab.id} key={tab.id} onTabClick={onClick} tab={tab} />
			))}
		</div>
	);
};
