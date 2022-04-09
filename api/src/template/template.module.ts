import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";
import { AddressModel } from "../models/address.model";
import { MedicalCompanyModel } from "../models/medicalCompany.model";
import { TemplateModel } from "../models/template.model";

@Module({
	imports: [TypeOrmModule.forFeature([AddressModel, MedicalCompanyModel, TemplateModel])],
	controllers: [TemplatesController],
	providers: [TemplatesService],
})
export class TemplateModule {}
