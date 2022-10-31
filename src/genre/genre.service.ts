import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Genre> {
    return this.prisma.genre
      .findUniqueOrThrow({
        where: { id },
      })
      .catch((err) => {
        throw new NotFoundException(err.message);
      });
  }

  async create(dto: CreateGenreDto): Promise<Genre> {
    const data: Genre = {
      name: dto.name,
    };

    return this.prisma.genre.create({ data });
  }

  async findAll(): Promise<Genre[]> {
    return this.prisma.genre.findMany();
  }

  async findOne(id: number): Promise<Genre> {
    return this.findById(id);
  }

  async update(id: number, dto: UpdateGenreDto): Promise<Genre> {
    await this.findById(id);
    return this.prisma.genre.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: number) {
    await this.findById(id);
    await this.prisma.genre.delete({ where: { id } });
  }
}
