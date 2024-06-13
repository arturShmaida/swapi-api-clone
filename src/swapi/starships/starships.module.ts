import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { CommonService } from 'src/common/common.service';
import { Film } from '../films/entities/film.entity';
import { People } from '../people/entities/people.entity';
import { Planet } from '../planets/entities/planet.entity';
import { Species } from '../species/entities/species.entity';
import { Vehicle } from '../vehicles/entities/vehicle.entity';
import { Starship } from './entities/starship.entity';
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
  controllers: [StarshipsController],
  providers: [StarshipsService, CommonService],
})
export class StarshipsModule {}
