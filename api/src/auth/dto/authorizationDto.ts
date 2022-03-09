import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class AuthorizationDto {
	@IsEmail()
	@MaxLength(200)
	email: string;

	@IsString()
	@MinLength(8)
	password: string;
}

export class ConfirmRegistrationDto {
	@IsString()
	@MaxLength(200)
	@MinLength(5)
	email: string;

	@IsString()
	@MinLength(4)
	confirmationCode: string;
}
