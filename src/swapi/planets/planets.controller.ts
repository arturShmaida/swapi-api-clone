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
import { PlanetsService } from './planets.service';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { ApiTags } from '@nestjs/swagger';
import { PaginationDto } from '../../common/dto/pagination.dto';
import {
  Roles,
  ROLE_ADMIN,
  ROLE_USER,
} from '../../auth/decorators/roles.decorator';

@ApiTags('planets')
@Controller('planets')
export class PlanetsController {
  constructor(private readonly planetsService: PlanetsService) {}

  @Post()
  @Roles([ROLE_ADMIN])
  create(@Body(ValidationPipe) createPlanetDto: CreatePlanetDto) {
    return this.planetsService.create(createPlanetDto);
  }

  @Get()
  @Roles([ROLE_ADMIN, ROLE_USER])
  findAll(@Query() paginationDto: PaginationDto) {
    return this.planetsService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles([ROLE_ADMIN, ROLE_USER])
  findOne(@Param('id') id: string) {
    return this.planetsService.findOne(+id);
  }

  @Patch(':id')
  @Roles([ROLE_ADMIN])
  update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePlanetDto: UpdatePlanetDto,
  ) {
    return this.planetsService.update(+id, updatePlanetDto);
  }

  @Delete(':id')
  @Roles([ROLE_ADMIN])
  remove(@Param('id') id: string) {
    return this.planetsService.remove(+id);
  }
}
