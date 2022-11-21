import { JwtAuthGuard } from "@auth/guards/jwt.guard";
import { UserEmail } from "@decorators/user-email.decorator";
import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, Body, Controller, Post, Res, UseGuards } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Response } from "express";
import * as stream from "stream";
import { ExportDto } from "./dto/exportDto";
import { ExportService } from "./export.service";

@Controller()
export class ExportController {
	constructor(private readonly exportService: ExportService, private readonly mailerService: MailerService, private readonly configService: ConfigService) {}

	@UseGuards(JwtAuthGuard)
	@Post("export")
	public async generateXMLInPeriod(@Body() exportDto: ExportDto, @UserEmail() userEmail: string, @Res() response: Response): Promise<void> {
		const fileData = await this.exportService.generateExportFile(exportDto, userEmail);

		switch (exportDto.exportType) {
			case "download":
				const readStream = new stream.PassThrough();
				readStream.end(fileData).pipe(response);
				break;
			case "email":
				if (!exportDto.recipientEmail) {
					throw new BadRequestException("Recipient email is required");
				}
				const date = new Date();
				await this.mailerService.sendMail({
					to: exportDto.recipientEmail,
					from: this.configService.get<string>("MAILER_USER"),
					subject: "Export z aplikace JISPEN",
					template: "export",
					context: {
						dateNow: date.toLocaleDateString("ru"),
						senderEmail: userEmail,
					},
					attachments: [
						{
							filename: `Export_JISPEN_${date.toISOString().split("T")[0]}.${exportDto.fileType}`,
							content: fileData,
						},
					],
				});
				response.status(200).send();
				break;
			default:
				throw new BadRequestException("Invalid export type");
		}
	}
}
