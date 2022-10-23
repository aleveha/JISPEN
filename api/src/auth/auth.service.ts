import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compare, genSalt, hash } from "bcryptjs";
import { UserModel } from "../models/user.model";
import { UserService } from "../user/user.service";
import { AccessTokenResponse, AuthorizationDto } from "./dto/authorizationDto";

@Injectable()
export class AuthService {
	public constructor(private readonly userService: UserService, private readonly jwtService: JwtService) {}

	public async createUser(userDto: AuthorizationDto): Promise<UserModel> {
		return await this.userService.createUser({
			email: userDto.email,
			passwordHash: await hash(userDto.password, await genSalt()),
		});
	}

	public async getUser(userDto: AuthorizationDto): Promise<UserModel> {
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

	public async login(email: string): Promise<AccessTokenResponse> {
		const payload = { email };
		return {
			accessToken: await this.jwtService.signAsync(payload),
		};
	}
}
