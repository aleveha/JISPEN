import { Module } from "@nestjs/common";
import { XlsxBuilderService } from "./xlsx-builder.service";

@Module({
	exports: [XlsxBuilderService],
	providers: [XlsxBuilderService],
})
export class XlsxBuilderModule {}
