import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Vehicle } from './entities/vehicle.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CommonService } from '../../common/common.service';
import { Repository } from 'typeorm';
import { DEFAULT_PAGE_LIMIT, TypeKeys } from '../../utils/constants';
import { getEntityUrl } from '../../utils/utils';
import { PaginationDto } from '../../common/dto/pagination.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,

    private commonService: CommonService,
  ) {}

  async create(createVehicleDto: CreateVehicleDto) {
    console.log('Enter Create');
    const entityType: TypeKeys = 'vehicles';
    const newEntity = await this.commonService.createNewEntityWithDto(
      createVehicleDto,
      entityType,
    );
    const lastIndex = (
      await this.vehicleRepository.find({ take: 1, order: { id: 'desc' } })
    )[0].id;
    newEntity.url = getEntityUrl(entityType, lastIndex + 1);

    const newSavedEntity = await this.vehicleRepository.save(newEntity);

    return await this.vehicleRepository.save(newSavedEntity);
  }

  async findAll(paginationDto: PaginationDto): Promise<Vehicle[]> {
    const { offset, limit } = paginationDto;

    const result = await this.vehicleRepository.find({
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

  async findOne(id: number): Promise<Vehicle> {
    const response = await this.vehicleRepository.findOne({
      where: { id },
      relations: ['pilots', 'films', 'images'],
    });
    if (response === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return response;
  }

  async update(id: number, updateVehicleDto: UpdateVehicleDto) {
    const entity = await this.vehicleRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    const entityType: TypeKeys = 'vehicles';
    const partialEntity = await this.commonService.createNewEntityWithDto(
      updateVehicleDto,
      entityType,
    );
    const updatedEntity = { ...entity, ...partialEntity };
    return this.vehicleRepository.save(updatedEntity);
  }

  async remove(id: number) {
    const entity = await this.vehicleRepository.findOneBy({ id });
    if (entity === null) {
      throw new NotFoundException(`Entity with id: ${id} is Not Found!`);
    }
    return await this.vehicleRepository.remove(entity);
  }
}
