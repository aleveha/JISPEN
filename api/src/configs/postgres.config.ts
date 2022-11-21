import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { join } from "path";

export const postgresConfig = async (configService: ConfigService): Promise<TypeOrmModuleOptions> => ({
	type: "postgres",
	host: configService.get<string>("DATABASE_HOST"),
	port: parseInt(configService.get<string>("DATABASE_PORT")),
	username: configService.get<string>("DATABASE_USER"),
	password: configService.get<string>("DATABASE_PASS"),
	database: configService.get<string>("DATABASE_NAME"),
	entities: [join(__dirname, "..", "models", "*.model.{ts,js}")],
	synchronize: false,
});
