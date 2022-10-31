import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGameDto) {
    const data: Prisma.GameCreateInput = {
      name: dto.name,
      image: dto.image,
      year: dto.year,
      imdb_score: dto.imdb_score,
      trailer_youtube_url: dto.trailer_youtube_url,
      gameplay_youtube_url: dto.gameplay_youtube_url,
      genres: {
        createMany: {
          data: dto.genres.map((number) => ({
            genreId: number,
          })),
        },
      },
    };

    return this.prisma.game
      .create({
        data,
        select: {
          id: true,
          name: true,
          year: true,
          genres: {
            select: {
              genre: true,
            },
          },
        },
      })
      .catch((err) => console.log(err.message));
  }

  findAll() {
    return `This action returns all game`;
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, dto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
