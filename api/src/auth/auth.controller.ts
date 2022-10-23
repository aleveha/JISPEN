import { Body, Controller, HttpCode, Post, UsePipes, ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AccessTokenResponse, AuthorizationDto, RegistrationResponse } from "./dto/authorizationDto";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post("register")
	async register(@Body() request: AuthorizationDto): Promise<RegistrationResponse> {
		return {
			success: !!(await this.authService.createUser(request)),
		};
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() request: AuthorizationDto): Promise<AccessTokenResponse> {
		const { email } = await this.authService.getUser(request);
		return this.authService.login(email);
	}
}
