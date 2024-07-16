import { Test, TestingModule } from '@nestjs/testing';
import { SpeciesService } from './species.service';
import { Species } from './entities/species.entity';
import { CommonService } from '../../common/common.service';
import { repositoryMockupsFactory } from '../../test/repository.mock';
import { Film } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

describe('SpeciesService', () => {
  let service: SpeciesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SpeciesService,
        CommonService,
        repositoryMockupsFactory(People),
        repositoryMockupsFactory(Film),
        repositoryMockupsFactory(Starship),
        repositoryMockupsFactory(Species),
        repositoryMockupsFactory(Vehicle),
        repositoryMockupsFactory(Planet),
      ],
    }).compile();

    service = module.get<SpeciesService>(SpeciesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
