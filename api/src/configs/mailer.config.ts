import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export const mailerConfig = async (configService: ConfigService): Promise<MailerOptions> => ({
	transport: {
		host: configService.get<string>("MAILER_HOST"),
		port: configService.get<number>("MAILER_PORT"),
		secure: false,
		auth: {
			user: configService.get<string>("MAILER_USER"),
			pass: configService.get<string>("MAILER_PASS"),
		},
		tls: {
			rejectUnauthorized: false,
		},
	},
	defaults: {
		from: "\"nest-modules\" <modules@nestjs.com>",
	},
	template: {
		dir: join(__dirname, "..", "..", "mailer", "templates"),
		adapter: new HandlebarsAdapter(),
		options: {
			strict: true,
		},
	},
});
