import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class LoginDto {
	@IsEmail()
	@MaxLength(200)
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}

export class RegistrationDto {
	@IsString()
	@MinLength(8)
	password: string;
}

export interface AccessTokenResponse {
	accessToken: string;
}

export interface RegistrationResponse {
	success: boolean;
}

export class RenewPasswordDto {
	@IsEmail()
	@MaxLength(200)
	email: string;
}
