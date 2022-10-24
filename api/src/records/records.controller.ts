import { Body, Controller, Delete, Get, Post, Query, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/guards/jwt.guard";
import { UserEmail } from "../decorators/user-email.decorator";
import { RecordModel } from "../models/record.model";
import { RecordDto } from "./dto/recordDto";
import { RecordsService } from "./records.service";

@Controller("records")
export class RecordsController {
	constructor(private readonly recordsService: RecordsService) {}

	@UseGuards(JwtAuthGuard)
	@Get("all")
	public async getAll(@UserEmail() email: string): Promise<RecordModel[]> {
		return await this.recordsService.getAll(email);
	}

	@UseGuards(JwtAuthGuard)
	@Post("insert")
	public async create(@Body() request: RecordDto): Promise<RecordModel> {
		return await this.recordsService.insert(request);
	}

	@UseGuards(JwtAuthGuard)
	@Delete("delete")
	public async delete(@Query("id") id: number): Promise<RecordModel> {
		return await this.recordsService.delete(id);
	}

	@UseGuards(JwtAuthGuard)
	@Get("get")
	public async getByRecordId(@Query("id") id: number, @UserEmail() email: string): Promise<RecordModel> {
		return await this.recordsService.getByRecordId(id, email);
	}
}
