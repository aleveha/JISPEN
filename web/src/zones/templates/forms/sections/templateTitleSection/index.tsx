import React, { FC } from "react";
import { Field } from "formik";
import { Input } from "@ui/input";
import { NewTemplateFormSection } from "@zones/templates/forms/newTemplateFormSection";

export const TemplateTitleSection: FC = () => {
	return (
		<NewTemplateFormSection description="Zadejte název nové šablony" title="Název šablony">
			<Field className="w-1/3 pt-6" component={Input} name="title" placeholder="Název šablony" />
		</NewTemplateFormSection>
	);
};
