import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommonModule } from 'src/common/common.module';
import { Film } from 'src/films/entities/film.entity';
import { People } from 'src/people/entities/people.entity';
import { Planet } from 'src/planets/entities/planet.entity';
import { Species } from 'src/species/entities/species.entity';
import { Starship } from 'src/starships/entities/starship.entity';
import { Vehicle } from './entities/vehicle.entity';
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
  controllers: [VehiclesController],
  providers: [VehiclesService,CommonService],
})
export class VehiclesModule {}
