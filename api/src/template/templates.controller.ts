import { Body, Controller, Delete, Get, HttpCode, Post, Query } from "@nestjs/common";
import { TemplateDto } from "./dto/templateDto";
import { TemplatesService } from "./templates.service";
import { TemplateModel } from "../models/template.model";

@Controller("template")
export class TemplatesController {
	constructor(private readonly templateService: TemplatesService) {}

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
}
