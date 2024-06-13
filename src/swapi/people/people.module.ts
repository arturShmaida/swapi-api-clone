import { Module } from '@nestjs/common';
import { PeopleService } from './people.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import PeopleController from './people.controller';
import { People } from './entities/people.entity';
import { Image } from 'src/images/entities/image.entity';
import { CommonService } from 'src/common/common.service';
import { CommonModule } from 'src/common/common.module';
import { Planet } from '../planets/entities/planet.entity';
import { Film } from '../films/entities/film.entity';
import { Species } from '../species/entities/species.entity';
import { Starship } from '../starships/entities/starship.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';

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
  providers: [PeopleService, CommonService],
  controllers: [PeopleController],
})
export class PeopleModule {}
