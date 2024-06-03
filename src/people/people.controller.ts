import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
  ValidationPipe,
} from '@nestjs/common';
import { PeopleService } from './people.service';
import { CreatePeopleDto } from './dto/create-person.dto';
import { UpdatePeopleDto } from './dto/update-person.dto';
import { PaginationDto } from '../common/dto/pagination.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('people')
@Controller('people')
export default class PeopleController {
  constructor(private peopleService: PeopleService) {}

  @Post()
  async create(@Body(ValidationPipe) createPersonDto: CreatePeopleDto) {
    
    return this.peopleService.create(createPersonDto);
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.peopleService.findAll(paginationDto);
  }

  @Get(':id')
  async findOne(@Query('id') id: string) {
    return this.peopleService.findOne(+id);
  }


  @Put(':id')
  async update(
    @Query('id') id: string,
    @Body(ValidationPipe) updatePeopleDto: UpdatePeopleDto,
  ) {
    return this.peopleService.update(+id, updatePeopleDto);
  }

  @Delete(':id')
  async remove(@Query('id') id: string) {
    return this.peopleService.remove(+id);
  }
}
