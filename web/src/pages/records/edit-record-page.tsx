import { Record } from "@api/records/types";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { EditRecordForm } from "@zones/records/forms/edit-record-form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const EditRecordPage: NextPage<DiscriminatedUnion<Record>> = ({ data: record, error }) => {
	const router = useRouter();

	useEffect(() => {
		if (error) {
			if (error.statusCode === 401) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			if (error.statusCode === 400) {
				router.push("/records").then(() => toast.error("Evidence nebyla nalezena"));
				return;
			}

			toast.error("Vyskytla se\xa0chyba během načítání evidence");
		}
	}, [error, router]);

	if (!record || error) {
		return null;
	}

	return <EditRecordForm record={record} templates={[record.template]} />;
};

export const Page = withDashboardLayout(EditRecordPage, "Oprava záznamu");
