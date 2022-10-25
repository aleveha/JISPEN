import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordModel } from "../models/record.model";
import { RecordsController } from "./records.controller";
import { RecordsService } from "./records.service";

@Module({
	imports: [TypeOrmModule.forFeature([RecordModel])],
	controllers: [RecordsController],
	providers: [RecordsService],
	exports: [RecordsService],
})
export class RecordsModule {}
