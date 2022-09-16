import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AddressModel } from "../models/address.model";
import { LoadingCodeModel } from "../models/loadingCode.model";
import { MedicalCompanyModel } from "../models/medicalCompany.model";
import { TemplateModel } from "../models/template.model";
import { TerritorialUnitModel } from "../models/territorialUnit.model";
import { WasteModel } from "../models/waste.model";
import { WasteCompanyModel } from "../models/wasteCompany.model";
import { WasteCompanyTypeModel } from "../models/wasteCompanyType.model";
import { ZipcodeModel } from "../models/zipcode.model";
import { CatalogueService } from "./catalogue.service";
import { TemplatesController } from "./templates.controller";
import { TemplatesService } from "./templates.service";

@Module({
	imports: [TypeOrmModule.forFeature([AddressModel, LoadingCodeModel, MedicalCompanyModel, TemplateModel, TerritorialUnitModel, WasteModel, WasteCompanyModel, WasteCompanyTypeModel, ZipcodeModel])],
	controllers: [TemplatesController],
	providers: [CatalogueService, TemplatesService],
})
export class TemplateModule {}
