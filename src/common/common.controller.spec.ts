import { Test, TestingModule } from '@nestjs/testing';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { People } from '../swapi/people/entities/people.entity';
import { Film } from '../swapi/films/entities/film.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { repositoryMockupsFactory } from '../test/repository.mock';

describe('CommonController', () => {
  let controller: CommonController;

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
      controllers: [CommonController],
    }).compile();

    controller = module.get<CommonController>(CommonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
