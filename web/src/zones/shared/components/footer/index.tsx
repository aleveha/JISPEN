import React, { FC } from "react";

export const Footer: FC = () => {
	return (
		<div className="w-full h-12 bg-primary flex justify-between px-20">
			<h4 className="leading-[2.6] text-lg text-white text-center">Nápověda</h4>
			<p className="leading-[2.6] text-lg text-white text-center">
				TAČR,&nbsp;Technická univerzita v&nbsp;Liberci, INISOFT Consulting s.r.o.
			</p>
		</div>
	);
};
