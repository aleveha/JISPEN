import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { MedicalCompany } from "@api/templates/types";
import { Button } from "@shared/components/button/button";
import { Autocomplete } from "@shared/components/inputs/autocomplete";
import { DatePickerInput } from "@shared/components/inputs/date-picker";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import fileDownload from "js-file-download";
import React, { memo, useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface ExportFormValues {
	dateFrom: Date | string;
	dateTo: Date | string;
	medicalCompany: MedicalCompany | null;
}

interface Props {
	medicalCompanies: MedicalCompany[];
}

export const ExportForm = memo<Props>(({ medicalCompanies }) => {
	const accessToken = getCookie("accessToken") as string;

	const { control, handleSubmit } = useForm<ExportFormValues>({
		defaultValues: { dateFrom: "", dateTo: "", medicalCompany: null },
		mode: "onChange",
	});

	const onSubmit = useCallback<SubmitHandler<ExportFormValues>>(
		({ dateFrom, dateTo, medicalCompany }) => {
			if (!medicalCompany) {
				toast.error("Prosím vyberte provozovnu");
				return;
			}

			fetcher<string>({
				axiosInstance: apiClient,
				method: "post",
				url: "/export/xml",
				data: {
					dateFrom,
					dateTo: dayjs(dateTo).add(1, "day").toDate(),
					medicalCompanyId: medicalCompany.id,
				},
				accessToken,
			})
				.then(res => {
					if (res.error?.statusCode === 404) {
						toast.error("Žádné záznamy nebyly nalezeny");
						return;
					}

					if (res.data) {
						fileDownload(res.data, "export.xml");
					}
				})
				.catch(() => toast.error("Nastala chyba při exportu"));
		},
		[accessToken]
	);

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-6 grid grid-cols-1 gap-y-4 md:max-w-[30rem]">
				<Autocomplete
					control={control}
					required
					label="Vyberte provozovnu"
					name="medicalCompany"
					options={medicalCompanies}
					autocompleteProps={{
						getOptionLabel: (option: MedicalCompany) => `${option.name} (IČO: ${option.uid})`,
						noOptionsText: "Žádná provozovna nebyla nalezena",
					}}
				/>
				<DatePickerInput control={control} label="Datum od" name="dateFrom" />
				<DatePickerInput control={control} label="Datum do" name="dateTo" />
			</div>
			<div className="flex justify-end md:max-w-[30rem]">
				<Button variant="secondary" type="submit">
					Exportovat
				</Button>
			</div>
		</form>
	);
});

ExportForm.displayName = "ExportForm";
