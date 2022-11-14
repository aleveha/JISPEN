import { apiClient } from "@api/config";
import { fetcher } from "@api/index";
import { CataloguesDto, TemplateDTO } from "@api/templates/dto";
import { Template, TerritorialUnit, Zipcode } from "@api/templates/types";
import { Divider } from "@mui/material";
import { Button } from "@shared/components/button/button";
import { Autocomplete } from "@shared/components/inputs/autocomplete";
import { Input } from "@shared/components/inputs/text-input";
import { useFormLeave } from "@shared/hooks/useFormLeave";
import { Validator } from "@shared/utils/validator/validator";
import { useAuth } from "@zones/authorization/hooks/useAuth";
import { LeaveEditorModal } from "@zones/common/components/leave-editor-modal";
import { mapTemplateValues } from "@zones/templates/forms/mapper";
import { NewTemplateFormSection } from "@zones/templates/forms/new-template-form-section";
import { newTemplateFormDefaultValues, NewTemplateFormValues, wasteCompanyDefaultValue } from "@zones/templates/forms/types";
import clsx from "clsx";
import { useRouter } from "next/router";
import React, { memo, useCallback, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { LoadingCodesSectionTable } from "./sections/loading-codes-section-table";
import { WasteCompaniesArray } from "./sections/waste-companies-array";
import { WasteSectionTable } from "./sections/waste-section-table";

interface Props {
	catalogues: CataloguesDto;
}

export const NewTemplateForm = memo<Props>(({ catalogues }) => {
	const [accessToken] = useAuth();
	const router = useRouter();
	const [isSubmitting, setIsSubmitting] = useState(false);

	const {
		control,
		formState: { isDirty, isSubmitSuccessful, isValid },
		handleSubmit,
		watch,
	} = useForm<NewTemplateFormValues>({
		defaultValues: newTemplateFormDefaultValues,
		mode: "onChange",
	});

	const onSubmit = useCallback<SubmitHandler<NewTemplateFormValues>>(
		async values => {
			setIsSubmitting(true);
			if (!accessToken) {
				return;
			}

			const { error } = await fetcher<Template, TemplateDTO>({
				axiosInstance: apiClient,
				method: "post",
				url: "/templates/create",
				data: mapTemplateValues(values),
				accessToken,
			});

			if (error) {
				setIsSubmitting(false);
				if (error.statusCode === 400) {
					toast.error("Šablona s tímto názvem již existuje");
					return;
				}

				toast.error("Nepodařilo se vytvořit šablonu");
				return;
			}

			setIsSubmitting(false);
			router.push("/templates").then(() => toast.success("Šablona úspěšně vytvořena"));
		},
		[router, accessToken]
	);

	const [showModal, handleFormLeave] = useFormLeave((isDirty || isValid) && (!isSubmitSuccessful || !isSubmitting));

	const onExit = useCallback(() => {
		router.back();
	}, [router]);

	const requireWasteCompany = watch("loadingCodes").some(code => code.requireWasteCompany);

	return (
		<>
			<form noValidate onSubmit={handleSubmit(onSubmit)}>
				<div className="space-y-6">
					<NewTemplateFormSection description="Zadejte název nové šablony" title="Název šablony">
						<Input
							className="w-full max-w-lg"
							control={control}
							label="Název šablony"
							name="title"
							required
							rules={{ minLength: { value: 3, message: "Název musí obsahovat alespoň 3 znaky" } }}
						/>
					</NewTemplateFormSection>
					<Divider />
					<NewTemplateFormSection
						description="Zadejte prosím údaje o&nbsp;provozovně, za&nbsp;kterou bude vedena evidence včetně kontaktní osoby"
						title="Provozovna"
					>
						<div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
							<Input
								control={control}
								label="Název provozovny"
								name="medicalCompany.name"
								required
								rules={{ minLength: { value: 3, message: "Název musí obsahovat alespoň 3 znaky" } }}
							/>
							<Input
								control={control}
								inputMode="numeric"
								label="IČO"
								name="medicalCompany.uid"
								required
								rules={{
									pattern: { value: Validator.NUMBER_REGEXP, message: "Pouze čislo" },
									validate: value => Validator.onlyPositiveNumber(value as string),
								}}
							/>
							<Input control={control} label="IČZ/IČS/IČP" name="medicalCompany.companyId" required />
							<Input control={control} label="Město" name="medicalCompany.address.city" required />
							<Input control={control} label="Ulice" name="medicalCompany.address.street" required />
							<div className="flex space-x-6">
								<Input className="min-w-[5rem]" control={control} label="Č.P." name="medicalCompany.address.registryNumber" />
								<Input className="min-w-[5rem]" control={control} label="Č.0." name="medicalCompany.address.buildingNumber" />
							</div>
							<Autocomplete
								autocompleteProps={{
									getOptionLabel: (option: TerritorialUnit) => (option.uid === 0 ? "" : `${option.uid} \u2013 ${option.name}`),
									noOptionsText: "Žádný ZÚJ nebyl nalezen",
								}}
								control={control}
								label="ZÚJ"
								name="medicalCompany.territorialUnit"
								options={catalogues.territorialUnits ?? []}
								required
							/>
							<Autocomplete
								autocompleteProps={{
									getOptionLabel: (option: Zipcode) => (option.uid === 0 ? "" : `${option.uid} \u2013 ${option.name}`),
									noOptionsText: "Žádný PSČ nebyl nalezen",
								}}
								control={control}
								label="PSČ"
								name="medicalCompany.address.zipcode"
								options={catalogues.zipcodes ?? []}
								required
							/>
						</div>
						<div className="grid grid-cols-1 gap-x-6 gap-y-2 md:grid-cols-2 lg:grid-cols-3">
							<p className="col-span-2 mb-2 text-xl font-medium text-primary">Kontaktní osoba</p>
							<Input
								className="col-span-2 md:col-span-1 md:col-start-1"
								control={control}
								label="Jméno"
								name="medicalCompany.contactFirstName"
							/>
							<Input
								className="col-span-2 md:col-span-1 md:col-start-2"
								control={control}
								label="Příjmení"
								name="medicalCompany.contactLastName"
							/>
							<Input
								className="col-span-2 md:col-span-1 md:col-start-1"
								control={control}
								inputMode="numeric"
								label="Telefon"
								name="medicalCompany.contactPhone"
								type="tel"
							/>
							<Input
								className="col-span-2 md:col-span-1 md:col-start-2"
								control={control}
								label="E-mail"
								name="medicalCompany.contactEmail"
								type="email"
							/>
						</div>
					</NewTemplateFormSection>
					<Divider />
					<NewTemplateFormSection
						description="Vyberte, prosím, odpady ze&nbsp;seznamu, které&nbsp;budou povolené při&nbsp;evidovaní za&nbsp;tuto provozovnu"
						title="Povolené odpady"
					>
						<WasteSectionTable control={control} name="wastes" wastes={catalogues.wastes} />
					</NewTemplateFormSection>
					<Divider />
					<NewTemplateFormSection
						description="Vyberte, prosím, kódy nakladání ze&nbsp;seznamu, které&nbsp;budou povolené při&nbsp;evidovaní za&nbsp;tuto provozovnu"
						title="Kódy nakládání"
					>
						<LoadingCodesSectionTable control={control} name="loadingCodes" loadingCodes={catalogues.loadingCodes} />
					</NewTemplateFormSection>
					<Divider />
					<NewTemplateFormSection
						className={clsx(!requireWasteCompany && "hidden")}
						description="Zadejte, prosím, všechny opravněné osoby, které&nbsp;mohou z&nbsp;provozovny převzít odpad, nebo jej na&nbsp;provozovnu předat"
						title="Oprávněné osoby (partner)"
					>
						<WasteCompaniesArray
							control={control}
							name="wasteCompanies"
							requireWasteCompany={requireWasteCompany}
							territorialUnits={catalogues.territorialUnits}
							wasteCompanyDefaultValue={wasteCompanyDefaultValue}
							wasteCompanyTypes={catalogues.wasteCompanyTypes}
							zipcodes={catalogues.zipcodes}
						/>
					</NewTemplateFormSection>
					<Divider className={clsx(!requireWasteCompany && "hidden")} />
				</div>
				<div className="py-8">
					<div className="flex flex-col-reverse justify-end gap-6 md:flex-row">
						<Button onClick={onExit} variant="white">
							Zpět
						</Button>
						<Button type="submit" variant="secondary">
							Uložit šablonu
						</Button>
					</div>
				</div>
			</form>
			<LeaveEditorModal isOpen={showModal} onClose={handleFormLeave(false)} onLeave={handleFormLeave(true)} />
		</>
	);
});

NewTemplateForm.displayName = "NewTemplateForm";
