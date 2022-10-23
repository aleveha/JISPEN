import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "../models/user.model";
import { UserService } from "./user.service";

@Module({
	imports: [TypeOrmModule.forFeature([UserModel])],
	providers: [UserService],
	exports: [UserService],
})
export class UserModule {}
