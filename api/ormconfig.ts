import * as dotenv from "dotenv";
import * as path from "path";

const isLocal = process.env.NODE_ENV === "local";
const config = isLocal ? dotenv.config({ path: path.join(__dirname, ".env.local") }).parsed : process.env;

export = {
	type: "postgres",
	host: config.DATABASE_HOST,
	port: config.DATABASE_PORT,
	username: config.DATABASE_USER,
	password: config.DATABASE_PASS,
	database: config.DATABASE_NAME,
	entities: ["./src/models/*.model.{js,ts}"],
	migrations: ["./migrations/*.{ts,js}"],
	cli: {
		migrationsDir: "migrations",
	},
};
