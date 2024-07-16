import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { People } from '../swapi/people/entities/people.entity';
import { Film } from '../swapi/films/entities/film.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { repositoryMockupsFactory } from '../test/repository.mock';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommonService,
        repositoryMockupsFactory(People),
        repositoryMockupsFactory(Film),
        repositoryMockupsFactory(Starship),
        repositoryMockupsFactory(Species),
        repositoryMockupsFactory(Vehicle),
        repositoryMockupsFactory(Planet),
      ],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
