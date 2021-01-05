import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class ResponseTokenDto {

	@ApiProperty()
	public token: string;
	
}