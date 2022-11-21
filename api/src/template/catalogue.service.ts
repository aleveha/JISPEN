import { LoadingCodeModel } from "@models/loadingCode.model";
import { TerritorialUnitModel } from "@models/territorialUnit.model";
import { WasteModel } from "@models/waste.model";
import { WasteCompanyTypeModel } from "@models/wasteCompanyType.model";
import { ZipcodeModel } from "@models/zipcode.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CataloguesDto } from "./dto/template.dto";

@Injectable()
export class CatalogueService {
	constructor(
		@InjectRepository(LoadingCodeModel)
		private readonly loadingCodeRepository: Repository<LoadingCodeModel>,
		@InjectRepository(TerritorialUnitModel)
		private readonly territorialUnitRepository: Repository<TerritorialUnitModel>,
		@InjectRepository(WasteCompanyTypeModel)
		private readonly wasteCompanyTypeRepository: Repository<WasteCompanyTypeModel>,
		@InjectRepository(WasteModel)
		private readonly wasteRepository: Repository<WasteModel>,
		@InjectRepository(ZipcodeModel)
		private readonly zipCodeRepository: Repository<ZipcodeModel>
	) {}

	public async getCatalogues(): Promise<CataloguesDto> {
		return {
			loadingCodes: await this.loadingCodeRepository.find(),
			territorialUnits: await this.territorialUnitRepository.find(),
			wasteCompanyTypes: await this.wasteCompanyTypeRepository.find(),
			wastes: await this.wasteRepository.find(),
			zipcodes: await this.zipCodeRepository.find(),
		};
	}
}
