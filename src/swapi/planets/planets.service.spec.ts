import { Test, TestingModule } from '@nestjs/testing';
import { PlanetsService } from './planets.service';
import { Planet } from './entities/planet.entity';
import { CommonService } from '../../common/common.service';
import { repositoryMockupsFactory } from '../../test/repository.mock';
import { Film } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Species } from '../species/entities/species.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

describe('PlanetsService', () => {
  let service: PlanetsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PlanetsService,
        CommonService,
        repositoryMockupsFactory(People),
        repositoryMockupsFactory(Film),
        repositoryMockupsFactory(Starship),
        repositoryMockupsFactory(Species),
        repositoryMockupsFactory(Vehicle),
        repositoryMockupsFactory(Planet),
      ],
    }).compile();

    service = module.get<PlanetsService>(PlanetsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
