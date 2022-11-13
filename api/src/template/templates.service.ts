import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AddressModel } from "../models/address.model";
import { MedicalCompanyModel } from "../models/medicalCompany.model";
import { TemplateModel } from "../models/template.model";
import { UserService } from "../user/user.service";
import { MedicalCompanyDto, TemplateDto } from "./dto/template.dto";

@Injectable()
export class TemplatesService {
	private readonly TEMPLATE_RELATIONS = [
		"user",
		"medicalCompany",
		"medicalCompany.address",
		"medicalCompany.templates",
		"medicalCompany.address.zipcode",
		"medicalCompany.territorialUnit",
		"loadingCodes",
		"wastes",
		"wasteCompanies",
		"wasteCompanies.territorialUnit",
	];

	public constructor(
		@InjectRepository(AddressModel)
		private readonly addressRepository: Repository<AddressModel>,
		@InjectRepository(MedicalCompanyModel)
		private readonly medicalCompanyRepository: Repository<MedicalCompanyModel>,
		@InjectRepository(TemplateModel)
		private readonly templateRepository: Repository<TemplateModel>,
		private readonly userService: UserService
	) {}

	public async getAll(email: string): Promise<TemplateModel[]> {
		return await this.templateRepository.find({
			where: { user: { email } },
			relations: this.TEMPLATE_RELATIONS,
			order: {
				id: "DESC",
			},
		});
	}

	public async create(template: TemplateDto, userEmail: string): Promise<TemplateModel> {
		const existedTemplate = await this.getUserTemplateByTitle(template.title, userEmail);
		if (existedTemplate) {
			throw new BadRequestException();
		}

		const { id: userId } = await this.userService.getUserByEmail(userEmail);

		const existedUserMedicalCompany = await this.getUserMedicalCompany(userEmail, template.medicalCompany.companyId, template.medicalCompany.uid);
		if (existedUserMedicalCompany) {
			template.medicalCompany = existedUserMedicalCompany;
			template.medicalCompanyId = existedUserMedicalCompany.id;
		} else {
			const newMedicalCompany = await this.createMedicalCompany({
				...template.medicalCompany,
				userId,
			});
			template.medicalCompany = newMedicalCompany;
			template.medicalCompanyId = newMedicalCompany.id;
		}

		return await this.createTemplate(
			{
				...template,
				userId,
			},
			userEmail
		);
	}

	public async delete(templateId: number): Promise<TemplateModel> {
		const templateToBeDeleted = await this.templateRepository.findOne({ id: templateId }, { relations: this.TEMPLATE_RELATIONS });
		if (!templateToBeDeleted) {
			throw new BadRequestException();
		}

		const result = await this.templateRepository.delete({ id: templateToBeDeleted.id });
		if (result.affected === 0) {
			throw new InternalServerErrorException();
		}

		for (const wasteCompany of templateToBeDeleted.wasteCompanies) {
			if (wasteCompany.addressId) {
				await this.addressRepository.delete(wasteCompany.addressId);
			}
		}

		if (templateToBeDeleted.medicalCompany.templates.length === 1 && templateToBeDeleted.medicalCompany.templates[0].id === templateToBeDeleted.id) {
			await this.medicalCompanyRepository.delete(templateToBeDeleted.medicalCompanyId);
			await this.addressRepository.delete(templateToBeDeleted.medicalCompany.addressId);
		}

		return templateToBeDeleted;
	}

	private async getUserTemplateByTitle(title: string, userEmail: string): Promise<TemplateModel> {
		return await this.templateRepository.findOne(
			{
				title: title,
				user: { email: userEmail },
			},
			{ relations: this.TEMPLATE_RELATIONS }
		);
	}

	private async getUserMedicalCompany(userEmail: string, medicalCompanyId: string, medicalCompanyUid: number): Promise<MedicalCompanyModel> {
		return await this.medicalCompanyRepository.findOne(
			{
				companyId: medicalCompanyId,
				uid: medicalCompanyUid,
				user: { email: userEmail },
			},
			{ relations: ["address", "address.zipcode", "territorialUnit", "user"] }
		);
	}

	private async createMedicalCompany(medicalCompany: MedicalCompanyDto): Promise<MedicalCompanyModel> {
		const newMedicalCompany = await this.medicalCompanyRepository.create(medicalCompany);
		return await this.medicalCompanyRepository.save(newMedicalCompany);
	}

	private async createTemplate(template: TemplateDto, userEmail: string): Promise<TemplateModel> {
		const newTemplate = await this.templateRepository.create(template);
		await this.templateRepository.save(newTemplate);
		return await this.getUserTemplateByTitle(newTemplate.title, userEmail);
	}
}
