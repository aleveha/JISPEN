import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordsController } from "./records.controller";
import { RecordsService } from "./records.service";
import { RecordModel } from "../models/record.model";

@Module({
	imports: [TypeOrmModule.forFeature([RecordModel])],
	controllers: [RecordsController],
	providers: [RecordsService],
})
export class RecordsModule {}
