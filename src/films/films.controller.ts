import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { FilmsService } from './films.service';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Roles, ROLE_ADMIN, ROLE_USER } from 'src/auth/decorators/roles.decorator';

@ApiTags('films')
@Controller('films')
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @Roles([ROLE_ADMIN])
  create(@Body(ValidationPipe) createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @Roles([ROLE_ADMIN, ROLE_USER])
  findAll(@Query() paginationDto: PaginationDto) {
    return this.filmsService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles([ROLE_ADMIN, ROLE_USER])
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([ROLE_ADMIN])
  update(@Param('id') id: string, @Body(ValidationPipe) updateFilmDto: UpdateFilmDto) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  @Roles([ROLE_ADMIN])
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
