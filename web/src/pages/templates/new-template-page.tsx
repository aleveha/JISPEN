import { withDashboardLayout } from "@shared/components/layout/layout";
import { NewTemplateForm } from "@zones/templates/forms/new-template-form";
import { NextPage } from "next";

const CreateTemplatePage: NextPage = () => {
	return <NewTemplateForm />;
};

export const Page = withDashboardLayout(CreateTemplatePage, "Nová šablona");
