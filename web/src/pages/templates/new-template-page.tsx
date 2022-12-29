import { CataloguesDto } from "@api/templates/dto";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { NewTemplateForm } from "@zones/templates/forms/new-template-form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

const CreateTemplatePage: NextPage<DiscriminatedUnion<CataloguesDto>> = ({ data: catalogues, error }) => {
	const router = useRouter();

	useEffect(() => {
		if (error) {
			if (error.statusCode === 401) {
				router.push("/login").then(() => toast.error("Musíte se nejdřív přihlásit"));
				return;
			}

			toast.error("Vyskytla se\xa0chyba během načítání číselníků");
		}
	}, [error, router]);

	if (error) {
		console.error(error);
		return null;
	}

	return <NewTemplateForm catalogues={catalogues} />;
};

export const Page = withDashboardLayout(CreateTemplatePage, "Nová šablona");
