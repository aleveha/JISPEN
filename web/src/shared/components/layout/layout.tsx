import React, { createElement, FC, ReactNode, useCallback, useState } from "react";
import { MobileSidebarOpenButton } from "../sidebar/mobile-sidebar-open-button";
import { Sidebar } from "../sidebar/sidebar";

interface Props {
	children: ReactNode;
	title?: string;
}

const Layout: FC<Props> = ({ children, title }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const onCloseSidebar = useCallback(() => setSidebarOpen(false), []);
	const onOpenSidebar = useCallback(() => setSidebarOpen(true), []);

	return (
		<div className="relative flex w-full">
			<MobileSidebarOpenButton openSidebar={onOpenSidebar} />
			<Sidebar onClose={onCloseSidebar} open={isSidebarOpen} />
			<main className="min-h-screen w-full md:w-[calc(100%_-_18rem)]">
				<div className="flex h-full w-full flex-col px-4 py-28 md:py-20 md:px-6">
					{title && <h1 className="mt-16 mb-8 text-3xl font-medium text-primary">{title}</h1>}
					{children}
				</div>
			</main>
		</div>
	);
};

export const withDashboardLayout = (Component: FC<any>, title?: string) => {
	return function withLayoutComponent(props: any) {
		return <Layout title={title}>{createElement(Component, props)}</Layout>;
	};
};