import { InjectRedis } from "@nestjs-modules/ioredis";
import { Injectable } from "@nestjs/common";
import { compare, genSalt, hash } from "bcryptjs";
import Redis from "ioredis";

@Injectable()
export class CaptchaService {
	constructor(@InjectRedis() private readonly redis: Redis) {}

	public async generateCaptcha(): Promise<string> {
		const randomNumber = Array.from({ length: this.getRandomNumber() }, () => this.getRandomNumber(0, 9)).join("");
		const hashedValue = await hash(randomNumber, await genSalt());
		await this.redis.setex(randomNumber, 2 * 60, hashedValue);
		return randomNumber;
	}

	public async validateCaptcha(captcha: string): Promise<boolean> {
		const hashedValue = await this.redis.get(captcha);
		if (!hashedValue) {
			return false;
		}

		const isValid = await compare(captcha, hashedValue);
		if (!isValid) {
			return false;
		}

		await this.redis.del(captcha);
		return true;
	}

	private getRandomNumber(min = 4, max = 8): number {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}
}
