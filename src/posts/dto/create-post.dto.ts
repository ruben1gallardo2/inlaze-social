import { IsNotEmpty, MinLength } from "class-validator";

export class CreatePostDto {
  @IsNotEmpty()
  @MinLength(4)
  title: string
  
  @IsNotEmpty()
  content: string
  
}
