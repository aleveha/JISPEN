import { RecordModel } from "@models/record.model";
import { BadRequestException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Between, FindManyOptions, Repository } from "typeorm";
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

	public async duplicate(id: number, email: string): Promise<RecordModel> {
		const record = await this.getByRecordId(id, email);
		if (!record) {
			throw new BadRequestException();
		}
		delete record.id;
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
			relations: [...this.RECORD_RELATIONS, "template.loadingCodes", "template.wastes", "template.wasteCompanies", "template.wasteCompanies.territorialUnit"],
		});

		if (!record) {
			throw new BadRequestException();
		}

		return record;
	}

	public async getUserRecords(email: string, medicalCompanyId?: number, date?: { from: Date; to: Date }): Promise<RecordModel[]> {
		const where: FindManyOptions<RecordModel>["where"] = {
			template: {
				user: { email },
			},
		};

		if (medicalCompanyId) {
			where.template.medicalCompanyId = medicalCompanyId;
		}

		if (date) {
			where.date = Between(date.from, date.to);
		}

		const records = await this.recordsRepository.find({ where, relations: [...this.RECORD_RELATIONS] });

		if (!records) {
			throw new BadRequestException();
		}

		return records;
	}
}
