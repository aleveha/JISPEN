import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RecordDto } from "./dto/recordDto";
import { RecordModel } from "../models/record.model";

@Injectable()
export class RecordsService {
	constructor(
		@InjectRepository(RecordModel)
		private readonly recordsRepository: Repository<RecordModel>
	) {}

	public async getAll(templateId: number): Promise<RecordModel[]> {
		return await this.recordsRepository.find({
			where: {
				templateId: templateId,
			},
			relations: [
				"loadingCode",
				"template",
				"template.medicalCompany",
				"template.medicalCompany.user",
				"template.medicalCompany.address",
				"template.medicalCompany.address.zipcode",
				"waste",
				"wasteCompany",
				"wasteCompany.territorialUnit",
				"wasteCompany.address",
				"wasteCompany.address.zipcode",
				"wasteCompany.template",
			],
		});
	}

	public async create(record: RecordDto): Promise<RecordModel> {
		return await this.recordsRepository.save(record);
	}
}
