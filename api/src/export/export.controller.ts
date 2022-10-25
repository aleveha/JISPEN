import { Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { Response } from "express";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserEmail } from "../decorators/user-email.decorator";
import { XmlInPeriodDto } from "./dto/xmlInPeriodDto";
import { ExportService } from "./export.service";

@Controller("export")
export class ExportController {
	constructor(private readonly exportService: ExportService) {}

	@UseGuards(JwtAuthGuard)
	@Post("xml")
	public async generateXMLInPeriod(@Body() xmlExportDto: XmlInPeriodDto, @UserEmail() userEmail: string, @Res() response: Response) {
		const pathToFile = await this.exportService.generateXMLInPeriod(xmlExportDto, userEmail);
		response.sendFile(pathToFile, { root: process.cwd() });
	}
}
