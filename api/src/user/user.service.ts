import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserModel } from "../models/user.model";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
	public constructor(
		@InjectRepository(UserModel)
		private readonly userRepository: Repository<UserModel>
	) {}

	public async createUser(userDto: UserDto): Promise<UserModel> {
		const existedUser = await this.getUserByEmail(userDto.email);
		if (existedUser) {
			throw new BadRequestException();
		}

		const newUser = this.userRepository.create({
			email: userDto.email,
			passwordHash: userDto.passwordHash,
		});
		return await this.userRepository.save(newUser);
	}

	public async getUserByEmail(email: string): Promise<UserModel> {
		return this.userRepository.findOne({ email: email });
	}
}
