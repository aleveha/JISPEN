import { MedicalCompany } from "@api/templates/types";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { ExportForm } from "@zones/export/export-form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { toast } from "react-hot-toast";

const ExportPageComponent: NextPage<DiscriminatedUnion<MedicalCompany[]>> = ({ data: medicalCompanies, error }) => {
	const router = useRouter();

	useEffect(() => {
		if (error) {
			if (error.statusCode === 401) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			toast.error("Vyskytla se\xa0chyba během načítání provozoven");
		}
	}, [error, router]);

	if (!medicalCompanies || error) {
		return null;
	}

	return <ExportForm medicalCompanies={medicalCompanies} />;
};

export const Page = withDashboardLayout(ExportPageComponent, "Export");
