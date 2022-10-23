import { AddressDTO, TemplateDTO } from "@api/templates/dto";
import { NewTemplateFormValues } from "@zones/templates/forms/types";

function mapAddress(address: NewTemplateFormValues["medicalCompany"]["address"]): AddressDTO {
	return {
		buildingNumber: address.buildingNumber && address.buildingNumber.length > 0 ? address.buildingNumber : undefined,
		city: address.city,
		registryNumber: address.registryNumber && address.registryNumber.length > 0 ? address.registryNumber : undefined,
		street: address.street,
		zipcodeId: parseInt(address.zipcode?.id ?? "0"),
	};
}

export function mapTemplateValues(values: NewTemplateFormValues): TemplateDTO {
	return {
		loadingCodes: values.loadingCodes,
		medicalCompany: {
			address: mapAddress(values.medicalCompany.address),
			companyId: values.medicalCompany.companyId,
			name: values.medicalCompany.name,
			territorialUnitId: parseInt(values.medicalCompany.territorialUnit?.id ?? "0"),
			uid: parseInt(values.medicalCompany.uid),
		},
		title: values.title,
		wasteCompanies: values.wasteCompanies.map(value => {
			const valuesRequired = value.type ? parseInt(value.type?.uid) !== 3 : true;
			return {
				...value,
				address: valuesRequired ? mapAddress(value.address) : undefined,
				companyId: valuesRequired ? value.companyId ?? undefined : undefined,
				expiredAt: value.expiredAt ? new Date(value.expiredAt) : undefined,
				name: valuesRequired ? value.companyId ?? undefined : undefined,
				territorialUnitId: parseInt(value.territorialUnit?.id ?? "0"),
				typeId: parseInt(value.type?.id ?? "0"),
				uid: valuesRequired ? parseInt(value.uid) ?? undefined : undefined,
			};
		}),
		wastes: values.wastes.filter(value => !!value.id),
	};
}
