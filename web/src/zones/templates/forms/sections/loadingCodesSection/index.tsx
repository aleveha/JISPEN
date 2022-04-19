import React, { FC } from "react";
import { FieldArray } from "formik";
import { Table, TableHeader, TableHeaderCell } from "@zones/shared/components/table";
import { NewTemplateFormSection } from "@zones/templates/forms/newTemplateFormSection";
import { LoadingCodesSectionTableBody } from "./tableBody";
import { LoadingCodesSectionProps } from "./types";

export const LoadingCodesSection: FC<LoadingCodesSectionProps> = ({ loadingCodes }) => {
	return (
		<NewTemplateFormSection
			description="Vyberte, prosím, kódy nakladání ze&nbsp;seznamu, které&nbsp;budou povolené při&nbsp;evidovaní za&nbsp;tuto provozovnu"
			title="Kódy nakládání"
		>
			<Table className="mt-4">
				<TableHeader>
					<TableHeaderCell />
					<TableHeaderCell>Kód</TableHeaderCell>
					<TableHeaderCell>Název kódu nakládání</TableHeaderCell>
				</TableHeader>
				<FieldArray name="loadingCodes">
					{arrayHelpers => <LoadingCodesSectionTableBody {...arrayHelpers} loadingCodes={loadingCodes} />}
				</FieldArray>
			</Table>
		</NewTemplateFormSection>
	);
};
