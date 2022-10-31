import { Body, Controller, HttpCode, Post, UseGuards, UsePipes, ValidationPipe } from "@nestjs/common";
import { UserEmail } from "../decorators/user-email.decorator";
import { AuthService } from "./auth.service";
import { AccessTokenResponse, LoginDto, RegistrationDto, RegistrationResponse, RenewPasswordDto } from "./dto/authorizationDto";
import { JwtAuthGuard } from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UseGuards(JwtAuthGuard)
	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("register")
	async register(@Body() { password }: RegistrationDto, @UserEmail() email: string): Promise<RegistrationResponse> {
		return {
			success: !!(await this.authService.createUser({ email, password })),
		};
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("login")
	async login(@Body() request: LoginDto): Promise<AccessTokenResponse> {
		const { email } = await this.authService.getUser(request);
		return this.authService.getJWT(email);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post("password-reset")
	async passwordReset(@Body() { email }: RenewPasswordDto): Promise<void> {
		const { accessToken } = await this.authService.getJWT(email);
		return await this.authService.sendPasswordResetEmail(email, accessToken);
	}
}
