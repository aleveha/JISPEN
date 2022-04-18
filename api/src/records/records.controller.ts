import { Body, Controller, Get, Post, Query } from "@nestjs/common";
import { RecordDto } from "./dto/recordDto";
import { RecordsService } from "./records.service";
import { RecordModel } from "../models/record.model";

@Controller("records")
export class RecordsController {
	constructor(private readonly recordsService: RecordsService) {}

	@Get("all")
	public async getAll(@Query("templateId") templateId: number): Promise<RecordModel[]> {
		return await this.recordsService.getAll(templateId);
	}

	@Post("create")
	public async create(@Body() request: RecordDto): Promise<RecordModel> {
		return await this.recordsService.create(request);
	}
}
