import { AddressDTO, TemplateDTO } from "@api/templates/dto";
import { Template } from "@api/templates/types";
import { NewTemplateFormValues } from "@zones/templates/forms/types";

function mapAddress(address: NewTemplateFormValues["medicalCompany"]["address"]): AddressDTO {
	return {
		buildingNumber: address.buildingNumber && address.buildingNumber.length > 0 ? address.buildingNumber : undefined,
		city: address.city,
		registryNumber: address.registryNumber && address.registryNumber.length > 0 ? address.registryNumber : undefined,
		street: address.street && address.street.length > 0 ? address.street : undefined,
		zipcodeId: address.zipcode?.id ? parseInt(address.zipcode.id) : undefined,
	};
}

export function mapTemplateValues(values: NewTemplateFormValues): TemplateDTO {
	return {
		loadingCodes: values.loadingCodes,
		medicalCompany: {
			address: mapAddress(values.medicalCompany.address),
			companyId: values.medicalCompany.companyId,
			contactEmail: values.medicalCompany.contactEmail,
			contactFirstName: values.medicalCompany.contactFirstName,
			contactLastName: values.medicalCompany.contactLastName,
			contactPhone: values.medicalCompany.contactPhone,
			name: values.medicalCompany.name,
			territorialUnitId: parseInt(values.medicalCompany.territorialUnit?.id ?? "0"),
			uid: parseInt(values.medicalCompany.uid),
		},
		title: values.title,
		wasteCompanies: values.wasteCompanies.map(value => {
			const valuesRequired = value.type ? parseInt(value.type.uid) !== 3 : true;
			return {
				...value,
				address: valuesRequired ? mapAddress(value.address) : undefined,
				companyId: valuesRequired ? value.companyId ?? undefined : undefined,
				expiredAt: value.expiredAt ? new Date(value.expiredAt) : undefined,
				name: valuesRequired ? value.name ?? undefined : undefined,
				territorialUnitId: parseInt(value.territorialUnit?.id ?? "0"),
				typeId: parseInt(value.type?.id ?? "0"),
				uid: valuesRequired ? parseInt(value.uid) ?? undefined : undefined,
			};
		}),
		wastes: values.wastes.filter(value => !!value.id),
	};
}

export function templateToDefaultValues(template: Template): NewTemplateFormValues {
	return {
		loadingCodes: template.loadingCodes,
		medicalCompany: {
			...template.medicalCompany,
			uid: template.medicalCompany.uid.toString(),
			territorialUnitId: template.medicalCompany.territorialUnitId.toString(),
			addressId: template.medicalCompany.addressId.toString(),
			address: {
				...template.medicalCompany.address,
				street: template.medicalCompany.address.street ?? "",
				registryNumber: template.medicalCompany.address.registryNumber ?? "",
				buildingNumber: template.medicalCompany.address.buildingNumber ?? "",
				zipcode: {
					...template.medicalCompany.address.zipcode,
					id: template.medicalCompany.address.zipcode?.id.toString() || "",
					uid: template.medicalCompany.address.zipcode?.uid.toString() || "",
					name: template.medicalCompany.address.zipcode?.name.toString() || "",
				},
			},
			contactEmail: template.medicalCompany.contactEmail ?? "",
			contactFirstName: template.medicalCompany.contactFirstName ?? "",
			contactLastName: template.medicalCompany.contactLastName ?? "",
			contactPhone: template.medicalCompany.contactPhone ?? "",
			territorialUnit: {
				...template.medicalCompany.territorialUnit,
				id: template.medicalCompany.territorialUnit?.id.toString() || "",
				uid: template.medicalCompany.territorialUnit?.uid.toString() || "",
			},
		},
		title: "",
		wasteCompanies: template.wasteCompanies.map(wc => ({
			...wc,
			uid: wc.uid?.toString() || "",
			companyId: wc.companyId?.toString() || "",
			name: wc.name ?? "",
			expiredAt: wc.expiredAt?.toISOString().split("T")[0] || "",
			address: {
				...wc.address,
				street: wc.address?.street ?? "",
				registryNumber: wc.address?.registryNumber ?? "",
				buildingNumber: wc.address?.buildingNumber ?? "",
				city: wc.address?.city ?? "",
				zipcode: {
					...wc.address?.zipcode,
					id: wc.address?.zipcode?.id.toString() || "",
					uid: wc.address?.zipcode?.uid.toString() || "",
					name: wc.address?.zipcode?.name.toString() || "",
				},
			},
			territorialUnit: {
				...wc.territorialUnit,
				id: wc.territorialUnit?.id.toString() || "",
				uid: wc.territorialUnit?.uid.toString() || "",
			},
			type: {
				...wc.type,
				id: wc.type?.id.toString() || "",
				uid: wc.type?.uid.toString() || "",
			},
		})),
		wastes: template.wastes,
	};
}
