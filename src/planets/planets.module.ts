import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
import { Planet } from './entities/planet.entity';
import { CommonService } from 'src/common/common.service';
import { Image } from 'src/images/entities/image.entity';


@Module({
  imports: [
    CommonModule,
    TypeOrmModule.forFeature([
      People,
      Planet,
      Film,
      Species,
      Starship,
      Vehicle,
      Image,
    ]),
  ],
  controllers: [PlanetsController],
  providers: [PlanetsService,CommonService],
})
export class PlanetsModule {}
