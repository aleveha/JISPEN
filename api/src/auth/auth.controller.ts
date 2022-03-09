import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthorizationDto, ConfirmRegistrationDto } from "./dto/authorizationDto";
import { AuthService } from "./auth.service";
import { UserModel } from "./user.model";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() req: AuthorizationDto): Promise<UserModel> {
		return await this.authService.createUser(req);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("confirm")
	async confirmRegistration(@Body() req: ConfirmRegistrationDto): Promise<UserModel> {
		return this.authService.confirmRegistration(req);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() req: AuthorizationDto): Promise<UserModel> {
		return this.authService.verifyUser(req);
	}
}
