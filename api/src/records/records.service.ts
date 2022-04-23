import { Repository } from "typeorm";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { RecordDto } from "./dto/recordDto";
import { RecordModel } from "../models/record.model";

@Injectable()
export class RecordsService {
	constructor(
		@InjectRepository(RecordModel)
		private readonly recordsRepository: Repository<RecordModel>
	) {}

	public async getAll(userId: number): Promise<RecordModel[]> {
		return await this.recordsRepository.find({
			where: {
				template: {
					userId: userId,
				},
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
			order: {
				id: "DESC",
			},
		});
	}

	public async create(record: RecordDto): Promise<RecordModel> {
		return await this.recordsRepository.save(record);
	}

	public async delete(recordId: number): Promise<RecordModel> {
		const recordToBeDeleted = await this.recordsRepository.findOne({ id: recordId });
		if (!recordToBeDeleted) {
			throw new BadRequestException();
		}

		const result = await this.recordsRepository.delete({ id: recordId });
		if (result.affected === 0) {
			throw new InternalServerErrorException();
		}

		return recordToBeDeleted;
	}
}
