import { Body, Controller, Delete, Get, HttpCode, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserEmail } from "../decorators/user-email.decorator";
import { TemplateModel } from "../models/template.model";
import { CatalogueService } from "./catalogue.service";
import { CataloguesDto, TemplateDto } from "./dto/template.dto";
import { TemplatesService } from "./templates.service";

@Controller("templates")
export class TemplatesController {
	constructor(private readonly catalogueService: CatalogueService, private readonly templateService: TemplatesService) {}

	@UseGuards(JwtAuthGuard)
	@Get("all")
	async getAllUserTemplates(@UserEmail() email: string): Promise<TemplateModel[]> {
		return await this.templateService.getAll(email);
	}

	@UseGuards(JwtAuthGuard)
	@Post("create")
	@HttpCode(200)
	async createNewTemplate(@Body() request: TemplateDto, @UserEmail() email: string): Promise<TemplateModel> {
		return await this.templateService.create(request, email);
	}

	@UseGuards(JwtAuthGuard)
	@Delete("delete")
	@HttpCode(200)
	async deleteTemplate(@Query("id") templateId: number): Promise<TemplateModel> {
		return await this.templateService.delete(templateId);
	}

	@UseGuards(JwtAuthGuard)
	@Get("catalogues")
	async getLoadingCodes(): Promise<CataloguesDto> {
		return await this.catalogueService.getCatalogues();
	}
}
