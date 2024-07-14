import { Test, TestingModule } from '@nestjs/testing';
import { CommonController } from './common.controller';
import { CommonService } from './common.service';
import { People } from '../swapi/people/entities/people.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../swapi/films/entities/film.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { dataSourceOptionsMockup } from '../../db/data-source';
import { forwardRef } from '@nestjs/common';
import { AppModule } from '../app.module';

describe('CommonController', () => {
  let controller: CommonController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature(
          [People, Film, Planet, Species, Starship, Vehicle],
          dataSourceOptionsMockup,
        ),
      ],
      providers: [CommonService],
      controllers: [CommonController],
    }).compile();

    controller = module.get<CommonController>(CommonController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
