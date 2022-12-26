import { UserModel } from "@models/user.model";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserDto } from "./dto/user.dto";

@Injectable()
export class UserService {
	public constructor(
		@InjectRepository(UserModel)
		private readonly userRepository: Repository<UserModel>
	) {}

	public async createUser(userDto: UserDto): Promise<UserModel> {
		const user = await this.getUserByEmail(userDto.email);
		if (user) {
			await this.userRepository.update(user.id, userDto);
			return await this.getUserByEmail(userDto.email);
		}

		const newUser = await this.userRepository.create(userDto);
		return await this.userRepository.save(newUser);
	}

	public async getUserByEmail(email: string): Promise<UserModel> {
		return this.userRepository.findOne({ where: { email } });
	}
}
