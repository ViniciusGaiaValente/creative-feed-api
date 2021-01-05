import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class RegisterDto {

	@ApiProperty()
	@IsNotEmpty({ message: "email should not be empty" })
	@IsEmail({}, { message: "invalid email" })
	public email: string;

	@ApiProperty()
	@IsNotEmpty({ message: "username should not be empty" })
	public username: string;

	@ApiProperty()
	@IsNotEmpty({ message: "password should not be empty" })
	public password: string;

	@ApiProperty()
	@IsNotEmpty({ message: "fullname should not be empty" })
	public fullname: string;

}