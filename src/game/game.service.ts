import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { Game } from './entities/game.entity';

@Injectable()
export class GameService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number) {
    return this.prisma.game
      .findUniqueOrThrow({
        where: { id },
        select: {
          id: true,
          name: true,
          image: true,
          year: true,
          description: true,
          imdb_score: true,
          trailer_youtube_url: true,
          gameplay_youtube_url: true,
          genres: {
            select: {
              genre: {
                select: {
                  name: true,
                },
              },
            },
          },
        },
      })
      .catch((err) => {
        console.log(err.message);
        throw new NotFoundException(err.message);
      });
  }

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

  async findAll() {
    return this.prisma.game.findMany();
  }

  async findOne(id: number) {
    return this.findById(id);
  }

  async update(id: number, dto: UpdateGameDto) {
    const data: Partial<typeof dto> = { ...dto };

    await this.findById(id);

    return this.prisma.game.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findById(id);
    await this.prisma.game.delete({
      where: { id },
    });
  }
}
