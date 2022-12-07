import React, { FC, ReactNode } from "react";

interface NewTemplateFormSectionProps {
	children: ReactNode;
	className?: string;
	description: string;
	title: string;
	warning?: string;
}

export const NewTemplateFormSection: FC<NewTemplateFormSectionProps> = ({ children, className, description, title, warning }) => {
	return (
		<div className={className}>
			<div className="mb-8">
				<h3 className="text-2xl font-medium leading-8 text-primary">{title}</h3>
				<p className="mt-2 text-lg text-gray-500">{description}</p>
				<p className="mt-4 text-sm font-medium text-gray-500">{warning}</p>
			</div>
			{children}
		</div>
	);
};
