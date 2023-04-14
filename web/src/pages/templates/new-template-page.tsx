import { CataloguesDto } from "@api/templates/dto";
import { Template } from "@api/templates/types";
import { withDashboardLayout } from "@shared/components/layout/layout";
import { DiscriminatedUnion } from "@shared/types/types";
import { NewTemplateForm } from "@zones/templates/forms/new-template-form";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { toast } from "react-hot-toast";

interface Props {
	catalogues: CataloguesDto;
	template: Template | null;
}

const CreateTemplatePage: NextPage<DiscriminatedUnion<Props>> = ({ data, error }) => {
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

	if (!data || error) {
		return null;
	}

	return <NewTemplateForm catalogues={data.catalogues} template={data.template ?? undefined} />;
};

export const Page = withDashboardLayout(CreateTemplatePage, "Nová šablona");
