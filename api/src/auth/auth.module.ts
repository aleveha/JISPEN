import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UserModel } from "./user.model";

@Module({
	imports: [TypeOrmModule.forFeature([UserModel])],
	controllers: [AuthController],
	providers: [AuthService],
})
export class AuthModule {}
