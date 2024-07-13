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
import {
  ApiExtraModels,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';
import {
  Roles,
  ROLE_ADMIN,
  ROLE_USER,
} from '../../auth/decorators/roles.decorator';
import { Film } from './entities/film.entity';

@ApiTags('Films')
@Controller('films')
@ApiExtraModels(Film)
export class FilmsController {
  constructor(private readonly filmsService: FilmsService) {}

  @Post()
  @Roles([ROLE_ADMIN])
  @ApiResponse({ status: 201 })
  @ApiOperation({ summary: 'Creates a film' })
  create(@Body(ValidationPipe) createFilmDto: CreateFilmDto) {
    return this.filmsService.create(createFilmDto);
  }

  @Get()
  @Roles([ROLE_ADMIN, ROLE_USER])
  @ApiOperation({ summary: 'Gets all films' })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.filmsService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles([ROLE_ADMIN, ROLE_USER])
  @ApiOperation({ summary: 'Gets film by id' })
  findOne(@Param('id') id: string) {
    return this.filmsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([ROLE_ADMIN])
  @ApiOperation({ summary: 'Updates film by id' })
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateFilmDto: UpdateFilmDto,
  ) {
    return this.filmsService.update(+id, updateFilmDto);
  }

  @Delete(':id')
  @Roles([ROLE_ADMIN])
  @ApiOperation({ summary: 'Deletes film by id' })
  remove(@Param('id') id: string) {
    return this.filmsService.remove(+id);
  }
}
