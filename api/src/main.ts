import { NestFactory } from "@nestjs/core";
import "module-alias/register";
import { AppModule } from "./app.module";

async function main() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api");
	app.enableCors();
	await app.listen(8000);
}

main();
