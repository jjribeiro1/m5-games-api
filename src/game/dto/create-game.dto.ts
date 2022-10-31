import {
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MinLength,
  IsOptional,
  ArrayNotEmpty,
} from 'class-validator';

export class CreateGameDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name: string;

  @IsUrl()
  image: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description?: string | null;

  @IsNumber()
  year: number;

  @IsNumber()
  imdb_score: number;

  @IsString()
  @IsNotEmpty()
  trailer_youtube_url: string;

  @IsString()
  @IsNotEmpty()
  gameplay_youtube_url: string;

  @ArrayNotEmpty()
  genres: Array<number>;
}
