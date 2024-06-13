import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePlanetDto } from './dto/create-planet.dto';
import { UpdatePlanetDto } from './dto/update-planet.dto';
import { Planet } from './entities/planet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from 'src/common/common.service';
import { Repository } from 'typeorm';
import { DEFAULT_PAGE_LIMIT, TypeKeys } from 'src/utils/constants';
import { getEntityUrl } from 'src/utils/utils';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PlanetsService {
  constructor(
    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,

    private commonService: CommonService,
  ) {}

  async create(createPlanetDto: CreatePlanetDto) {
    console.log('Enter Create');
    const entityType: TypeKeys = 'planets';
    const newEntity = await this.commonService.createNewEntityWithDto(
      createPlanetDto,
      entityType,
    );
    const lastIndex = (
      await this.planetsRepository.find({ take: 1, order: { id: 'desc' } })
    )[0].id;
    newEntity.url = getEntityUrl(entityType, lastIndex + 1);

    return await this.planetsRepository.save(newEntity);
  }

  async findAll(paginationDto: PaginationDto): Promise<Planet[]> {
    const { offset, limit } = paginationDto;

    const result = await this.planetsRepository.find({
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

  async findOne(id: number): Promise<Planet> {
    const response = await this.planetsRepository.findOne({
      where: { id },
      relations: ['residents', 'films', 'images'],
    });
    if (response === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return response;
  }

  async update(id: number, updatePlanetDto: UpdatePlanetDto) {
    const entity = await this.planetsRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    const entityType: TypeKeys = 'planets';
    const partialEntity = await this.commonService.createNewEntityWithDto(
      updatePlanetDto,
      entityType,
    );
    const updatedEntity = { ...entity, ...partialEntity };
    return this.planetsRepository.save(updatedEntity);
  }

  async remove(id: number) {
    const entity = await this.planetsRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return this.planetsRepository.remove(entity);
  }
}
