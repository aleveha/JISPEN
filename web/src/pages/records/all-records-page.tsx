import { getRecords } from "@api/records";
import { Record } from "@api/records/types";
import { Button } from "@shared/components/button/button";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { RecordsTable } from "@zones/records/components/records-table";
import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const RecordsHomeComponent: NextPage = () => {
	const router = useRouter();
	const user = useAuth();
	const [records, setRecords] = useState<Record[] | null>(null);

	useEffect(() => {
		if (!user) {
			return;
		}
		getRecords(user.id)
			.then(response => {
				if (response.data) {
					setRecords(response.data);
					return;
				}

				if (response.error) {
					toast.error("Vyskytla se\xa0chyba během načítání evidenci");
					return;
				}
			})
			.catch(() => {
				toast.error("Vyskytla se\xa0chyba během načítání evidenci");
			});
	}, [router, user]);

	return (
		<div className="h-max">
			{!records || records.length === 0 ? (
				<p className="text-xl text-grey">Zatím nemáte žádné evidence</p>
			) : (
				<RecordsTable data={records} onDataChange={setRecords} />
			)}
			<div className="mt-8 flex w-full items-center justify-end">
				<Link href="/records/new" passHref>
					<Button variant="primary">Nový záznam</Button>
				</Link>
			</div>
		</div>
	);
};

export default withDashboardLayout(RecordsHomeComponent, "Evidence odpadů");
