import { Test, TestingModule } from '@nestjs/testing';
import { CommonService } from './common.service';
import { People } from '../swapi/people/entities/people.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../swapi/films/entities/film.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { AppModule } from '../app.module';
import { forwardRef } from '@nestjs/common';

describe('CommonService', () => {
  let service: CommonService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        forwardRef(() => AppModule),
        TypeOrmModule.forFeature([
          People,
          Film,
          Planet,
          Species,
          Starship,
          Vehicle,
        ]),
      ],
      providers: [CommonService],
    }).compile();

    service = module.get<CommonService>(CommonService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
