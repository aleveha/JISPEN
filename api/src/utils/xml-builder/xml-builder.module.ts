import { Module } from "@nestjs/common";
import { XmlBuilderService } from "./xml-builder.service";

@Module({
	exports: [XmlBuilderService],
	providers: [XmlBuilderService],
})
export class XmlBuilderModule {}
