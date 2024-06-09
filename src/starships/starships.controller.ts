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
import { StarshipsService } from './starships.service';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ROLE_ADMIN, ROLE_USER, Roles } from 'src/auth/decorators/roles.decorator';

@ApiTags('starships')
@Controller('starships')
export class StarshipsController {
  constructor(private readonly starshipsService: StarshipsService) {}

  @Post()
  @Roles([ROLE_ADMIN])
  async create(@Body(ValidationPipe) createStarshipDto: CreateStarshipDto) {
    return this.starshipsService.create(createStarshipDto);
  }

  @Get()
  @Roles([ROLE_ADMIN, ROLE_USER])
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.starshipsService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles([ROLE_ADMIN, ROLE_USER])
  async findOne(@Param('id') id: string) {
    return this.starshipsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([ROLE_ADMIN])
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updateStarshipDto: UpdateStarshipDto,
  ) {
    return this.starshipsService.update(+id, updateStarshipDto);
  }

  @Delete(':id')
  @Roles([ROLE_ADMIN])
  async remove(@Param('id') id: string) {
    return this.starshipsService.remove(+id);
  }
}


