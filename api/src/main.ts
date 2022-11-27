import { NestFactory } from "@nestjs/core";
import { addPath } from "module-alias";
import * as path from "path";
import { AppModule } from "./app.module";

addPath(path.join(__dirname, "..", "package.json"));

async function main() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	app.enableCors();
	await app.listen(8000);
}

main();
