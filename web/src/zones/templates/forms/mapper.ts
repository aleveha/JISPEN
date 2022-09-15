import { User } from "@api/authorization/types";
import { TemplateDTO } from "@api/templates/dto";
import { NewTemplateFormValues } from "@zones/templates/forms/types";

export function mapTemplateValues(values: NewTemplateFormValues, user: User): TemplateDTO {
	return {
		loadingCodes: values.loadingCodes,
		medicalCompany: {
			address: {
				buildingNumber: values.medicalCompany.address.buildingNumber,
				city: values.medicalCompany.address.city,
				registryNumber: values.medicalCompany.address.registryNumber,
				street: values.medicalCompany.address.street,
				zipcodeId: parseInt(values.medicalCompany.address.zipcode?.id ?? "0"),
			},
			companyId: values.medicalCompany.companyId,
			name: values.medicalCompany.name,
			territorialUnitId: parseInt(values.medicalCompany.territorialUnit?.id ?? "0"),
			uid: parseInt(values.medicalCompany.uid),
			userId: user.id,
		},
		title: values.title,
		userId: user.id,
		wasteCompanies: values.wasteCompanies.map(value => ({
			...value,
			uid: Number(value.uid),
			territorialUnitId: parseInt(value.territorialUnit?.id ?? "0"),
			userId: user.id,
			type: Number(value.type),
			expiredAt: value.expiredAt ? new Date(value.expiredAt) : undefined,
			address: {
				...value.address,
				zipcodeId: parseInt(value.address.zipcode?.id ?? "0"),
			},
		})),
		wastes: values.wastes.filter(value => !!value.id),
	};
}
