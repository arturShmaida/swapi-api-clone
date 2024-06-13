import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateFilmDto } from './dto/create-film.dto';
import { UpdateFilmDto } from './dto/update-film.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { Repository } from 'typeorm';
import { CommonService } from 'src/common/common.service';
import { DEFAULT_PAGE_LIMIT, TypeKeys } from 'src/utils/constants';
import { getEntityUrl } from 'src/utils/utils';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class FilmsService {
  constructor(
    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,

    private commonService: CommonService,
  ) {}

  async create(createFilmDto: CreateFilmDto) {
    console.log('Enter Create');
    const entityType: TypeKeys = 'films';
    const newEntity = await this.commonService.createNewEntityWithDto(
      createFilmDto,
      entityType,
    );
    console.log('Created Entity:');
    console.log(newEntity);

    const lastIndex = (
      await this.filmsRepository.find({ take: 1, order: { id: 'desc' } })
    )[0].id;
    newEntity.url = getEntityUrl(entityType, lastIndex + 1);

    return await this.filmsRepository.save(newEntity);
  }

  async findAll(paginationDto: PaginationDto): Promise<Film[]> {
    const { offset, limit } = paginationDto;

    const result = await this.filmsRepository.find({
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

  async findOne(id: number): Promise<Film> {
    const response = await this.filmsRepository.findOne({
      where: { id },
      relations: [
        'characters',
        'species',
        'planets',
        'vehicles',
        'starships',
        'images',
      ],
    });
    if (response === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return response;
  }

  async update(id: number, updateDto: UpdateFilmDto) {
    const entity = await this.filmsRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    const entityType: TypeKeys = 'films';
    const partialEntity = await this.commonService.createNewEntityWithDto(
      updateDto,
      entityType,
    );
    const updatedEntity = { ...entity, ...partialEntity };
    return this.filmsRepository.save(updatedEntity);
  }

  async remove(id: number) {
    const entity = await this.findOne(id);
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return this.filmsRepository.remove(entity);
  }
}
