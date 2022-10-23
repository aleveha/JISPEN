import { Record } from "@api/records/types";
import { Button } from "@shared/components/button/button";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { RecordsTable } from "@zones/records/components/records-table";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const RecordsHomeComponent: NextPage<DiscriminatedUnion<Record[]>> = ({ data, error }) => {
	const router = useRouter();
	const [records, setRecords] = useState<Record[] | null>(data ?? null);
	const onDataChanged = useCallback((records: Record[]) => setRecords(records), []);

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
		<div className="h-max">
			{!records || records.length === 0 ? (
				<p className="text-xl text-grey">Zatím nemáte žádné evidence</p>
			) : (
				<RecordsTable data={records} onDataChange={onDataChanged} />
			)}
			<div className="mt-8 flex w-full items-center justify-end">
				<Link href="/records/new" passHref>
					<Button variant="primary">Nový záznam</Button>
				</Link>
			</div>
		</div>
	);
};

export const Page = withDashboardLayout(RecordsHomeComponent, "Evidence odpadů");
