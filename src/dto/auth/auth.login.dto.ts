import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class LoginDto {

	@ApiProperty()
	@IsNotEmpty({ message: "email should not be empty" })
	public username: string;

	@ApiProperty()
	@IsNotEmpty({ message: "password should not be empty" })
	public password: string;
	
}