import React, { FC, ReactNode } from "react";

interface NewTemplateFormSectionProps {
	children: ReactNode;
	className?: string;
	title: string;
	description: string;
}

export const NewTemplateFormSection: FC<NewTemplateFormSectionProps> = ({ children, className, description, title }) => {
	return (
		<div className={className}>
			<div className="mb-6">
				<h3 className="text-2xl font-medium leading-8 text-primary">{title}</h3>
				<p className="mt-2 text-lg text-gray-500">{description}</p>
			</div>
			{children}
		</div>
	);
};
