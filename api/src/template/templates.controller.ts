import { Body, Controller, Delete, Get, HttpCode, Post, Query } from "@nestjs/common";
import { LoadingCodeModel } from "../models/loadingCode.model";
import { TemplateModel } from "../models/template.model";
import { TerritorialUnitModel } from "../models/territorialUnit.model";
import { WasteModel } from "../models/waste.model";
import { WasteCompanyTypeModel } from "../models/wasteCompanyType.model";
import { ZipcodeModel } from "../models/zipcode.model";
import { CatalogueService } from "./catalogue.service";
import { TemplateDto } from "./dto/templateDto";
import { TemplatesService } from "./templates.service";

@Controller("template")
export class TemplatesController {
	constructor(private readonly catalogueService: CatalogueService, private readonly templateService: TemplatesService) {}

	@Get("all")
	async getAllUserTemplates(@Query("userId") userId: number): Promise<TemplateModel[]> {
		return await this.templateService.getAll(userId);
	}

	@Post("create")
	@HttpCode(200)
	async createNewTemplate(@Body() request: TemplateDto): Promise<TemplateModel> {
		return await this.templateService.create(request);
	}

	@Delete("delete")
	@HttpCode(200)
	async deleteTemplate(@Query("id") templateId: number): Promise<TemplateModel> {
		return await this.templateService.delete(templateId);
	}

	@Get("loading-codes")
	async getLoadingCodes(): Promise<LoadingCodeModel[]> {
		return await this.catalogueService.getLoadingCodes();
	}

	@Get("territorial-units")
	async getTerritorialUnits(): Promise<TerritorialUnitModel[]> {
		return await this.catalogueService.getTerritorialUnits();
	}

	@Get("waste")
	async getWaste(): Promise<WasteModel[]> {
		return await this.catalogueService.getWaste();
	}

	@Get("waste-company-types")
	async getWasteCompanyTypes(): Promise<WasteCompanyTypeModel[]> {
		return await this.catalogueService.getWasteCompanyTypes();
	}

	@Get("zipcodes")
	async getZipcodes(): Promise<ZipcodeModel[]> {
		return await this.catalogueService.getZipCodes();
	}
}
