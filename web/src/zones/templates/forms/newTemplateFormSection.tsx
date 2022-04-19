import React, { FC } from "react";

interface NewTemplateFormSectionProps {
	title: string;
	description: string;
}

export const NewTemplateFormSection: FC<NewTemplateFormSectionProps> = ({ children, description, title }) => {
	return (
		<div className="pt-6">
			<div>
				<h3 className="text-2xl leading-8 font-medium text-primary">{title}</h3>
				<p className="mt-2 text-lg text-gray-500">{description}</p>
			</div>
			{children}
		</div>
	);
};
