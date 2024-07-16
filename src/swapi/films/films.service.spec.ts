import { Test, TestingModule } from '@nestjs/testing';
import { FilmsService } from './films.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { CommonModule } from '../../common/common.module';
import { People } from '../people/entities/people.entity';
import { repositoryMockups, repositoryMockupsFactory } from '../../test/repository.mock';

import { CommonService } from '../../common/common.service';
import { Planet } from '../planets/entities/planet.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

describe('FilmsService', () => {
  let service: FilmsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        FilmsService,
        CommonService,
        repositoryMockupsFactory(People),
        repositoryMockupsFactory(Film),
        repositoryMockupsFactory(Starship),
        repositoryMockupsFactory(Species),
        repositoryMockupsFactory(Vehicle),
        repositoryMockupsFactory(Planet)
      ],
    }).compile();

    service = module.get<FilmsService>(FilmsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
