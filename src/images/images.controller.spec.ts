import { Test, TestingModule } from '@nestjs/testing';
import { ImagesController } from './images.controller';
import { ImagesService } from './images.service';
import { Image } from './entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from '../common/common.module';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../app.module';
import { People } from '../swapi/people/entities/people.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Film } from '../swapi/films/entities/film.entity';
import { StorageModule } from '../storage/storage.module';

describe('ImagesController', () => {
  let controller: ImagesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CommonModule,
        forwardRef(() => AppModule),
        StorageModule,
        TypeOrmModule.forFeature([
          Image,
          People,
          Planet,
          Vehicle,
          Starship,
          Species,
          Film,
        ]),
      ],
      controllers: [ImagesController],
      providers: [ImagesService],
    }).compile();

    controller = module.get<ImagesController>(ImagesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
