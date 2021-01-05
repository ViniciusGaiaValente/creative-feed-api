import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreatePostDto {
	
	@ApiProperty()
	@IsNotEmpty({ message: "title should not be empty" })
  public title: string;

	@ApiProperty()
	@IsNotEmpty({ message: "description should not be empty" })
  public description: string;

	@ApiProperty()
  public preview?: string;

	@ApiProperty()
  public banner?: string;

	@ApiProperty()
	@IsNotEmpty({ message: "body should not be empty" })
  public body: string;

	@ApiProperty()
	@IsNotEmpty({ message: "private should not be empty" })
  public private: boolean;

}