import { apiClient } from "@api/config";
import { Template } from "@api/templates/types";
import { Button } from "@shared/components/button/button";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { TemplatesTable } from "@zones/templates/components/templates-table";
import { getCookie } from "cookies-next";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import useSWR, { Fetcher, SWRConfig } from "swr";

const AllTemplates = memo(() => {
	const accessToken = getCookie("accessToken") as string;
	const allTemplatesFetcher = useCallback<Fetcher<Template[], string>>(
		(url: string) => apiClient.get<Template[]>(url, { headers: { Authorization: `Bearer ${accessToken}` } }).then(res => res.data),
		[accessToken]
	);

	const { data: templates } = useSWR<Template[]>("/templates/all", allTemplatesFetcher);

	return (
		<div className="h-max">
			{!templates || templates.length == 0 ? (
				<p className="text-xl text-grey">Zatím nemáte žádné šablony</p>
			) : (
				<TemplatesTable templates={templates} />
			)}
			<div className="mt-8 flex w-full items-center justify-end">
				<Link href="/templates/new" passHref>
					<Button variant="primary">Nová šablona</Button>
				</Link>
			</div>
		</div>
	);
});

AllTemplates.displayName = "AllTemplates";

const AllTemplatesPageComponent: NextPage<DiscriminatedUnion<Template[]>> = ({ data: templates, error }) => {
	const router = useRouter();

	useEffect(() => {
		if (error) {
			if (error.statusCode === 401) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			toast.error("Vyskytla se\xa0chyba během načítání šablon");
		}
	}, [error, router]);

	if (!templates || error) {
		return null;
	}

	return (
		<SWRConfig value={{ fallback: { "/templates/all": templates } }}>
			<AllTemplates />
		</SWRConfig>
	);
};

export const Page = withDashboardLayout(AllTemplatesPageComponent, "Vaše šablony");
