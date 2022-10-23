import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { CreateRecordDto, Record } from "@api/records/types";
import { LoadingCode, Template, Waste, WasteCompany } from "@api/templates/types";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { Button } from "@shared/components/button/button";
import { Autocomplete } from "@shared/components/inputs/autocomplete";
import { DatePickerInput } from "@shared/components/inputs/date-picker";
import { Input } from "@shared/components/inputs/text-input";
import { useFormLeave } from "@shared/hooks/useFormLeave";
import { formatDecimal } from "@shared/utils/validator/helpers";
import { Validator } from "@shared/utils/validator/validator";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { LeaveEditorModal } from "@zones/common/components/leave-editor-modal";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import React, { FC, MouseEvent, useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";

interface NewRecordFormValues {
	template: Template | null;
	waste: Waste | null;
	loadingCode: LoadingCode | null;
	wasteCompany: WasteCompany | null;
	amount: string;
	date: string;
}

type MassUnit = "kg" | "t";

const defaultValues: NewRecordFormValues = {
	template: null,
	waste: null,
	loadingCode: null,
	wasteCompany: null,
	amount: "",
	date: "",
};

function mapRecordValues(values: NewRecordFormValues, massUnit: MassUnit): CreateRecordDto {
	const formattedAmount = parseFloat(formatDecimal(values.amount));
	const dayjsDate = dayjs(values.date);
	return {
		amount: massUnit === "t" ? formattedAmount : formattedAmount / 1000,
		date: dayjsDate.set("minute", dayjsDate.utcOffset()).toDate(),
		loadingCodeId: values.loadingCode?.id ?? 0,
		templateId: values.template?.id ?? 0,
		wasteId: values.waste?.id ?? 0,
		wasteCompanyId: values.wasteCompany?.id ?? null,
	};
}

interface Props {
	templates: Template[];
}

export const NewRecordForm: FC<Props> = ({ templates }) => {
	const [massUnit, setMassUnit] = useState<MassUnit>("kg");
	const [accessToken] = useAuth();
	const router = useRouter();
	const {
		control,
		formState: { isDirty, isSubmitSuccessful },
		handleSubmit,
		reset,
		watch,
	} = useForm<NewRecordFormValues>({ defaultValues, mode: "onChange" });

	const onSubmit = useCallback<SubmitHandler<NewRecordFormValues>>(
		values => {
			if (!accessToken) {
				return;
			}

			fetcher<Record, CreateRecordDto>({
				axiosInstance: apiClient,
				method: "post",
				url: "/records/create",
				accessToken,
				data: mapRecordValues(values, massUnit),
			})
				.then(res => {
					if (res.data) {
						router.push("/records").then(() => toast.success("Záznam byl úspěšně vytvořen"));
						return;
					}
					toast.error("Nepodařilo se vytvořit záznam");
				})
				.catch(() => toast.error("Nepodařilo se vytvořit záznam"));
		},
		[accessToken, massUnit, router]
	);
	const onExit = useCallback(() => router.back(), [router]);
	const onMassUnitChange = useCallback((_: MouseEvent<HTMLElement>, value: string) => setMassUnit(value as MassUnit), []);

	const selectedTemplate = watch("template");
	const loadingCode = watch("loadingCode");

	const [showModal, handleFormLeave] = useFormLeave(isDirty && !isSubmitSuccessful);

	useEffect(() => {
		if (!selectedTemplate) {
			reset();
		}
	}, [reset, selectedTemplate]);

	return (
		<>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
					<Autocomplete
						autocompleteProps={{
							getOptionLabel: (option: Template) => option.title,
							noOptionsText: "Žádná šablona nebyla nalezena",
						}}
						control={control}
						label="Vyberte šablonu"
						name="template"
						options={templates}
						required
					/>
					<DatePickerInput control={control} disabled={!selectedTemplate} label="Datum" name="date" required />
					<div className="relative">
						<Input
							className="w-full"
							control={control}
							disabled={!selectedTemplate}
							inputMode="numeric"
							label="Zadejte množství"
							name="amount"
							required
							rules={{
								maxLength: { value: 7, message: "Množství může mít maximálně 7 znaků" },
								pattern: { value: Validator.DECIMAL_REGEXP, message: "Pouze čislo" },
								validate: value => Validator.onlyPositiveNumber(value as string),
							}}
						/>
						<ToggleButtonGroup
							className="absolute top-0 bottom-0 right-0 h-fit"
							orientation="vertical"
							value={massUnit}
							exclusive
							onChange={onMassUnitChange}
						>
							<ToggleButton className="rounded-l-none py-1 text-[0.66rem] lowercase" value="t">
								t
							</ToggleButton>
							<ToggleButton className="rounded-l-none py-1 text-[0.66rem] lowercase" value="kg">
								kg
							</ToggleButton>
						</ToggleButtonGroup>
					</div>
					<Autocomplete
						autocompleteProps={{
							disabled: !selectedTemplate,
							getOptionLabel: (option: Waste) => `${option.uid} (${option.category}) \u2013 ${option.name}`,
							noOptionsText: "Žadný odpad nebyl nalezen",
						}}
						control={control}
						label="Vyberte odpad"
						name="waste"
						options={selectedTemplate?.wastes ?? []}
						required
					/>
					<Autocomplete
						autocompleteProps={{
							disabled: !selectedTemplate,
							getOptionLabel: (option: LoadingCode) => `${option.uid} \u2013 ${option.name}`,
							noOptionsText: "Žadný způsob nakladání nebyl nalezen",
						}}
						control={control}
						label="Vyberte způsob nakladání"
						name="loadingCode"
						options={selectedTemplate?.loadingCodes ?? []}
						required
					/>
					<Autocomplete
						autocompleteProps={{
							disabled: !selectedTemplate || !loadingCode?.requireWasteCompany,
							getOptionLabel: (option: WasteCompany) => option.name ?? `Občané obce ${option.territorialUnit.name}`,
							noOptionsText: "Žadná oprávněná osoba nebyla nalezena",
						}}
						control={control}
						label={loadingCode?.requireWasteCompany ? "Vyberte oprávněnou osobu" : "Oprávněná osoba není vyžadována"}
						name="wasteCompany"
						options={selectedTemplate?.wasteCompanies ?? []}
						required={loadingCode?.requireWasteCompany}
					/>
				</div>
				<div className="py-8">
					<div className="flex flex-col-reverse justify-end gap-6 md:flex-row">
						<Button onClick={onExit} variant="white">
							Zpět
						</Button>
						<Button type="submit" variant="secondary">
							Vytvořit záznam
						</Button>
					</div>
				</div>
			</form>
			<LeaveEditorModal isOpen={showModal} onClose={handleFormLeave(false)} onLeave={handleFormLeave(true)} />
		</>
	);
};
