import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { LoadingCodeModel } from "../models/loadingCode.model";
import { TerritorialUnitModel } from "../models/territorialUnit.model";
import { WasteModel } from "../models/waste.model";
import { WasteCompanyTypeModel } from "../models/wasteCompanyType.model";
import { ZipcodeModel } from "../models/zipcode.model";

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

	public async getLoadingCodes(): Promise<LoadingCodeModel[]> {
		return await this.loadingCodeRepository.find();
	}

	public async getTerritorialUnits(): Promise<TerritorialUnitModel[]> {
		return await this.territorialUnitRepository.find();
	}

	public async getWaste(): Promise<WasteModel[]> {
		return await this.wasteRepository.find();
	}

	public async getWasteCompanyTypes(): Promise<WasteCompanyTypeModel[]> {
		return await this.wasteCompanyTypeRepository.find();
	}

	public async getZipCodes(): Promise<ZipcodeModel[]> {
		return await this.zipCodeRepository.find();
	}
}
