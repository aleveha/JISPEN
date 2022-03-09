import { BadRequestException, ForbiddenException, Injectable, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UserModel } from "./user.model";
import { Repository } from "typeorm";
import { AuthorizationDto, ConfirmRegistrationDto } from "./dto/authorizationDto";
import { genSalt, hash, compare } from "bcryptjs";

@Injectable()
export class AuthService {
	public constructor(
		@InjectRepository(UserModel)
		private authRepository: Repository<UserModel>
	) {}

	public async createUser(userDto: AuthorizationDto): Promise<UserModel> {
		const existedUser = await this.findUserByEmail(userDto.email);
		if (existedUser) {
			throw new BadRequestException();
		}

		const newUser = this.authRepository.create({
			email: userDto.email,
			passwordHash: await AuthService.generatePasswordHash(userDto.password),
			verifiedAt: new Date(), // TODO remove after JWT will be added
		});
		// TODO send email to user with verification code
		return await this.authRepository.save(newUser);
	}

	public async confirmRegistration(confirmDto: ConfirmRegistrationDto): Promise<UserModel> {
		const existedUser = await this.findUserByEmail(confirmDto.email);
		if (!existedUser) {
			throw new BadRequestException();
		}

		if (existedUser.serviceCode !== confirmDto.confirmationCode) {
			throw new BadRequestException();
		}

		const { affected } = await this.authRepository.update({ email: existedUser.email }, { verifiedAt: new Date(), serviceCode: null });
		if (affected === 0) {
			throw new InternalServerErrorException();
		}

		return await this.findUserByEmail(confirmDto.email);
	}

	public async verifyUser(userDto: AuthorizationDto): Promise<UserModel> {
		const existedUser = await this.findUserByEmail(userDto.email);
		if (!existedUser) {
			throw new UnauthorizedException();
		}

		const isCorrectPassword = await compare(userDto.password, existedUser.passwordHash);
		if (!isCorrectPassword) {
			throw new UnauthorizedException();
		}

		if (!existedUser.verifiedAt) {
			throw new ForbiddenException();
		}

		return existedUser;
	}

	private async findUserByEmail(email: string): Promise<UserModel> {
		return this.authRepository.findOne({ email: email });
	}

	private static async generatePasswordHash(password: string): Promise<string> {
		return await hash(password, await genSalt());
	}
}
