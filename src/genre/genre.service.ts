import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { Genre } from './entities/genre.entity';

@Injectable()
export class GenreService {
  constructor(private readonly prisma: PrismaService) {}

  async findById(id: number): Promise<Genre> {
    return this.prisma.user
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

  async findAll() {
    return this.prisma.genre.findMany();
  }

  async findOne(id: number) {
    return this.findById(id);
  }

  update(id: number, dto: UpdateGenreDto) {
    return `This action updates a #${id} genre`;
  }

  remove(id: number) {
    return `This action removes a #${id} genre`;
  }
}
