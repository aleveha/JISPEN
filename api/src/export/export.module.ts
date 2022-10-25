import { Module } from "@nestjs/common";
import { RecordsModule } from "../records/records.module";
import { ExportController } from "./export.controller";
import { ExportService } from "./export.service";

@Module({
	imports: [RecordsModule],
	providers: [ExportService],
	controllers: [ExportController],
})
export class ExportModule {}
