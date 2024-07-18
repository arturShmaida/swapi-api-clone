import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-person.dto';
import { UpdatePeopleDto } from './dto/update-person.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';
import {
  ROLE_ADMIN,
  ROLE_USER,
  Roles,
} from '../../auth/decorators/roles.decorator';

@ApiTags('people')
@Controller('people')
export default class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Post()
  @Roles([ROLE_ADMIN])
  async create(@Body(ValidationPipe) createPersonDto: CreatePeopleDto) {
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  @Roles([ROLE_ADMIN, ROLE_USER])
  async findAll(@Param() paginationDto: PaginationDto) {
    return this.peopleService.findAll(paginationDto);
  }

  @Get(':id')
  @Roles([ROLE_ADMIN, ROLE_USER])
  async findOne(@Param('id') id: string) {
    return this.peopleService.findOne(+id);
  }

  @Put(':id')
  @Roles([ROLE_ADMIN])
  async update(
    @Param('id') id: string,
    @Body(ValidationPipe) updatePeopleDto: UpdatePeopleDto,
  ) {
    return this.peopleService.update(+id, updatePeopleDto);
  }

  @Delete(':id')
  @Roles([ROLE_ADMIN])
  async remove(@Param('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
