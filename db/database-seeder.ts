import { InjectDataSource } from "@nestjs/typeorm";
import { Film } from "src/films/entities/film.entity";
import { People } from "src/people/entities/people.entity";
import { Planet } from "src/planets/entities/planet.entity";
import { Species } from "src/species/entities/species.entity";
import { Starship } from "src/starships/entities/starship.entity";
import { entities, RepositoryTypeUnion, EntityTypeUnion, SWAPI_FETCH_URL } from "src/utils/constants";
import { getEntityUrl } from "src/utils/utils";
import { Vehicle } from "src/vehicles/entities/vehicle.entity";
import { QueryRunner } from "typeorm";




export class DatabaseSeederService {
  constructor(
   @InjectDataSource()
   public queryRunner: QueryRunner
  ) {}

  async seedDatabase() {
    try {
      const enumEntities = Object.keys(entities);
      const fetchCache = {};
      let response: Response;
      let data: any;

      for (const entity of enumEntities) {
        response = await fetch(SWAPI_FETCH_URL + entity);
        data = await response.json();
        fetchCache[entity] = data;
        await this.populateDBwithoutConnections(entity, data);
      }
      for (const entity of enumEntities) {
        console.log(`Linking: ${entity}`);
        data = fetchCache[entity];
        await this.setUpConnectionsToEntities(entity, data);
      }
      return { succes: true };
    } catch (error) {
      console.log(error);
    }
  }
  async setUpConnectionsToEntities(entityType: string, data: any) {
    let repository: RepositoryTypeUnion;
    switch (entityType) {
      case 'people': {
        repository = this.queryRunner.manager.getRepository(People);
        break;
      }
      case 'films': {
        repository = this.queryRunner.manager.getRepository(Film);
        break;
      }
      case 'planets': {
        repository = this.queryRunner.manager.getRepository(Planet);
        break;
      }
      case 'species': {
        repository = this.queryRunner.manager.getRepository(Species);
        break;
      }
      case 'starships': {
        repository = this.queryRunner.manager.getRepository(Starship);
        break;
      }
      case 'vehicles': {
        repository = this.queryRunner.manager.getRepository(Vehicle);
        break;
      }
    }
    let sampleEntity: EntityTypeUnion;
    let updatedEntity: EntityTypeUnion;
    try {
      for (const cachedEntity of data) {
        const cachedEntityId = this.getIdFromFromUrl(cachedEntity.url);
        const existingEntity: null | EntityTypeUnion =
          await repository.findOneBy({ id: cachedEntityId });
        if (existingEntity !== null) {
          sampleEntity = cachedEntity;
          updatedEntity = await this.buildConnectionsToEntity(
            existingEntity,
            sampleEntity,
          );
          let resultEntity = await repository.save(updatedEntity); 
          
          console.log(
            `Successfuly added connection to ${entityType}:${updatedEntity.id}`,
          );
          if(entityType === "people") {
            console.log(await repository.findOneBy({id: resultEntity.id}))
          }
        } else {
          console.log(
            `Entity "${entityType}" with id ${cachedEntityId} is not found`,
          );
        }
      }
      console.log('Succesfully linked all entities');
    } catch (error) {
      console.log('Error: updated entity 99 ');
      console.log(error);
      console.log(updatedEntity);
      throw error;
    }
  }
  private async buildConnectionsToEntity(
    existingEntity: EntityTypeUnion,
    sampleEntity: any,
  ): Promise<EntityTypeUnion> {
    try {
      let operatableRepository: RepositoryTypeUnion;
      let tempEntity: EntityTypeUnion;

      for (const key of Object.keys(sampleEntity)) {
        if (Array.isArray(sampleEntity[key]) && sampleEntity[key].length > 0) {
          for (const urlString of sampleEntity[key]) {
            switch (key) {
              case 'films': {
                operatableRepository = this.queryRunner.manager.getRepository(Film);;
                break;
              }
              case 'species': {
                operatableRepository = this.queryRunner.manager.getRepository(Species);
                break;
              }
              case 'vehicles': {
                operatableRepository = this.queryRunner.manager.getRepository(Vehicle);
                break;
              }
              case 'starships': {
                operatableRepository = this.queryRunner.manager.getRepository(Starship);
                break;
              }
              case 'pilots':
              case 'residents':
              case 'characters':
              case 'people': {
                operatableRepository = this.queryRunner.manager.getRepository(People);
                break;
              }
              case 'planets': {
                operatableRepository = this.queryRunner.manager.getRepository(Planet);
                break;
              }
            }

            const entitiesId = this.getIdFromFromUrl(urlString);
            tempEntity = await operatableRepository.findOneBy({
              id: entitiesId,
            });

            if (existingEntity[key] === undefined) {
              existingEntity[key] = [];
            }
            existingEntity[key].push(tempEntity);
          }
          continue;
        }
        if (key === 'homeworld') {
          const urlString = sampleEntity[key];
          if (!urlString) {
            existingEntity[key] = null;
            continue;
          }
          const entitiesId = this.getIdFromFromUrl(urlString);
          tempEntity = await this.queryRunner.manager.getRepository(Planet).findOneBy({
            id: entitiesId,
          });
          existingEntity[key] = tempEntity;
        }
      }
      
      return existingEntity;
    } catch (error) {
      console.log('Error Existing Entity 174');
      console.log(error);
      console.log(existingEntity);
      throw error;
    }
  }

  getIdFromFromUrl(url: string): number {
    const id = url.match(/\/(\d+)\/*$/)[1];
    return +id;
  }
  async populateDBwithoutConnections(entityType: string, data) {
    let repository: RepositoryTypeUnion;
    switch (entityType) {
        case 'people': {
            repository = this.queryRunner.manager.getRepository(People);
            break;
          }
          case 'films': {
            repository = this.queryRunner.manager.getRepository(Film);
            break;
          }
          case 'planets': {
            repository = this.queryRunner.manager.getRepository(Planet);
            break;
          }
          case 'species': {
            repository = this.queryRunner.manager.getRepository(Species);
            break;
          }
          case 'starships': {
            repository = this.queryRunner.manager.getRepository(Starship);
            break;
          }
          case 'vehicles': {
            repository = this.queryRunner.manager.getRepository(Vehicle);
            break;
          }
    }

    for (const entity of data) {
      await this.createEntityWithoutConnections(repository,entityType, entity);
    }
  }

  private async createEntityWithoutConnections(
    repository: RepositoryTypeUnion,
    entityType,
    entity,
  ): Promise<EntityTypeUnion> {
    const newEntity = repository.create();
    newEntity.id = this.getIdFromFromUrl(entity.url);
    for (const key of Object.keys(entity)) {
      if (Array.isArray(entity[key]) || key === 'homeworld'|| key === "created" || key === "edited") {
        continue;
      }
      newEntity[key] = entity[key];
    }
    newEntity.url = getEntityUrl(entityType,newEntity.id);
    
    await repository.save(newEntity);
    console.log(`Successfuly created entity ${newEntity.id}`);

    return newEntity;
  }
}


