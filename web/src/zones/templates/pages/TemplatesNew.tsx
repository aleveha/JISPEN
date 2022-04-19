import { NextPage } from "next";
import { withLayout } from "@zones/shared/components/layout";
import { NewTemplateForm } from "@zones/templates/forms/newTemplateForm";

const CreateTemplatePage: NextPage = () => {
	return <NewTemplateForm />;
};

export default withLayout(CreateTemplatePage, "Nová šablona");
