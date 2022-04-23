import { NextPage } from "next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { toast } from "react-hot-toast";
import { Button } from "@ui/button";
import { getRecords } from "@api/records";
import { Record } from "@api/records/types";
import { userState } from "@state/user";
import { RecordsTable } from "@zones/records/components/table";
import { withLayout } from "@zones/shared/components/layout";
import { ButtonType } from "@ui/button/types";

const RecordsHomeComponent: NextPage = () => {
	const router = useRouter();
	const [user] = useRecoilState(userState);
	const [records, setRecords] = useState<Record[]>([]);

	useEffect(() => {
		if (!user) {
			router.push("/login");
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
	}, []);

	if (records.length == 0) {
		return <p className="text-xl text-grey">Zatím nemáte žádné evidenci</p>;
	}

	return (
		<div className="h-max">
			<RecordsTable data={records} onDataChange={setRecords} />
			<div className="w-full flex justify-end items-center mt-8">
				<Link href="/records/new" passHref>
					<Button variant={ButtonType.primary}>Nový záznam</Button>
				</Link>
			</div>
		</div>
	);
};

export default withLayout(RecordsHomeComponent, "Evidence odpadů");
