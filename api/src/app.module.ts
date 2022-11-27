import { AuthModule } from "@auth/auth.module";
import { mailerConfig } from "@configs/mailer.config";
import { postgresConfig } from "@configs/postgres.config";
import { ExportModule } from "@export/export.module";
import { RedisModule } from "@nestjs-modules/ioredis";
import { MailerModule } from "@nestjs-modules/mailer";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RecordsModule } from "@records/records.module";
import { TemplateModule } from "@template/template.module";
import { UserModule } from "@user/user.module";
import { CaptchaModule } from "./captcha/captcha.module";

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
		MailerModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: mailerConfig,
			inject: [ConfigService],
		}),
		RedisModule.forRoot({
			config: {
				url: "redis://redis:6379",
			},
		}),
		AuthModule,
		RecordsModule,
		TemplateModule,
		UserModule,
		ExportModule,
		CaptchaModule,
	],
})
export class AppModule {}
