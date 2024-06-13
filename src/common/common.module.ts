import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from 'src/swapi/films/entities/film.entity';
import { People } from 'src/swapi/people/entities/people.entity';
import { Planet } from 'src/swapi/planets/entities/planet.entity';
import { Species } from 'src/swapi/species/entities/species.entity';
import { Starship } from 'src/swapi/starships/entities/starship.entity';
import { Vehicle } from 'src/swapi/vehicles/entities/vehicle.entity';
import { CommonService } from './common.service';
import { CommonController } from './common.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      People,
      Film,
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
