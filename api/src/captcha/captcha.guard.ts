import { CanActivate, ExecutionContext, Injectable, UnprocessableEntityException } from "@nestjs/common";
import { CaptchaService } from "./captcha.service";

interface CaptchaDto {
	captcha: string;
}

@Injectable()
export class CaptchaGuard implements CanActivate {
	constructor(private readonly captchaService: CaptchaService) {}

	public async canActivate(context: ExecutionContext): Promise<boolean> {
		const {
			body: { captcha },
		} = context.switchToHttp().getRequest<{ body: CaptchaDto }>();

		const isCaptchaValid = await this.captchaService.validateCaptcha(captcha);

		if (!isCaptchaValid) {
			throw new UnprocessableEntityException("Captcha is invalid");
		}

		return true;
	}
}
