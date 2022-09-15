import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import React, { memo } from "react";

interface Props {
	openSidebar: () => void;
}

export const MobileSidebarOpenButton = memo<Props>(({ openSidebar }) => {
	return (
		<div
			className="absolute top-4 left-0 flex h-12 w-12 items-center justify-center rounded-r-xl bg-primary shadow-2xl md:hidden"
			onClick={openSidebar}
		>
			<MenuOpenIcon className="text-white" />
		</div>
	);
});

MobileSidebarOpenButton.displayName = "MobileSidebarOpenButton";
