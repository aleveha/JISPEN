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
	@Post("create")
	public async create(@Body() request: RecordDto): Promise<RecordModel> {
		return await this.recordsService.create(request);
	}

	@UseGuards(JwtAuthGuard)
	@Delete("delete")
	public async delete(@Query("id") id: number): Promise<RecordModel> {
		return await this.recordsService.delete(id);
	}
}
