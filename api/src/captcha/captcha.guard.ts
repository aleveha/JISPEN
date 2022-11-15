import { HttpService } from "@nestjs/axios";
import { CanActivate, ExecutionContext, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { lastValueFrom } from "rxjs";
import { RenewPasswordDto } from "../auth/dto/authorizationDto";

export interface ReCaptchaResponse {
	success: boolean;
}

@Injectable()
export class RecaptchaGuard implements CanActivate {
	constructor(private readonly configService: ConfigService, private readonly httpService: HttpService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const {
			body: { captcha },
		} = context.switchToHttp().getRequest<{ body: RenewPasswordDto }>();
		const captchaSecret = this.configService.get<string>("RECAPTCHA_SECRET");

		const { data } = await lastValueFrom(this.httpService.post<ReCaptchaResponse>(`https://www.google.com/recaptcha/api/siteverify?secret=${captchaSecret}&response=${captcha}`));

		if (!data.success) {
			throw new UnprocessableEntityException("Captcha is invalid");
		}

		return true;
	}
}
