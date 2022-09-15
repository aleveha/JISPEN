import { createRecord } from "@api/records";
import { CreateRecordDto } from "@api/records/types";
import { getUserTemplates } from "@api/templates";
import { LoadingCode, Template, Waste, WasteCompany } from "@api/templates/types";
import { Button } from "@shared/components/button/button";
import { Autocomplete } from "@shared/components/inputs/autocomplete";
import { Input } from "@shared/components/inputs/text-input";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect, useState } from "react";
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

const defaultValues: NewRecordFormValues = {
	template: null,
	waste: null,
	loadingCode: null,
	wasteCompany: null,
	amount: "",
	date: "",
};

function mapRecordValues(values: NewRecordFormValues): CreateRecordDto {
	return {
		amount: parseInt(values.amount) ?? 0,
		date: new Date(values.date),
		loadingCodeId: values.loadingCode?.id ?? 0,
		templateId: values.template?.id ?? 0,
		wasteId: values.waste?.id ?? 0,
		wasteCompanyId: values.wasteCompany?.id ?? 0,
	};
}

export const NewRecordForm: FC = () => {
	const [templates, setTemplates] = useState<Template[]>([]);
	const user = useAuth();
	const router = useRouter();
	const { control, handleSubmit, watch } = useForm<NewRecordFormValues>({
		defaultValues,
	});

	useEffect(() => {
		if (!user) {
			return;
		}
		getUserTemplates(user.id).then(res => {
			if (res.data) {
				setTemplates(res.data);
			}
		});
	}, [user]);

	const onSubmit = useCallback<SubmitHandler<NewRecordFormValues>>(
		values => {
			createRecord(mapRecordValues(values)).then(res => {
				if (res.data) {
					router.push("/records").then(() => toast.success("Záznam byl úspěšně vytvořen"));
					return;
				}
				toast.error("Nepodařilo se vytvořit záznam");
			});
		},
		[router]
	);

	const onExit = useCallback(() => router.back(), [router]);

	const selectedTemplate = watch("template");

	return (
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
				<Autocomplete
					autocompleteProps={{
						disabled: !selectedTemplate,
						getOptionLabel: (option: Waste) => `${option.uid} (${option.category})`,
						noOptionsText: "Žadný odpad nebyl nalezen",
					}}
					control={control}
					label="Vyberte odpad"
					name="waste"
					options={selectedTemplate?.wastes ?? []}
					required
				/>
				<Input
					control={control}
					disabled={!selectedTemplate}
					label="Zadejte množství (tuny)"
					name="amount"
					required
					type="number"
				/>
				<Autocomplete
					autocompleteProps={{
						disabled: !selectedTemplate,
						getOptionLabel: (option: LoadingCode) => option.uid.toString(),
						noOptionsText: "Žadný způsob nakladání nebyl nalezen",
					}}
					control={control}
					label="Vyberte způsob nakladání"
					name="loadingCode"
					options={selectedTemplate?.loadingCodes ?? []}
					required
				/>
				<Input control={control} disabled={!selectedTemplate} name="date" required type="date" />
				<Autocomplete
					autocompleteProps={{
						disabled: !selectedTemplate,
						getOptionLabel: (option: WasteCompany) => option.name,
						noOptionsText: "Žadná oprávněná osoba nebyla nalezena",
					}}
					control={control}
					label="Vyberte oprávněnou osobu"
					name="wasteCompany"
					options={selectedTemplate?.wasteCompanies ?? []}
					required
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
	);
};
