import { Template } from "@api/templates/types";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { NewRecordForm } from "@zones/records/forms/new-record-form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const CreateRecordPage: NextPage<DiscriminatedUnion<Template[]>> = ({ data: templates, error }) => {
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

	return <NewRecordForm templates={templates} />;
};

export const Page = withDashboardLayout(CreateRecordPage, "Nová evidence");
