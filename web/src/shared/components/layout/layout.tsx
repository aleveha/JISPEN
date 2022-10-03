import React, { createElement, FC, ReactNode, useCallback, useState } from "react";
import { Sidebar } from "../sidebar/sidebar";

interface Props {
	children: ReactNode;
	title?: string;
}

const Layout: FC<Props> = ({ children, title }) => {
	const [isSidebarOpen, setSidebarOpen] = useState(false);

	const onClickSidebar = useCallback(() => setSidebarOpen(prev => !prev), []);

	return (
		<div className="relative flex min-h-screen w-full justify-end">
			<Sidebar onClick={onClickSidebar} open={isSidebarOpen} />
			<main className="w-[calc(100%_-_5rem)]">
				<div className="flex h-full w-full flex-col px-4 py-20 md:px-6">
					{title && <h1 className="mb-8 text-3xl font-medium text-primary">{title}</h1>}
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
