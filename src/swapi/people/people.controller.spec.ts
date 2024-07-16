import { Test, TestingModule } from '@nestjs/testing';
import PeopleController from './people.controller';
import { PeopleService } from './people.service';
import { People } from './entities/people.entity';
import { CommonService } from '../../common/common.service';
import { repositoryMockupsFactory } from '../../test/repository.mock';
import { Film } from '../films/entities/film.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

describe('PeopleController', () => {
  let controller: PeopleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PeopleController],
      providers: [
        PeopleService,
        CommonService,
        repositoryMockupsFactory(People),
        repositoryMockupsFactory(Film),
        repositoryMockupsFactory(Starship),
        repositoryMockupsFactory(Species),
        repositoryMockupsFactory(Vehicle),
        repositoryMockupsFactory(Planet),
      ],
    }).compile();

    controller = module.get<PeopleController>(PeopleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
