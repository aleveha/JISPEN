import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CatalogueService } from "./catalogue.service";
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";
import { AddressModel } from "../models/address.model";
import { MedicalCompanyModel } from "../models/medicalCompany.model";
import { TemplateModel } from "../models/template.model";
import { TerritorialUnitModel } from "../models/territorialUnit.model";
import { WasteModel } from "../models/waste.model";
import { ZipcodeModel } from "../models/zipcode.model";

@Module({
	imports: [TypeOrmModule.forFeature([AddressModel, MedicalCompanyModel, TemplateModel, TerritorialUnitModel, WasteModel, ZipcodeModel])],
	controllers: [TemplatesController],
	providers: [CatalogueService, TemplatesService],
})
export class TemplateModule {}
