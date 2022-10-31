import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  name: string;
}
