import { apiClient } from "@api/config";
import { Template } from "@api/templates/types";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { EditRecordForm } from "@zones/records/forms/edit-record-form";
import { getCookie } from "cookies-next";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import useSWR, { Fetcher, SWRConfig } from "swr";

const CreateRecord = () => {
	const accessToken = getCookie("access_token") as string;
	const allTemplatesFetcher = useCallback<Fetcher<Template[], string>>(
		(url: string) => apiClient.get<Template[]>(url, { headers: { Authorization: `Bearer ${accessToken}` } }).then(res => res.data),
		[accessToken]
	);

	const { data: templates } = useSWR<Template[]>("/records/new", allTemplatesFetcher);

	if (!templates) {
		return null;
	}

	return <EditRecordForm templates={templates} />;
};

const CreateRecordComponent: NextPage<DiscriminatedUnion<Template[]>> = ({ data: templates, error }) => {
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

	return (
		<SWRConfig value={{ fallback: { "/records/new": templates } }}>
			<CreateRecord />
		</SWRConfig>
	);
};

export const Page = withDashboardLayout(CreateRecordComponent, "Nový záznam");
