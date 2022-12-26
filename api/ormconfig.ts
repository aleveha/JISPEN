import * as dotenv from "dotenv";
import * as path from "path";
import { DataSource } from "typeorm";

const isLocal = process.env.NODE_ENV === "local";
const config = isLocal ? dotenv.config({ path: path.join(__dirname, ".env.local") }).parsed : process.env;

export const postgresDataSource = new DataSource({
	type: "postgres",
	host: config.DATABASE_HOST,
	port: parseInt(config.DATABASE_PORT),
	username: config.DATABASE_USER,
	password: config.DATABASE_PASS,
	database: config.DATABASE_NAME,
	entities: ["./src/models/*.model.{js,ts}"],
	migrations: ["./migrations/*.{ts,js}"],
});
