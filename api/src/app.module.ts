import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthModule } from "./auth/auth.module";
import { postgresConfig } from "./configs/postgres.config";
import { ExportModule } from "./export/export.module";
import { RecordsModule } from "./records/records.module";
import { TemplateModule } from "./template/template.module";
import { UserModule } from "./user/user.module";

const STAGE = process.env.NODE_ENV;

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			envFilePath: `.env.${STAGE}`,
		}),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: postgresConfig,
			inject: [ConfigService],
		}),
		AuthModule,
		RecordsModule,
		TemplateModule,
		UserModule,
		ExportModule,
	],
})
export class AppModule {}
