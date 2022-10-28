import { IsNumber, IsString, IsUrl, MinLength } from 'class-validator';

export class CreateProfileDto {
  @IsString()
  @MinLength(3)
  name: string;

  @IsUrl()
  image: string;

  @IsNumber()
  userId: number;
}
