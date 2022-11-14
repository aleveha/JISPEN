import { apiClient } from "@api/config";
import { ExportDto } from "@api/export/dto";
import { fetcher } from "@api/index";
import { MedicalCompany } from "@api/templates/types";
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup, Tooltip } from "@mui/material";
import { Button } from "@shared/components/button/button";
import { Autocomplete } from "@shared/components/inputs/autocomplete";
import { CheckboxInput } from "@shared/components/inputs/checkbox";
import { DatePickerInput } from "@shared/components/inputs/date-picker";
import { Input } from "@shared/components/inputs/text-input";
import { getCookie } from "cookies-next";
import dayjs from "dayjs";
import fileDownload from "js-file-download";
import React, { memo, useCallback, useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface ExportFormValues {
	dateFrom: Date | string;
	dateTo: Date | string;
	eightDigitCodesAllowed: boolean;
	exportAll: boolean;
	exportType: "download" | "email";
	fileType: "xml" | "xlsx";
	medicalCompany: MedicalCompany | null;
	recipientEmail: string;
}

interface Props {
	medicalCompanies: MedicalCompany[];
}

const defaultValues: ExportFormValues = {
	dateFrom: "",
	dateTo: "",
	eightDigitCodesAllowed: true,
	exportAll: false,
	exportType: "download",
	fileType: "xml",
	medicalCompany: null,
	recipientEmail: "",
};

function getDateString(date: Date, withTime = false) {
	return dayjs(date).format(withTime ? "DD-MM-YYYY_HH-mm" : "DD-MM-YYYY");
}

function createFileName(fileType: ExportDto["fileType"], medicalCompany: MedicalCompany | null, date?: ExportDto["date"]) {
	return (
		[
			medicalCompany ? `Provozovna-IČO-${medicalCompany.uid}` : "Všechny-provozovny",
			date ? `${getDateString(date.from)}_${getDateString(date.to)}` : getDateString(new Date(), true),
		].join("_") + `.${fileType}`
	);
}

function mapFormValuesToDto({
	dateFrom,
	dateTo,
	exportType,
	fileType,
	medicalCompany,
	recipientEmail,
	eightDigitCodesAllowed,
}: ExportFormValues): ExportDto {
	const dto: ExportDto = {
		fileType,
		exportType,
		eightDigitCodesAllowed,
	};

	if (dateFrom && dateTo) {
		const dateFromOffset = dayjs(dateFrom).utcOffset();
		const dateFromTo = dayjs(dateTo).utcOffset();

		dto.date = {
			from: dayjs(dateFrom).add(dateFromOffset, "minute").toDate(),
			to: dayjs(dateTo).add(dateFromTo, "minute").add(1, "day").toDate(),
		};
	}

	if (medicalCompany) {
		dto.medicalCompanyId = medicalCompany.id;
	}

	if (recipientEmail) {
		dto.recipientEmail = recipientEmail;
	}

	return dto;
}

export const ExportForm = memo<Props>(({ medicalCompanies }) => {
	const [isLoading, setIsLoading] = useState(false);

	const accessToken = getCookie("accessToken") as string;

	const { control, handleSubmit, watch, resetField } = useForm<ExportFormValues>({ defaultValues, mode: "onChange" });

	const onSubmit = useCallback<SubmitHandler<ExportFormValues>>(
		async values => {
			if (values.dateTo && values.dateFrom && dayjs(values.dateTo).isBefore(values.dateFrom)) {
				return toast.error("Datum do musí být větší než datum od");
			}

			setIsLoading(true);

			const loadingToastId = toast.loading("Exportuji...");
			const dataDto = mapFormValuesToDto(values);

			const { data, error } = await fetcher<Blob, ExportDto>({
				axiosInstance: apiClient,
				method: "post",
				url: "/export",
				data: dataDto,
				accessToken,
				config: {
					responseType: "blob",
				},
			});

			if (error) {
				toast.error(error.statusCode === 404 ? "Žádné záznamy nebyly nalezeny" : "Nastala chyba při exportu", {
					id: loadingToastId,
				});
				setIsLoading(false);
				return;
			}

			switch (values.exportType) {
				case "download":
					toast.success("Soubor byl úspěšně stažen", { id: loadingToastId });
					fileDownload(data, createFileName(values.fileType, values.medicalCompany, dataDto.date));
					break;
				case "email":
					toast.success("Soubor byl úspěšně odeslán", { id: loadingToastId });
					break;
			}

			setIsLoading(false);
		},
		[accessToken]
	);

	const [exportAll, exportType, dateFrom, dateTo] = watch(["exportAll", "exportType", "dateFrom", "dateTo"]);

	useEffect(() => {
		resetField("medicalCompany");
	}, [exportAll, resetField]);

	return (
		<form noValidate onSubmit={handleSubmit(onSubmit)}>
			<div className="mb-6 grid grid-cols-1 gap-y-4 md:max-w-[30rem]">
				<FormControlLabel control={<CheckboxInput control={control} name="exportAll" />} label="Exportovat všechny provozovny" />
				<Autocomplete
					autocompleteProps={{
						disabled: exportAll,
						getOptionLabel: (option: MedicalCompany) => `${option.name} (IČO:\xa0${option.uid}, IČZ/IČS/IČP:\xa0${option.companyId})`,
						noOptionsText: "Žádná provozovna nebyla nalezena",
					}}
					control={control}
					label="Vyberte provozovnu"
					name="medicalCompany"
					options={medicalCompanies}
					required={!exportAll}
				/>
				<DatePickerInput control={control} label="Datum od" name="dateFrom" required={!!dateTo} />
				<DatePickerInput control={control} label="Datum do" name="dateTo" required={!!dateFrom} />
				<div className="flex justify-between">
					<FormControl>
						<FormLabel>Export dat do:</FormLabel>
						<Controller
							control={control}
							name="fileType"
							render={({ field }) => (
								<RadioGroup defaultValue="xml" {...field}>
									<FormControlLabel value="xml" control={<Radio />} label="IS Envita" />
									<FormControlLabel value="xlsx" control={<Radio />} label="Excel" />
								</RadioGroup>
							)}
						/>
					</FormControl>
					<FormControl>
						<FormLabel>Způsob exportu</FormLabel>
						<Controller
							control={control}
							name="exportType"
							render={({ field }) => (
								<RadioGroup defaultValue="download" {...field}>
									<FormControlLabel value="download" control={<Radio />} label="Stáhnout" />
									<FormControlLabel value="email" control={<Radio />} label="Odeslat e-mailem" />
								</RadioGroup>
							)}
						/>
					</FormControl>
				</div>
				{exportType === "email" && <Input control={control} label="E-mailová adresa příjemce" name="recipientEmail" required type="email" />}
				<FormControlLabel
					control={<CheckboxInput control={control} name="eightDigitCodesAllowed" />}
					label={
						<Tooltip arrow className="w-fit" placement="top" title="Osmimístná katalogová čísla">
							<span>Zahrnout záznamy s&nbsp;poddruhy odpadů</span>
						</Tooltip>
					}
				/>
			</div>
			<div className="flex justify-end md:max-w-[30rem]">
				<Button loading={isLoading} variant="secondary" type="submit">
					Exportovat
				</Button>
			</div>
		</form>
	);
});

ExportForm.displayName = "ExportForm";
