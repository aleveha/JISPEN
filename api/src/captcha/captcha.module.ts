import { Module } from "@nestjs/common";
import { CaptchaController } from "./captcha.controller";
import { CaptchaService } from "./captcha.service";

@Module({
	providers: [CaptchaService],
	controllers: [CaptchaController],
	exports: [CaptchaService],
})
export class CaptchaModule {}
