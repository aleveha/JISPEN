import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthorizationDto {
	@IsEmail()
	@MaxLength(200)
	email: string;

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
