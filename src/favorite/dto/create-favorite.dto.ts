import { IsNumber } from 'class-validator';

export class CreateFavoriteDto {
  @IsNumber()
  profileId: number;

  @IsNumber()
  gameId: number;
}
