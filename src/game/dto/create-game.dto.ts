export class CreateGameDto {
  name: string;
  image: string;
  description: string | null;
  year: number;
  imdb_score: number;
  trailer_youtube_url: string;
  gameplay_youtube_url: string;

  genres: Array<number>;
}
