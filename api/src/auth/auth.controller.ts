import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthorizationDto, ConfirmRegistrationDto } from "./dto/authorizationDto";
import { AuthService } from "./auth.service";
import { UserModel } from "../models/user.model";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() request: AuthorizationDto): Promise<UserModel> {
		return await this.authService.createUser(request);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("confirm")
	async confirmRegistration(@Body() request: ConfirmRegistrationDto): Promise<UserModel> {
		return this.authService.confirmRegistration(request);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() request: AuthorizationDto): Promise<UserModel> {
		return this.authService.verifyUser(request);
	}
}
