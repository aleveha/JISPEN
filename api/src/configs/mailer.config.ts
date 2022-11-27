import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { ConfigService } from "@nestjs/config";
import { join } from "path";

export const mailerConfig = async (configService: ConfigService): Promise<MailerOptions> => {
	const config: MailerOptions = {
		template: {
			dir: join(__dirname, "..", "..", "mailer", "templates"),
			adapter: new HandlebarsAdapter(),
			options: {
				strict: true,
			},
		},
	};

	const transport: MailerOptions["transport"] = {
		auth: {
			user: configService.get<string>("MAILER_USER"),
			pass: configService.get<string>("MAILER_PASS"),
		},
	};

	const service = configService.get<string>("MAILER_SERVICE");
	if (!service) {
		transport.host = configService.get<string>("MAILER_HOST");
		transport.port = configService.get<number>("MAILER_PORT");
		transport.secure = transport.port == 465;
		transport.tls = {
			rejectUnauthorized: false,
		};
	} else {
		transport.service = service;
	}

	config.transport = transport;

	return config;
};
