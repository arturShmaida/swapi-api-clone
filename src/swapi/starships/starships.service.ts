import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStarshipDto } from './dto/create-starship.dto';
import { UpdateStarshipDto } from './dto/update-starship.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from '../../common/common.service';
import { Repository } from 'typeorm';
import { DEFAULT_PAGE_LIMIT, TypeKeys } from '../../utils/constants';
import { getEntityUrl } from '../../utils/utils';
import { Starship } from './entities/starship.entity';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class StarshipsService {
  constructor(
    @InjectRepository(Starship)
    private starshipsRepository: Repository<Starship>,

    private commonService: CommonService,
  ) {}
  async create(createStarshipDto: CreateStarshipDto) {
    console.log('Enter Create');
    const entityType: TypeKeys = 'starships';
    const newEntity = await this.commonService.createNewEntityWithDto(
      createStarshipDto,
      entityType,
    );
    const lastIndex = (
      await this.starshipsRepository.find({ take: 1, order: { id: 'desc' } })
    )[0].id;
    newEntity.url = getEntityUrl(entityType, lastIndex + 1);

    return await this.starshipsRepository.save(newEntity);
  }

  async findAll(paginationDto: PaginationDto): Promise<Starship[]> {
    const { offset, limit } = paginationDto;

    const result = await this.starshipsRepository.find({
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

  async findOne(id: number) {
    const response = await this.starshipsRepository.findOne({
      where: { id },
      relations: ['pilots', 'films', 'images'],
    });
    if (response === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return response;
  }

  async update(id: number, updateStarshipDto: UpdateStarshipDto) {
    const entity = await this.starshipsRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    const entityType: TypeKeys = 'starships';
    const partialEntity = await this.commonService.createNewEntityWithDto(
      updateStarshipDto,
      entityType,
    );
    const updatedEntity = { ...entity, ...partialEntity };
    return this.starshipsRepository.save(updatedEntity);
  }

  async remove(id: number) {
    const entity = await this.starshipsRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return await this.starshipsRepository.remove(entity);
  }
}
