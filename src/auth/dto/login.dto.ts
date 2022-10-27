import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  username: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(5)
  password: string;
}
