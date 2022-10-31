import { Genre } from '../../genre/entities/genre.entity';

export class Game {
  id?: number;
  name?: string;
  image?: string;
  description?: string | null;
  year?: number;
  imdb_score?: number;
  trailer_youtube_url?: string;
  gameplay_youtube_url?: string;
  genres?: Genre[];
}
