import { Test, TestingModule } from '@nestjs/testing';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { People } from '../swapi/people/entities/people.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Film } from '../swapi/films/entities/film.entity';
import { StorageModule } from '../storage/storage.module';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('ImagesService', () => {
  let service: ImagesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        StorageModule,
        TypeOrmModule.forFeature([
          People,
          Planet,
          Vehicle,
          Starship,
          Species,
          Film,
          Image,
        ]),
      ],
      providers: [ImagesService],
    }).compile();

    service = module.get<ImagesService>(ImagesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
