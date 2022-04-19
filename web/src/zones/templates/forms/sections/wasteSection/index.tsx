import React, { FC } from "react";
import { FieldArray } from "formik";
import { Table, TableHeader, TableHeaderCell } from "@zones/shared/components/table";
import { NewTemplateFormSection } from "@zones/templates/forms/newTemplateFormSection";
import { WasteSectionTableBody } from "./tableBody";
import { WasteSectionProps } from "./types";

export const WasteSection: FC<WasteSectionProps> = ({ wastes }) => {
	return (
		<NewTemplateFormSection
			description="Vyberte, prosím, odpady ze&nbsp;seznamu, které&nbsp;budou povolené při&nbsp;evidovaní za&nbsp;tuto provozovnu"
			title="Povolené odpady"
		>
			<Table className="mt-4 max-h-[500px]">
				<TableHeader>
					<TableHeaderCell />
					<TableHeaderCell>Odpad</TableHeaderCell>
					<TableHeaderCell>Druh</TableHeaderCell>
					<TableHeaderCell>Název odpadu</TableHeaderCell>
					<TableHeaderCell>Osvědčení</TableHeaderCell>
				</TableHeader>
				<FieldArray name="wastes">
					{arrayHelpers => <WasteSectionTableBody {...arrayHelpers} wastes={wastes} />}
				</FieldArray>
			</Table>
		</NewTemplateFormSection>
	);
};
