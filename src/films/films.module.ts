import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { CommonService } from 'src/common/common.service';
import { CommonModule } from 'src/common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Film } from './entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from 'src/vehicles/entities/vehicle.entity';
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
  controllers: [FilmsController],
  providers: [FilmsService, CommonService],
})
export class FilmsModule { }
