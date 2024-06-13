import { Injectable, NotFoundException } from '@nestjs/common';

import { CreatePeopleDto } from './dto/create-person.dto';
import { PaginationDto } from '../../common/dto/pagination.dto';
import { DEFAULT_PAGE_LIMIT } from '../../utils/constants';
import { UpdatePeopleDto } from './dto/update-person.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { People } from './entities/people.entity';
import { Repository } from 'typeorm';
import { TypeKeys } from 'src/utils/constants';
import { CommonService } from 'src/common/common.service';
import { getEntityUrl } from 'src/utils/utils';

@Injectable()
export class PeopleService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,

    private commonService: CommonService,
  ) {}

  async create(personDto: CreatePeopleDto) {
    console.log('Enter Create');
    const entityType: TypeKeys = 'people';
    const newEntity = await this.commonService.createNewEntityWithDto(
      personDto,
      entityType,
    );
    const lastIndex = (
      await this.peopleRepository.find({ take: 1, order: { id: 'desc' } })
    )[0].id;
    newEntity.url = getEntityUrl(entityType, lastIndex + 1);

    return await this.peopleRepository.save(newEntity);
  }

  async findAll(paginationDto: PaginationDto): Promise<People[]> {
    const { offset, limit } = paginationDto;

    const result = await this.peopleRepository.find({
      skip: offset ?? 0,
      take: limit ?? DEFAULT_PAGE_LIMIT,
      order: {
        created: 'DESC',
        id: 'DESC',
      },
    });
    console.log(result[0]);
    return result;
  }

  async findOne(id: number): Promise<People> {
    const response = await this.peopleRepository.findOne({
      where: { id },
      relations: ['homeworld', 'films', 'vehicles', 'starships', 'images'],
    });
    if (response === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return response;
  }

  async update(id: number, updateDto: UpdatePeopleDto) {
    const entity = await this.peopleRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    const entityType: TypeKeys = 'people';
    const partialEntity = await this.commonService.createNewEntityWithDto(
      updateDto,
      entityType,
    );
    const updatedEntity = { ...entity, ...partialEntity };
    return this.peopleRepository.save(updatedEntity);
  }

  async remove(id: number) {
    const entity = await this.peopleRepository.findOneBy({ id });
    console.log(entity);
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return await this.peopleRepository.remove(entity);
  }
}
