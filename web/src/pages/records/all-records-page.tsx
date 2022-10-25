import { apiClient } from "@api/config";
import { Record } from "@api/records/types";
import { Button } from "@shared/components/button/button";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { RecordsTable } from "@zones/records/components/records-table";
import { getCookie } from "cookies-next";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { memo, useCallback, useEffect } from "react";
import { toast } from "react-hot-toast";
import useSWR, { Fetcher, SWRConfig } from "swr";

const AllRecords = memo(() => {
	const accessToken = getCookie("accessToken") as string;
	const allRecordsFetcher = useCallback<Fetcher<Record[], string>>(
		(url: string) => apiClient.get<Record[]>(url, { headers: { Authorization: `Bearer ${accessToken}` } }).then(res => res.data),
		[accessToken]
	);

	const { data: records } = useSWR<Record[]>("/records/all", allRecordsFetcher);

	return (
		<div className="h-max">
			{!records || records.length === 0 ? <p className="text-xl text-grey">Zatím nemáte žádné evidence</p> : <RecordsTable records={records} />}
			<div className="mt-8 flex w-full items-center justify-end">
				<Link href="/records/new" passHref>
					<Button variant="primary">Nový záznam</Button>
				</Link>
			</div>
		</div>
	);
});

AllRecords.displayName = "AllRecords";

const RecordsHomeComponent: NextPage<DiscriminatedUnion<Record[]>> = ({ data: records, error }) => {
	const router = useRouter();

	useEffect(() => {
		if (error) {
			if (error.statusCode === 401) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			toast.error("Vyskytla se\xa0chyba během načítání evidenci");
		}
	}, [error, router]);

	if (!records || error) {
		return null;
	}

	return (
		<SWRConfig value={{ fallback: { "/records/all": records } }}>
			<AllRecords />
		</SWRConfig>
	);
};

export const Page = withDashboardLayout(RecordsHomeComponent, "Evidence odpadů");
