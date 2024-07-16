import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { People } from '../swapi/people/entities/people.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Film } from '../swapi/films/entities/film.entity';
import { repositoryMockupsFactory } from '../test/repository.mock';
import { Image } from './entities/image.entity';
import { StorageService } from '../storage/storage.service';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ImagesService,
        {
          provide: StorageService,
          useValue: {
            sendFile: jest.fn(),
            getEntitiesWithSignedUrl: jest.fn(),
            removeFile: jest.fn() 
          }
        },
        repositoryMockupsFactory(People),
        repositoryMockupsFactory(Film),
        repositoryMockupsFactory(Starship),
        repositoryMockupsFactory(Species),
        repositoryMockupsFactory(Vehicle),
        repositoryMockupsFactory(Planet),
        repositoryMockupsFactory(Image)
      ],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
