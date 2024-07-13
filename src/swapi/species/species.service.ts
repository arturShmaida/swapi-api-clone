import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpeciesDto } from './dto/create-species.dto';
import { UpdateSpeciesDto } from './dto/update-species.dto';
import { Species } from './entities/species.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from '../../common/common.service';
import { Repository } from 'typeorm';
import { DEFAULT_PAGE_LIMIT, TypeKeys } from '../../utils/constants';
import { getEntityUrl } from '../../utils/utils';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class SpeciesService {
  constructor(
    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,

    private commonService: CommonService,
  ) {}
  async create(createSpeciesDto: CreateSpeciesDto) {
    console.log('Enter Create');
    const entityType: TypeKeys = 'species';
    const newEntity = await this.commonService.createNewEntityWithDto(
      createSpeciesDto,
      entityType,
    );
    const lastIndex = (
      await this.speciesRepository.find({ take: 1, order: { id: 'desc' } })
    )[0].id;
    newEntity.url = getEntityUrl(entityType, lastIndex + 1);

    return await this.speciesRepository.save(newEntity);
  }

  async findAll(paginationDto: PaginationDto): Promise<Species[]> {
    const { offset, limit } = paginationDto;

    const result = await this.speciesRepository.find({
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

  async findOne(id: number): Promise<Species> {
    const response = await this.speciesRepository.findOne({
      where: { id },
      relations: ['people', 'films', 'images'],
    });
    if (response === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return response;
  }

  async update(id: number, updateSpeciesDto: UpdateSpeciesDto) {
    const entity = await this.speciesRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    const entityType: TypeKeys = 'species';
    const partialEntity = await this.commonService.createNewEntityWithDto(
      updateSpeciesDto,
      entityType,
    );
    const updatedEntity = { ...entity, ...partialEntity };
    return this.speciesRepository.save(updatedEntity);
  }

  async remove(id: number) {
    const entity = await this.speciesRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return await this.speciesRepository.remove(entity);
  }
}
