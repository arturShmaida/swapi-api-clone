import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import {
  TypeKeys as EntityTypeOptions,
  EntityTypeUnion,
  RepositoryTypeUnion,
} from 'src/utils/constants';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CommonService {
  constructor(
    @InjectRepository(People)
    private peopleRepository: Repository<People>,

    @InjectRepository(Planet)
    private planetsRepository: Repository<Planet>,

    @InjectRepository(Film)
    private filmsRepository: Repository<Film>,

    @InjectRepository(Species)
    private speciesRepository: Repository<Species>,

    @InjectRepository(Vehicle)
    private vehicleRepository: Repository<Vehicle>,

    @InjectRepository(Starship)
    private starshipRepository: Repository<Starship>,
  ) { }

  async createNewEntityWithDto(
    entityDto: object,
    entityType: EntityTypeOptions,
  ): Promise<EntityTypeUnion> {
    console.log("Common module fires")
    console.log("Dto entity:")
    console.log(entityDto)
    let repository: RepositoryTypeUnion =
      this.assignRepositoryByPropertyKey(entityType);

    const newEntity: EntityTypeUnion = repository.create();
     
    

    for (const propertyKey of Object.keys(entityDto)) {
      repository = this.assignRepositoryByPropertyKey(propertyKey);
      if (Array.isArray(entityDto[propertyKey])) {
        newEntity[propertyKey] = [];

        if (entityDto[propertyKey].length > 0) {
          for (const entityId of entityDto[propertyKey]) {
            const tempEntity = await repository.findOneBy({ id: entityId });

            if (tempEntity === null) {
              console.log(`No entity of ${propertyKey} with id: ${entityId}`)
              throw new NotFoundException(`Related entity with id: ${entityId} is Not Found!`);
            }
            newEntity[propertyKey].push(tempEntity);
          }
        }
      } else if (propertyKey === 'homeworld') {
        if (
          entityDto[propertyKey] === null ||
          entityDto[propertyKey] === undefined
        ) {
          entityDto[propertyKey] = null;
          continue;
        }
        const entityId = entityDto[propertyKey];
        const tempEntity = await this.planetsRepository.findOneBy({
          id: entityId,
        });
        if (tempEntity === null) {
          console.log(`No entity of ${propertyKey} with id: ${entityId}`)

          throw new NotFoundException(`Related entity with id: ${entityId} is Not Found!`);
        }
        newEntity[propertyKey] = tempEntity;
      } else {
        newEntity[propertyKey] = entityDto[propertyKey];
      }
    }
    console.log(newEntity)
    return newEntity;
  }

  assignRepositoryByPropertyKey(entityType: string) {
    switch (entityType) {
      case 'people':
      case 'pilots':
      case 'residents':
      case 'characters': {
        return this.peopleRepository;
      }
      case 'films': {
        return this.filmsRepository;
      }
      case 'planets': {
        return this.planetsRepository;
      }
      case 'species': {
        return this.speciesRepository;
      }
      case 'starships': {
        return this.starshipRepository;
      }
      case 'vehicles': {
        return this.vehicleRepository;
      }
    }
  }
}
