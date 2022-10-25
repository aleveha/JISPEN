import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, Repository } from "typeorm";
import { RecordModel } from "../models/record.model";
import { RecordDto } from "./dto/recordDto";

@Injectable()
export class RecordsService {
	private readonly RECORD_RELATIONS = [
		"loadingCode",
		"template",
		"template.medicalCompany",
		"template.medicalCompany.user",
		"template.medicalCompany.address",
		"template.medicalCompany.address.zipcode",
		"template.medicalCompany.territorialUnit",
		"waste",
		"wasteCompany",
		"wasteCompany.territorialUnit",
		"wasteCompany.address",
		"wasteCompany.address.zipcode",
		"wasteCompany.template",
		"wasteCompany.type",
	];

	constructor(
		@InjectRepository(RecordModel)
		private readonly recordsRepository: Repository<RecordModel>
	) {}

	public async getAll(email: string): Promise<RecordModel[]> {
		return await this.recordsRepository.find({
			where: {
				template: {
					user: { email },
				},
			},
			relations: this.RECORD_RELATIONS,
			order: {
				id: "DESC",
			},
		});
	}

	public async insert(record: RecordDto): Promise<RecordModel> {
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

	public async getByRecordId(recordId: number, email: string): Promise<RecordModel> {
		const record = await this.recordsRepository.findOne({
			where: {
				id: recordId,
				template: {
					user: { email },
				},
			},
			relations: [...this.RECORD_RELATIONS, "template.loadingCodes", "template.wastes", "template.wasteCompanies"],
		});

		if (!record) {
			throw new BadRequestException();
		}

		return record;
	}

	public async getRecordsByMedicalCompanyIdInPeriod(medicalCompanyId: number, email: string, dateFrom: Date, dateTo: Date): Promise<RecordModel[]> {
		const records = await this.recordsRepository.find({
			where: {
				template: {
					medicalCompanyId,
					user: { email },
				},
				date: Between(dateFrom, dateTo),
			},
			relations: [...this.RECORD_RELATIONS],
		});

		if (!records) {
			throw new BadRequestException();
		}

		return records;
	}
}
