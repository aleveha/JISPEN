import React, { createElement, FC } from "react";
import { LayoutProps } from "./types";
import { Footer } from "../footer";
import { Header } from "../header";

const Layout: FC<LayoutProps> = ({ children, title }) => {
	return (
		<div className="w-screen h-screen grid grid-rows-[auto_1fr_auto]">
			<Header />
			<div className="px-20">
				{title && <h1 className="mt-16 mb-8 text-3xl font-medium text-primary">{title}</h1>}
				{children}
			</div>
			<Footer />
		</div>
	);
};

export const withLayout = <T extends Record<string, unknown>>(Component: FC<T>, title?: string) => {
	return function withLayoutComponent(props: T) {
		return <Layout title={title}>{createElement(Component, props)}</Layout>;
	};
};
