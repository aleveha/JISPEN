import { Module } from "@nestjs/common";
import { RecordsModule } from "../records/records.module";
import { XlsxBuilderModule } from "../utils/xlsx-builder/xlsx-builder.module";
import { XmlBuilderModule } from "../utils/xml-builder/xml-builder.module";
import { ExportController } from "./export.controller";
import { ExportService } from "./export.service";

@Module({
	imports: [RecordsModule, XmlBuilderModule, XlsxBuilderModule],
	providers: [ExportService],
	controllers: [ExportController],
})
export class ExportModule {}
