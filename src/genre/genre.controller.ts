import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { AdminGuard } from 'src/auth/guards/admin.guard';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { OnlyAdmin } from 'src/auth/only-admin.decorator';

@Controller('genre')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(true)
  @Post()
  create(@Body() dto: CreateGenreDto) {
    return this.genreService.create(dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(false)
  @Get()
  findAll() {
    return this.genreService.findAll();
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(false)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.genreService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(true)
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    return this.genreService.update(+id, dto);
  }

  @UseGuards(JwtAuthGuard, AdminGuard)
  @OnlyAdmin(true)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.genreService.remove(+id);
  }
}
