import { MailerService } from "@nestjs-modules/mailer";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcryptjs";
import { UserModel } from "../models/user.model";
import { UserService } from "../user/user.service";
import { AccessTokenResponse, LoginDto } from "./dto/authorizationDto";

@Injectable()
export class AuthService {
	public constructor(private readonly userService: UserService, private readonly jwtService: JwtService, private readonly mailerService: MailerService, private readonly configService: ConfigService) {}

	public async createUser(userDto: LoginDto): Promise<UserModel> {
		return await this.userService.createUser({
			email: userDto.email,
			passwordHash: await hash(userDto.password, await genSalt()),
		});
	}

	public async getUser(userDto: LoginDto): Promise<UserModel> {
		const existedUser = await this.userService.getUserByEmail(userDto.email);
		if (!existedUser) {
			throw new UnauthorizedException();
		}

		const isCorrectPassword = await compare(userDto.password, existedUser.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException();
		}

		return existedUser;
	}

	public async getJWT(email: string): Promise<AccessTokenResponse> {
		const payload = { email };
		return {
			accessToken: await this.jwtService.signAsync(payload),
		};
	}

	public async sendPasswordResetEmail(email: string, jwt: string): Promise<void> {
		await this.mailerService.sendMail({
			to: email,
			from: this.configService.get<string>("MAILER_USER"),
			subject: "Nastavení nového hesla v aplikaci JISPEN",
			template: "new-password",
			context: {
				passwordResetAddress: `${this.configService.get<string>("FRONTEND_URL")}/new-password?accessToken=${jwt}`,
			},
		});
	}
}
