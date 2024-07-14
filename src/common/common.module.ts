import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from '../swapi/films/entities/film.entity';
import { People } from '../swapi/people/entities/people.entity';
import { Planet } from '../swapi/planets/entities/planet.entity';
import { Species } from '../swapi/species/entities/species.entity';
import { Starship } from '../swapi/starships/entities/starship.entity';
import { Vehicle } from '../swapi/vehicles/entities/vehicle.entity';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Film,
      People,
      Planet,
      Species,
      Starship,
      Vehicle,
    ]),
  ],
  exports: [CommonService],
  providers: [CommonService],
  controllers: [CommonController],
})
export class CommonModule {}
